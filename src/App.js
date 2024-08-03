
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import User from '../src/pages/user/home/home';
import Dashboard from './dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/app.scss';
import PhoneRole from './global/phoneRole';
import AdminHome from './pages/dashboard/admin/index';
import Stores from './pages/dashboard/stores/index';
import Login from './components/dashboard/login/index';
import Signup from './components/dashboard/signup/index';
import Sections from './pages/dashboard/sections';
import Layout from './components/dashboard/layout/index';
import AddSection from './pages/dashboard/addSection';
import AddStore from './pages/dashboard/addStore';
import AddItem from './pages/dashboard/addItem';
import Items from './pages/dashboard/items';
import AdminLogin from './pages/dashboard/adminLogin';
              
function App() {
  // Check user role from localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  const userRole = userInfo ? userInfo.result.role : null;
  const isAdmin = userRole === 'superAdmin';

  return (
    <div className="App d-flex main-body">
      <Layout isAdmin={isAdmin} />
      <Routes>

  
      <Route path="/user" element={<User />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminHome" element={<AdminHome />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addStore" element={<AddStore />}/>
      <Route path="/additem" element={<AddItem />}/>
      <Route path="/items" element={<Items />}/>
     <Route path="/phoneRole" element={<PhoneRole/>}/>
  

        <Route path='/' element={<h1>super admin home </h1>} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/user" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/stores" element={<Stores />} />
        <Route path='/addsection' element={<AddSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addStore" element={<AddStore />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/items" element={<Items />} />
        <Route path="/phoneRole" element={<PhoneRole />} />
        <Route path="/driver" element={<h1>Driver home </h1>} />
        <Route path="/biker" element={<h1>Biker home </h1>} />
        <Route path="/merchant" element={<h1>merchant home </h1>} />
        <Route path='/userHome' element={<User />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        </Routes>
</div>
  );
}

export default App;

