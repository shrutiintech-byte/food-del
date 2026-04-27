import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart, url } = useContext(StoreContext)
  const navigate = useNavigate()

  const getTotal = () => {
    let total = 0

    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        total += item.price * cartItems[item._id]
      }
    })

    return total
  }

  const total = getTotal()
  const deliveryFee = total === 0 ? 0 : 2
  const finalTotal = total === 0 ? 0 : total + deliveryFee

  return (
    <div className='cart'>

      <div className="cart-bottom">

        {/* LEFT SIDE */}
        <div className="cart-left">

          <div className="cart-items">

            <div className="cart-items-title">
              <p>Item</p>
              <p>Title</p>
              <p>Price</p>
              <p>Qty</p>
              <p>Total</p>
              <p>Remove</p>
            </div>

            <hr />

            {food_list.map((item) => {
              if (cartItems[item._id]) {
                return (
                  <div key={item._id} className="cart-items-items">

                    <img src={url + "/images/" + item.image} alt={item.name} />

                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{item.price * cartItems[item._id]}</p>

                    <p
                      className="remove"
                      onClick={() => removeFromCart(item._id)}
                    >
                      ✕
                    </p>

                  </div>
                )
              }
              return null
            })}

          </div>

          {/* TOTAL */}
          <div className="cart-total">

            <h2>Cart Total</h2>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{total}</p>
            </div>

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{finalTotal}</b>
            </div>

            <button onClick={() => navigate('/placeorder')}>
              Proceed To Checkout
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="cart-right">

          <div className="cart-promocode">
            <p>Have a promo code?</p>

            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter code" />
              <button>Apply</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Cart