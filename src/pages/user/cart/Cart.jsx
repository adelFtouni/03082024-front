import React, { useEffect, useState } from 'react';
import { BiArrowBack, BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './cart.scss'
import MyCart from  '../../../components/user/myCart/MyCart'
const Cart = () => {






    
    const navigate = useNavigate();
    const [showCartButton, setShowCartButton] = useState(true);
const [items,setItems]= useState({});
    // Sample data for items in the cart
    const initialCartItems = [
        { id: 1, name: 'Item 1', price: 10, image: '/images/food1.png' },
        { id: 2, name: 'Item 2', price: 20, image: '/images/food2.png' },
        { id: 3, name: 'Item 3', price: 15, image: '/images/food3.png' },
    ];

    const [cartItems, setCartItems] = useState(initialCartItems);
    const [itemQuantities, setItemQuantities] = useState({});
    useEffect(() => {
        const defaultQuantities = {};
        initialCartItems.forEach(item => {
            defaultQuantities[item.id] = 1;
        });
        setItemQuantities(defaultQuantities);
    }, []);
    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
        setItemQuantities(prevQuantities => {
            const { [itemId]: deletedItem, ...remainingQuantities } = prevQuantities;
            return remainingQuantities;
        });
    };

    const increaseQuantity = (itemId) => {
        setItemQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: prevQuantities[itemId] + 1
        }));
    };

    const decreaseQuantity = (itemId) => {
        setItemQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: Math.max(prevQuantities[itemId] - 1, 1)
        }));
    };


    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('itemToCard')));

        
        document.querySelector('.btn-cart').classList.add('hidden');
        return () => {
            document.querySelector('.btn-cart').classList.remove('hidden');
        };
    }, []);
    const goBack = () => {
        navigate(-1);
    };
    const log=()=>{
        console.log(items)
    }
    return (
        <>
        <button onClick={log}>log</button>
            <div className="header">
                <button className='btn btn-transparent p-0' onClick={goBack}>
                    <BiArrowBack color='black' />
                </button>
                <h1>Cart</h1>
            </div>
            <div className="flex-1">
                    {cartItems.length === 0 ? (
                        <>
                        <div className="d-flex flex-column align-items-center justify-content-center gap-3 h-100">
                            <h1>Your cart is empty</h1>
                            <Link to="/stores" className='btn btn-outline'>Shop Now</Link>
                            </div>
                        </>
                    ) : (
                        <>
                <div className="d-flex flex-column h-100">
                            {cartItems.map(item => ( 
                                    <div className='item flex-row gap-2' key={item.id}>
                                        <div>
                                            <img className='mb-0' src={item.image} alt={item.name} style={{ width: '70px', height: '70px' }} />
                                        </div>
                                        <div>
                                            <h2>adle</h2>
                                            <p>${item.price}</p>
                                        </div>
                                        <div className="count ml-auto">
                                            <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                            <span className="mx-2">{itemQuantities[item.id]}</span>
                                            <button onClick={() => increaseQuantity(item.id)}>+</button>
                                        </div>
                                        <button className='btn btn-transparent' onClick={() => removeFromCart(item.id)}><BiTrash color='red' /></button>
                                    </div>
                            ))}
                            <div className='mt-auto'>
                                <div className='d-flex flex-column justify-content-end text-end my-3' style={{ borderTop: '1px dashed #b1afaf', paddingTop: '0.5rem' }}>
                                    <span className='text-black'><small className='mx-2'>Total Price LBP: </small><span className='bold'>2,000,000 </span></span>
                                    <span className='text-black'><small className='mx-2'>Total Price $: </small><span className='bold'>${calculateTotalPrice()}</span></span>
                                    <span className='text-black'><small className='mx-2'>Delivery Fees: </small><span className='bold'>3$</span></span>
                                </div>

                                <div className='d-flex gap-2'>
                                    <Link to="/stores" className='btn btn-secondary' style={{ flex: 1 }}>Continue Shopping</Link>
                                    <Link to="/checkout" className='btn btn-primary' style={{ flex: 1 }}>Check out</Link>
                                </div>
                            </div>
                </div>
                        </>
                    )}
                        <MyCart />
            </div>
            
        </>
    )
}

export default Cart