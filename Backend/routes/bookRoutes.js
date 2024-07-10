const express = require('express');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/book', async (req, res) => {
    try{
        const books = await Book.find({});
        res.status(200).json(books);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'book added succusfully' });
    }
})

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
})



module.exports = router;