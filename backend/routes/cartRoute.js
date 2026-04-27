import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router()

// ➕ ADD
cartRouter.post("/add", authMiddleware, addToCart)

// ➖ REMOVE
cartRouter.post("/remove", authMiddleware, removeFromCart)

// 📦 GET CART
cartRouter.get("/get", authMiddleware, getCart)

export default cartRouter