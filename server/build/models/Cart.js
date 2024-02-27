"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartProductSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    quantity: {
        type: mongoose_1.default.Schema.Types.Number,
        required: true,
    },
}, {
    _id: false,
});
const cartSchema = new mongoose_1.default.Schema({
    cartProducts: {
        type: [cartProductSchema],
        required: true,
        default: [],
    },
    userId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
    },
    couponId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Coupon",
    },
    isPaid: {
        type: mongoose_1.default.SchemaTypes.Boolean,
        default: false,
    },
}, { timestamps: true });
const Cart = mongoose_1.default.model("Cart", cartSchema);
exports.Cart = Cart;
