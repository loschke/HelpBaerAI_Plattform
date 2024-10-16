import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function openDb(): Promise<Database> {
  if (db) {
    return db;
  }

  db = await open({
    filename: path.join(__dirname, '..', '..', 'database.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      is_verified INTEGER DEFAULT 0,
      is_admin INTEGER DEFAULT 0,
      reset_token TEXT,
      reset_token_expiry INTEGER,
      credits INTEGER DEFAULT 0,
      is_lead INTEGER DEFAULT 0,
      create_date TEXT NOT NULL,
      last_login TEXT
    )
  `);

  // Neue Tabelle für Operation Logs
  await db.exec(`
    CREATE TABLE IF NOT EXISTS operation_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      operationId TEXT NOT NULL,
      formData TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      success INTEGER NOT NULL,
      response TEXT,
      creditsUsed INTEGER NOT NULL,
      tokenUsed INTEGER NOT NULL,
      operationCost DECIMAL(10, 5) NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  return db;
}

export async function closeDb(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}