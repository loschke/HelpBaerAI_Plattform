import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // Configure your email service here
  host: 'smtp.strato.de',
  port: 587,
  secure: false,
  auth: {
    user: 'agent@kvix.de',
    pass: 'PDCxGrb.M.U&68p'
  }
});

async function sendVerificationEmail(email: string, userId: number) {
  const verificationLink = `http://localhost:3000/auth/verify/${userId}`;

  const mailOptions = {
    from: '"Rico von HelpBärAI" <agent@kvix.de>',
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h1>Welcome to Your App!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationLink}">Verify Email</a>
    `
  };

  await transporter.sendMail(mailOptions);
}

export { sendVerificationEmail };
