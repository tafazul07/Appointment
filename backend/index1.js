require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Twilio client if credentials are available
let client;
try {
  console.log('Checking Twilio credentials...');
  console.log('TWILIO_SID:', process.env.TWILIO_SID ? 'Present' : 'Missing');
  console.log('TWILIO_TOKEN:', process.env.TWILIO_TOKEN ? 'Present' : 'Missing');
  console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER ? 'Present' : 'Missing');
  console.log('TWILIO_PHONE_NUMBER_SENDING:', process.env.TWILIO_PHONE_NUMBER_SENDING ? 'Present' : 'Missing');

  if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN) {
    client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    console.log('Twilio client initialized successfully');
  } else {
    console.log('Twilio credentials not found, SMS notifications will be disabled');
  }
} catch (error) {
  console.error('Failed to initialize Twilio client:', error);
}

// Initialize Nodemailer transporter
const createTestAccount = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Ethereal test account created:', {
      user: testAccount.user,
      pass: testAccount.pass,
      smtp: testAccount.smtp
    });
    
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  } catch (error) {
    console.error('Error creating Ethereal test account:', error);
    throw error;
  }
};

// Create and verify transporter
let transporter;
createTestAccount()
  .then(trans => {
    transporter = trans;
    return transporter.verify();
  })
  .then(() => {
    console.log('Ethereal transporter is ready to send emails');
  })
  .catch(error => {
    console.error('Failed to setup Ethereal:', error);
  });

let appointments = [];

// Endpoint to handle appointment booking
app.post("/appointments", async (req, res) => {
  console.log("Received booking request:", req.body);
  const { name, email, date, phone, time, serviceTitle } = req.body;

  // Check for missing fields
  if (!name || !email || !date || !phone) {
    console.log("Missing required fields:", { name, email, date, phone });
    return res.status(400).send("Missing fields");
  }

  // Add the new appointment to the list
  const newAppointment = { name, email, date, phone, time, serviceTitle };
  appointments.push(newAppointment);
  console.log("New appointment added to list:", newAppointment);

  try {
    // Send confirmation SMS if Twilio is configured
    if (client) {
      console.log("Attempting to send SMS...");
      
      // Format phone number for Pakistan
      let formattedPhone = phone;
      if (!phone.startsWith('+')) {
        // Remove any spaces or dashes
        formattedPhone = phone.replace(/[\s-]/g, '');
        // Add +92 if it's a Pakistani number
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '+92' + formattedPhone.substring(1);
        } else if (!formattedPhone.startsWith('92')) {
          formattedPhone = '+92' + formattedPhone;
        } else {
          formattedPhone = '+' + formattedPhone;
        }
      }
      
      console.log("SMS Details:", {
        to: formattedPhone,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: `Hi ${name}, your appointment is confirmed for ${date}. Time: ${time}. Thank you!`
      });
      
      try {
        const message = await client.messages.create({
          body: `Hi ${name}, your appointment is confirmed for ${date}. Time: ${time}. Thank you!`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formattedPhone,
        });
        console.log("SMS sent successfully. Message SID:", message.sid);
      } catch (smsError) {
        console.error("SMS sending failed:", {
          error: smsError.message,
          code: smsError.code,
          status: smsError.status,
          moreInfo: smsError.moreInfo
        });
        // Continue with email even if SMS fails
      }
    } else {
      console.log("SMS not sent - Twilio client not initialized");
    }

    // Send confirmation email
    console.log("Attempting to send email...");
    const mailOptions = {
      from: '"Glamour Salon" <noreply@glamoursalon.com>',
      to: email,
      subject: 'Appointment Confirmation - Glamour Salon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Appointment Confirmed!</h2>
          <p>Dear ${name},</p>
          <p>Your appointment has been successfully booked with Glamour Salon.</p>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333;">Appointment Details:</h3>
            <p><strong>Service:</strong> ${serviceTitle}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
          </div>
          <p>If you need to make any changes to your appointment, please contact us at least 24 hours in advance.</p>
          <p>We look forward to seeing you!</p>
          <p>Best regards,<br>Glamour Salon Team</p>
        </div>
      `
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      res.status(201).send("Appointment booked successfully");
    } catch (emailError) {
      console.error("Email sending failed:", {
        error: emailError.message,
        code: emailError.code,
        command: emailError.command,
        stack: emailError.stack
      });
      res.status(500).send("Failed to send email confirmation");
    }
  } catch (err) {
    console.error("Error in appointment booking:", {
      error: err.message,
      stack: err.stack
    });
    res.status(500).send("Failed to process appointment");
  }
});

app.get("/appointments", (req, res) => {
  res.json(appointments);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
