import User from "../../models/User";
import Order from "../../models/Order";
import Cart from "../../models/Cart";

async function placeOrderForSpecifitUserById(user, cart) {
  const orderItems = cart.cartItems;

  const order = new Order({
    userId: user._id,
    orderItems,
    totalPrice: cart.totalPrice,
  });
  await order.save();

  user.orders.push(order._id);
  await user.save();

  cart.cartItems = [];
  await cart.save();

  return order._id;
}

export { placeOrderForSpecifitUserById };
