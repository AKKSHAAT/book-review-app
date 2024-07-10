import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import axios from 'axios';

export const Book = () => {
    const [book, setBook] = useState({});
    const { id } = useParams();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`https://book-review-app-3.onrender.com/books/book/${id}`);
                setBook(response.data);
            } catch (err) {
                setError('Error fetching book');
                console.error(err);
            }
        };

        fetchBook();
    }, [id]);

    return (
        <div className='bg-white w-full min-h-[100vh] rounded-xl shadow-md flex flex-col p-10'>
            <h1 className='text-4xl font-bold text-gray-500 pb-2 capitalize'>{book.title || "Book Title"}</h1>
            {error && <p className="error">{error}</p>}
            <p className='text-3xl font-bold text-gray-500 pb-2 capitalize'>by: {book.author || "Author"}</p>
            <p>Genre: {book.genre}</p>
            <p className='pt-5 font-semibold text-gray-600'>Description</p>
            <p className='p-2'>{book.description}</p>

            <ReviewForm bookId={id} />

            <p className='pt-5 font-semibold text-gray-600'>User Reviews</p>
            {book.reviews && book.reviews.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {book.reviews.map((review, index) => (
                        <li key={index} className="py-4">
                            <div className="flex space-x-3">
                                <div className="flex-1 space-y-1">
                                    <p className="text-lg font-semibold">{review.rating} / 5</p>
                                    <p className="text-gray-500">{review.reviewText}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default Book;
