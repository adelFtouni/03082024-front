import React, { useState,useEffect } from 'react';
import './Search.scss';
import NavigationBar from '../../../components/user/navigationBar/NavigationBar';
import { FiFilter } from 'react-icons/fi';
import Collections from '../../../components/user/collections/Collections';
import { BiArrowBack, BiSmile } from 'react-icons/bi';
import { BsHeart, BsStar } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
function Search() {
//adel
const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/items/searchItem?itemName=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for items:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // Call handleSearch function here if you want to search as the user types
    handleSearch();
  };
const goToItem = ()=>{
  navigate('/store')
}
//adel


const [sections, setSections] = useState([]);

useEffect(() => {
  const fetchSections = async () => {
    try {
      const response = await fetch('http://localhost:5000/sections/getSections'); // Assuming your API endpoint is at /api/sections
      if (!response.ok) {
        throw new Error('Failed to fetch sections');
      }
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  fetchSections();
}, []);



























  const collections = [
    { image: '/images/food1.png', title: 'Asian', num: '41' },
    { image: '/images/food2.png', title: 'Bakeries', num: '1' },
    { image: '/images/food3.png', title: 'Burgers', num: '12' },
    { image: '/images/food4.png', title: 'salads', num: '2' },
    { image: '/images/food5.png', title: 'coffee', num: '77' },
    { image: '/images/food1.png', title: 'candies', num: '5' },
    { image: '/images/food3.png', title: 'Juices', num: '123' },
    { image: '/images/food2.png', title: 'Sandwishes', num: '55' },
    { image: '/images/food4.png', title: 'Mexican', num: '3' },
  ];


  const [isModalOpen, setModalOpen] = useState(false);
  const [isShowTabs, setShowTabs] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    console.log("test")
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const showTabs = () => {
    setShowTabs(true);
  }; 
  const hideTabs = () => {
    setShowTabs(false);
  };
  // Close the modal when clicking outside of the modal content
  const handleClickOutside = (event) => {
    if (event.target.id === 'filterModal') {
      closeModal();
    }
  };
  const handleClickInside = () => {
    showTabs();
  };
  const handleBackClick = () => {
    hideTabs();
  };
  return (
    <>
      <div className="search-bar gap-2 align-items-center" id="search">
        {isShowTabs && (
          <BiArrowBack color='black' onClick={handleBackClick} />
        )}
       
        


        <div>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleChange} 
          placeholder="Search items by name" 
        />
        <ul>
          {searchResults.map(item => (
            <li onClick={goToItem} key={item._id}>{item.name}</li>
          ))}
        </ul>
      </div>

















        <button className="filter-button" onClick={openModal}><FiFilter /></button>
      </div>

      <div className="flex-1">
        {!isShowTabs && (
          <Collections items={sections} />
        )}
        {isShowTabs && (
          <NavigationBar />
        )}

        {isModalOpen && (
          <div id="filterModal" className="popup-overlay" onClick={handleClickOutside}>
            <div className="popup-content">
              <div className="popup-header">
                <h1>Filter</h1>
              </div>
              <div className="popup-body">
                <h2>Sort by</h2>
                <div className='d-flex flex-column gap-3 mb-4'>
                  <label className='d-flex align-items-center gap-2'>
                    <BiSmile /> Recommended
                    <input className="form-check-input ml-auto" type="radio" name="sort" defaultChecked />
                  </label>
                  <label className='d-flex align-items-center gap-2'>
                    <BsHeart />
                    Popular
                    <input className="form-check-input ml-auto" type="radio" name="sort" />
                  </label>
                  <label className='d-flex align-items-center gap-2'>
                    <BsStar />
                    Rating
                    <input className="form-check-input ml-auto" type="radio" name="sort" />
                  </label>
                </div>
                <h2>Filter By</h2>
                <div className='d-flex gap-3 mb-4'>
                  <button className='btn btn-outline'>Lowest price</button>
                  <button className='btn btn-outline'>Mid range</button>
                  <button className='btn btn-outline'>High end</button>
                </div>
                <h2>Categories</h2>
                <div className='d-flex flex-column gap-3 mb-4'>
                  <label className='d-flex align-items-center gap-2'> <span className="emoji">🍔</span> Burgers
                    <input className="form-check-input ml-auto" type="checkbox" />
                  </label>
                  <label className='d-flex align-items-center gap-2'> <span className="emoji">🍟</span> Fast Food
                    <input className="form-check-input ml-auto" type="checkbox" />
                  </label>
                  <label className='d-flex align-items-center gap-2'><span className="emoji">🌭</span> International
                    <input className="form-check-input ml-auto" type="checkbox" />
                  </label>
                </div>
                <button className="btn-primary mx-auto" onClick={handleClickInside}>Apply</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Search;














