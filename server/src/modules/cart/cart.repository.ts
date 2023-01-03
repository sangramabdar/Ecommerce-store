import Cart from "../../models/Cart";
import { calculateTotalPrice } from "./cart.service";

async function addCartItemsToCartById(cardId, cartItems) {
  const cartDoc = await Cart.findById(cardId);
  const totalPrice = calculateTotalPrice(cartItems);

  cartDoc.cartItems = cartItems;
  cartDoc.totalPrice = totalPrice;

  await cartDoc.save();
}

async function getCartItemsCartById(cardId) {
  const cartDoc = await Cart.findById(cardId);

  return cartDoc.cartItems;
}

export { addCartItemsToCartById, getCartItemsCartById };
