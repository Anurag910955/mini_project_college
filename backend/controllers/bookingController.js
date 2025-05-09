// controllers/bookingController.js
import dotenv from 'dotenv';
dotenv.config();
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import nodemailer from 'nodemailer';

export const bookEvent = async (req, res, next) => {
  try {
    const { eventId, name, email, tickets, totalPayment } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const booking = new Booking({
      eventId,
      name,
      email,
      tickets,
      totalPayment,
    });

    const createdBooking = await booking.save();

    // Send email to the user
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'eventifyprivatelimited13@gmail.com',
        pass: 'ovxp yynd iwsd risd',
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'eventifyprivatelimited13@gmail.com',
      to: email,
      subject: `🎉 Booking Confirmation - ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background-color: #2563eb; padding: 20px 30px; color: white;">
              <h1 style="margin: 0;">Your Booking is Confirmed! 🎫</h1>
            </div>
            <div style="padding: 30px;">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for booking your spot for <strong>${event.title}</strong> with <strong>Eventify</strong>! Here are your booking details:</p>
              <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Event:</td>
                  <td style="padding: 10px;">${event.title}</td>
                </tr>
                <tr style="background-color: #f0f0f0;">
                  <td style="padding: 10px; font-weight: bold;">Date:</td>
                  <td style="padding: 10px;">${new Date(event.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Time:</td>
                  <td style="padding: 10px;">${event.time}</td>
                </tr>
                <tr style="background-color: #f0f0f0;">
                  <td style="padding: 10px; font-weight: bold;">Location:</td>
                  <td style="padding: 10px;">${event.location}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Name:</td>
                  <td style="padding: 10px;">${name}</td>
                </tr>
                <tr style="background-color: #f0f0f0;">
                  <td style="padding: 10px; font-weight: bold;">Email:</td>
                  <td style="padding: 10px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Tickets Booked:</td>
                  <td style="padding: 10px;">${tickets}</td>
                </tr>
                <tr style="background-color: #f0f0f0;">
                  <td style="padding: 10px; font-weight: bold;">Total Payment:</td>
                  <td style="padding: 10px;">₹${totalPayment}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">UPI ID:</td>
                  <td style="padding: 10px;">9109554428@amazonpay</td>
                </tr>
              </table>
              <p style="margin-top: 30px;">If you have any questions or need to make changes to your booking, feel free to reply to this email.</p>
              <p>We can't wait to welcome you to the event!</p>
              <p style="margin-top: 40px;">Warm regards,<br />
              <strong>Team Eventify</strong><br />
              <a href="mailto:eventifyprivatelimited13@gmail.com" style="color: #2563eb;">eventifyprivatelimited13@gmail.com</a></p>
            </div>
            <div style="background-color: #f9fafb; text-align: center; padding: 15px; font-size: 12px; color: #555;">
              You received this email because you booked an event on Eventify.<br/>
              © ${new Date().getFullYear()} Eventify Private Limited. All rights reserved.
            </div>
          </div>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email send failed:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: 'Booking successful!', createdBooking });

  } catch (error) {
    console.error("Booking failed:", error);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};
