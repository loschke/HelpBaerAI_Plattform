import express from 'express';
import { getDashboard } from '../controllers/adminController';

const router = express.Router();

// Middleware to check if the user is an admin
const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.session && req.session.isAdmin) {
        next();
    } else {
        res.status(403).render('pages/error', { error: 'Zugriff verweigert. Sie benötigen Administratorrechte.' });
    }
};

// Admin dashboard route
router.get('/dashboard', isAdmin, getDashboard);

export default router;
