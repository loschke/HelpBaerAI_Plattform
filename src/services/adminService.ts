import { openDb } from '../config/database';
import { Database } from 'sqlite';

export async function getUserCount(db: Database): Promise<number> {
  const result = await db.get('SELECT COUNT(*) as count FROM users');
  return result.count;
}

export async function getOperationCount(db: Database): Promise<number> {
  const result = await db.get('SELECT COUNT(*) as count FROM operation_logs');
  return result.count;
}

export async function getTotalTokens(db: Database): Promise<number> {
  const result = await db.get('SELECT SUM(tokenUsed) as total FROM operation_logs');
  return result.total || 0;
}

export async function getTotalCost(db: Database): Promise<number> {
  const result = await db.get('SELECT SUM(operationCost) as total FROM operation_logs');
  return result.total || 0;
}
