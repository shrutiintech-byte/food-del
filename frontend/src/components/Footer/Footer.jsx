import React from 'react'
import './Footer.css'
import { assets as adminAssets } from '../../assets/admin_assets/assets'
import { assets as frontendAssets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

      <div className="footer-content">

        {/* LEFT */}
        <div className="footer-content-left">
          <img src={adminAssets.claude} alt="logo" />

          <p>
            We are dedicated to serving food that not only tastes amazing but also creates moments of joy. 
            Our menu is carefully crafted to offer a variety of flavors, ensuring there’s something for everyone.
             Whether you're craving something spicy, sweet, or savory, we promise a delightful experience in every bite.
          </p>

          <div className="footer-social-icon">
            <img src={frontendAssets.facebook_icon} alt="facebook" />
            <img src={frontendAssets.twitter_icon} alt="twitter" />
            <img src={frontendAssets.linkedin_icon} alt="linkedin" />
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 8309337991</li>
            <li>claude-kitchen@gmail.com</li>
          </ul>
        </div>

      </div>

      <hr />

      <p className="footer-copyright">
        Copyright 2026 claude-Kitchen.com - All Rights Reserved.
      </p>

    </div>
  )
}

export default Footer