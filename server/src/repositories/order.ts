import { Order } from "../models";

async function placeOrderForSpecificUser(
  user,
  cartProducts,
  orderAddress: any,
  paymentMode: string,
  totalPrice: number
) {
  const orderProducts = cartProducts.map(cartProduct => ({
    product: { ...cartProduct.product._doc },
    quantity: cartProduct.quantity,
  }));

  const order = new Order({
    userId: user._id,
    orderProducts,
    totalPrice,
    orderAddress,
    paymentMode,
  });

  order.orderStatus = "COMPLETED";

  await order.save();

  user.orders.push(order._id);
  await user.save();

  return order;
}

export { placeOrderForSpecificUser };
