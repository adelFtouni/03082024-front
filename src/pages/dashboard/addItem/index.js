import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import {  useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';


const AddItem = () => {
  const navigate = useNavigate();
  const [userId,setUserId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    userId:userId,
    name: '',
    sPrice: 0,
    pPrice: 0,
    ingredients: '',
    category: '', // Added category
    image: null
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
      console.log('UserId from local storage:', userId);
      formData.userId = userId;
      console.log(formData);
    }
  }, [userId]);
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
    
    try {
      const response = await axios.post('http://localhost:5000/items/addItem', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
     
      console.log('Item added:', response.data);
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categoriesInStore/getCategoriesInStore');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories in store:', error);
      }
    };

    fetchCategories();
  }, []);

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <div>
        <button className='btn btn-transparent title-back' onClick={goBack}><BiArrowBack/>
        <h1>Add item</h1>
        </button>
      </div>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
          <div className='col-md-6'>
          <div className="form-group">
            <label>Item Name</label>
            <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" required />
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">
            <label>Purchase Price</label>
            <input className="form-control" type="number" name="pPrice" value={formData.pPrice} onChange={handleChange} placeholder="Purchase Price" required />
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">
            <label>Sale Price</label>
            <input className="form-control" type="number" name="sPrice" value={formData.sPrice} onChange={handleChange} placeholder="Sale Price" required />
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">
            <label>Ingredients</label>
            <input className="form-control" type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients" required />
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">
            <label>Select Category In store</label>
            <select className="form-control" name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category In store</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">
            <label>Image</label>
            <input className="form-control" type="file" name="image" onChange={handleFileChange} required />
          </div>
        </div>
          </div>
          <button className='btn btn-primary ml-auto' type="submit">Add Item</button>
        </form>
      </div>
    </div>
  )
};

export default AddItem;
