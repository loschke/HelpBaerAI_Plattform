import { Database } from 'sqlite';
import bcrypt from 'bcrypt';
import logger from '../utils/logger'; // Importieren Sie den Logger

export interface User {
  id?: number;
  firstname: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  resetToken?: string;
  resetTokenExpiry?: number;
  credits: number;
  isLead: boolean;
  createDate: string;
  lastLogin?: string;
}

interface DatabaseUser {
  id?: number;
  firstname: string;
  email: string;
  password: string;
  is_verified: number;
  is_admin: number;
  reset_token?: string;
  reset_token_expiry?: number;
  credits: number;
  is_lead: number;
  create_date: string;
  last_login?: string;
}

function convertDatabaseUserToUser(dbUser: DatabaseUser): User {
  return {
    ...dbUser,
    isVerified: dbUser.is_verified === 1,
    isAdmin: dbUser.is_admin === 1,
    isLead: dbUser.is_lead === 1,
    resetToken: dbUser.reset_token,
    resetTokenExpiry: dbUser.reset_token_expiry,
    createDate: dbUser.create_date,
    lastLogin: dbUser.last_login
  };
}

export async function createUser(db: Database, user: Omit<User, 'id' | 'createDate' | 'lastLogin'>): Promise<number> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  logger.debug('Creating user with hashed password: %s', hashedPassword);
  const result = await db.run(
    'INSERT INTO users (firstname, email, password, is_verified, is_admin, credits, is_lead, create_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [user.firstname, user.email, hashedPassword, user.isVerified ? 1 : 0, user.isAdmin ? 1 : 0, user.credits, user.isLead ? 1 : 0, new Date().toISOString()]
  );
  return result.lastID!;
}

export async function getUserByEmail(db: Database, email: string): Promise<User | undefined> {
  const dbUser = await db.get<DatabaseUser>('SELECT * FROM users WHERE email = ?', [email]);
  logger.debug('Retrieved user from database: %O', dbUser ? { ...dbUser, password: '[REDACTED]' } : null);
  logger.debug('Raw password hash from database: %s', dbUser?.password);
  return dbUser ? convertDatabaseUserToUser(dbUser) : undefined;
}

export async function verifyUser(db: Database, userId: number): Promise<void> {
  await db.run('UPDATE users SET is_verified = 1, credits = credits + 100 WHERE id = ?', [userId]);
  logger.info('User verified and 100 credits added: %d', userId);
}

export async function getUserById(db: Database, id: number): Promise<User | undefined> {
  const dbUser = await db.get<DatabaseUser>('SELECT * FROM users WHERE id = ?', [id]);
  logger.debug('Retrieved user by ID: %O', dbUser ? { ...dbUser, password: '[REDACTED]' } : null);
  return dbUser ? convertDatabaseUserToUser(dbUser) : undefined;
}

export async function updateUserPassword(db: Database, userId: number, newPassword: string): Promise<void> {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  logger.debug('Updating user password. New hashed password: %s', hashedPassword);
  await db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
  
  // Verify the password was updated correctly
  const updatedUser = await getUserById(db, userId);
  logger.debug('Updated user password hash: %s', updatedUser?.password);
  
  // Verify that the new password can be correctly compared
  if (updatedUser) {
    const isPasswordValid = await bcrypt.compare(newPassword, updatedUser.password);
    logger.debug('New password valid after update: %s', isPasswordValid);
  }
}

export async function setResetToken(db: Database, userId: number, resetToken: string, resetTokenExpiry: number): Promise<void> {
  await db.run('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?', [resetToken, resetTokenExpiry, userId]);
  logger.debug('Reset token set for user: %d', userId);
}

export async function getUserByResetToken(db: Database, resetToken: string): Promise<User | undefined> {
  const dbUser = await db.get<DatabaseUser>('SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?', [resetToken, Date.now()]);
  logger.debug('Retrieved user by reset token: %O', dbUser ? { ...dbUser, password: '[REDACTED]' } : null);
  return dbUser ? convertDatabaseUserToUser(dbUser) : undefined;
}

export async function clearResetToken(db: Database, userId: number): Promise<void> {
  await db.run('UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE id = ?', [userId]);
  logger.debug('Reset token cleared for user: %d', userId);
}

export async function updateUserLastLogin(db: Database, userId: number): Promise<void> {
  await db.run(
    'UPDATE users SET last_login = ? WHERE id = ?',
    [new Date().toISOString(), userId]
  );
  logger.debug('Updated last login for user: %d', userId);
}

export async function getAllUsers(db: Database): Promise<User[]> {
  const users = await db.all<User[]>('SELECT * FROM users');
  logger.debug('Retrieved all users: %d', users.length);
  return users;
}

export async function addCreditsToUser(db: Database, userId: number, amount: number): Promise<void> {
  await db.run('UPDATE users SET credits = credits + ? WHERE id = ?', [amount, userId]);
  logger.info('Added %d credits to user: %d', amount, userId);
}

export async function deleteUserAndLogs(db: Database, userId: number): Promise<void> {
  await db.run('BEGIN TRANSACTION');
  try {
    await db.run('DELETE FROM users WHERE id = ?', [userId]);
    await db.run('DELETE FROM operation_logs WHERE userId = ?', [userId]);
    await db.run('COMMIT');
    logger.info('User and associated logs deleted: %d', userId);
  } catch (error) {
    await db.run('ROLLBACK');
    logger.error('Error deleting user and logs: %O', error);
    throw error;
  }
}
