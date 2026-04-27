import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"

const Add = ({ url }) => {

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Roll"
  })

  // HANDLE INPUT
  const onChangeHandler = (event) => {
    const { name, value } = event.target

    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // SUBMIT HANDLER
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    // VALIDATION
    if (!data.name || !data.description || !data.price) {
      alert("Please fill all fields")
      return
    }

    if (!image) {
      alert("Please upload an image")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("price", Number(data.price))
      formData.append("category", data.category)
      formData.append("image", image)

      const response = await axios.post(
        `${url}/api/food/add`,
        formData
      )

      if (response?.data?.success) {
        alert("Food Added Successfully ✅")

        // RESET FORM
        setData({
          name: "",
          description: "",
          price: "",
          category: "Roll"
        })

        setImage(null)

      } else {
        alert(response?.data?.message || "Error adding food ❌")
      }

    } catch (error) {
      console.log("Add error:", error.message)
      alert("Server Error ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>

        {/* IMAGE UPLOAD */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>

          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : assets.upload_area
              }
              alt="upload"
            />
          </label>

          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* NAME */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name='name'
            placeholder='Type here'
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder='Write content here'
            required
          />
        </div>

        {/* CATEGORY + PRICE */}
        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Roll">Roll</option>
              <option value="Salad">Salad</option>
              <option value="Dessert">Dessert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="PureVeg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name='price'
              placeholder='20'
              required
            />
          </div>

        </div>

        {/* BUTTON */}
        <button
          type='submit'
          className='add-btn'
          disabled={loading}
        >
          {loading ? "Adding..." : "+ Add Item"}
        </button>

      </form>
    </div>
  )
}

export default Add