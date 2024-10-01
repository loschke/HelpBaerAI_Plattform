import express from 'express';
const router = express.Router();

router.get('/webhook-url', (req, res) => {
  res.json({ url: process.env.AI_ASSISTANT_WEBHOOK_URL });
});

export default router;
