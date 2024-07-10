import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ bookId }) => {
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:6969/books/${bookId}/reviews`, {
                rating,
                reviewText
            });

            setSuccessMessage('Review submitted successfully!');
            setRating('');
            setReviewText('');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to submit review. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="bg-white  rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-500">Submit a Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating (1-5)</label>
                    <input
                        type="number"
                        id="rating"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="reviewText" className="block text-gray-700 font-bold mb-2">Review Text</label>
                    <textarea
                        id="reviewText"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-succ text-white font-bold py-2 px-4 rounded"
                    >
                        Submit Review
                    </button>
                </div>
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default ReviewForm;
