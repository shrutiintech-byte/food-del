import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>

      <h1>Explore Menu</h1>

      <p className='explore-menu-text'>
        Discover a wide range of delicious dishes crafted to satisfy every craving. We bring you flavors that turn every meal into a delightful experience
      </p>

      <div className="explore-menu-list">

        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)
              }
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default ExploreMenu