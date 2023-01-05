import Order from "../../models/Order";

async function placeOrderForSpecificUser(user, cart, orderAddress: any) {
  const orderItems = cart.cartItems;

  const order = new Order({
    userId: user._id,
    orderItems,
    totalPrice: cart.totalPrice,
    orderAddress,
  });

  await order.save();
  user.orders.push(order._id);
  await user.save();

  cart.cartItems = [];
  await cart.save();

  return order._id;
}

export { placeOrderForSpecificUser };
