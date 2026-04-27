import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets'
import { assets as frontendAssets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

  // LOGOUT FUNCTION
  const logout = () => {
    setToken("")
    localStorage.removeItem("token")
  }

  return (
    <div className='navbar'>

      {/* LOGO */}
      <Link to='/'>
        <img src={assets.claude} alt="logo" className='logo' />
      </Link>

      {/* DESKTOP MENU */}
      <div className="navbar-menu">
        <ul>

          <li>
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={menu === "home" ? "active" : ""}
            >
              Home
            </Link>
          </li>

          <li>
            <a
              href="#explore-menu"
              onClick={() => setMenu("menu")}
              className={menu === "menu" ? "active" : ""}
            >
              Menu
            </a>
          </li>

          <li>
            <a
              href="#app-download"
              onClick={() => setMenu("mobile-app")}
              className={menu === "mobile-app" ? "active" : ""}
            >
              Mobile App
            </a>
          </li>

          <li>
            <a
              href="#footer"
              onClick={() => setMenu("contact-us")}
              className={menu === "contact-us" ? "active" : ""}
            >
              Contact Us
            </a>
          </li>

        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-right">

        {/* SEARCH */}
        <img src={frontendAssets.search_icon} alt="search" />

        {/* CART */}
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={frontendAssets.basket_icon} alt="cart" />
          </Link>

          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {/* AUTH */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className='navbar-profile'>

            {/* PROFILE ICON */}
            <img 
              src={frontendAssets.profile_icon} 
              alt="profile" 
            />

            {/* DROPDOWN */}
            <ul className="nav-profile-dropdown">

              {/* ORDERS */}
              <li>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" 
                  alt="orders" 
                />
                <p>Orders</p>
              </li>

              <hr />

              {/* LOGOUT */}
              <li onClick={logout}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png" 
                  alt="logout" 
                />
                <p>Logout</p>
              </li>

            </ul>
          </div>
        )}

        {/* HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </div>

      </div>

      {/* MOBILE MENU */}
      <ul className={`mobile-menu ${mobileOpen ? "active" : ""}`}>

        <li onClick={() => { setMenu("home"); setMobileOpen(false) }}>
          <Link to="/">Home</Link>
        </li>

        <li onClick={() => setMobileOpen(false)}>
          <a href="#explore-menu">Menu</a>
        </li>

        <li onClick={() => setMobileOpen(false)}>
          <a href="#app-download">Mobile App</a>
        </li>

        <li onClick={() => setMobileOpen(false)}>
          <a href="#footer">Contact Us</a>
        </li>

      </ul>

    </div>
  )
}

export default Navbar