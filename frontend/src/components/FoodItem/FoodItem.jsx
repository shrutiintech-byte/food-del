import React, { useContext } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  // ✅ SAFE IMAGE HANDLER (VERY IMPORTANT)
  const getImageUrl = (img) => {
    if (!img) return assets.food_placeholder

    // Cloudinary or full URL
    if (img.startsWith("http")) {
      return img
    }

    // Local backend image
    return `${url}/images/${img}`
  }

  return (
    <div className='food-item'>

      {/* IMAGE SECTION */}
      <div className="food-item-image-container">

        <img
          src={getImageUrl(image)}
          alt={name}
          className="food-item-image"
          onError={(e) => {
            e.target.src = assets.food_placeholder
          }}
        />

        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className='food-item-counter'>

            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove"
            />

            <p>{cartItems[id]}</p>

            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="add"
            />

          </div>
        )}

      </div>

      {/* INFO SECTION */}
      <div className="food-item-info">

        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        <p className="food-item-description">
          {description}
        </p>

        <p className="food-item-price">
          ₹{price}
        </p>

      </div>

    </div>
  )
}

export default FoodItem