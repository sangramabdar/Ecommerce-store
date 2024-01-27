"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    cartItems: {
        type: [],
        required: true,
        default: [],
    },
    userId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        // required: true,
    },
    totalPrice: {
        type: Number,
    },
}, { timestamps: true });
const Cart = mongoose_1.default.model("carts", cartSchema);
exports.default = Cart;
