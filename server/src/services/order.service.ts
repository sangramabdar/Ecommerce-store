import { User, Cart, Order } from "../models";
import {
  getCartProductsByCartId,
  getCartTotalPrice,
  placeOrderForSpecificUser,
} from "../repositories";
import { OrderSchema } from "../schemas";
import { NotFound } from "../utils/exceptions";

async function placeOrderService(req: any) {
  try {
    const { paymentMode, ...orderAddress } = req.body as OrderSchema;

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user.cartId) throw new NotFound("cart");

    const cartProducts = await getCartProductsByCartId(user.cartId.toString());

    if (!cartProducts) throw new NotFound("cart");

    const totalPrice = await getCartTotalPrice(cartProducts);

    const order = await placeOrderForSpecificUser(
      user,
      cartProducts,
      orderAddress,
      paymentMode,
      totalPrice
    );

    //make cart empty
    await Cart.deleteOne(user.cartId);
    await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          cartId: null,
        },
      }
    );

    return { orderId: order._id };
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

    if (!orders) throw new NotFound("orders");

    return orders;
  } catch (error) {
    throw error;
  }
}

export { placeOrderService, getOrdersService };
