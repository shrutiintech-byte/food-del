import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"

const List = ({ url }) => {

  const [list, setList] = useState([])

  // FETCH LIST
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)

      if (response?.data?.success) {
        setList(response.data.data)
      } else {
        console.log(response?.data?.message || "Failed to fetch list")
      }
    } catch (error) {
      console.log("Fetch error:", error.message)
    }
  }

  // DELETE FOOD
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId
      })

      if (response?.data?.success) {
        await fetchList() // refresh after delete
      } else {
        console.log(response?.data?.message || "Delete failed")
      }
    } catch (error) {
      console.log("Delete error:", error.message)
    }
  }

  useEffect(() => {
    if (url) {
      fetchList()
    }
  }, [url])

  return (
    <div className='list'>
      <p className='list-title'>All Food List</p>

      <div className="list-table">

        {/* HEADER */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* DATA */}
        {list.length === 0 ? (
          <p className="empty-msg">No food items found</p>
        ) : (
          list.map((item) => (
            <div key={item._id} className='list-table-format'>

              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "/default-food.png"
                }}
              />

              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>

              <p
                onClick={() => removeFood(item._id)}
                className='delete-btn'
              >
                Delete
              </p>

            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default List