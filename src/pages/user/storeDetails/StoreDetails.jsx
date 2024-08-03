import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiHeart, BiShare } from 'react-icons/bi';
import ItemsList from '../../../components/user/itemsList/ItemsList';
import "./store-details.scss"
import { FaLocationPin, FaMotorcycle } from 'react-icons/fa6';
import { CgAppleWatch } from 'react-icons/cg';
import { BsStar } from 'react-icons/bs';
import { GrLocationPin } from 'react-icons/gr';
import ItemsSlider from '../../../components/user/slider/ItemsSlider';
import { RiHeartFill } from 'react-icons/ri';

const stores = [
  { id: '1', name: 'Store 1', logo: '/images/food3.png', image: '/images/food1.png', location: 'Hmara - Ibrahim Abdel Aal Street Next to Fakhani Gourmet', close: "11:59 Pm", rating: 3, dollarRate: '95,000' }
];

const items = [
  { id: '1', section: "kaek", image: '/images/food1.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '2', section: "sssss", image: '/images/food3.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '3', section: "ddddddddd", image: '/images/food5.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '4', section: "kaek", image: '/images/food1.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '5', section: "sssss", image: '/images/food3.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '6', section: "ddddddddd", image: '/images/food5.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '7', section: "kaek", image: '/images/food1.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '8', section: "sssss", image: '/images/food3.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '9', section: "ddddddddd", image: '/images/food5.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '10', section: "kaek", image: '/images/food1.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '12', section: "sssss", image: '/images/food3.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
  { id: '13', section: "ddddddddd", image: '/images/food5.png', title: 'Item 2', description: 'Description 2', price: "LBP 190,000", extraElements: ['popular'] },
];

const groupItemsBySection = items => {
  return items.reduce((acc, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {});
};

const StoreDetails = () => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const contentRef = useRef(null);
  const sectionRefs = useRef({});
  const sectionListRef = useRef(null);
  const [activeNavItem, setActiveNavItem] = useState(null);

  const scrollToSection = (sectionId, index) => {
    const sectionRef = sectionRefs.current[sectionId];
    if (sectionRef) {
      sectionRef.scrollIntoView();
      setActiveNavItem(index);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  const itemsBySection = groupItemsBySection(items);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("id");
            const index = Object.keys(itemsBySection).findIndex(key => key === sectionId);
            setActiveNavItem(index);
          }
        });
      },
      { threshold: 1 }
    );
 
    Object.values(sectionRefs.current).forEach(ref => {
      observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach(ref => {
        //observer.unobserve(ref);
      });
    };
  }, [itemsBySection]);

  return (
    <div className="store-details">
      <div className='position-relative'>
        <div className='header'>
          <button className='btn btn-transparent p-0' onClick={goBack}>
            <BiArrowBack color='black' />
          </button>
          <button className='btn btn-transparent p-0 ml-auto' onClick={handleFavoriteClick}>
            {!isFavorite ? <BiHeart color='black' /> : <RiHeartFill color='red' />}
          </button>
          <button className='btn btn-transparent p-0'>
            <BiShare color='black' />
          </button>
        </div>
        <img src={stores[0].image} alt={stores[0].title} />
      </div>
      <div className='top-card'>
        <div className='d-flex align-items-center gap-2'>
          <img className='logo' src={stores[0].logo} alt="" />
          <h1>{stores[0].name}</h1>
        </div>
        <hr />
        <p><GrLocationPin className='text-primary' /> {stores[0].location}</p>
        <p><CgAppleWatch className='text-primary' /> open until <span className='bold'>{stores[0].close}</span></p>
        <p className=''>
          <BsStar className='text-primary' />
          <span className='bold'>{stores[0].rating}
            {stores[0].rating > 1 ? ' stars' : ' star'}</span>
        </p>
        <p><FaMotorcycle className='text-primary' /> get your order in <span className='bold'>26-36 mins</span></p>
      </div>
      <div ref={contentRef} className='flex-1 px-3'>
        {stores[0].dollarRate && (
          <p className='note mb-3'>The exchange rate set by this store is <span className='text-primary bold'>{stores[0].dollarRate}</span></p>
        )}
        <div className='section-nav'>
          <ul>
            {Object.keys(itemsBySection).map((section, index) => (
              <li key={section}>
                <a
                  className={activeNavItem === index ? 'active' : ''}
                  onClick={() => scrollToSection(section, index)}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='items-slider'>
          <h2>Popular</h2>
          <ItemsSlider items={items} />
        </div>
        {Object.entries(itemsBySection).map(([section, sectionItems]) => (
          <div key={section} id={section} ref={ref => sectionRefs.current[section] = ref}>
            <h2 className='mt-4'>{section}</h2><hr />
            <div className='items'>
              <ItemsList items={sectionItems} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreDetails;
