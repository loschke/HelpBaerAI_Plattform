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
      email TEXT UNIQUE,
      password TEXT,
      firstname TEXT,
      lastname TEXT,
      isVerified INTEGER DEFAULT 0,
      verificationToken TEXT,
      resetPasswordToken TEXT,
      resetPasswordExpires TEXT
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
