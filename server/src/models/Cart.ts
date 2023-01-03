import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    cartItems: {
      type: [],
      required: true,
      default: [],
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("carts", cartSchema);

export default Cart;
