"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Cart_1 = __importDefault(require("./Cart"));
const Order_1 = __importDefault(require("./Order"));
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/ecommerce";
async function initConnection() {
    await mongoose.connect(DB_URL);
    console.log("connected");
}
// async function saveUser(user) {
//   try {
//     const userDoc = new User(user);
//     console.groupEnd(userDoc);
//     await userDoc.save();
//     console.log("created");
//   } catch (error) {
//     console.log(error.message);
//   }
// }
async function addCartItemsToCartById(cartItems, cardId) {
    console.log("already");
    try {
        const cartDoc = await Cart_1.default.findById(cardId);
        cartDoc.cartItems = cartItems;
        await cartDoc.save();
        return "suceess";
    }
    catch (error) {
        console.log(error.message);
    }
}
async function addProdcutToCartService(product, userId) {
    try {
        const userDoc = await User_1.default.findById(userId);
        if (!userDoc.cartId) {
            const cartDoc = new Cart_1.default({
                cartItems: [product],
                createdById: userId,
            });
            await cartDoc.save();
            userDoc.cartId = cartDoc._id;
            await userDoc.save();
            return;
        }
        await addCartItemsToCartById(product, userDoc.cartId);
    }
    catch (error) { }
}
async function deleteCartById(cartId, userId) {
    const deletedResult = await Cart_1.default.deleteOne({ _id: cartId });
    if (deletedResult.deletedCount === 0)
        return;
    const userDoc = await User_1.default.findById(userId);
    userDoc.cartId = undefined;
    await userDoc.save();
    console.log("cart deleted");
}
async function placeOrderService(cartId, userId) {
    try {
        const userDoc = await User_1.default.findById(userId);
        const cartDoc = await Cart_1.default.findById(cartId);
        if (!cartDoc)
            return;
        const cartItems = cartDoc.cartItems;
        const orderDoc = new Order_1.default({
            createdById: userId,
            orderItems: cartItems,
        });
        await orderDoc.save();
        userDoc.orders.push(orderDoc._id);
        await userDoc.save();
        console.log("order placed");
    }
    catch (error) {
        console.log(error.message);
    }
}
async function getAllOrdersOfSpecificUserById(userId) {
    const userDoc = await User_1.default.findById(userId);
    const orders = userDoc.orders;
    await userDoc.save();
    console.log("all orders");
    return orders;
}
initConnection().then(async () => {
    addCartItemsToCartById([2, 1, 3, 4], "63ae68d0b052c981324bf2b3");
});
