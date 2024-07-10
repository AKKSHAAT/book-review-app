import React, {useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
  location: '',
  age: '',
  profession: '',
  dob: '',
  bio: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return { ...state, ...action.payload };
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

export const Update = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { location, age, profession, dob, bio } = state;

  const [errMsg, setErrMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', field: e.target.name, value: e.target.value });
  };

  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem('token');
      try {
        const response = await axios.post('https://book-review-app-3.onrender.com/users/details', null, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        dispatch({ type: 'SET_USER_DETAILS', payload: response.data });
        console.log('User details:', response.data);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('token');
    try {
      const response = await axios.put('https://book-review-app-3.onrender.com/users/update-user', state, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setSuccessMsg('Profile updated successfully!');
      setErrMsg('');
      console.log('Update response:', response.data);
      navigate('/dashboard');

    } catch (error) {
      setErrMsg('Failed to update profile. Please try again.');
      setSuccessMsg('');
      console.error('Error updating user profile:', error.message);
    }
  };



  return (
    <div className='bg-white w-full h-[90vh] rounded-xl shadow-md flex flex-col items-center p-10'>
      <h1 className='text-xl font-semibold text-gray-500'>Update your Profile</h1>

      {(errMsg || successMsg) && (
        <p className='bg-red-200 rounded-md p-1 m-1'>{errMsg || successMsg}</p>
      )}

      <div className='m-2 text-lg'>
      <p>Current Location</p>
        <input
          className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
          type='text'
          placeholder='Where do you live'
          name='location'
          value={location}
          onChange={handleChange}
        />
        <p>Age</p>
        <input
          className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
          type='number'
          placeholder='Age'
          name='age'
          value={age}
          onChange={handleChange}
        />
        <p>Your profession</p>
        <input
          className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
          type='text'
          placeholder='Profession'
          name='profession'
          value={profession}
          onChange={handleChange}
        />
        <input
          className='w-[70vw] h-[2.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
          type='date'
          placeholder='Date of Birth'
          name='dob'
          value={dob}
          onChange={handleChange}
        />
        <p>Tell us a little about yourself</p>
        <textarea
          className='w-[70vw] h-[6.5rem] rounded-lg border-2 border-gray-500 p-4 m-2'
          name='bio'
          value={bio}
          onChange={handleChange}
        ></textarea>
      </div>

      <button onClick={handleSubmit} className='text-white text-lg bg-succ py-2 px-4 rounded-lg font-semibold m-2'>
        Next
      </button>
    </div>
  );
};
