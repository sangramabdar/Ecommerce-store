"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderAddressSchema = new mongoose_1.default.Schema({
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
}, {
    timestamps: false,
    _id: false,
});
const orderSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const Order = mongoose_1.default.model("Order", orderSchema);
exports.Order = Order;
