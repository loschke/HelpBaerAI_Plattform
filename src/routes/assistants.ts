import { Router, Request, Response, NextFunction } from 'express';
import aiAssistants from '../config/ai-assistants';
import { getPromptTemplate } from '../services/prompt-service';
import fetch from 'node-fetch';
import { openDb } from '../config/database';
import { getUserById } from '../models/User';
import { createOperationLog, updateOperationLogSuccess } from '../models/OperationLog';
import { parseString, OptionsV2 } from 'xml2js';
import { promisify } from 'util';
import config from '../config/model-costs'; 
import {getUserCredits, updateUserCredits, logOperation } from '../services/creditService';
import loadingFacts from '../config/loading-facts';
import logger from '../utils/logger';

const parseXml = promisify<string, OptionsV2, WebhookResponse | null>((xmlString, options, callback) => {
  // Extrahieren Sie den Inhalt des output-Elements vor dem Parsen
  const outputRegex = /<output>([\s\S]*?)<\/output>/;
  let outputContent = '';
  const match = xmlString.match(outputRegex);
  if (match) {
    outputContent = match[1];
    // Ersetzen Sie den Inhalt des output-Elements durch einen Platzhalter
    xmlString = xmlString.replace(outputRegex, '<output>__OUTPUT_PLACEHOLDER__</output>');
  }

  parseString(xmlString, options, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      // Ersetzen Sie den Platzhalter durch den ursprünglichen Inhalt
      if (result && result.response && result.response.output) {
        result.response.output = outputContent;
      }
      callback(null, result as WebhookResponse);
    }
  });
});

// Definieren Sie einen Typ für die erwartete XML-Struktur
interface WebhookResponse {
  response: {
    output: string;
    llm: string;
    prompt_token: string;
    completion_token: string;
    scrape_token: string;
  }
}

const router = Router();

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (fn: AsyncRouteHandler) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/:assistantId', asyncHandler(async (req: Request, res: Response) => {
  logger.debug('Session ID in assistants route: %s', req.sessionID);
  logger.debug('Session data in assistants route: %O', req.session);

  const assistantId = req.params.assistantId;
  logger.debug('Requested assistantId: %s', assistantId);
  
  // Änderung hier: Entfernen des führenden Schrägstrichs bei der Suche
  const assistant = aiAssistants.find(a => a.buttonLink === `/${assistantId}` || a.buttonLink === assistantId);
  logger.debug('Found assistant: %O', assistant ? assistant.title : 'Not found');

  if (assistant) {
    let user = null;
    if (req.session && req.session.userId) {
      logger.debug('User ID from session in assistants route: %s', req.session.userId);
      const db = await openDb();
      user = await getUserById(db, req.session.userId);
      logger.debug('User found in assistants route: %O', user ? user.email : 'Not found');
    } else {
      logger.debug('No user ID in session for assistants route');
    }

    res.render('pages/assistant-analysis', { 
      assistant,
      user: user,
      loadingFacts: loadingFacts
    });
  } else {
    logger.debug('Assistant not found, rendering error page');
    res.status(404).render('pages/error', { message: 'Assistant not found' });
  }
}));

router.post('/:assistantId/process', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  logger.debug('Processing request...');
  logger.debug('Received request body: %O', req.body);
  logger.debug('Received assistantId: %s', req.params.assistantId);
  
  const { assistantId } = req.params;
  const { operationId, tabType, content, mainFocus, outputLanguage, outputFormat, languageModel, promptTemplate } = req.body;
  const userId = req.session?.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const assistant = aiAssistants.find(a => a.buttonLink === `/${assistantId}` || a.buttonLink === assistantId);
  if (!assistant) {
    res.status(404).json({ error: 'Assistant not found' });
    return;
  }

  const operation = assistant.operations?.find(op => op.id === operationId);
  if (!operation) {
    res.status(404).json({ error: 'Operation not found' });
    return;
  }

  // Check user credits
  const userCredits = await getUserCredits(userId);
  logger.debug('User credits: %O', userCredits);
  logger.debug('Operation cost: %O', operation.creditCost);
  if (userCredits < operation.creditCost) {
    logger.debug('Insufficient credits');
    res.status(403).json({ error: 'Insufficient credits' });
    return;
  }

  try {
    let finalPromptTemplate;
    if (promptTemplate) {
      logger.debug('Using client-provided promptTemplate');
      finalPromptTemplate = promptTemplate;
    } else {
      logger.debug('Fetching promptTemplate from server');
      finalPromptTemplate = await getPromptTemplate(operation.promptKey);
    }

    logger.debug('Final promptTemplate: %O', finalPromptTemplate);

    // Vorbereiten der Daten für die Rückgabe an den Client
    const preparedData = {
      promptTemplate: finalPromptTemplate,
      tabType,  // Hier fügen wir den Tab-Typ hinzu
      userInput: content,
      mainFocus,
      outputLanguage,
      outputFormat,
      languageModel: languageModel || operation.languageModel,
      operationId,
      makeBranch: req.body.makeBranch // Neue Zeile
    };

    logger.debug('Prepared data for client: %O', preparedData);

    // Senden der Daten an den externen Webhook
    const webhookUrl = process.env.AI_ASSISTANT_WEBHOOK_URL;
    logger.debug('Webhook URL: %s', webhookUrl);

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedData),
      });

      if (!webhookResponse.ok) {
        throw new Error(`Webhook error! status: ${webhookResponse.status}`);
      }

      const xmlResponse = await webhookResponse.text();
      const result = await parseXml(xmlResponse, { explicitArray: false }) as WebhookResponse;

      // Kostenberechnung hinzufügen
      const llm = result.response.llm as string;
      const modelCosts = config.modelCosts[llm] || {};

      const promptCost = (modelCosts['llm-prompt'] || 0) * parseInt(result.response.prompt_token) / 1000000;
      const outputCost = (modelCosts['llm-output'] || 0) * parseInt(result.response.completion_token) / 1000000;
      const scrapeCost = (modelCosts['scrape-token'] || 0) * parseInt(result.response.scrape_token) / 1000000;
      const totalTokens = parseInt(result.response.prompt_token) + parseInt(result.response.completion_token) + parseInt(result.response.scrape_token);
      const totalCost = promptCost + outputCost + scrapeCost;

      // Extrahieren und Formatieren der benötigten Daten
      const parsedResult = {
        output: result.response.output,  // Dies ist jetzt der unveränderte HTML-String
        llm: result.response.llm,
        prompt_token: parseInt(result.response.prompt_token),
        completion_token: parseInt(result.response.completion_token),
        scrape_token: parseInt(result.response.scrape_token),
        total_tokens: totalTokens,
        cost: {
          promptCost,
          outputCost,
          scrapeCost,
          totalCost
        }
      };

      // If the operation was successful, update credits and log the operation
      await updateUserCredits(userId, userCredits - operation.creditCost);
      try {
        await logOperation(
          userId, 
          operationId, 
          preparedData, // Senden der tatsächlichen formData
          result.response.output, // Senden der Webhook-Antwort
          operation.creditCost,
          totalTokens, // tokenUsed
          totalCost // operationCost
        );
      } catch (logError) {
        logger.error('Failed to log operation: %O', logError);
        // Entscheiden Sie hier, ob Sie den Fehler ignorieren oder die Anfrage abbrechen möchten
      }

      // Include the remaining credits in the response
      const updatedCredits = await getUserCredits(userId);
      res.json({
        ...parsedResult,
        remainingCredits: updatedCredits
      });
    } else {
      logger.error('Webhook URL is not defined in environment variables');
      res.status(500).json({ error: 'Webhook URL is not configured' });
    }
  } catch (error) {
    logger.error('Error processing request: %O', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

router.post('/api/log-operation', asyncHandler(async (req: Request, res: Response) => {
  const { operationId, formData } = req.body;
  const userId = req.session?.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const db = await openDb();
  const log = await createOperationLog(db, {
    userId,
    operationId, 
    formData, 
    timestamp: new Date().toISOString(), 
    success: false,
    creditsUsed: 0,
    tokenUsed: 0,
    operationCost: 0
  });

  res.json({ id: log });
}));

router.put('/api/update-log/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { success, response } = req.body;

  const db = await openDb();
  await updateOperationLogSuccess(db, parseInt(id), success, response, 0);

  res.json({ success: true });
}));

router.get('/loading-facts', (req, res) => {
    res.json(loadingFacts);
});

export default router;
