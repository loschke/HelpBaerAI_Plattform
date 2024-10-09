import { Database } from 'sqlite';
import bcrypt from 'bcrypt';

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
}

function convertDatabaseUserToUser(dbUser: DatabaseUser): User {
  return {
    ...dbUser,
    isVerified: dbUser.is_verified === 1,
    isAdmin: dbUser.is_admin === 1,
    resetToken: dbUser.reset_token,
    resetTokenExpiry: dbUser.reset_token_expiry,
    credits: dbUser.credits
  };
}

export async function createUser(db: Database, user: Omit<User, 'id'>): Promise<number> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  console.log('Creating user with hashed password:', hashedPassword);
  const result = await db.run(
    'INSERT INTO users (firstname, email, password, is_verified, is_admin, Credits) VALUES (?, ?, ?, ?, ?, ?)',
    [user.firstname, user.email, hashedPassword, user.isVerified ? 1 : 0, user.isAdmin ? 1 : 0, user.credits]
  );
  return result.lastID!;
}

export async function getUserByEmail(db: Database, email: string): Promise<User | undefined> {
  const dbUser = await db.get<DatabaseUser>('SELECT * FROM users WHERE email = ?', [email]);
  console.log('Retrieved user from database:', dbUser ? { ...dbUser, password: dbUser.password } : null);
  console.log('Raw password hash from database:', dbUser?.password);
  return dbUser ? convertDatabaseUserToUser(dbUser) : undefined;
}

export async function verifyUser(db: Database, userId: number): Promise<void> {
  await db.run('UPDATE users SET is_verified = 1, credits = credits + 100 WHERE id = ?', [userId]);
  console.log('User verified and 100 credits added:', userId);
}

export async function getUserById(db: Database, id: number): Promise<User | undefined> {
  const dbUser = await db.get<DatabaseUser>('SELECT * FROM users WHERE id = ?', [id]);
  console.log('Retrieved user by ID:', dbUser ? { ...dbUser, password: '[REDACTED]' } : null);
  return dbUser ? convertDatabaseUserToUser(dbUser) : undefined;
}

export async function updateUserPassword(db: Database, userId: number, newPassword: string): Promise<void> {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log('Updating user password. New hashed password:', hashedPassword);
  await db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
  
  // Verify the password was updated correctly
  const updatedUser = await getUserById(db, userId);
  console.log('Updated user password hash:', updatedUser?.password);
  
  // Verify that the new password can be correctly compared
  if (updatedUser) {
    const isPasswordValid = await bcrypt.compare(newPassword, updatedUser.password);
    console.log('New password valid after update:', isPasswordValid);
  }
}

export async function setResetToken(db: Database, userId: number, resetToken: string, resetTokenExpiry: number): Promise<void> {
  await db.run('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?', [resetToken, resetTokenExpiry, userId]);
  console.log('Reset token set for user:', userId);
}

export async function getUserByResetToken(db: Database, resetToken: string): Promise<User | undefined> {
  const dbUser = await db.get<DatabaseUser>('SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?', [resetToken, Date.now()]);
  console.log('Retrieved user by reset token:', dbUser ? { ...dbUser, password: '[REDACTED]' } : null);
  return dbUser ? convertDatabaseUserToUser(dbUser) : undefined;
}

export async function clearResetToken(db: Database, userId: number): Promise<void> {
  await db.run('UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE id = ?', [userId]);
  console.log('Reset token cleared for user:', userId);
}
