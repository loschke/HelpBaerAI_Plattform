import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

router.get('/:filename', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', '..', 'public', 'sample-texts', req.params.filename);
    const content = await fs.readFile(filePath, 'utf-8');
    res.json({ content });
  } catch (error) {
    console.error('Error reading sample text file:', error);
    res.status(404).json({ error: 'Sample text not found' });
  }
});

export default router;
