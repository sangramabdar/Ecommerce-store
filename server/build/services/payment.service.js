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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentverfifyService = exports.paymentCreateService = void 0;
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const exceptions_1 = require("../utils/exceptions");
const razorpay_1 = __importDefault(require("razorpay"));
const environment_config_1 = __importDefault(require("../config/environment.config"));
const crypto_1 = __importDefault(require("crypto"));
let razorPayInstance = new razorpay_1.default({
    key_id: environment_config_1.default.RAZORPAY_KEY_ID,
    key_secret: environment_config_1.default.RAZORPAY_KEY_SECRET,
});
async function paymentCreateService(req) {
    const userId = req.user._id;
    const user = await models_1.User.findById(userId);
    const cartId = user.cartId;
    if (!cartId)
        throw new exceptions_1.BadRequest("bad request");
    const cartProducts = await (0, repositories_1.getCartProductsByCartId)(cartId.toString());
    const totalPrice = await (0, repositories_1.getCartTotalPrice)(cartProducts);
    const rzOrder = await razorPayInstance.orders.create({
        amount: totalPrice * 100,
        currency: "INR",
    });
    return rzOrder;
}
exports.paymentCreateService = paymentCreateService;
function verifyPaymentSignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature, }) {
    let hmac = crypto_1.default.createHmac("sha256", environment_config_1.default.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    let generatedSignature = hmac.digest("hex").toString();
    let isSignatureValid = generatedSignature === razorpay_signature;
    return isSignatureValid;
}
async function paymentverfifyService(req) {
    const _a = req.body, { razorpay_payment_id, razorpay_signature, razorpay_order_id, paymentMode } = _a, orderAddress = __rest(_a, ["razorpay_payment_id", "razorpay_signature", "razorpay_order_id", "paymentMode"]);
    const userId = req.user._id;
    const user = await models_1.User.findById(userId);
    const cartId = user.cartId;
    const cartItems = await (0, repositories_1.getCartProductsByCartId)(cartId.toString());
    const totalPrice = await (0, repositories_1.getCartTotalPrice)(cartItems);
    // const rzOrder = await razorPayInstance.orders.fetch(razorpay_order_id);
    let isSignatureValid = verifyPaymentSignature({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    });
    if (!isSignatureValid)
        throw new exceptions_1.BadRequest("bad request");
    //placing order
    const order = await (0, repositories_1.placeOrderForSpecificUser)(user, cartItems, orderAddress, paymentMode, totalPrice);
    order.paymentMode = paymentMode;
    order.paymentStatus = "paid";
    order.rzOrderId = razorpay_order_id;
    order.rzPaymentId = razorpay_payment_id;
    await order.save();
    await models_1.Cart.deleteOne(cartId);
    await models_1.User.updateOne({
        _id: userId,
    }, {
        $set: {
            cartId: null,
        },
    });
    return { orderId: order._id };
}
exports.paymentverfifyService = paymentverfifyService;
