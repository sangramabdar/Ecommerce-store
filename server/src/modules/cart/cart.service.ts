import User from "../../models/User";
import {
  addCartItemsToCartById,
  getCartItemsCartById,
} from "./cart.repository";
import Cart from "../../models/Cart";

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
    const cartItems = req.body;

    const user = await User.findById(_id);

    const cartId = user.cartId;

    if (!cartId) {
      const totalPrice = calculateTotalPrice(cartItems);

      const cart = new Cart({
        userId: user._id,
        cartItems,
        totalPrice,
      });

      await cart.save();

      user.cartId = cart._id;

      await user.save();

      return ["success", null];
    }

    await addCartItemsToCartById(cartId, cartItems);

    return ["success", null];
  } catch (error) {
    return [null, error];
  }
}

async function getCartItemsService(req: any) {
  try {
    const _id = req.user._id;

    const user = await User.findById(_id);
    const cartId = user.cartId;

    if (!cartId) return [[], null];

    const cartItems = await getCartItemsCartById(cartId);

    return [cartItems, null];
  } catch (error) {
    return [null, error];
  }
}

export { addCartItemsToCartService, calculateTotalPrice, getCartItemsService };
