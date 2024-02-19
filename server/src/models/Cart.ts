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
      default: [],
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    couponId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Coupon",
    },
    isPaid: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export { Cart };
