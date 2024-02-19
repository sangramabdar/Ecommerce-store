import { Router } from "express";
import { validateToken } from "../utils/validation";
import Razorpay from "razorpay";
import environmentConfig from "../config/environment.config";
import crypto from "crypto";
import { Cart, User } from "../models";
import {
  getCartProductsByCartId,
  getCartTotalPrice,
  placeOrderForSpecificUser,
} from "../repositories";
import { CustomError } from "../utils/exceptions";
import { StatusCodes } from "http-status-codes";

let razorPayInstance = new Razorpay({
  key_id: environmentConfig.RAZORPAY_KEY_ID,
  key_secret: environmentConfig.RAZORPAY_KEY_SECRET,
});

const paymentRouter = Router();

paymentRouter.post("/create", validateToken, async (req: any, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    const cartId = user.cartId;

    if (!cartId)
      throw new CustomError("wrong information", StatusCodes.BAD_REQUEST);

    const cartItems = await getCartProductsByCartId(cartId.toString());

    const totalPrice = await getCartTotalPrice(cartItems);

    const rzOrder = await razorPayInstance.orders.create({
      amount: totalPrice * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });

    res.json({ ...rzOrder });
  } catch (error) {
    next(error);
  }
});

paymentRouter.post("/verify", validateToken, async (req: any, res, next) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_order_id,
      paymentMode,
      ...orderAddress
    } = req.body;

    const userId = req.user._id;

    const user = await User.findById(userId);
    const cartId = user.cartId;

    let hmac = crypto.createHmac(
      "sha256",
      environmentConfig.RAZORPAY_KEY_SECRET
    );

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

    let generatedSignature = hmac.digest("hex").toString();

    let isSignatureValid = generatedSignature === razorpay_signature;

    const cartItems = await getCartProductsByCartId(cartId.toString());
    const totalPrice = await getCartTotalPrice(cartItems);

    const order = await placeOrderForSpecificUser(
      user,
      cartItems,
      orderAddress,
      paymentMode,
      totalPrice
    );

    if (isSignatureValid) {
      order.paymentMode = paymentMode;
      order.paymentStatus = "paid";
      order.rzOrderId = razorpay_order_id;
      order.rzPaymentId = razorpay_payment_id;

      await order.save();

      await Cart.deleteOne(cartId);

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
    }

    res.json({ orderId: order._id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export { paymentRouter };
