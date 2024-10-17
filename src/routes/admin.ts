import express from 'express';

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
router.get('/dashboard', isAdmin, async (req, res) => {
    try {
        res.render('admin/dashboard', { title: 'Admin Dashboard' });
    } catch (error) {
        console.error('Error rendering admin dashboard:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
