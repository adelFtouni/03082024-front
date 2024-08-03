import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-router-dom';

const GenerateInputs = ({ data }) => {
  const [numInputs, setNumInputs] = useState(0);
  const [visible, setVisible] = useState(false);
  const [inputValues, setInputValues] = useState([]);

  const handleInputChange = (index, e) => {
    const values = [...inputValues];
    values[index] = e.target.value;
    setInputValues(values);
  };

  const handleGenerateInputs = () => {
    setInputValues(new Array(numInputs).fill(''));
    setVisible(true);
  };

  //   const handlesubmitt = async (e) => {
  //     e.preventDefault();
  //     const formDataObj = new FormData();
  //     // formDataObj.append('categoryId', data);
  //     // inputValues.forEach((value, index) => {
  //     //   formDataObj.append(index + 1, value); // Append data with numerical keys
  //     // });
  // // console.log(formDataObj)
  // // const formDataObj = {
  // //   id:1
  // // }
  // formDataObj.append('id',1);
  // console.log(formDataObj)
  //     try {
  //       const response = await axios.post('http://localhost:5000/subCategories/test', formDataObj, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       });
  //       console.log('Response from server:', response);
  //     } catch (error) {
  //       console.error('Error adding subcategories:', error);
  //     }
  //   };

  const handleSubmit = async (e) => {
    // 
    const newCategories = {
      id: data,
      categories: inputValues
    }
    e.preventDefault();

    const response = await fetch('http://localhost:5000/subCategories/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategories)
    });
    const result = await response.json();
    console.log(result); // Output: { name: "John Doe", email: "johndoe@example.com" }
  };

  return (
    <div className='card'>
      <h2>Want to add more Sub Categories?</h2>
      <form onSubmit={handleSubmit}>
        <div className='d-flex gap-3'>

          <input className='form-control' style={{ width: "350px" }}
            type="number"
            value={numInputs}
            onChange={(e) => setNumInputs(parseInt(e.target.value))}
            placeholder="Enter number of subcategories"
          />
          <button className='btn btn-primary' style={{ width: "160px" }} onClick={handleGenerateInputs}>{!visible ? 'Generate Inputs' : 're-generate inputs'}</button>
          </div>
            {visible && (
              <>
                <div className='row mt-4'>
                  {inputValues.map((value, index) => (
                    <div className='col-md-6'>
                      <label>Sub Category {index + 1}</label>
                      <input
                        key={index}
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder={`Category ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <button className='btn btn-primary ml-auto w-auto' type='submit'>Add Subcategories</button>
              </>)}
          </form>

        </div>
        );
};

        export default GenerateInputs;
