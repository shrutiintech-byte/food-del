import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // ✅ BETTER CART STRUCTURE
    cartData: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

// ✅ FIXED MODEL EXPORT
const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;