import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendVerificationEmail(email: string, userId: number) {
  const verificationLink = `${process.env.APP_URL}/auth/verify/${userId}`;

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: email,
    subject: 'HelpBärAI - E-Mail bestätigen',
    html: `
      <h1>Willkommen bei HelpBärAI!</h1>
      <p>Bitte klicke den Link unten an, um deine E-Mail-Adresse zu bestätigen:</p>
      <a href="${verificationLink}">E-Mail bestätigen</a>
    `
  };

  await transporter.sendMail(mailOptions);
}

async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetLink = `${process.env.APP_URL}/auth/reset-password/${resetToken}`;

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: email,
    subject: 'HelpBärAI - Passwort zurücksetzen',
    html: `
      <h1>Passwort zurücksetzen</h1>
      <p>Du hast eine Anfrage zum Zurücksetzen deines Passworts erhalten. Bitte klicke den Link unten an, um ein neues Passwort zu setzen:</p>
      <a href="${resetLink}">Passwort zurücksetzen</a>
      <p>Falls du dies nicht getan hast, bitte ignoriere diese E-Mail und dein Passwort bleibt unverändert.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

async function sendNewsletterSignupEmail(firstname: string, email: string): Promise<void> {
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: 'ai@kvix.de',
    subject: 'HelpBärAI - Neue Newsletter-Anmeldung',
    html: `
      <h1>Neue Newsletter-Anmeldung</h1>
      <p><strong>Vorname:</strong> ${firstname}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

export { sendVerificationEmail, sendPasswordResetEmail, sendNewsletterSignupEmail };
