"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartItemsService = exports.calculateTotalPrice = exports.addCartItemsToCartService = void 0;
const User_1 = __importDefault(require("../../models/User"));
const cart_repository_1 = require("./cart.repository");
const Cart_1 = __importDefault(require("../../models/Cart"));
function calculateTotalPrice(cartItems) {
    let totalPrice = 0;
    for (let item of cartItems) {
        totalPrice += item.price;
    }
    return totalPrice;
}
exports.calculateTotalPrice = calculateTotalPrice;
async function addCartItemsToCartService(req) {
    try {
        const _id = req.user._id;
        const cartItems = req.body;
        const user = await User_1.default.findById(_id);
        const cartId = user.cartId;
        if (!cartId) {
            const totalPrice = calculateTotalPrice(cartItems);
            const cart = new Cart_1.default({
                userId: user._id,
                cartItems,
                totalPrice,
            });
            await cart.save();
            user.cartId = cart._id;
            await user.save();
            return ["success", null];
        }
        await (0, cart_repository_1.addCartItemsToCartById)(cartId, cartItems);
        return ["success", null];
    }
    catch (error) {
        return [null, error];
    }
}
exports.addCartItemsToCartService = addCartItemsToCartService;
async function getCartItemsService(req) {
    try {
        const _id = req.user._id;
        const user = await User_1.default.findById(_id);
        const cartId = user.cartId;
        if (!cartId)
            return [[], null];
        const cartItems = await (0, cart_repository_1.getCartItemsCartById)(cartId);
        return [cartItems, null];
    }
    catch (error) {
        return [null, error];
    }
}
exports.getCartItemsService = getCartItemsService;
