import { User, Cart, Order } from "../models";
import {
  getCartProductsByCartId,
  placeOrderForSpecificUser,
} from "../repositories";
import { OrderSchema } from "../schemas";
import { NotFound } from "../utils/exceptions";

async function placeOrderService(req: any) {
  try {
    const userId = req.user._id;
    const orderAddress = req.body as OrderSchema;

    const user = await User.findById(userId);

    if (!user.cartId) throw new NotFound("cart");

    const cartItems = await getCartProductsByCartId(user.cartId.toString());

    if (!cartItems) throw new NotFound("cart");

    const orderId = await placeOrderForSpecificUser(
      user,
      cartItems,
      orderAddress
    );

    //make cart empty
    const cart = await Cart.findById(user.cartId);
    cart.cartItems.pull(-1);
    await cart.save();

    return { orderId };
  } catch (error) {
    throw error;
  }
}

async function getOrdersService(req: any) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const orders = await Order.find({
      _id: { $in: user.orders },
    });

    return orders;
  } catch (error) {
    throw error;
  }
}

export { placeOrderService, getOrdersService };
