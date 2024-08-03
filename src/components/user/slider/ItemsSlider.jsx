import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { BsStarFill, BsStars } from 'react-icons/bs';
import './slider.scss'

const ItemsSlider = ({ items }) => {
  const settings = {
    dots: false,
    slidesToScroll: 1,
    infinite: false,
    draggable: true,
    autoSlidesToShow: true,
    variableWidth: true,
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index}>
          <Link className="item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p className='mb-0'>{item.description}</p>
            <span className='time'>{item.time}</span>
            <div className='d-flex flex-wrap gap-2 mt-1 mb-3'>
              {item.rating &&(
              <span className='badge rating'>
                <BsStarFill className='text-primary'/>
                {item.rating} 
              {item.rating > 1 ? 'stars' : 'star'}
              </span>
              )}
              {item.extraElements &&
                item.extraElements.map((extra, idx) => <span className='badge purple' key={idx}>
                 <BsStars/> {extra}</span>)}
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default ItemsSlider;
