import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,  
  },
});


export const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    const info = await transporter.sendMail({
      from: '"ToDoo" <no-reply@todoo.com>',
      to: email,
      subject: 'Password Reset Link',
      text: `Click on the link to reset your password: ${resetLink}`,
      html: `<p>Click on the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Unable to send reset link');
  }
};
