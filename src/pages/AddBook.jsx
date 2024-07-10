import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const AddBook = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');

    const [errMsg, setErrMsg] = useState('');



    const handleGenreChange = (e) => setGenre(e.target.value);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleAuthorChange = (e) => setAuthor(e.target.value);
    const handleDescChange = (e) => setDescription(e.target.value);

    const addBook = async () => {
        if (title && author && genre && description) {
            const bookData = {
                title: title,
                author: author,
                genre: genre,
                description: description
            };
            try {
                const response = await axios.post('https://book-review-app-3.onrender.com/books/add-book', bookData);
                console.log('Book added successfully:', response.data);
                navigate('/dashboard');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrMsg(error.response.data.message);
                } else {
                    setErrMsg('Error adding book');
                }
                console.error('Error registering ADDING BOOK:', error.response ? error.response.data : error.message);
            }
        } else {
            setGenre("⚠️ Fill all fields");
        }
    }

    function takeTODash() {
        console.log("clicked");
        navigate("/dashboard");
    }

    return (
        <div className='bg-white w-full min-h-[70vh] rounded-xl shadow-md flex flex-col items-center p-10'>
            <h1 className='text-xl font-semibold'>Add Book</h1>
            {errMsg && (
                <p className='bg-red-200 rounded-md p-1 m-1'>{errMsg}</p>
            )}
            <div className='m-2 text-lg'>
                <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='text' onChange={handleTitleChange} placeholder='title'></input>
                <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='text' onChange={handleAuthorChange} placeholder='Author'></input>
                <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='text' onChange={handleGenreChange} placeholder='genre'></input>
                <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='text' onChange={handleDescChange} placeholder='description'></input>
            </div>
            <button onClick={addBook} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold'>Add</button>
        </div>
    )
}
