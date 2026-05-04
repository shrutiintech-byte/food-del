import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// ================= DB =================
connectDB();

// ================= CORS CONFIG =================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://food-dyn9twz2o-shrutiintech-bytes-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman / mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ================= STATIC =================
app.use("/images", express.static("uploads"));

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// ================= START SERVER =================
app.listen(port, () => {
  console.log(`Server Started On http://localhost:${port}`);
});