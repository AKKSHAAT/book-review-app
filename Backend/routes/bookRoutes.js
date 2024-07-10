const express = require('express');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/books', async (req, res) => {
    try{
        const books = await Book.find({});
        res.status(200).json(books);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'book added succusfully' });
    }
})



router.get('/book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/add-book', async (req, res) => {

    try{
        const {title, author, genre, description} = req.body;
    
        const book = new Book({ title, author, genre, description });
        await book.save();
        console.log("added a book");
        return res.status(200).json({ message: 'book added succusfully' });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'cant add books right now' });
    }
});


router.post('/:id/reviews', async (req, res) => {
    const { id } = req.params;
    const { rating, reviewText } = req.body;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.reviews.push({ rating, reviewText });
        await book.save();

        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit review' });
    }
});

module.exports = router;



module.exports = router;