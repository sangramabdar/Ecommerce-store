"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
}, { timestamps: true });
const Order = mongoose_1.default.model("orders", orderSchema);
exports.default = Order;
