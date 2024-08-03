import React, { useState } from 'react';

const Card = ({ item }) => {
    const [itemToCard,setItemToCard]= useState({});
    const addToCart = () => {
        const newItemToCard = {
          name: item.name,
          pPrice: item.sPrice,
          imageUrl: item.imageUrl,
          itemId:item._id,
          storeId:item.storeId
        };
        
        setItemToCard(newItemToCard);
        console.log(itemToCard)
        // Update localStorage with the new itemToCard
        localStorage.setItem('itemToCard', JSON.stringify(itemToCard));

      
      };
  return (
    <div className="card mt-3">
      <img style={{height:"150px",width:"200px"}} src={item.imageUrl} alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">Price: ${item.sPrice}</p>
        <button onClick={addToCart} className='btn btn-warning'>add to card</button>
      </div>
    </div>
  );
};

export default Card;
