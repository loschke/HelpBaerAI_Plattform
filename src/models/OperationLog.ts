import { Database } from 'sqlite';

export interface OperationLog {
  id?: number;
  userId: number;
  operationId: string;
  formData: string;
  timestamp: string;
  success: boolean;
  creditsUsed: number;
  response?: string;
}

export async function createOperationLog(db: Database, log: OperationLog): Promise<number> {
  const result = await db.run(
    `INSERT INTO operation_logs (userId, operationId, formData, timestamp, success, creditsUsed, response)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [log.userId, log.operationId, log.formData, log.timestamp, log.success ? 1 : 0, log.creditsUsed, log.response]
  );
  
  return result.lastID ?? 0; // Fügen Sie eine Nullprüfung hinzu
}

export async function updateOperationLogSuccess(db: Database, id: number, success: boolean, response: string, creditsUsed: number): Promise<void> {
  await db.run(
    `UPDATE operation_logs SET success = ?, response = ?, creditsUsed = ?  WHERE id = ?`,
    [success ? 1 : 0, response, creditsUsed, id]
  );
}