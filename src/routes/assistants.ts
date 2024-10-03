import { Router, Request, Response, NextFunction } from 'express';
import aiAssistants from '../config/ai-assistants';
import { getPromptTemplate } from '../services/prompt-service';
import fetch from 'node-fetch';

const router = Router();

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (fn: AsyncRouteHandler) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/:assistantId', (req: Request, res: Response) => {
  const assistantId = req.params.assistantId;
  const assistant = aiAssistants.find(a => a.buttonLink === `/${assistantId}`);

  if (assistant) {
    res.render('pages/assistant-analysis', { assistant });
  } else {
    res.status(404).render('pages/error', { message: 'Assistant not found' });
  }
});

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

export default router;
