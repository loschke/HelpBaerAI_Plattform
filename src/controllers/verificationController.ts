import { Request, Response } from 'express';
import { openDb } from '../config/database';
import { verifyUser, getUserByEmail } from '../models/User';

async function verifyEmail(req: Request, res: Response) {
  const userId = parseInt(req.params.userId);

  try {
    const db = await openDb();
    await verifyUser(db, userId);
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'An error occurred during verification' });
  }
}

export { verifyEmail };
