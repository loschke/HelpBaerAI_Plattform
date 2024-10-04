import { Router, Request, Response, NextFunction } from 'express';
import aiAssistants from '../config/ai-assistants';
import { getPromptTemplate } from '../services/prompt-service';
import fetch from 'node-fetch';
import { openDb } from '../config/database';
import { getUserById } from '../models/User';
import { createOperationLog, updateOperationLogSuccess } from '../models/OperationLog';

const router = Router();

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (fn: AsyncRouteHandler) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/:assistantId', asyncHandler(async (req: Request, res: Response) => {
  console.log('Session ID in assistants route:', req.sessionID);
  console.log('Session data in assistants route:', req.session);

  const assistantId = req.params.assistantId;
  const assistant = aiAssistants.find(a => a.buttonLink === `/${assistantId}`);

  if (assistant) {
    let user = null;
    if (req.session && req.session.userId) {
      console.log('User ID from session in assistants route:', req.session.userId);
      const db = await openDb();
      user = await getUserById(db, req.session.userId);
      console.log('User found in assistants route:', user ? user.email : 'Not found');
    } else {
      console.log('No user ID in session for assistants route');
    }

    res.render('pages/assistant-analysis', { 
      assistant,
      user: user
    });
  } else {
    res.status(404).render('pages/error', { message: 'Assistant not found' });
  }
}));

router.post('/:assistantId/process', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  console.log('Received request body:', req.body);
  console.log('Received assistantId:', req.params.assistantId);
  
  const { assistantId } = req.params;
  const { operationId, tabType, content, mainFocus, outputLanguage, outputFormat, languageModel, promptTemplate } = req.body;

  console.log('Received promptTemplate:', promptTemplate);

  const assistant = aiAssistants.find(a => a.buttonLink === `/${assistantId}`);
  if (!assistant) {
    res.status(404).json({ error: 'Assistant not found' });
    return;
  }

  const operation = assistant.operations?.find(op => op.id === operationId);
  if (!operation) {
    res.status(404).json({ error: 'Operation not found' });
    return;
  }

  try {
    let finalPromptTemplate;
    if (promptTemplate) {
      console.log('Using client-provided promptTemplate');
      finalPromptTemplate = promptTemplate;
    } else {
      console.log('Fetching promptTemplate from server');
      finalPromptTemplate = await getPromptTemplate(operation.promptKey);
    }

    console.log('Final promptTemplate:', finalPromptTemplate);

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

    console.log('Prepared data for client:', preparedData);

    // Senden der Daten an den externen Webhook
    const webhookUrl = process.env.AI_ASSISTANT_WEBHOOK_URL;
    console.log('Webhook URL:', webhookUrl);

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

      const webhookResult = await webhookResponse.json();

      // Rückgabe der Webhook-Antwort an den Client
      res.json(webhookResult);
    } else {
      console.error('Webhook URL is not defined in environment variables');
      // Hier könnten Sie eine alternative Aktion durchführen oder einen Fehler werfen
    }
  } catch (error) {
    console.error('Error processing request:', error);
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
  });

  res.json({ id: log.id });
}));

router.put('/api/update-log/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { success, response } = req.body;

  const db = await openDb();
  await updateOperationLogSuccess(db, parseInt(id), success, response);

  res.json({ success: true });
}));

export default router;
