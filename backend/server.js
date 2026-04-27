import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

// ================= DB =================
connectDB()

// ================= MIDDLEWARE (ORDER FIXED) =================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true
}))

app.use(express.json())

// ================= ROUTES =================
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)
// ================= STATIC =================
app.use("/images", express.static("uploads"))

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("API Working 🚀")
})

// ================= START SERVER =================
app.listen(port, () => {
  console.log(`Server Started On http://localhost:${port}`)
})