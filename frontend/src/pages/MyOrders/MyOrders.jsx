import React, { useState, useEffect, useContext } from 'react'
import './MyOrder.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/frontend_assets/assets'

const MyOrders = () => {

  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        {
          headers: {
            token: token
          }
        }
      )

      setData(response.data.data || [])
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  if (loading) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <p>Loading orders...</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <p>No orders found 😢</p>
      </div>
    )
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>

      <div className="container">

        {data.map((order, index) => (
          <div className="my-orders-order" key={index}>

            <img src={assets.parcel_icon} alt="" />

            <p>
              {order.items?.map((item, i) => {
                let text = item.name + " x " + item.quantity
                return i === order.items.length - 1 ? text : text + ", "
              })}
            </p>

            <p>₹{order.amount}</p>

            <p>Items: {order.items?.length || 0}</p>

          </div>
        ))}

      </div>
    </div>
  )
}

export default MyOrders