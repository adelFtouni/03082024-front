import React, { useEffect, useState } from 'react';

const Cart = () => {
const [items,setItems]=useState([])
    useEffect(
        ()=>{
            setItems(JSON.parse(localStorage.getItem('itemToCard')))

        }
        ,[])
console.log(items)
  return (
    <div className="cart">
      <h2>Cart</h2>
      {items && (
        <div className="cart-item">
          <img style={{width:"150px",height:"150px"}} src={items.imageUrl} alt={items.name} />
          <div className="item-details">
            <h3>{items.name}</h3>
            <p>Price: ${items.sPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
