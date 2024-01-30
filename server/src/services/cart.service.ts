import { User, Product, Cart } from "../models";
import { addProductToCartById, getCartProductsByCartId } from "../repositories";
import { CartSchema } from "../schemas";
import { NotFound } from "../utils/exceptions";

async function addCartItemsToCartService(req: any) {
  try {
    const _id = req.user._id;
    const cartItem = req.body as CartSchema;

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
    const cartItems = await getCartProductsByCartId(cartId);

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

    const cartItems = await getCartProductsByCartId(cartId);

    if (!cartItems) throw new NotFound("cartItems");

    return cartItems;
  } catch (error) {
    throw error;
  }
}

export { addCartItemsToCartService, getCartItemsService };
