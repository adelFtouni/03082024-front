import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const SectionAdd = () => {
  const [userId, setUserId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');

  useEffect(() => {
    const getSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sections/getSections');
        if (response.status !== 200) {
          console.log('Error: Unable to fetch sections');
        } else {
          setSections(response.data);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    getSections();
  }, []);

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

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sectionName: '',
    sectionImage: null,
    categoryName: '',
    categoryImage: null,
  });

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedSection(selectedId);
    setSectionId(selectedId);
    setSelectedSectionId(selectedId);
    console.log('Selected Section:', selectedId);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmitSection = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.sectionName);
    formDataObj.append('image', formData.sectionImage);

    try {
      const response = await axios.post('http://localhost:5000/sections/addSection', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSectionId(response.data.section._id);
      setSelectedSectionId(response.data.section._id);
      console.log('Section added:', response.data);
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.categoryName);
    formDataObj.append('image', formData.categoryImage);
    formDataObj.append('sectionId', selectedSectionId);
    formDataObj.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:5000/categories/addCategory', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Category added:', response.data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const clearInputs = () => {
    setFormData({
      sectionName: '',
      sectionImage: null,
      categoryName: '',
      categoryImage: null,
    });
    setSelectedSection('');
    setSectionId(null);
    setSelectedSectionId('');
  };

  const clearSec = () => {
    setFormData({
      sectionName: '',
      sectionImage: null,
    });
  };

  const clearCat = () => {
    setFormData({
      categoryName: '',
      categoryImage: null,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div>
      <h1>select or add  section to add category under it</h1>
        <select onChange={handleSelectChange} value={selectedSection}>
          <option value="">Select a section</option>
          {sections.map((section) => (
            <option key={section._id} value={section._id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button className='btn btn-transparent title-back' onClick={goBack}>
          <BiArrowBack />
          <h1>Add section</h1>
        </button>
      </div>

      <div className='card'>
        <h2>Section</h2>
        <form onSubmit={handleSubmitSection}>
          <div className='row'>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Section Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="sectionName"
                  value={formData.sectionName}
                  onChange={handleChange}
                  placeholder="Section Name"
                  required
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Section Image</label>
                <input
                  className="form-control"
                  type="file"
                  name="sectionImage"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className='d-flex gap-2 justify-content-end'>
            <button className='btn btn-secondary w-auto' type="button" onClick={clearSec}>Clear</button>
            <button className='btn btn-primary w-auto' type="submit">Add Section</button>
          </div>
        </form>
      </div>

      {selectedSectionId && (
        <div className='card my-3'>
          <h2>Category</h2>
          <form onSubmit={handleSubmitCategory}>
            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    placeholder="Category Name"
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className="form-group">
                  <label>Category Image</label>
                  <input
                    className="form-control"
                    type="file"
                    name="categoryImage"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='d-flex gap-2 justify-content-end'>
              <button className='btn btn-secondary w-auto' type="button" onClick={clearInputs}>Clear</button>
              <button className='btn btn-primary w-auto' type="button" onClick={clearCat}>New Category</button>
              <button className='btn btn-primary w-auto' type="submit">Add Category</button>
            </div>
          </form>
        </div>
      )}
     
    </div>
  );
};

export default SectionAdd;
