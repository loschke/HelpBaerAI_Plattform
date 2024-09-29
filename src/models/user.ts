import { openDb } from '../config/database';

interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  is_verified: boolean;
  created_at?: string;
  updated_at?: string;
}

async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO users (username, email, password, is_verified) VALUES (?, ?, ?, ?)',
    [user.username, user.email, user.password, user.is_verified]
  );
  await db.close();
  return result.lastID!;
}

async function getUserById(id: number): Promise<User | undefined> {
  const db = await openDb();
  const user = await db.get<User>('SELECT * FROM users WHERE id = ?', [id]);
  await db.close();
  return user;
}

async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await openDb();
  const user = await db.get<User>('SELECT * FROM users WHERE email = ?', [email]);
  await db.close();
  return user;
}

export { User, createUser, getUserById, getUserByEmail };
