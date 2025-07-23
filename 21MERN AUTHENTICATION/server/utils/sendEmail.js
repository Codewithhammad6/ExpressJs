import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,            
    port: parseInt(process.env.SMTP_PORT),   
        secure: true,                                 
    auth: {
      user: process.env.SMTP_EMAIL, // Your Gmail address
      pass: process.env.SMTP_PASSWORD, // App password, NOT your Gmail login
    },
  });

  const mailOptions = {
    from:process.env.SMTP_EMAIL,
    to: email,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};
