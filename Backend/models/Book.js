const mongoose = require('mongoose');

// title, author, genre, and description.

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  description: {
    type: String
  },
  
}, { timestamps: true });

const User = mongoose.model('Book', bookSchema);

module.exports = User;
