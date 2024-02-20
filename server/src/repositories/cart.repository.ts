import { Cart } from "../models";

async function addProductToCartById(cardId: string, cartProduct: any) {
  const cart = await Cart.findById(cardId);

  const oldCartProduct = cart.cartProducts.find(_cartProduct => {
    return _cartProduct.productId.toString() === cartProduct.productId;
  });

  if (oldCartProduct) {
    if (cartProduct.quantity === 0) {
      cart.cartProducts.pull({ productId: cartProduct.productId });
    } else {
      oldCartProduct.quantity = cartProduct.quantity;
    }
  } else {
    cart.cartProducts.push(cartProduct);
  }

  await cart.save();
}

async function deleteProductFromCartById(cardId: string, cartProduct: any) {
  const cart = await Cart.findById(cardId);

  const oldCartProduct = cart.cartProducts.find(_cartProduct => {
    return _cartProduct.productId.toString() === cartProduct.productId;
  });

  if (oldCartProduct) {
    cart.cartProducts.pull({ productId: cartProduct.productId });
  }

  await cart.save();
}

async function getCartProductsByCartId(cardId: string) {
  const cart = await (
    await Cart.findById(cardId)
  ).populate({
    path: "cartProducts.productId",
  });

  if (!cart) return null;

  if (!cart.cartProducts.length) return null;

  return cart.cartProducts.map(cartProduct => {
    return {
      product: cartProduct.productId,
      quantity: cartProduct.quantity,
    };
  });
}

async function getCartTotalPrice(cartProducts: any[]) {
  return cartProducts.reduce((accumlator, cartProduct) => {
    return cartProduct.quantity * cartProduct.product.price + accumlator;
  }, 0);
}

export {
  getCartProductsByCartId,
  addProductToCartById,
  getCartTotalPrice,
  deleteProductFromCartById,
};
