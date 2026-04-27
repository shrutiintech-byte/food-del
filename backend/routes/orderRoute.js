import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder, userOrders } from "../controllers/orderController.js"

const orderRouter = express.Router()

// Place order (must be logged in)
orderRouter.post("/place", authMiddleware, placeOrder)

// Verify payment (should also be protected)
orderRouter.post("/verify", authMiddleware, verifyOrder)

// Get user orders
orderRouter.post("/userorders", authMiddleware, userOrders)

export default orderRouter