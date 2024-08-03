import React, { useState,useEffect } from 'react';
import './index.css'; // Import the CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function PhoneRole() {
  const navigate = useNavigate();
    const [userId,setUserId] = useState(null);
    const [storedUserInfo, setStoredUserInfo] = useState(null);
  const [numberInput, setNumberInput] = useState('');
  const [selectInput, setSelectInput] = useState('customer');

  const handleNumberChange = (event) => {
    setNumberInput(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Update user with ID 1
      const response = await axios.put('http://localhost:5000/users/updateUser', {
        userId : userId,
        phoneNumber: numberInput,
        role: selectInput
      });
      
      console.log('User updated successfully:', response.data);
      navigate('/adminHome')
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
    // 

  useEffect(() => {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      setStoredUserInfo(JSON.parse(userInfo));
      setUserId(JSON.parse(userInfo).result._id)
    }
   
  }, []);
  // console.log(userId)
  return (
    <form className="my-form" onSubmit={handleSubmit}>
      <label>
       Phone Number:
        <input type="number" value={numberInput} onChange={handleNumberChange}  required/>
      </label>
      <label>
        role:
        <select value={selectInput} onChange={handleSelectChange}>
          <option value="customer">Customer</option>
          <option value="owner">Owner</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PhoneRole;
