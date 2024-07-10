import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const OTPVerification = ({ email }) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleOtpChange = (e) => setOtp(e.target.value);

    const verifyOtp = async () => {
        if (otp) {
            try {
                const response = await axios.post('https://book-review-app-3.onrender.com/users/verify-otp', { email, otp });
                console.log('OTP verified successfully:', response.data);
                
                navigate(`/Profile-Completion?email=${encodeURIComponent(email)}`);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrMsg(error.response.data.message);
                } else {
                    setErrMsg('Error verifying OTP.');
                }
                console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
            }
        } else {
            setErrMsg("Enter the OTP");
        }
    }

    return (
        <div>
            <h1 className='text-xl font-semibold'>Verify OTP</h1>
            <p className='bg-gray-500 rounded-md p-1 m-1'>please check your email</p>
            {errMsg && (
                <p className='bg-red-200 rounded-md p-1 m-1'>{errMsg}</p>
            )}
            <div className='m-2 text-lg'>
                <input className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-800 p-4 m-2' type='number' onChange={handleOtpChange} placeholder='Enter OTP'></input>
            </div>

            <button onClick={verifyOtp} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold m-2'>Verify OTP</button>
        </div>
    )
}
