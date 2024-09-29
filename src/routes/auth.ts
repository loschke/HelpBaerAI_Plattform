import express from 'express';
import { register, login, logout, forgotPassword, resetPassword } from '../controllers/authController';
import { verifyEmail } from '../controllers/verificationController';

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Registrierung' });
});
router.post('/register', register as express.RequestHandler);
router.get('/verify/:userId', verifyEmail as express.RequestHandler);

// New route for registration success page
router.get('/registration-success', (req, res) => {
  res.render('pages/registration-success', { title: 'Registrierung erfolgreich' });
});

// Routes for login
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login' });
});
router.post('/login', login as express.RequestHandler);

// New route for logout
router.get('/logout', logout as express.RequestHandler);

// New routes for forgot password
router.get('/forgot-password', (req, res) => {
  res.render('pages/forgot-password', { title: 'Passwort zurücksetzen' });
});
router.post('/forgot-password', forgotPassword as express.RequestHandler);

// New route for reset password
router.get('/reset-password/:token', (req, res) => {
  res.render('pages/reset-password', { title: 'Neues Passwort setzen', token: req.params.token });
});
router.post('/reset-password', resetPassword as express.RequestHandler);

export default router;
