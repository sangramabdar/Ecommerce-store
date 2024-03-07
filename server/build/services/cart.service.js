"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductFromCartService = exports.getCartItemsService = exports.addCartItemsToCartService = void 0;
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const exceptions_1 = require("../utils/exceptions");
async function addCartItemsToCartService(req) {
    try {
        const _id = req.user._id;
        const cartItem = req.body;
        const user = await models_1.User.findById(_id);
        const cartId = user.cartId;
        //check if product is valid or not
        const product = await models_1.Product.findById(cartItem.productId);
        if (!product)
            throw new exceptions_1.NotFound("prodduct");
        ///create new cart
        if (!cartId) {
            const cart = new models_1.Cart({
                userId: user._id,
                cartItems: [cartItem],
            });
            await cart.save();
            user.cartId = cart._id;
            await user.save();
        }
        else {
            //update carts
            await (0, repositories_1.addProductToCartById)(cartId.toString(), cartItem);
        }
    }
    catch (error) {
        throw error;
    }
}
exports.addCartItemsToCartService = addCartItemsToCartService;
async function deleteProductFromCartService(req) {
    try {
        const _id = req.user._id;
        const cartItem = req.body;
        const user = await models_1.User.findById(_id);
        const cartId = user.cartId;
        //check if product is valid or not
        const product = await models_1.Product.findById(cartItem.productId);
        if (!product)
            throw new exceptions_1.NotFound("prodduct");
        if (!cartId)
            throw new exceptions_1.NotFound("cart");
        await (0, repositories_1.deleteProductFromCartById)(cartId.toString(), cartItem);
    }
    catch (error) {
        throw error;
    }
}
exports.deleteProductFromCartService = deleteProductFromCartService;
async function getCartItemsService(req) {
    try {
        const userId = req.user._id;
        const user = await models_1.User.findById(userId);
        const cartId = user.cartId;
        const cart = await models_1.Cart.findById(cartId);
        if (!cart)
            throw new exceptions_1.NotFound("cart");
        const cartItems = await (0, repositories_1.getCartProductsByCartId)(cartId.toString());
        if (!cartItems)
            throw new exceptions_1.NotFound("cartItems");
        let totalPrice = await (0, repositories_1.getCartTotalPrice)(cartItems);
        return { cartItems, totalPrice, isPaid: cart.isPaid };
    }
    catch (error) {
        throw error;
    }
}
exports.getCartItemsService = getCartItemsService;
