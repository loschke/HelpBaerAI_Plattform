import express from 'express';
import { sendNewsletterSignupEmail } from '../services/emailService';

const router = express.Router();

router.post('/newsletter-signup', express.json(), async (req, res) => {
  const { firstname, email } = req.body;

  if (!firstname || !email) {
    res.status(400).json({ message: 'Vorname und E-Mail sind erforderlich.' });
    return;
  }

  try {
    await sendNewsletterSignupEmail(firstname, email);
    res.status(200).json({ message: 'Newsletter-Anmeldung erfolgreich!' });
  } catch (error) {
    console.error('Fehler bei der Newsletter-Anmeldung:', error);
    res.status(500).json({ message: 'Es gab einen Fehler bei der Anmeldung. Bitte versuchen Sie es später erneut.' });
  }
});

export default router;
