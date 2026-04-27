// backend/controllers/cartController.js

import userModel from "../models/userModel.js"

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body
    const userId = req.userId   // coming from auth middleware

    const userData = await userModel.findById(userId)

    let cartData = userData.cartData || {}

    if (!cartData[itemId]) {
      cartData[itemId] = 1
    } else {
      cartData[itemId] += 1
    }

    await userModel.findByIdAndUpdate(userId, { cartData })

    res.json({
      success: true,
      message: "Item Added to Cart"
    })

  } catch (error) {
    console.log("AddToCart Error:", error)
    res.json({
      success: false,
      message: "Error in AddToCart"
    })
  }
}

// ================= REMOVE FROM CART =================
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body
    const userId = req.userId

    const userData = await userModel.findById(userId)

    let cartData = userData.cartData || {}

    if (cartData[itemId]) {
      cartData[itemId] -= 1

      if (cartData[itemId] <= 0) {
        delete cartData[itemId]
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData })

    res.json({
      success: true,
      message: "Item Removed"
    })

  } catch (error) {
    console.log("RemoveFromCart Error:", error)
    res.json({
      success: false,
      message: "Error in RemoveFromCart"
    })
  }
}

// ================= GET CART =================
const getCart = async (req, res) => {
  try {
    const userId = req.userId

    const userData = await userModel.findById(userId)

    res.json({
      success: true,
      cartData: userData.cartData || {}
    })

  } catch (error) {
    console.log("GetCart Error:", error)
    res.json({
      success: false,
      message: "Error fetching cart"
    })
  }
}

export { addToCart, removeFromCart, getCart }