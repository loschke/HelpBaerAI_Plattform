import { Database } from 'sqlite';

export interface OperationLog {
  id?: number;
  userId: number;
  operationId: string;
  formData: string;
  timestamp: string;
  success: boolean;
  response?: string;
}

export async function createOperationLog(db: Database, log: OperationLog): Promise<OperationLog> {
  const result = await db.run(
    `INSERT INTO operation_logs (userId, operationId, formData, timestamp, success, response)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [log.userId, log.operationId, log.formData, log.timestamp, log.success ? 1 : 0, log.response]
  );
  
  return { ...log, id: result.lastID };
}

export async function updateOperationLogSuccess(db: Database, id: number, success: boolean, response: string): Promise<void> {
  await db.run(
    `UPDATE operation_logs SET success = ?, response = ? WHERE id = ?`,
    [success ? 1 : 0, response, id]
  );
}