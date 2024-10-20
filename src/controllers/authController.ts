import { Request, Response } from 'express';
import { openDb } from '../config/database';
import { createUser, getUserByEmail, User, updateUserPassword, getUserById, updateUserLastLogin } from '../models/User';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/emailService';
import bcrypt from 'bcrypt';
import { Session } from 'express-session';
import crypto from 'crypto';
import logger from '../utils/logger'; // Importieren Sie den Logger

interface CustomSession extends Session {
  userId?: number;
  isAdmin?: boolean;
}

// Extend the Express Request type to include our custom session
declare module 'express-serve-static-core' {
  interface Request {
    session: CustomSession;
  }
}

async function register(req: Request, res: Response) {
  const { firstname, email, password, password_confirmation } = req.body;

  // Basic server-side validation
  if (!firstname || !email || !password || !password_confirmation) {
    return res.render('pages/register', { error: 'Alle Felder müssen ausgefüllt werden.' });
  }

  if (password !== password_confirmation) {
    return res.render('pages/register', { error: 'Die Passwörter stimmen nicht überein.' });
  }

  if (password.length < 8) {
    return res.render('pages/register', { error: 'Das Passwort muss mindestens 8 Zeichen lang sein.' });
  }

  try {
    const db = await openDb();
    const existingUser = await getUserByEmail(db, email);

    if (existingUser) {
      return res.render('pages/register', { error: 'Diese E-Mail-Adresse wird bereits verwendet.' });
    }

    const userId = await createUser(db, { 
      firstname, 
      email, 
      password, 
      isVerified: false, 
      isAdmin: false, 
      credits: 0,
      isLead: false // Set isLead to false by default
    });
    await sendVerificationEmail(email, userId);

    // Redirect to the new registration success page
    res.redirect('/auth/registration-success');
  } catch (error) {
    logger.error('Registration error: %O', error);
    res.render('pages/register', { error: 'Ein Fehler ist bei der Registrierung aufgetreten. Bitte versuchen Sie es später erneut.' });
  }
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  logger.debug('Login attempt for email: %s', email);

  // Basic server-side validation
  if (!email || !password) {
    logger.debug('Login failed: Missing email or password');
    return res.render('pages/login', { error: 'Bitte geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein.' });
  }

  try {
    const db = await openDb();
    const user = await getUserByEmail(db, email);

    logger.debug('User retrieved from database: %O', user ? { ...user, password: '[REDACTED]' } : null);

    if (!user) {
      logger.debug('Login failed: User not found');
      return res.render('pages/login', { error: 'Ungültige E-Mail-Adresse oder Passwort.' });
    }

    logger.debug('Attempting to compare passwords');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    logger.debug('Password valid: %s', isPasswordValid);

    if (!isPasswordValid) {
      logger.debug('Login failed: Invalid password');
      return res.render('pages/login', { error: 'Ungültige E-Mail-Adresse oder Passwort.' });
    }

    logger.debug('User verification status: %s', user.isVerified);

    if (!user.isVerified) {
      logger.debug('Login failed: User not verified');
      return res.render('pages/login', { error: 'Bitte bestätigen Sie Ihre E-Mail-Adresse, bevor Sie sich anmelden.' });
    }

    // Update last login
    await updateUserLastLogin(db, user.id!);

    // Create a session for the user
    req.session.userId = user.id;
    req.session.isAdmin = user.isAdmin;

    logger.info('Login successful. Redirecting to profile.');

    // Redirect to the profile page
    res.redirect('/profile');
  } catch (error) {
    logger.error('Login error: %O', error);
    res.render('pages/login', { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
  }
}

function logout(req: Request, res: Response) {
  req.session.destroy((err: Error | null) => {
    if (err) {
      logger.error('Logout error: %O', err);
    }
    res.redirect('/');
  });
}

async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.render('pages/forgot-password', { error: 'Bitte geben Sie Ihre E-Mail-Adresse ein.' });
  }

  try {
    const db = await openDb();
    const user = await getUserByEmail(db, email);

    if (!user) {
      // Don't reveal that the user doesn't exist
      return res.render('pages/forgot-password', { success: 'Wenn ein Konto mit dieser E-Mail-Adresse existiert, wurde eine E-Mail mit weiteren Anweisungen gesendet.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await db.run('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?', [resetToken, resetTokenExpiry, user.id]);

    await sendPasswordResetEmail(email, resetToken);

    res.render('pages/forgot-password', { success: 'Eine E-Mail mit Anweisungen zum Zurücksetzen Ihres Passworts wurde gesendet.' });
  } catch (error) {
    logger.error('Forgot password error: %O', error);
    res.render('pages/forgot-password', { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
  }
}

async function resetPassword(req: Request, res: Response) {
  const { token, password, password_confirmation } = req.body;

  logger.debug('Reset password attempt with token: %s', token);

  if (!token || !password || !password_confirmation) {
    logger.debug('Reset password failed: Missing required fields');
    return res.render('pages/reset-password', { error: 'Alle Felder müssen ausgefüllt werden.', token });
  }

  if (password !== password_confirmation) {
    logger.debug('Reset password failed: Passwords do not match');
    return res.render('pages/reset-password', { error: 'Die Passwörter stimmen nicht überein.', token });
  }

  if (password.length < 8) {
    logger.debug('Reset password failed: Password too short');
    return res.render('pages/reset-password', { error: 'Das Passwort muss mindestens 8 Zeichen lang sein.', token });
  }

  try {
    const db = await openDb();
    const user = await db.get('SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?', [token, Date.now()]);

    if (!user) {
      logger.debug('Reset password failed: Invalid or expired token');
      return res.render('pages/reset-password', { error: 'Ungültiger oder abgelaufener Token.', token });
    }

    await updateUserPassword(db, user.id, password);

    // Clear the reset token
    await db.run('UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE id = ?', [user.id]);

    logger.info('Password reset successful for user: %s', user.email);

    res.render('pages/login', { success: 'Ihr Passwort wurde erfolgreich zurückgesetzt. Sie können sich jetzt anmelden.' });
  } catch (error) {
    logger.error('Reset password error: %O', error);
    res.render('pages/reset-password', { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.', token });
  }
}

export { register, login, logout, forgotPassword, resetPassword };
