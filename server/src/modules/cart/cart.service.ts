import User from "../../models/User";
import { addProductToCartById, getCartItemsByCartId } from "./cart.repository";
import Cart from "../../models/Cart";
import { NotFound } from "../../utils/exceptions";

async function addCartItemsToCartService(req: any) {
  try {
    const _id = req.user._id;
    const cartItem = req.body;

    const user = await User.findById(_id);
    const cartId = user.cartId;

    ///created new cart
    if (!cartId) {
      const cart = new Cart({
        userId: user._id,
        cartItems: [cartItem],
      });

      await cart.save();
      user.cartId = cart._id;
      await user.save();
    } else {
      //update carts
      await addProductToCartById(cartId, cartItem);
    }
    const cartItems = await getCartItemsByCartId(cartId);

    return cartItems;
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

    if (!cartItems) throw new NotFound("cartItems");

    return cartItems;
  } catch (error) {
    return error;
  }
}

export { addCartItemsToCartService, getCartItemsService };
