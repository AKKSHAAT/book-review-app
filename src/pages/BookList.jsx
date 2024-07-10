import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BookList = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
    const fetchBooks = async () => {
        try {
        const response = await axios.get('http://localhost:6969/books/books');
        setBooks(response.data);
        } catch (err) {
        setError('Error fetching books');
        console.error(err);
        }
    };

    fetchBooks();
    }, []);

    return (
    <div className="book-list p-5 text-center">
        <h1 className='text-4xl font-bold text-white pb-2'>Find books</h1>
        {error && <p className="error">{error}</p>}
        <div className='flex justify-around flex-wrap'>
            {books.map((book) => (
                <div key={book._id} className='bg-white rounded-md w-[12rem] h-[11rem] text-center p-1'>
                    <h2 className='text-2xl'>{book.title}</h2>
            
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Description:</strong> {book.description}</p>
                    <button onClick={()=>{ navigate(`/book/${book._id}`)}} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold my-2'>
                        more
                    </button>
                </div>
            ))}
        </div>
    </div>
);
};