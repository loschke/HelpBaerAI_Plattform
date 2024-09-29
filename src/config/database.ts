import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

async function openDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}

async function setupDatabase() {
  const db = await openDb();
  
  // Create users table if it doesn't exist, including reset-related columns
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      is_verified BOOLEAN DEFAULT 0,
      is_admin BOOLEAN DEFAULT 0,
      reset_token TEXT,
      reset_token_expiry INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  await db.close();
}

export { openDb, setupDatabase };
