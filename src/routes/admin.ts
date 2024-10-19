import express from 'express';
import { getDashboard, addCredits, deleteUser, addToMautic } from '../controllers/adminController';
import { generateBackup } from '../services/backupService';

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

// Backup database route
router.get('/backup', isAdmin, async (req: express.Request, res: express.Response) => {
    try {
        const backupSQL = await generateBackup();
        res.setHeader('Content-Type', 'application/sql');
        res.setHeader('Content-Disposition', 'attachment; filename=database_backup.sql');
        res.send(backupSQL);
    } catch (error) {
        console.error('Backup failed:', error);
        res.status(500).render('pages/error', { error: 'Backup fehlgeschlagen. Bitte versuchen Sie es später erneut.' });
    }
});

// Add credits route
router.post('/add-credits', isAdmin, addCredits);

// Delete user route
router.post('/delete-user', isAdmin, deleteUser);

// Add to Mautic route
router.post('/add-to-mautic', isAdmin, addToMautic);

export default router;
