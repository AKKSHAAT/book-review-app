import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import dotenv from 'dotenv';

export const Registration = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
  
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);


    const registerUser = async ()=>{
        if(username && email && password) {
            console.log('not empty')
            const userData = {
                userName: username, // Make sure the field names match your API's expected input
                email: email,
                password: password,
            };
            try {
                const response = await axios.post('http://localhost:6969/users/register', userData);
                console.log('User registered successfully:', response.data);
            } catch (error) {
                console.error('Error registering user:', error.response ? error.response.data : error.message);
            }

        } else {
            setErrMsg("fill all fields");
        }
    }

    function takeTOLogin(){
        console.log("clicked");
        navigate("/login");
    }

  return (
    <div className='bg-white w-full min-h-[70vh] rounded-xl shadow-md flex flex-col items-center p-10 '>
        <h1 className='text-xl font-semibold'>Register</h1>
        {errMsg ?(
            <p className='bg-red-200 rounded-md p-1 m-1'>fill all fields</p>
        ):(
            <></>
        )}
        <div className='m-2 text-lg'>
            <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='email' onChange={handleEmailChange} placeholder='email'></input>
            <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='text' onChange={handleUsernameChange} placeholder='Username'></input>
            <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='password' onChange={handlePasswordChange} placeholder='password'></input>
        </div>

            <button onClick={registerUser} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold m-2'>Register Me</button>
            <button onClick={takeTOLogin} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold '>Login</button>
        


    </div>
  )

}


