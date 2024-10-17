import { Request, Response } from 'express';
import { openDb } from '../config/database';
import { getAllUsers, User } from '../models/User';

export async function getDashboard(req: Request, res: Response) {
    try {
        const db = await openDb();
        const users = await getAllUsers(db);
        
        res.render('admin/dashboard', { 
            title: 'Admin Dashboard',
            users
        });
    } catch (error) {
        console.error('Error rendering admin dashboard:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Hier können Sie später weitere Admin-Funktionen hinzufügen, z.B.:
// export async function addCredits(req: Request, res: Response) { ... }
// export async function addToMautic(req: Request, res: Response) { ... }
// export async function deleteUser(req: Request, res: Response) { ... }
