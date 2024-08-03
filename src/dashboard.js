import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/dashboard/login/index';
import Signup from './components/dashboard/signup/index';

import PhoneRole from './components/dashboard/phoneRole/index';
import AdminHome from './pages/dashboard/admin/index';
import AddItem from './pages/dashboard/addItem/index';
import Layout from './components/dashboard/layout/index';
import Items from './pages/dashboard/items/index';
import AddSection from './pages/dashboard/addSection/index';
import Sections from './pages/dashboard/sections/index';
import AddStore from './pages/dashboard/addStore/index';
import Stores from './pages/dashboard/stores/index'; 


function Dashboard() {
    return (
      <div className="App d-flex main-body">
       
        <Login/>
        <Routes>
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/signup" element={<Signup />} />
          <Route path="/phoneRole" element={<PhoneRole />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/addSection" element={<AddSection />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/addStore" element={<AddStore />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/items" element={<Items />} />
  
        
        </Routes>
      </div>
    );
  }
  
  export default Dashboard;
  