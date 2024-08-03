import React from 'react'
import Categories from '../../../components/user/categories/Categories'
// import ItemsList from '../../components/itemsList/ItemsList'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import StoresList from '../../../components/user/storesList/StoresList';

const Stores = () => {

  //food categories
  const categories = [
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

  const slider2Items = [
    { id: '1', image: '/images/food1.png', title: 'Item 2', description: 'Description 2', rating: 3, time: '1 hour', extraElements: ['15% off up to 100,000 LBP', 'Free delivery'] },
    { id: '2', image: '/images/food3.png', title: 'Item 2', description: 'Description 2', rating: 3, time: '1 hour', extraElements: ['15% off up to 2,000,000 LBP', 'Free delivery'] },
    { id: '3', image: '/images/food5.png', title: 'Item 2', description: 'Description 2', rating: 3, time: '1 hour', extraElements: ['Extra 1'] },
  ];
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="header">
        <button className='btn btn-transparent p-0' onClick={goBack}>
          <BiArrowBack color='black' />
        </button>
        <h1>Stores</h1>
      </div>
      <div className="flex-1">
        <div className='catg-list-x d-flex overflow-auto border-0 mb-3'>
          <Categories items={categories} />
        </div>
        <div className='items-list'>
          <StoresList items={slider2Items} />
        </div>
      </div>
    </>
  )
}

export default Stores