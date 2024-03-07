"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductFromCartById = exports.getCartTotalPrice = exports.addProductToCartById = exports.getCartProductsByCartId = void 0;
const models_1 = require("../models");
async function addProductToCartById(cardId, cartProduct) {
    const cart = await models_1.Cart.findById(cardId);
    const oldCartProduct = cart.cartProducts.find(_cartProduct => {
        return _cartProduct.productId.toString() === cartProduct.productId;
    });
    if (oldCartProduct) {
        if (cartProduct.quantity === 0) {
            cart.cartProducts.pull({ productId: cartProduct.productId });
        }
        else {
            oldCartProduct.quantity = cartProduct.quantity;
        }
    }
    else {
        cart.cartProducts.push(cartProduct);
    }
    await cart.save();
}
exports.addProductToCartById = addProductToCartById;
async function deleteProductFromCartById(cardId, cartProduct) {
    const cart = await models_1.Cart.findById(cardId);
    const oldCartProduct = cart.cartProducts.find(_cartProduct => {
        return _cartProduct.productId.toString() === cartProduct.productId;
    });
    if (oldCartProduct) {
        cart.cartProducts.pull({ productId: cartProduct.productId });
    }
    await cart.save();
}
exports.deleteProductFromCartById = deleteProductFromCartById;
async function getCartProductsByCartId(cardId) {
    const cart = await (await models_1.Cart.findById(cardId)).populate({
        path: "cartProducts.productId",
    });
    if (!cart)
        return null;
    if (!cart.cartProducts.length)
        return null;
    return cart.cartProducts.map(cartProduct => {
        return {
            product: cartProduct.productId,
            quantity: cartProduct.quantity,
        };
    });
}
exports.getCartProductsByCartId = getCartProductsByCartId;
async function getCartTotalPrice(cartProducts) {
    return cartProducts.reduce((accumlator, cartProduct) => {
        return cartProduct.quantity * cartProduct.product.price + accumlator;
    }, 0);
}
exports.getCartTotalPrice = getCartTotalPrice;
