import React, { useState, useEffect } from 'react';
// import comming_soon from "../../assets/images/announcements.svg";
import axios from 'axios';
import Card from '../../../components/user/ItemCard/ItemCard'
const Notify = () => {
  const [isClicked, setIsClicked] = useState(false);
const [items,setItems] = useState([])
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/items/getItems');
        console.log(response.data);
        setItems(response.data); 
        console.log(response)// Assuming setItems is a state setter function
      } catch (error) {
        console.log(error.message);
      }
    };
    

    fetchItems();

    const wasClicked = localStorage.getItem('notifyButtonClicked');
    if (wasClicked) {
      setIsClicked(true);
    }
  }, []);

  const handleButtonClick = () => {
    setIsClicked(true);
    localStorage.setItem('notifyButtonClicked', 'true');
  };

  return (
    <div className="d-flex flex-column h-100 align-items-center justify-content-center">
      {/* <img width={"300px"} src={comming_soon} alt="" /> */}
      <h1 className='mt-3'>We'll be there soon!</h1>
      <p className='w-75 mx-auto text-center'>
        Sorry, we don’t deliver to this area yet, but we’re expanding quickly and
        could be there soon!
      </p>
      <button
        onClick={handleButtonClick}
        className={`btn btn-primary btn-lg mx-auto mt-4 ${isClicked ? 'clicked' : ''}`}
        disabled={isClicked}
      >
        {isClicked ? 'See you soon' : 'Notify me'}
      </button>
      <h1 className='mt-3'>Items List</h1>
      <div className="card-container">
        {items.map((item) => (
          
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Notify;
