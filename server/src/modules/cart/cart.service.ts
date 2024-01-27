import User from "../../models/User";
import {
  addCartItemsToCartById,
  addProductToCartById,
  getCartItemsByCartId,
} from "./cart.repository";
import Cart from "../../models/Cart";
import { NotFound } from "../../utils/exceptions";
import Product from "../../models/Product";

function calculateTotalPrice(cartItems: any[]) {
  let totalPrice = 0;
  for (let item of cartItems) {
    totalPrice += item.price;
  }
  return totalPrice;
}

async function addCartItemsToCartService(req: any) {
  try {
    const _id = req.user._id;
    const cartItem = req.body;

    const user = await User.findById(_id);

    const cartId = user.cartId;

    if (!cartId) {
      const cart = new Cart({
        userId: user._id,
        cartItems: [cartItem],
      });

      await cart.save();
      user.cartId = cart._id;
      await user.save();

      return { cartId: cart._id };
    } else {
      await addProductToCartById(cartId, cartItem);
    }

    return { cartId };
  } catch (error) {
    throw error;
  }
}

async function getCartItemsService(req: any) {
  try {
    const _id = req.user._id;

    const user = await User.findById(_id);
    const cartId = user.cartId;

    if (!cartId) throw new NotFound("cart");

    const cartItems = await getCartItemsByCartId(cartId);

    if (!cartItems) throw new NotFound("cart");

    const products = [];

    for (let cartItem of cartItems) {
      const product = await Product.findById(cartItem.id);
      products.push(product);
    }

    return products;
  } catch (error) {
    return error;
  }
}

export { addCartItemsToCartService, calculateTotalPrice, getCartItemsService };
