import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);


    function loginUser(){
        if(username && email && password) {
            console.log('works');
        }
    }

    function takeToRegister(){
        console.log("clicked");
        navigate("/");
    }

  return (
    <div className='bg-white w-full h-[70vh] rounded-xl shadow-md flex flex-col items-center p-10'>
        <h1 className='text-xl font-semibold'>Login</h1>
        
        <div className='m-2 text-lg'>
            <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='text' onChange={handleUsernameChange} placeholder='Username'></input>
            <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='password' onChange={handlePasswordChange} placeholder='password'></input>
        </div>

          <button onClick={loginUser} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold m-2'>Login</button>
          <button onClick={takeToRegister} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold m-2'>Register Me</button>
        


    </div>
  )

}


