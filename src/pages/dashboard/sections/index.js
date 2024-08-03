import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './index.css';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { FcApprove } from 'react-icons/fc';
import { TiTick, TiTimes } from 'react-icons/ti';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:5000');

function Sections() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sectionCategory, setSectionCategory] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get('https://apishopiishop-1.onrender.com/sections/getSections');
      setSections(response.data);
    };

    const fetchCategories = async () => {
      const response = await axios.get('https://apishopiishop-1.onrender.com/categories/getCategories');
      setCategories(response.data);
    };

    const processSectionCategory = (sections, categories) => {
      const sectionCategoryMap = sections.map(section => {
        return {
          sectionId: section._id,
          categories: categories.filter(category => category.sectionId === section._id)
        };
      });
      setSectionCategory(sectionCategoryMap);
    };

    const fetchData = async () => {
      await fetchSections();
      await fetchCategories();
    };

    fetchData().then(() => {
      processSectionCategory(sections, categories);
    });

    socket.on('newSection', (section) => {
      setSections((prevSections) => [...prevSections, section]);
      toast.info('New section added');
    });

    return () => {
      socket.off('newSection');
    };
  }, []);

  useEffect(() => {
    const processSectionCategory = () => {
      const sectionCategoryMap = sections.map(section => {
        return {
          sectionId: section._id,
          categories: categories.filter(category => category.sectionId === section._id)
        };
      });
      setSectionCategory(sectionCategoryMap);
    };

    if (sections.length > 0 && categories.length > 0) {
      processSectionCategory();
    }
  }, [sections, categories]);

  return (
    <div>
      <ToastContainer />
      <div className='d-flex gap-2 mb-3 align-items-center'>
        <h1 className='mb-0'>Sections</h1>
        <Link className="ml-auto btn btn-primary" to='/addSection'>Add Section</Link>
      </div>
      <div className='card'>
        <div className="post-list">
          {sections.map((section) => (
            <div key={section._id}>
              <div className='list-item d-flex gap-3'>
                <div className=''><img className="rounded" src={section.imageUrl} alt="image" /></div>
                <div className=''>
                  <h1>{section.name}</h1>
                  {sectionCategory.find(secCat => secCat.sectionId === section._id)?.categories.map(category => (
                    <p key={category._id}>{category.name}</p>
                  ))}
                </div>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sections;
