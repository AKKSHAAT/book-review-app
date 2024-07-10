const mongoose = require('mongoose');

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
        type: String,
    },
    reviews: [{
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        reviewText: {
            type: String,
            required: true,
        }
    }]
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
