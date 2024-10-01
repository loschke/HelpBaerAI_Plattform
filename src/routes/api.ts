import express from 'express';
import { analyzeContent } from '../services/analysisService';

const router = express.Router();

router.post('/analyze', async (req, res) => {
    try {
        const result = await analyzeContent(req.body);
        res.json(result);
    } catch (error) {
        console.error('Error in analyze route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
