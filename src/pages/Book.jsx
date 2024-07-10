import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

import ReviewForm from '../components/ReviewForm';

import axios from 'axios';


export const Book = () => {

    const [book, setBook] = useState({});
    const { id } = useParams();
    const [error, setError] = useState('');

    useEffect(() => {
        console.log(id);
        const fetchBooks = async () => {
            try {
            const response = await axios.get(`http://localhost:6969/books/book/${id}`);
            setBook(response.data);
            } catch (err) {
            console.error(err);
            }
        };
    
        fetchBooks();
    }, []);
  return (
    <div className='bg-white w-full h-[70vh] rounded-xl shadow-md flex flex-col p-10'>
        <h1 className='text-4xl font-bold text-gray-500 pb-2 capitalize'>{book.title || "book"}</h1>
        {error && <p className="error">{error}</p>}
        <p className='text-3xl font-bold text-gray-500  pb-2 capitalize'> by: {book.author || "author"}</p>
        <p>Genre: {book.genre}</p>
        <p className='pt-5 font-semibold text-gray-600'> Description</p>
        <p className='p-2'>{book.description}</p>
        <ReviewForm 
            bookId={id}
        />
    </div>
  )
}
