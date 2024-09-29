import { Router } from 'express';
import aiAssistants from '../config/ai-assistants';

const router = Router();

router.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home', aiAssistants });
});

export default router;
