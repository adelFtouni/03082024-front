import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import { BiHome, BiListUl, BiSearch, BiUser } from 'react-icons/bi';
import { IoIosBowtie } from 'react-icons/io';
import "./Navbar.scss";
import { CgShoppingCart } from 'react-icons/cg';

function Navbar() {
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    }

    return (
        <>
        <Link className='btn btn-primary btn-cart' to='/cart'><CgShoppingCart/></Link>
        <div className="nav-navbar">
            <Link to="/home" className={isActive('/') ? 'active' : ''}>
                <BiHome/>
                <span>Home</span>
            </Link>

            <Link to="/search" className={isActive('/search') ? 'active' : ''}>
                <BiSearch/>
                <span>Search</span>
            </Link>

            <Link to="/butler" className={isActive('/butler') ? 'active' : ''}>
                <IoIosBowtie/>
                <span>Butler</span>
            </Link>

            <Link to="/orders" className={isActive('/orders') ? 'active' : ''}>
                <BiListUl/>
                <span>Orders</span>
            </Link>

            <Link to="/account" className={isActive('/account') ? 'active' : ''}>
                <BiUser/>
                <span>Account</span>
            </Link>
        </div>
        </>
    );
}

export default Navbar;
