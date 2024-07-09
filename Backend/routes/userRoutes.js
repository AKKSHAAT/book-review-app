const express = require('express');
const User = require('../models/Users');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = new User({ userName, email, password });
    await user.save();
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/test', (req, res) => {
  res.send('Test route working');
});


module.exports = router;
