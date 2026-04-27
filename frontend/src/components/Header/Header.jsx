import React, { useState, useEffect } from 'react'
import './Header.css'

const images = [
 '/food2.png',
  '/foodie.png',
  '/foodburger.png',
 
]

const Header = () => {
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className='header'
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
          url(${images[bgIndex]})
        `
      }}
    >
      <div className="header-contents">
        <h2>Order your favourites</h2>
        <p>“Craving something delicious? Explore a menu packed with bold flavors, irresistible bites, and dishes made to satisfy every craving.”</p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header