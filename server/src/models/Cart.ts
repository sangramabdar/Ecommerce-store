import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const cartSchema = new mongoose.Schema(
  {
    cartItems: {
      type: [cartItemSchema],
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
