import React, { useState } from 'react'
import Carousel from '../../../components/user/carousel/Carousel';
import { BiArrowBack, BiCategory, BiExit } from 'react-icons/bi';
import Categories from '../../../components/user/carousel/Carousel';
import ItemsSlider from '../../../components/user/slider/ItemsSlider';
import { CgChevronRight } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import ItemsList from '../../../components/user/itemsList/ItemsList';
import { TbCategoryFilled } from 'react-icons/tb';
import MobileNumber from '../../../components/user/mobile/MobileNumber';

const HomePage = () => {
  //carousel images
  const images = [
    '/images/food1.png',
    '/images/food2.png'
  ];

  //list of categories
  const items = [
    { imageUrl: "/images/burger_icon.png", text: 'Food', description: 'text goes here' },
    { imageUrl: '/images/fresh.jpg', text: 'Fresh', description: 'text goes here' },
    { imageUrl: '/images/flowers.jpg', text: 'Flowers', description: 'text goes here' },
    { imageUrl: '/images/shopping.png', text: 'Shops', description: 'text goes here' },
    { imageUrl: '/images/grocery.png', text: 'Market', description: 'text goes here' },
    { imageUrl: '/images/butler.png', text: 'Butler', description: 'text goes here' },
    { imageUrl: '/images/makeup.png', text: 'Self-Care', description: 'text goes here' },
  ];

  //food categories
  const food_items = [
    { imageUrl: '/images/burger_icon.png', text: 'Asian' },
    { imageUrl: '/images/burger_icon.png', text: 'Bakeries' },
    { imageUrl: '/images/burger_icon.png', text: 'Burgers' },
    { imageUrl: '/images/shopping.png', text: 'salads' },
    { imageUrl: '/images/butler.png', text: 'coffee' },
    { imageUrl: '/images/makeup.png', text: 'candies' },
    { imageUrl: '/images/shopping.png', text: 'Juices' },
    { imageUrl: '/images/butler.png', text: 'Sandwishes' },
    { imageUrl: '/images/makeup.png', text: 'Mexican' },
  ];


  const slider1Items = [
    { id: '1', image: '/images/food1.png', title: 'Item 1', description: 'Description 1', time: '27 - 23 min', },
    { id: '2', image: '/images/food2.png', title: 'Item 1', description: 'Description 1', time: '2 hours', },
  ];

  const slider2Items = [
    { id: '1', image: '/images/food1.png', title: 'Item 2', description: 'Description 2', rating: 3, time: '1 hour', extraElements: ['15% off up to 100,000 LBP', 'Free delivery'] },
    { id: '2', image: '/images/food3.png', title: 'Item 2', description: 'Description 2', rating: 3, time: '1 hour', extraElements: ['15% off up to 2,000,000 LBP', 'Free delivery'] },
    { id: '3', image: '/images/food5.png', title: 'Item 2', description: 'Description 2', rating: 3, time: '1 hour', extraElements: ['Extra 1'] },
  ];


  const [popupVisible, setPopupVisible] = useState(false);
  const [popup2Visible, setPopup2Visible] = useState(false);
  const openRegisterpopup = () => {
    setPopupVisible(true);
  };

  const handlePopupClick = (e) => {
    if (e.target === e.currentTarget) {
      setPopupVisible(false);
    }
  };

  const handleViewAllCatg = () => {
    setPopup2Visible(true);
  };

  const handlePopup2Click = (e) => {
    if (e.target === e.currentTarget) {
      setPopup2Visible(false);
    }
  };


  return (
    <>
      <div>
        <button className='btn btn-transaprent p-0 mb-2' onClick={openRegisterpopup}><BiExit className='text-primary' /><small className='mx-2'>Register to earn point for free food</small></button>

        {popupVisible && (
          <div className="popup-overlay full-screen" onClick={handlePopupClick}>
            <div className="popup-content">
              <div className="popup-header">
                <BiArrowBack color='black' onClick={handlePopupClick} />
                <h1>Enter your phone number</h1>
              </div>
              <div className="popup-body text-center align-items-center gap-3">
                <MobileNumber />

                <button className='btn btn-primary'>Continue</button>
                <Link to='/' className='text-primary'>Have an account and a new number?</Link>

                <p className='mt-auto'>by continueing you agree to our <Link className='text-primary'>T&CS.</Link> please check our <Link className='text-primary'>Privacy Policy</Link> to learn more</p>
              </div>
            </div>

          </div>
        )}


        <div className='images-carousel'>
          <Carousel images={images} />
        </div>

        <div className='categories-grid mt-4'>
          <Categories items={items} />
          <button className='item' onClick={handleViewAllCatg}><TbCategoryFilled className='text-primary' /><span>View all</span></button>


        </div>
        {popup2Visible && (
          <div className="popup-overlay full-screen" onClick={handlePopup2Click}>
            <div className="popup-content">
              <div className="popup-header">
                <BiArrowBack color='black' onClick={handlePopup2Click} />
                <h1>other sections for you</h1>
              </div>
              <div className="popup-body">
                <div className="categories-list">
                  <Categories items={items} />
                </div>
              </div>
            </div>

          </div>
        )}

        <div className='mt-4'>
          <div className='section-header d-flex justify-content-between align-items-center mb-3'>
            <div>
              <h2>Now On ShopiiShop</h2>
              <small>Check out our newest patners,carefully seelcted, just for you.</small>
            </div>
            <Link className="text-primary text-nowrap">
              View All
            </Link>
          </div>
          <div className='items-slider'>
          <ItemsSlider items={slider1Items} />
          </div>
        </div>

        <div className='mt-4'>
          <div className='section-header d-flex justify-content-between align-items-center mb-3'>
            <div>
              <h2>Cart Saving</h2>
              <small>Spend a certain amount to eran a punch, unlock free delivery, and get a discount!</small>
            </div>
            <Link className="text-primary text-nowrap">
              View All
            </Link>
          </div>
          <div className='items-slider'>
          <ItemsSlider items={slider2Items} /></div>
        </div>

        <div className='catg-list-x d-flex overflow-auto'>
          <Categories items={food_items} />
        </div>

        <div className='section-header d-flex justify-content-between align-items-center mb-3'>
          <h2 className='mt-3'>Nearby</h2>
        </div>
        <div className='items-list'>
          <ItemsList items={slider2Items} />
        </div>

      </div >
      
    </>
  )
}

export default HomePage