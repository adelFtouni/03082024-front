import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { Link } from 'react-router-dom';
const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };
  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <Link to='/' key={index}>
          <img src={image} alt={`Image ${index + 1}`} />
        </Link>
      ))}
    </Slider>
  );
};

export default Carousel;
