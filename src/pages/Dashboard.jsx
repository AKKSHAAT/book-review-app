import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem('token');
      try {
        const response = await axios.post('http://localhost:6969/users/details', null, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUser(response.data); // Correctly set user state
        console.log('User details:', response.data);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='bg-white w-full h-[70vh] rounded-xl shadow-md flex flex-col p-10 text-left'>
      <h1 className=' font-bold text-4xl text-gray-600'>Your Dashboard </h1>
      <div>
        <p className='text-3xl' >Hello <i>{user.userName}</i> </p>
        <p className='text-xl text-gray-400' >{user.location}</p>
        <p className='text-xl text-gray-500'> profession <i>{user.profession}</i> </p>
        <hr className='border-2 mt-2'></hr>
        <p>{user.bio} </p>
        <button onClick={handleLogout} className='text-white text-lg bg-accent py-2 px-4 rounded-lg font-semibold my-2'>
                Logout
        </button>
        <button onClick={()=> navigate('/update-details')} 
          className='text-white text-lg bg-accent py-2 px-4 rounded-lg font-semibold my-2 ml-4' >
          Change details
        </button>
        <button onClick={()=> navigate('/add-book')} 
          className='text-white text-lg bg-accent py-2 px-4 rounded-lg font-semibold my-2 ml-4' >
          Add a Book
        </button>
      </div>
    </div>
  );
}

