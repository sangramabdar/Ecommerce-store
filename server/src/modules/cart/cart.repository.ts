import Cart from "../../models/Cart";
import { TCartSchema } from "./cart.schema";

async function addProductToCartById(cardId: string, cartItem: TCartSchema) {
  const cartDoc = await Cart.findById(cardId);

  const oldCartItem = cartDoc.cartItems.find(item => {
    return item.productId.toString() === cartItem.productId;
  });

  if (oldCartItem) {
    oldCartItem.quantity = cartItem.quantity;
  } else {
    cartDoc.cartItems.push(cartItem);
  }

  await cartDoc.save();
}

async function getCartItemsByCartId(cardId: string) {
  const cart = await (
    await Cart.findById(cardId)
  ).populate({
    path: "cartItems.productId",
  });

  if (!cart) return null;

  return cart.cartItems.map(cartItem => {
    return {
      product: cartItem.productId,
      quatity: cartItem.quantity,
    };
  });
}

export { getCartItemsByCartId, addProductToCartById };
