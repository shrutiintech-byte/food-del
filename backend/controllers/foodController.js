import foodModel from "../models/foodModel.js"
import cloudinary from "../config/cloudinary.js"

// ================= ADD FOOD =================
const addFood = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      })
    }

    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-app"
    })

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      image: result.secure_url   // ✅ CLOUDINARY URL
    })

    await food.save()

    res.json({
      success: true,
      message: "Food added successfully"
    })

  } catch (error) {
    console.log("ERROR:", error)

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= LIST FOOD =================
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({})
    res.json({ success: true, data: foods })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

// ================= REMOVE FOOD =================
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id)

    if (!food) {
      return res.json({ success: false, message: "Food not found" })
    }

    await foodModel.findByIdAndDelete(req.body.id)

    res.json({ success: true, message: "Food removed" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { addFood, listFood, removeFood }