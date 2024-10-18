import { Request, Response } from 'express';
import { getAllUsers, User } from '../models/User';
import { openDb } from '../config/database';
import { getUserCount, getOperationCount, getTotalTokens, getTotalCost } from '../services/adminService';

export const adminDashboard = async (req: Request, res: Response) => {
  try {
    const db = await openDb();
    const users = await getAllUsers(db);
    res.render('admin/dashboard', { users });
  } catch (error) {
    console.error('Error in admin dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
};

async function getDashboard(req: Request, res: Response) {
  try {
    const db = await openDb(); // Öffnen Sie die Datenbankverbindung
    const userCount = await getUserCount(db);
    const operationCount = await getOperationCount(db);
    const totalTokens = await getTotalTokens(db);
    const totalCost = await getTotalCost(db);
    const users = await getAllUsers(db); // Übergeben Sie die Datenbankverbindung

    res.render('admin/dashboard', {
      dashboardData: {
        userCount,
        operationCount,
        totalTokens,
        totalCost
      },
      users
    });
  } catch (error) {
    console.error('Error in getDashboard:', error);
    res.status(500).render('pages/error', { error: 'Error fetching dashboard data' });
  }
}

export { getDashboard };
