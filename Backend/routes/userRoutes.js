const express = require('express');
const User = require('../models/Users');
const crypto = require('crypto'); // For generating OTP
const nodemailer = require('nodemailer'); // For sending email

const router = express.Router();

router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP

    const user = new User({ userName, email, password, otp });
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error sending OTP' });
      } else {
        return res.status(201).json({ message: 'User registered successfully. Check your email for OTP.' });
      }
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.otp = null; // Clear the OTP after successful verification
    user.verified = true;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
