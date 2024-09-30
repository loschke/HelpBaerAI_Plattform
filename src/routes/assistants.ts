import { Router } from 'express';
import aiAssistants from '../config/ai-assistants';

const router = Router();

router.get('/:assistantId', (req, res) => {
  const assistantId = req.params.assistantId;
  const assistant = aiAssistants.find(a => a.buttonLink === `/${assistantId}`);

  if (assistant) {
    res.render('pages/assistant-analysis', { assistant });
  } else {
    res.status(404).render('pages/error', { message: 'Assistant not found' });
  }
});

export default router;
