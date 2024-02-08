import { Cart } from "../models";

async function addProductToCartById(cardId: string, cartItem: any) {
  const cart = await Cart.findById(cardId);

  const oldCartItem = cart.cartItems.find(item => {
    return item.productId.toString() === cartItem.productId;
  });

  if (oldCartItem) {
    if (cartItem.quantity === 0) {
      cart.cartItems.pull({ productId: cartItem.productId });
    } else {
      oldCartItem.quantity = cartItem.quantity;
    }
  } else {
    cart.cartItems.push(cartItem);
  }

  await cart.save();
}

async function deleteProductFromCartById(cardId: string, cartItem: any) {
  const cart = await Cart.findById(cardId);

  const oldCartItem = cart.cartItems.find(item => {
    return item.productId.toString() === cartItem.productId;
  });

  if (oldCartItem) {
    cart.cartItems.pull({ productId: cartItem.productId });
  }

  await cart.save();
}

async function getCartProductsByCartId(cardId: string) {
  const cart = await (
    await Cart.findById(cardId)
  ).populate({
    path: "cartItems.productId",
  });

  if (!cart) return null;

  if (!cart.cartItems.length) return null;

  return cart.cartItems.map(cartItem => {
    return {
      product: cartItem.productId,
      quantity: cartItem.quantity,
    };
  });
}

async function getCartTotalPrice(cartItems: any[]) {
  return cartItems.reduce((c, cartItem) => {
    return cartItem.quantity * cartItem.product.price + c;
  }, 0);
}

export {
  getCartProductsByCartId,
  addProductToCartById,
  getCartTotalPrice,
  deleteProductFromCartById,
};
