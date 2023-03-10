"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrderForSpecificUser = void 0;
const Order_1 = __importDefault(require("../../models/Order"));
async function placeOrderForSpecificUser(user, cart, orderAddress) {
    const orderItems = cart.cartItems;
    const order = new Order_1.default({
        userId: user._id,
        orderItems,
        totalPrice: cart.totalPrice,
        orderAddress,
    });
    await order.save();
    user.orders.push(order._id);
    await user.save();
    cart.cartItems = [];
    await cart.save();
    return order._id;
}
exports.placeOrderForSpecificUser = placeOrderForSpecificUser;
