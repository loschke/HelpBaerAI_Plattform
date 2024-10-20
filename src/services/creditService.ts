import { openDb } from '../config/database';
import { Database } from 'sqlite';
import { createOperationLog } from '../models/OperationLog';
import logger from '../utils/logger'; // Importieren Sie den Logger

export async function getUserCredits(userId: number): Promise<number> {
  const db = await openDb();
  const result = await db.get('SELECT credits FROM users WHERE id = ?', [userId]);
  logger.debug('User credits result: %O', result);
  return result ? result.credits : 0;
}

export async function updateUserCredits(userId: number, newCredits: number): Promise<void> {
  const db = await openDb();
  await db.run('UPDATE users SET credits = ? WHERE id = ?', [newCredits, userId]);
  logger.debug('Updated credits for user %d to %d', userId, newCredits);
}

export async function logOperation(
  userId: number, 
  operationId: string, 
  formData: any, 
  response: string, 
  creditsUsed: number, 
  tokenUsed: number, 
  operationCost: number
): Promise<void> {
  const db = await openDb();
  
  try {
    await createOperationLog(db, {
      userId,
      operationId,
      formData: JSON.stringify(formData),
      timestamp: new Date().toISOString(),
      success: true,
      response,
      creditsUsed,
      tokenUsed,
      operationCost
    });
    logger.info('Operation logged successfully for user %d, operation %s', userId, operationId);
  } catch (error) {
    logger.error('Error logging operation: %O', error);
    throw error;
  }
}
