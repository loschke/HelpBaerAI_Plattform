import { Request, Response } from 'express';
import { getAllUsers, User, addCreditsToUser, deleteUserAndLogs } from '../models/User';
import { openDb } from '../config/database';
import { getUserCount, getOperationCount, getTotalTokens, getTotalCost } from '../services/adminService';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

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

export async function getDashboard(req: Request, res: Response): Promise<void> {
  try {
    const db = await openDb();
    const userCount = await getUserCount(db);
    const operationCount = await getOperationCount(db);
    const totalTokens = await getTotalTokens(db);
    const totalCost = await getTotalCost(db);
    const users = await getAllUsers(db);

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

export async function addCredits(req: Request, res: Response): Promise<void> {
  try {
    const db = await openDb();
    const { userId, amount } = req.body;
    await addCreditsToUser(db, userId, amount);
    res.status(200).json({ message: 'Credits added successfully' });
  } catch (error) {
    console.error('Error adding credits:', error);
    res.status(500).json({ error: 'Error adding credits' });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    console.log('Deleting user. Request body:', req.body);
    const db = await openDb();
    const { userId } = req.body;
    if (!userId) {
      console.error('User ID is missing in the request body');
      res.status(400).json({ error: 'User ID is required' });
      return;
    }
    console.log('Attempting to delete user with ID:', userId);
    await deleteUserAndLogs(db, userId);
    console.log('User deleted successfully');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
      res.status(500).json({ error: 'Error deleting user', details: error.message });
    } else {
      console.error('Unknown error type:', error);
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
      res.status(200).json({ message: 'User data sent successfully' });
    } else {
      throw new Error(`Webhook responded with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending user data:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Error sending user data', details: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred while sending user data' });
    }
  }
}
