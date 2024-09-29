import { Request, Response } from 'express';
import { openDb } from '../config/database';
import { createUser, getUserByEmail } from '../models/User';
import { sendVerificationEmail } from '../services/emailService';

async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const db = await openDb();
    const existingUser = await getUserByEmail(db, email);

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const userId = await createUser(db, { 
      username, 
      email, 
      password, 
      isVerified: false, 
      isAdmin: false // Set isAdmin to false by default for new users
    });
    await sendVerificationEmail(email, userId);

    res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
}

export { register };
