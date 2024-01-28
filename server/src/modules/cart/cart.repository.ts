import Cart from "../../models/Cart";

async function addProductToCartById(cardId, cartItem) {
  const cartDoc = await Cart.findById(cardId);

  const oldCartItem = cartDoc.cartItems.find(item => {
    return item.product.toString() === cartItem.product;
  });

  if (oldCartItem) {
    oldCartItem.quantity = cartItem.quantity;
    await oldCartItem.save();
  } else {
    cartDoc.cartItems.push(cartItem);
  }

  await cartDoc.save();
}

async function getCartItemsByCartId(cardId) {
  const cart = await (
    await Cart.findById(cardId)
  ).populate({
    path: "cartItems.product",
  });

  if (!cart) return null;

  return cart.cartItems;
}

export { getCartItemsByCartId, addProductToCartById };
