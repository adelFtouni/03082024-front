import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Modal from 'react-modal'
import GenerateInputs from '../../componets/generateInputs';
const SectionAdd = () => {
  const [clear,setClear] = useState(false)
  const [categoryId,setCategoryId]= useState(null);
  Modal.setAppElement()
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
    console.log(isOpen)
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  const [addedSection,setAddedSection]=useState({});
  const [formData, setFormData] = useState({
    name: '',
    image: null
  });
  const [formDataCat, setFormDataCat] = useState({
    name: '',
    image: null
  });
  const [additionalInputs, setAdditionalInputs] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if(clear === true){
      e.target.value = ''
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

 
  /////////////////////////////////////////////////

  const handleAdditionalInputChange = (e) => {
    setFormDataCat({
      ...formDataCat,
      [e.target.name]: e.target.value
    });
    if(clear === true){
      e.target.value = ''
    }
  };

  const handleAdditionalFileChange = (e) => {
    setFormDataCat({
      ...formDataCat,
      image: e.target.files[0]
    });
  };
  

//   const handleAdditionalInputChange = (index, e) => {
//     const updatedInputs = [...additionalInputs];
//     updatedInputs[index].name = e.target.value;
//     setAdditionalInputs(updatedInputs);
//   };

//   const handleAdditionalFileChange = (index, e) => {
//     const updatedInputs = [...additionalInputs];
//     updatedInputs[index].image = e.target.files[0];
//     setAdditionalInputs(updatedInputs);
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('image', formData.image);
    
    additionalInputs.forEach((input) => {
      formDataObj.append('name', input.name);
      formDataObj.append('image', input.image);
    });

    try {
      const response = await axios.post('http://localhost:5000/sections/addSection', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setAddedSection(response.data)
      console.log('section added:', response.data);
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };
const show = ()=>{
  console.log(addedSection.item._id)
}
const newSection = ()=>{
setClear(true)
}
  const handleCategorySubmit = async (index, e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', additionalInputs[index].name);
    formDataObj.append('image', additionalInputs[index].image);
    formDataObj.append('sectionId', addedSection.item._id);
    try {
      const response = await axios.post('http://localhost:5000/categories/addCategory', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCategoryId(response.data.item._id)
      console.log('category added:', response.data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const clearSection = () => {
    setFormData({ ...formData, name: '' });
    // setFormData({ ...formData, image: null });
    setAddedSection('')
  };
  const clearCategory = ()=>{
    
  }

  return (
    <div>
      <div>
        <Link className='d-flex title-back' to='/store'><BiArrowBack/>
        <h1>Add section</h1>
        </Link>
      </div>
      
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Section Name</label>
                <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Section Name" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Section Image</label>
                <input className="form-control" type="file" name="image" onChange={handleFileChange} required />
              </div>
            </div>
          </div>
          <button className='btn btn-primary ml-auto' type="submit">Add Section</button>
          
        </form>
        <button className='btn btn-primary ml-auto' type="button" onClick={clearSection}>New  Section</button>
        
          <form  onSubmit={(e) => handleCategorySubmit()}>
            <div className='row'>
              <div className='col-md-3'>
                <div className="form-group">
                  <label>Category Name</label>
                  <input className="form-control" type="text" name="categoryName" value={formDataCat.name} onChange={() => handleAdditionalInputChange} placeholder="Category Name" required/>
                </div>
              </div>
              <div className='col-md-3'>
                <div className="form-group">
                  <label>Category Image</label>
                  <input className="form-control" type="file" name="categoryImage" onChange={() => handleAdditionalFileChange} required />
                </div>
              </div>
              <div className='col-md-3'>
                <div className="">
                  <button className='btn btn-primary ml-auto' type="submit">Add Category</button>
                 
                  
                </div>
              </div>
              <div className='col-md-3'>
              <div className="">
              
            
                
              </div>
            </div>
            </div>
            <div className='row'>
              <div className='col col-md-4'>
              
              </div>
              <div className='col col-md-4'>
              
              </div>
              <div className='col col-md-4'>
              <button className='btn btn-warning' onClick={handleButtonClick}>add sub-category</button>
              <button className='btn btn-primary ml-auto' onClick={clearCategory} type="button">New Category</button>
              </div>
            </div>
          </form>
        
      </div>
      <GenerateInputs data={categoryId}/>
      <div>
      
      <div>
      {/* Your trigger button or element to open the modal 
      <button onClick={() => handleOpenModal()}>Open Modal</button>*/}

      {/* Your modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={handleModalClose }
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '50%',
            height: '50%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {/* Your modal content */}
        <form>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6'>

                
              </div>
              <div className='col-md-6'>


               
               
              </div>
            </div>
            <div className='row'>
             
            </div>
          </div>
          

        </form>
       
       
        <form onSubmit={handleSubmit}>

         
        </form>
     
        <form>

          <input
            type="file"
          
          />
          <button type="submit">save image</button>

        </form>
       
      </Modal>
    </div>
    </div>
    </div>
  );
};

export default SectionAdd;
