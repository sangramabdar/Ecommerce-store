import mongoose from "mongoose";

const orderAddressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderItems: {
      type: [],
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    orderAddress: {
      type: orderAddressSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

export default Order;
