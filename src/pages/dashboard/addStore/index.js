import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const AddStore = () => {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    currency: '',
    address: '',
    deliveryTime: '',
    whatTheySell: '',
    openUntil: '',
    exchangeRate: null,
    sectionId: '',
    requestedCategories: '',
    image: null,
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      try {
        setUserId(userInfo.result._id);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: userId,
      }));
      console.log('UserId updated in formData:', userId);
      console.log(formData)
      console.log(formData)
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    console.log('Submitting form with:', formData); // Log formData including userId

    try {
      const response = await fetch('http://localhost:5000/stores/addStore', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();

      console.log('result : ', data);
      // Redirect or show a success message after successful store addition
      // navigate('/stores'); // Adjust this to the correct route if needed
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sections/getSections');
        setSections(response.data);
        // console.log('Sections:', response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div>
        <button className='btn btn-transparent title-back' onClick={goBack}>
          <BiArrowBack />
          <h1>Add Store</h1>
        </button>
      </div>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Store Name</label>
                <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Store Name" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Address</label>
                <input className="form-control" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Currency</label>
                <select className="form-control" name="currency" value={formData.currency} onChange={handleChange} required>
                  <option value="">Select Currency</option>
                  <option value="lbp">LBP</option>
                  <option value="usd">USD</option>
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Delivery time</label>
                <input className="form-control" type="text" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} placeholder="Delivery time" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>What they sell</label>
                <input className="form-control" type="text" name="whatTheySell" value={formData.whatTheySell} onChange={handleChange} placeholder="What they sell" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Open Until</label>
                <input className="form-control" type="text" name="openUntil" value={formData.openUntil} onChange={handleChange} placeholder="Open Until" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Exchange rate</label>
                <input className="form-control" type="text" name="exchangeRate" value={formData.exchangeRate} onChange={handleChange} placeholder="Exchange Rate" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Select Section</label>
                <select className="form-control" name="sectionId" value={formData.sectionId} onChange={handleChange} required>
                  <option value="">Select Section</option>
                  {sections.map((section) => (
                    <option key={section._id} value={section._id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Requested Categories</label>
                <textarea className="form-control" name="requestedCategories" value={formData.requestedCategories} onChange={handleChange} placeholder="Requested Categories" required></textarea>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Image</label>
                <input className="form-control" type="file" name="image" onChange={handleFileChange} required />
              </div>
            </div>
          </div>
          <button className='btn btn-primary ml-auto' type="submit">Add Store</button>
        </form>
      </div>
    </div>
  );
};

export default AddStore;
