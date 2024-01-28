import User from "../../models/User";
import { addProductToCartById, getCartItemsByCartId } from "./cart.repository";
import Cart from "../../models/Cart";
import { BadRequest, NotFound } from "../../utils/exceptions";
import { TCartSchema } from "./cart.schema";
import Product from "../../models/Product";

async function addCartItemsToCartService(req: any) {
  try {
    const _id = req.user._id;
    const cartItem = req.body as TCartSchema;

    const user = await User.findById(_id);
    const cartId = user.cartId.toString();

    //check if product is valid or not
    const product = await Product.findById(cartItem.productId);
    if (!product) throw new NotFound("prodduct");

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
      await addProductToCartById(cartId.toString(), cartItem);
    }
    const cartItems = await getCartItemsByCartId(cartId);

    return cartItems;
  } catch (error) {
    throw error;
  }
}

async function getCartItemsService(req: any) {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    const cartId = user.cartId.toString();

    if (!cartId) throw new NotFound("cart");

    const cartItems = await getCartItemsByCartId(cartId);

    if (!cartItems) throw new NotFound("cartItems");

    return cartItems;
  } catch (error) {
    throw error;
  }
}

export { addCartItemsToCartService, getCartItemsService };
