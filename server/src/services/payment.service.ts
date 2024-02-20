import { Cart, User } from "../models";
import {
  getCartProductsByCartId,
  getCartTotalPrice,
  placeOrderForSpecificUser,
} from "../repositories";
import { BadRequest } from "../utils/exceptions";
import Razorpay from "razorpay";
import environmentConfig from "../config/environment.config";
import crypto from "crypto";

let razorPayInstance = new Razorpay({
  key_id: environmentConfig.RAZORPAY_KEY_ID,
  key_secret: environmentConfig.RAZORPAY_KEY_SECRET,
});

async function paymentCreateService(req: any) {
  const userId = req.user._id;

  const user = await User.findById(userId);
  const cartId = user.cartId;

  if (!cartId) throw new BadRequest("bad request");

  const cartProducts = await getCartProductsByCartId(cartId.toString());
  const totalPrice = await getCartTotalPrice(cartProducts);

  const rzOrder = await razorPayInstance.orders.create({
    amount: totalPrice * 100,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  return rzOrder;
}

function verifyPaymentSignature({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: any) {
  let hmac = crypto.createHmac("sha256", environmentConfig.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

  let generatedSignature = hmac.digest("hex").toString();
  let isSignatureValid = generatedSignature === razorpay_signature;
  return isSignatureValid;
}

async function paymentverfifyService(req: any) {
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

  const cartItems = await getCartProductsByCartId(cartId.toString());
  const totalPrice = await getCartTotalPrice(cartItems);

  const rzOrder = await razorPayInstance.orders.fetch(razorpay_order_id);

  console.log(rzOrder);

  let isSignatureValid = verifyPaymentSignature({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (isSignatureValid) throw new BadRequest("bad request");

  //placing order
  const order = await placeOrderForSpecificUser(
    user,
    cartItems,
    orderAddress,
    paymentMode,
    totalPrice
  );

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

  return { orderId: order._id };
}

export { paymentCreateService, paymentverfifyService };
