import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './index.css'; // Import your CSS file

const PhoneRole = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formState, setFormState] = useState({
    role: '',
    phoneNumber: '',
  });

  useEffect(() => {
    // Retrieve user info from localStorage and parse it
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      setUserId(userInfo.result._id);
    }
  }, []);

  const handleCheckboxChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      role: event.target.value,
    }));
  };

  const handlePhoneNumberChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      phoneNumber: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId) {
      console.log("User ID is not available.");
      return;
    }
    try {
      const response = await axios.put('http://localhost:5000/users/phoneRole', {
        userId,
        ...formState,
      });
      if (response.data) {
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('userId', response.data._id);
        switch (response.data.role) {
          case 'user':
            navigate('/userHome');
            break;
          case 'magazineOwner':
            navigate('/merchant');
            break;
          case 'biker':
            navigate('/biker');
            break;
          case 'driver':
            navigate('/driver');
            break;
          default:
            navigate('/'); // Fallback to home page if role is unknown
            break;
        }
      } else {
        console.log("Error: No response data received");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='containerr'>
        <h1 className='main-header'>If you are an end user, do not check any of these options</h1>
      </div>
      <label className='mt-5'>
        Phone Number:
        <input
          type="text"
          value={formState.phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter your phone number"
          required
        />
      </label>
      <div>
        <label>
          <input
            type="radio"
            value="magazineOwner"
            checked={formState.role === 'magazineOwner'}
            onChange={handleCheckboxChange}
          /> Merchant
        </label>
        <label>
          <input
            type="radio"
            value="driver"
            checked={formState.role === 'driver'}
            onChange={handleCheckboxChange}
          /> Driver
        </label>
        <label>
          <input
            type="radio"
            value="biker"
            checked={formState.role === 'biker'}
            onChange={handleCheckboxChange}
          /> Biker
        </label>
      </div>
      <button className='btn btn-primary' type="submit">Continue</button>
    </form>
  );
};

export default PhoneRole;
