import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const navigate = useNavigate();
    const [dateOfBirth, setDateOfBirth] = useState('[Date of Birth]');
    const [phoneNumber, setPhoneNumber] = useState('[Phone Number]');

    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleChangePassword = () => {
        // Add functionality to change password
        console.log('Changing password...');
    };

    const handleDeleteAccount = () => {
        // Add functionality to delete account
        console.log('Deleting account...');
    };

    const handleSignOut = () => {
        // Add functionality to sign out
        console.log('Signing out...');
    };
    const goBack = () => {
        navigate(-1);
      };
    return (
        <>

            <div className="header">
                <button className='btn btn-transparent p-0' onClick={goBack}>
                    <BiArrowBack color='black' />
                </button>
                <h1>Fatima AliAhmad</h1>
            </div>
            <ul>
                <li><strong>Name:</strong> Inpou</li>
                <li><strong>Date of Birth:</strong>
                    <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </li>
                <li><strong>Email:</strong> inpou@example.com</li>
                <li><strong>Phone Number:</strong>
                    <input type="text" value={phoneNumber} onChange={handlePhoneChange} />
                </li>
            </ul>
            <div>
                <h3>Account Settings:</h3>
                <button onClick={handleChangePassword}>Change Password</button>
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
            <div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </>
    );
};

export default MyProfile;
