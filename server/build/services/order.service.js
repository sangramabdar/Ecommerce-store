"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersService = exports.placeOrderService = void 0;
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const exceptions_1 = require("../utils/exceptions");
async function placeOrderService(req) {
    try {
        const _a = req.body, { paymentMode } = _a, orderAddress = __rest(_a, ["paymentMode"]);
        const userId = req.user._id;
        const user = await models_1.User.findById(userId);
        if (!user.cartId)
            throw new exceptions_1.NotFound("cart");
        const cartProducts = await (0, repositories_1.getCartProductsByCartId)(user.cartId.toString());
        if (!cartProducts)
            throw new exceptions_1.NotFound("cart");
        const totalPrice = await (0, repositories_1.getCartTotalPrice)(cartProducts);
        const order = await (0, repositories_1.placeOrderForSpecificUser)(user, cartProducts, orderAddress, paymentMode, totalPrice);
        //make cart empty
        await models_1.Cart.deleteOne(user.cartId);
        await models_1.User.updateOne({
            _id: userId,
        }, {
            $set: {
                cartId: null,
            },
        });
        return { orderId: order._id };
    }
    catch (error) {
        throw error;
    }
}
exports.placeOrderService = placeOrderService;
async function getOrdersService(req) {
    try {
        const userId = req.user._id;
        const user = await models_1.User.findById(userId);
        const orders = await models_1.Order.find({
            _id: { $in: user.orders },
        });
        if (!orders)
            throw new exceptions_1.NotFound("orders");
        return orders;
    }
    catch (error) {
        throw error;
    }
}
exports.getOrdersService = getOrdersService;
