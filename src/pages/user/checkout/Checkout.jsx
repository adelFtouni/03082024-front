import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './checkout.scss';
import axios from 'axios';
const Checkout = ({ cartItems, total }) => {
    const [store,setStore]=useState({})
    const [storeId,setStoreId] = useState('');
    const [addresss,setAdresss]= useState('')
    const navigate = useNavigate();
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckout = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        // Perform checkout logic here, such as sending the order to a server
        console.log('Checkout:', { shippingInfo, cartItems, total });
        // Reset the form after successful checkout
        setShippingInfo({
            fullName: '',
            address: '',
            city: '',
            postalCode: '',
            country: ''
        });
        // Redirect to the "Placed Order" page
        navigate('/placedorder');
    };

    const goBack = () => {
        navigate(-1);
    };
const setAdress=()=>{
    setAdresss(localStorage.getItem('address'));
    const storedItem = localStorage.getItem('itemToCard');
    if (storedItem) {
      // Convert the stored item from JSON string to JavaScript object
      const item = JSON.parse(storedItem);
      console.log(item)
      setStoreId(item.itemId)
      console.log(storeId); // Display the item in the console
  } else {
      console.log('No item found in localStorage with the key "itemToCard"');
  }
}

useEffect(() => {
    const setAdress = () => {
        setAdresss(localStorage.getItem('address'));
        const storedItem = localStorage.getItem('itemToCard');
        if (storedItem) {
            const parsedItem = JSON.parse(storedItem);
            console.log(parsedItem.storeId);
            // Set storeId synchronously
            setStoreId(parsedItem.storeId);
            console.log(storeId);
            console.log(parsedItem.storeId);
            // Use parsedItem.storeId instead of match.params.storeId
            axios.get(`http://localhost:5000/stores/getStoreById/${parsedItem.storeId}`)
                .then(response => {
                    console.log(`http://localhost:5000/stores/getStoreById/${parsedItem.storeId}`)
                    setStore(response.data);
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            console.log('No item found in localStorage with the key "itemToCard"');
        }
    };

    setAdress();
}, []);








    return (
        <>
            <div className="header">
                <button className='btn btn-transparent p-0' onClick={goBack}>
                    <BiArrowBack color='black' />
                </button>
                <h1>Checkout</h1>
            </div>
            <div className='flex-1'>
                <form className='d-flex flex-column h-100' onSubmit={handleCheckout}>
                    <div className='row'>
                    <h2>Address instructions</h2>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor="fullName">Full Name</label>
                                <input className='form-control' type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleInputChange} required disabled/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor="country">Country</label>
                                <input className='form-control' type="text" id="country" name="country" value={shippingInfo.country} onChange={handleInputChange} required disabled/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor="city">City</label>
                                <input className='form-control' type="text" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required disabled/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor="address">Address</label>
                                <input className='form-control' type="text" id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} required disabled/>
                            </div>
                        </div>
                        <div className='col-md-12'>
                        <div className='form-group'>
                            <label htmlFor="address">Address details</label>
                            <input className='form-control' type="text" id="address" name="address" value={shippingInfo.addressDetails} onChange={handleInputChange} required />
                        </div>
                    </div>
                        
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor="postalCode">Postal Code</label>
                                <input className='form-control' type="text" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange}  />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor="promoCode">Promo Code</label>
                                <input className='form-control' type="text" id="promoCode" name="promoCode" value={shippingInfo.postalCode} onChange={handleInputChange}  />
                            </div>
                        </div>
                        
                        <div className='col-md-6'>
                        <div className='form-group'>
                                <label htmlFor="promoCode">Delivery time</label>
                                <input className='form-control' type="text" id="deliveryTime" name="deliveryTime" value={shippingInfo.deliveryTime} onChange={handleInputChange}  />
                            </div>
                    </div>
                    </div>
                    <button className='btn btn-primary mt-auto w-100' type="submit">Place Order</button>
                </form>
                <div className='form-group'>
                            
                           <button className='btn btn-primary mt-5' onClick={setAdress}>deliver to my current position</button>
                           <p><b>Address : </b>{addresss}</p>
                        </div>
            </div></>
    );
};

export default Checkout;
