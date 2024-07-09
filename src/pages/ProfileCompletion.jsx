import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ProfileCompletion = () => {
    const [locationValue, setlocationValue] = useState('');
    const [age, setAge] = useState('');
    const [profession, setProfession] = useState('');
    const [dob, setDob] = useState('');
    const [bio, setBio] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const handlelocationValueChange = (e) => setlocationValue(e.target.value);
    const handleAgeChange = (e) => setAge(e.target.value);
    const handleProfessionChange = (e) => setProfession(e.target.value);
    const handleDobChange = (e) => setDob(e.target.value);
    const handleBioChange = (e) => setBio(e.target.value);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async () => {
            const profileData = {
                    locationValue,
                    age,
                    profession,
                    dob,
                    bio,
                    email
            }
            console.log(profileData);
            try {
                const response = await axios.post('http://localhost:6969/users/completion', profileData);
                console.log('User registered successfully:', response.data);
                setErrMsg('');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrMsg(error.response.data.message);
                } else {
                    setErrMsg('Error registering user.');
                }
                console.error('Error registering user:', error.response ? error.response.data : error.message);
            }

        console.log(profileData);
    };

    return (
        <div className='bg-white w-full h-[70vh] rounded-xl shadow-md flex flex-col items-center p-10'>
            <h1 className='text-xl font-semibold text-gray-500'>Complete your profile</h1>
        
            {errMsg && (
                <p className='bg-red-200 rounded-md p-1 m-1'>{errMsg}</p>
            )}
        
            <div className='m-2 text-lg'>
                <input
                    className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
                    type='text'
                    placeholder='Where do you live'
                    value={locationValue}
                    onChange={handlelocationValueChange}
                />
                <input
                    className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
                    type='number'
                    placeholder='Age'
                    value={age}
                    onChange={handleAgeChange}
                />
                <input
                    className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
                    type='text'
                    placeholder='Profession'
                    value={profession}
                    onChange={handleProfessionChange}
                />
                <input
                    className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
                    type='date'
                    placeholder='Date of Birth'
                    value={dob}
                    onChange={handleDobChange}
                />
                <p>Tell us a little about yourself</p>
                <textarea
                    className='w-[70vw] h-[6.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
                    value={bio}
                    onChange={handleBioChange}
                ></textarea>
            </div>

            <button onClick={handleSubmit} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold m-2'>
                Next
            </button>
        </div>
    );
};
