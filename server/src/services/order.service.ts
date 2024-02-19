import Razorpay from "razorpay";
import environmentConfig from "../config/environment.config";
import { User, Cart, Order } from "../models";
import {
  getCartProductsByCartId,
  getCartTotalPrice,
  placeOrderForSpecificUser,
} from "../repositories";
import { OrderSchema } from "../schemas";
import { NotFound } from "../utils/exceptions";

let razorPayInstance = new Razorpay({
  key_id: environmentConfig.RAZORPAY_KEY_ID,
  key_secret: environmentConfig.RAZORPAY_KEY_SECRET,
});

async function generateRazorPayOrder(totalPrice: number) {
  const order = await razorPayInstance.orders.create({
    amount: totalPrice,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  return order;
}

async function placeOrderService(req: any) {
  try {
    const { paymentMode, ...orderAddress } = req.body as OrderSchema;

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user.cartId) throw new NotFound("cart");

    const cartItems = await getCartProductsByCartId(user.cartId.toString());

    if (!cartItems) throw new NotFound("cart");

    const totalPrice = await getCartTotalPrice(cartItems);

    const order = await placeOrderForSpecificUser(
      user,
      cartItems,
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

    return orders;
  } catch (error) {
    throw error;
  }
}

export { placeOrderService, getOrdersService };
