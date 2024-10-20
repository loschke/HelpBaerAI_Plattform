import { Request, Response } from 'express';
import { getAllUsers, User, addCreditsToUser, deleteUserAndLogs } from '../models/User';
import { openDb } from '../config/database';
import { getUserCount, getOperationCount, getTotalTokens, getTotalCost, getUserOperationCounts } from '../services/adminService';
import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../utils/logger'; // Importieren Sie den Logger

dotenv.config();

export const adminDashboard = async (req: Request, res: Response) => {
  try {
    const db = await openDb();
    const users = await getAllUsers(db);
    res.render('admin/dashboard', { users });
  } catch (error) {
    logger.error('Error in admin dashboard: %O', error);
    res.status(500).send('Internal Server Error');
  }
};

export async function getDashboard(req: Request, res: Response): Promise<void> {
  try {
    const db = await openDb();
    const userCount = await getUserCount(db);
    const operationCount = await getOperationCount(db);
    const totalTokens = await getTotalTokens(db);
    const totalCost = await getTotalCost(db);
    const users = await getAllUsers(db);
    const userOperationCounts = await getUserOperationCounts(db);

    // Add operation counts to users
    const usersWithOperationCounts = users.map(user => ({
      ...user,
      operationCount: user.id !== undefined ? userOperationCounts[user.id] || 0 : 0
    }));

    res.render('admin/dashboard', {
      dashboardData: {
        userCount,
        operationCount,
        totalTokens,
        totalCost
      },
      users: usersWithOperationCounts
    });
  } catch (error) {
    logger.error('Error in getDashboard: %O', error);
    res.status(500).render('pages/error', { error: 'Error fetching dashboard data' });
  }
}

export async function addCredits(req: Request, res: Response): Promise<void> {
  try {
    const db = await openDb();
    const { userId, amount } = req.body;
    await addCreditsToUser(db, userId, amount);
    res.status(200).json({ message: 'Credits added successfully' });
  } catch (error) {
    logger.error('Error adding credits: %O', error);
    res.status(500).json({ error: 'Error adding credits' });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    logger.debug('Deleting user. Request body: %O', req.body);
    const db = await openDb();
    const { userId } = req.body;
    if (!userId) {
      logger.error('User ID is missing in the request body');
      res.status(400).json({ error: 'User ID is required' });
      return;
    }
    logger.debug('Attempting to delete user with ID: %s', userId);
    await deleteUserAndLogs(db, userId);
    logger.info('User deleted successfully');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Error deleting user: %O', error);
    if (error instanceof Error) {
      logger.error('Error details: %s', error.message);
      logger.error('Error stack: %s', error.stack);
      res.status(500).json({ error: 'Error deleting user', details: error.message });
    } else {
      logger.error('Unknown error type: %O', error);
      res.status(500).json({ error: 'An unknown error occurred while deleting user' });
    }
  }
}

export async function addToMautic(req: Request, res: Response): Promise<void> {
  try {
    const { firstname, email, makeBranch } = req.body;
    const webhookUrl = process.env.AI_ASSISTANT_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error('Webhook URL is not defined in the environment variables');
    }

    const response = await axios.post(webhookUrl, {
      firstname,
      email,
      makeBranch
    });

    if (response.status === 200) {
      logger.info('User data sent successfully to Mautic');
      res.status(200).json({ message: 'User data sent successfully' });
    } else {
      throw new Error(`Webhook responded with status ${response.status}`);
    }
  } catch (error) {
    logger.error('Error sending user data: %O', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Error sending user data', details: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred while sending user data' });
    }
  }
}
