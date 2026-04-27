import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const PlaceOrder = () => {

  const { food_list, cartItems, url, token } = useContext(StoreContext)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!food_list || !cartItems) {
    return <div>Loading...</div>
  }

  const getTotal = () => {
    let total = 0
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id]
      }
    })
    return total
  }

  const subtotal = getTotal()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const finalTotal = subtotal + deliveryFee

  const placeOrder = async (e) => {
    e.preventDefault()

    let orderItems = []

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id]
        })
      }
    })

    if (orderItems.length === 0) {
      alert("Cart is empty")
      return
    }

    if (!token) {
      alert("Login required")
      return
    }

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        {
          items: orderItems,
          amount: finalTotal,
          address: formData
        },
        {
          headers: {
            token: token   // IMPORTANT: must match backend middleware
          }
        }
      )

      console.log("Order Response:", response.data)

      if (response.data?.success && response.data?.session_url) {
        window.location.href = response.data.session_url
      } else {
        alert(response.data?.message || "Payment session failed")
      }

    } catch (error) {
      console.log("Order Error:", error.response?.data || error.message)
      alert(error.response?.data?.message || "Server error or unauthorized")
    }
  }

  return (
    <form className="place-order" onSubmit={placeOrder}>

      {/* LEFT SIDE */}
      <div className="place-order-left">

        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First name" required />
          <input name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last name" required />
        </div>

        <input name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email" required />
        <input name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" required />

        <div className="multi-fields">
          <input name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" required />
          <input name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" required />
        </div>

        <div className="multi-fields">
          <input name="zip" value={formData.zip} onChange={onChangeHandler} placeholder="Zip Code" required />
          <input name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" required />
        </div>

        <input name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone" required />

      </div>

      {/* RIGHT SIDE */}
      <div className="place-order-right">

        <div className="cart-total">

          <h2>Cart Total</h2>

          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery: ₹{deliveryFee}</p>

          <hr />

          <b>Total: ₹{finalTotal}</b>

          <button type="submit">
            Proceed To Payment
          </button>

        </div>

      </div>

    </form>
  )
}

export default PlaceOrder