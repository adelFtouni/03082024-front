import React from 'react';
import { Routes, Route } from 'react-router-dom';




//end user
import Signup from './components/dashboard/signup/index';
import Navbar from './components/user/navbar/Navbar';
import Home from './pages/user/home/home';
import Butler from './pages/user/butler/butler';
import Search from './pages/user/search/Search';
import Orders from './pages/user/orders/Orders';
import MyAccount from './pages/user/account/MyAccount';
import StoresUser from './pages/user/stores/Stores';
import StoreDetails from './pages/user/storeDetails/StoreDetails';
import ItemDetails from './pages/user/itemDetails/ItemDetails';
import Cart from './pages/user/cart/Cart';
import Checkout from './pages/user/checkout/Checkout';
import PlacedOrder from './pages/user/placedorder/PlacedOrder';
import SignupUser from './components/user/signup/index';
import LoginUser from './components/user/login/index';
import CartProvider from './context/cartContext';
import NavUser from './components/user/nav/index';
import Stores from '../src/pages/user/stores/Stores.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../src/assets/css/app.scss';


function LayoutUser({ children }) {
    return (
      <div className='body'>
        <div className="main-content">{children}</div>
        <Navbar />
      </div>
    );
  }


  
function User() {
    return (
      <div className="App d-flex main-body">
            
      <CartProvider>
      <LayoutUser>
        <Routes>
    
          <Route path="/" element={<Signup />} />
          <Route path="/" element={<signIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/butler" element={<Butler />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/store" element={<StoreDetails />} />
          <Route path="/item" element={<ItemDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/placedorder" element={<PlacedOrder />} />
        
        </Routes>
        </LayoutUser>
        </CartProvider>
      </div>
    );
  }
  
  export default User;