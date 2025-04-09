// testEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // eventifyorganisationpvt@gmail.com
    pass: process.env.EMAIL_PASS, // the app password you generated
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else {
    console.log("Transporter is ready to send emails:", success);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "your_test_email@example.com", // replace with your email to test
      subject: "Test Email from Eventify Backend",
      html: "<h1>This is a test email!</h1><p>If you see this, your email is working correctly.</p>",
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email send failed:", err);
      } else {
        console.log("Test email sent successfully:", info.response);
      }
    });
  }
});
