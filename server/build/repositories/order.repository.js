"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrderForSpecificUser = void 0;
const models_1 = require("../models");
async function placeOrderForSpecificUser(user, cartProducts, orderAddress, paymentMode, totalPrice) {
    const orderProducts = cartProducts.map(cartProduct => ({
        product: Object.assign({}, cartProduct.product._doc),
        quantity: cartProduct.quantity,
    }));
    const order = new models_1.Order({
        userId: user._id,
        orderProducts,
        totalPrice,
        orderAddress,
        paymentMode,
    });
    order.orderStatus = "COMPLETED";
    await order.save();
    user.orders.push(order._id);
    await user.save();
    return order;
}
exports.placeOrderForSpecificUser = placeOrderForSpecificUser;
