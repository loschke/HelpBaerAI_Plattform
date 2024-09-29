import express from 'express';
import { getUserById } from '../models/User';
import { openDb } from '../config/database';

const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

// Protected profile route
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const db = await openDb();
        const user = await getUserById(db, req.session.userId!);
        
        if (user) {
            res.render('pages/profile', { title: 'Mein Profil', user });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;