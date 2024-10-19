import { openDb } from '../config/database';
import { Database } from 'sqlite';

export async function generateBackup(): Promise<string> {
  const db = await openDb();
  let backupSQL = '';

  // Get all table names
  const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");

  for (const table of tables) {
    // Get CREATE TABLE statement
    const [createTableSQL] = await db.all(`SELECT sql FROM sqlite_master WHERE type='table' AND name='${table.name}'`);
    backupSQL += `${createTableSQL.sql};\n\n`;

    // Get all data from the table
    const rows = await db.all(`SELECT * FROM ${table.name}`);
    if (rows.length > 0) {
      const columns = Object.keys(rows[0]).join(', ');
      backupSQL += `INSERT INTO ${table.name} (${columns}) VALUES\n`;

      const values = rows.map(row => {
        return '(' + Object.values(row).map(value => 
          value === null || value === undefined ? 'NULL' :
          typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value
        ).join(', ') + ')';
      }).join(',\n');

      backupSQL += values + ';\n\n';
    }
  }

  return backupSQL;
}
