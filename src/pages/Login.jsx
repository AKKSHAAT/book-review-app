import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const loginUser = async () => {
        try {
            const response = await axios.post('https://book-review-app-3.onrender.com/users/login', {
              userName: username,
              password: password
            });
            const { token } = response.data;
            localStorage.setItem('token', token); // Store token in localStorage
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            setError('Invalid credentials. Please try again.');
            console.error('Login error:', error);
        }
    };

    const takeToRegister = () => {
        navigate('/register'); // Navigate to the registration page
    };

    return (
        <div className='bg-white w-full h-[70vh] rounded-xl shadow-md flex flex-col items-center p-10'>
            <h1 className='text-xl font-semibold'>Login</h1>

            {error && <p className='text-red-500'>{error}</p>}

            <div className='m-2 text-lg'>
                <input
                    className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2'
                    type='text'
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder='Username'
                />
                <input
                    className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder='Password'
                />
            </div>

            <button onClick={loginUser} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold m-2'>
                Login
            </button>
            <button onClick={takeToRegister} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold m-2'>
                Register Me
            </button>
        </div>
    );
};
