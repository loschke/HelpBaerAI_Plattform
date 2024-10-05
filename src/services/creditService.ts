import { openDb } from '../config/database';
import { Database } from 'sqlite';
import { createOperationLog } from '../models/OperationLog';

export async function getUserCredits(userId: number): Promise<number> {
  const db = await openDb();
  const result = await db.get('SELECT credits FROM users WHERE id = ?', [userId]);
  console.log('User credits result:', result);
  return result ? result.credits : 0;
}

export async function updateUserCredits(userId: number, newCredits: number): Promise<void> {
  const db = await openDb();
  await db.run('UPDATE users SET credits = ? WHERE id = ?', [newCredits, userId]);
}

export async function logOperation(userId: number, operationId: string, formData: any, response: string, creditsUsed: number): Promise<void> {
  const db = await openDb();
  
  try {
    await createOperationLog(db, {
      userId,
      operationId,
      formData: JSON.stringify(formData), // Speichern der tatsächlichen formData
      timestamp: new Date().toISOString(),
      success: true,
      creditsUsed,
      response // Hinzufügen des response-Felds
    });
  } catch (error) {
    console.error('Error logging operation:', error);
    throw error;
  }
}