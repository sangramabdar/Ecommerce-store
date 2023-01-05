"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    pincode: {
        type: Number,
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
}, { timestamps: true });
const Order = mongoose_1.default.model("orders", orderSchema);
exports.default = Order;
