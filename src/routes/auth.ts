import express from 'express';
import { register } from '../controllers/authController';
import { verifyEmail } from '../controllers/verificationController';

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Registrierung' });
});
router.post('/register', register as express.RequestHandler);
router.get('/verify/:userId', verifyEmail as express.RequestHandler);

export default router;
