import { en } from "@faker-js/faker";
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
    orderProducts: {
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
    orderStatus: {
      type: String,
      enum: ["DELIVERED", "PENDING", "COMPLETED", "CONFIRMED"],
      default: "PENDING",
    },
    paymentMode: {
      type: String,
      enum: ["CASH", "ONLINE"],
    },
    paymentStatus: {
      type: String,
      default: "unpaid",
      enum: ["paid", "unpaid"],
    },
    rzPaymentId: {
      type: String,
    },
    rzOrderId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export { Order };
