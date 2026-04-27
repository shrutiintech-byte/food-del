import mongoose from "mongoose";

// Just add 'export' here and remove the 'export default' at the bottom
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://chefclaude:Shruti236@cluster0.wacaeqn.mongodb.net/food-deloit");
    console.log("DB connected");
  } catch (error) {
    console.log("Connection error:", error);
  }
};