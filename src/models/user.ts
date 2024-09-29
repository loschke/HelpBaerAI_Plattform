import { Database } from 'sqlite';
import bcrypt from 'bcryptjs';

interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean; // Neue Eigenschaft
}

async function createUser(db: Database, user: User): Promise<number> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result = await db.run(
    'INSERT INTO users (username, email, password, is_verified, is_admin) VALUES (?, ?, ?, ?, ?)',
    [user.username, user.email, hashedPassword, user.isVerified, user.isAdmin || false]
  );
  return result.lastID!;
}

async function getUserByEmail(db: Database, email: string): Promise<User | undefined> {
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
}

async function verifyUser(db: Database, userId: number): Promise<void> {
  await db.run('UPDATE users SET is_verified = 1 WHERE id = ?', [userId]);
}

async function getUserById(db: Database, id: number): Promise<User | undefined> {
  return db.get('SELECT * FROM users WHERE id = ?', [id]);
}

export { User, createUser, getUserByEmail, verifyUser, getUserById };
