import React, { useState } from 'react';
import { BiArrowBack, BiHeart } from 'react-icons/bi';
import './itemdetails.scss'
import { useNavigate } from 'react-router-dom';
import { RiHeartFill } from 'react-icons/ri';


const ItemDetails = () => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

const itemDetails = [
  { 
    id: '1', 
    name: 'Burgerita', 
    logo: '/images/food3.png', 
    image: '/images/food1.png', 
    details: 'lettuce, grilled tomato, grilled onions, pickles, french fries, coleslaw, ketchup and mustard', 
    price: "500,000",  
    dollarRate: '95,000', 
    radios: ['beef patty', 'chicken'], 
    checkboxes: ['tomatto', 'lettuce', 'onion'],
    extras: ['mayonaise', 'cheese']
  }
];
  const goBack = () => {
    navigate(-1);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  const addToCart = ()=>{
    localStorage.setItem('itemId',1);
  }
  return (
    <>
      <div className="header">
          <button className='btn btn-transparent p-0' onClick={goBack}>
            <BiArrowBack color='black' />
          </button>
          <button className='btn btn-transparent p-0 ml-auto' onClick={handleFavoriteClick}>
            {!isFavorite ? <BiHeart color='black' /> : <RiHeartFill color='red' />}
          </button>
      </div>
          <img width={'100%'} src={itemDetails[0].logo} alt=""/>
      <div className='flex-1 bg-light item-details'>
        <div  >
          <h2>{itemDetails[0].name}</h2>
          <p>{itemDetails[0].details}</p>
          <span className='text-primary'>{itemDetails[0].price} LBP</span> <small> - 10$</small>
          <div className='note mt-2 mb-3'>The exchange rate is <strong className='text-primary'>{itemDetails[0].dollarRate}</strong></div>
          <div className='card'>
            <h2>What do you preffer</h2>
            {itemDetails[0].radios.map((radio, index) => (
              <div className='d-flex gap-2' key={index}>
                <input className="form-check-input" type="radio" id={radio} name="patty" value={radio} />
                <label htmlFor={radio}>{radio}</label>
              </div>
            ))}
          </div>
          <div className='card'>
            <h2>Anything you want to remove?</h2>
            {itemDetails[0].checkboxes.map((checkbox, index) => (
              <div className='d-flex gap-2' key={index}>
                <input  className="form-check-input" type="checkbox" id={checkbox} name="remove" value={checkbox} />
                <label htmlFor={checkbox}>{checkbox}</label>
              </div>
            ))}
          </div>
          <div className='card'>
            <h2>Want Extra</h2>
            {itemDetails[0].extras.map((extra, index) => (
              <div className='d-flex gap-2' key={index}>
                <input  className="form-check-input" type="checkbox" id={extra} name="extras" value={extra} />
                <label htmlFor={extra}>{extra}</label>
              </div>
            ))}
            </div>
          <div className='card'>
            <h2>Anything specials?</h2>
            <textarea className='form-control'></textarea>
            </div>
            <div className='text-center'>
            <button onClick={addToCart} className='btn btn-primary mx-auto'>Add to cart</button></div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
