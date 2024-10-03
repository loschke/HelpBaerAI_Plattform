import { Router, Request, Response, NextFunction } from 'express';
import aiAssistants from '../config/ai-assistants';
import { getPromptTemplate } from '../services/prompt-service';

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

router.post('/:assistantId/process', asyncHandler(async (req: Request, res: Response) => {
  const { assistantId } = req.params;
  const { operationId, text, outputFormat, language } = req.body;

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

  const promptTemplate = await getPromptTemplate(operation.promptKey);

  // Hier würden Sie die Logik implementieren, um das Sprachmodell mit den Prompts aufzurufen
  // Beispiel:
  // const result = await callLanguageModel(operation.languageModel, promptTemplate, text, outputFormat, language);

  // Für dieses Beispiel geben wir einfach die Prompts zurück
  res.json({
    role: promptTemplate.role,
    task: promptTemplate.task,
    instruction: promptTemplate.instruction,
    followUp: promptTemplate.followUp,
    outputFormat: promptTemplate.outputFormat,
    languageHandling: promptTemplate.languageHandling,
    generalInstructions: promptTemplate.generalInstructions
  });
}));

export default router;
