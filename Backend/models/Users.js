const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number
  },
  verified: {
    type: Boolean,
    default: false
  },
  location: {
      type: String,
  },
  age: {
      type: Number,
  },
  profession: {
      type: String,
  },
  dob: {
      type: Date,
  },
  bio: {
      type: String,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
