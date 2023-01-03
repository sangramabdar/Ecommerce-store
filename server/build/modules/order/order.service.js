"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersService = exports.placeOrderService = void 0;
const User_1 = __importDefault(require("../../models/User"));
const exceptions_1 = require("../../utils/exceptions");
const order_repository_1 = require("./order.repository");
const Cart_1 = __importDefault(require("../../models/Cart"));
const Order_1 = __importDefault(require("../../models/Order"));
async function placeOrderService(req) {
    try {
        const userId = req.user._id;
        const user = await User_1.default.findById(userId);
        if (!user.cartId)
            return [null, new exceptions_1.NotFound("cart")];
        const cart = await Cart_1.default.findById(user.cartId);
        if (cart.cartItems.length === 0)
            return [null, new exceptions_1.NotFound("cart")];
        const orderId = await (0, order_repository_1.placeOrderForSpecifitUserById)(user, cart);
        console.log(orderId);
        return [{ orderId }, null];
    }
    catch (error) {
        return [null, error];
    }
}
exports.placeOrderService = placeOrderService;
async function getOrdersService(req) {
    try {
        const userId = req.user._id;
        const user = await User_1.default.findById(userId);
        console.log(user.orders);
        const orders = await Order_1.default.find({
            _id: { $in: user.orders },
        });
        console.log(orders);
        return [{ orders }, null];
    }
    catch (error) {
        return [null, error];
    }
}
exports.getOrdersService = getOrdersService;
