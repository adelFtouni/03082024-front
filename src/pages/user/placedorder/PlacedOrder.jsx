import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import MyCart from  '../../../components/user/myCart/MyCart'
const PlacedOrder = () => {
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);

    const placeOrder = () => {
        setOrderPlaced(true);
    };
    const goBack = () => {
        navigate(-1);
      };
    return (
        <>

            <div className="header">
                <button className='btn btn-transparent p-0' onClick={goBack}>
                    <BiArrowBack color='black' />
                </button>
                <h1>Placed Order</h1>
            </div>
            {orderPlaced ? (
                <div>
                    <p>Your order has been placed successfully!</p>
                    {/*} <p>Total Amount: ${total}</p>*/}
                    <p>Thank you for shopping with us!</p>
                </div>
            ) : (
                <div>
                    <p>Review your order:</p>
                    <MyCart />
                    {/* <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
            <p>Total Amount: ${total}</p>*/}
                    <button onClick={placeOrder}>Place Order</button>
                </div>
            )}
        </>
    );
};

export default PlacedOrder