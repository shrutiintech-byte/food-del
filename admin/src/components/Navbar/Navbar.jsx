import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={assets.claude} alt="logo" className="logo" />
        <p>Admin Panel</p>
      </div>

      <div className="navbar-right">
        <img src={assets.shruti_image} alt="profile" className="profile" />
      </div>
    </div>
  );
};

export default Navbar;