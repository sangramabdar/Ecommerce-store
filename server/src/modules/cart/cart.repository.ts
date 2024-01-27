import Cart from "../../models/Cart";
import { calculateTotalPrice } from "./cart.service";

async function addCartItemsToCartById(cardId, cartItems) {
  const cartDoc = await Cart.findById(cardId);
  const totalPrice = calculateTotalPrice(cartItems);

  cartDoc.cartItems = cartItems;
  cartDoc.totalPrice = totalPrice;

  await cartDoc.save();
}

async function getCartItemsByCartId(cardId) {
  const cart = await Cart.findById(cardId);

  if (!cart) return null;

  return cart.cartItems;
}

export { addCartItemsToCartById, getCartItemsByCartId };
