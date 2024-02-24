"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartProductsByCartId = exports.addCartItemsToCartById = void 0;
const Cart_1 = __importDefault(require("../../models/Cart"));
const cart_service_1 = require("./cart.service");
async function addCartItemsToCartById(cardId, cartItems) {
  const cartDoc = await Cart_1.default.findById(cardId);
  const totalPrice = (0, cart_service_1.calculateTotalPrice)(cartItems);
  cartDoc.cartItems = cartItems;
  cartDoc.totalPrice = totalPrice;
  await cartDoc.save();
}
exports.addCartItemsToCartById = addCartItemsToCartById;
async function getCartProductsByCartId(cardId) {
  const cartDoc = await Cart_1.default.findById(cardId);
  return cartDoc.cartItems;
}
exports.getCartProductsByCartId = getCartProductsByCartId;
