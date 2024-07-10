const express = require('express');
const User = require('../models/Users');
const crypto = require('crypto'); 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { log } = require('console');

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
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
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

    user.otp = null; 
    user.verified = true;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/completion', async (req, res) => {
  const { locationValue, age, profession, dob, bio } = req.body;
  const email = req.body.email;
  console.log(email); 
  
  try{
    const existingUser = await User.findOne({ email });
    if(!existingUser) {
      console.log(email)
      return res.status(400).json({ message: 'User Not found' }); 
    }

    existingUser.location = locationValue;
    existingUser.age = age;
    existingUser.profession = profession;
    existingUser.dob = dob;
    existingUser.bio = bio;

    await existingUser.save();

    res.status(200).json({ message: 'Profile updated successfully', user: existingUser });

  } catch(error) {
    res.status(400).json({ message: error.message });
  }

})

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
      const user = await User.findOne({ userName });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (! password === user.password) {
          console.log(user.password , password);
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const payload = {
          user: {
              id: user.id,
              username: user.username,
          },
      };

      jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1h' },
          (err, token) => {
              if (err) throw err;
              res.status(200).json({ token });
          }
      );
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/details', async (req, res) => {
  const token = req.header('Authorization');
  // console.log('got ' + token);

  if (!token) {
      return res.status(401).json({ message: 'please login' });
  }

  try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      const userFound = await User.findById(decoded.user.id);
      
      if (!userFound) return res.status(404).json({ message: 'please login invalid creds' });

      // console.log(userFound);

      const userDetails = {
        userName: userFound.userName,
        verified: userFound.verified,
        profession: userFound.profession,
        bio: userFound.bio,
        dob: userFound.dob,
        age: userFound.age,
        profession: userFound.profession,
        location: userFound.location
      };
      return res.status(200).json(userDetails); // Send userDetails directly
  } catch (error) {
      console.error(error.message);
      res.status(401).json({ message: 'Token is not valid.' });
  }
});

router.put('/update-user', async (req, res) => {

  const token = req.header('Authorization');
  if (!token) {
      return res.status(401).json({ message: 'please login' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      console.log('User ID:', req.userId);
      console.log('User not found');
      return res.status(404).send('User not found.');
    }

    user.location = req.body.location || user.location;
    user.age = req.body.age || user.age;
    user.profession = req.body.profession || user.profession;
    user.dob = req.body.dob || user.dob;
    user.bio = req.body.bio || user.bio;

    await user.save();
    console.log('User updated');
    res.status(200).send({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Error updating user', error: error.message });
  }
});

module.exports = router;
