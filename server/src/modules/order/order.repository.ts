import Order from "../../models/Order";

async function placeOrderForSpecificUser(user, cartItems, orderAddress: any) {
  const orderItems = cartItems.map(cartItem => ({
    product: { ...cartItem.product._doc },
    quantity: cartItem.quantity,
  }));

  const totalPrice = orderItems.reduce((accumalator, orderItem) => {
    const price = orderItem.product.price;
    const quantity = orderItem.quantity;

    return price * quantity + accumalator;
  }, 0);

  const order = new Order({
    userId: user._id,
    orderItems,
    totalPrice,
    orderAddress,
  });

  await order.save();

  user.orders.push(order._id);
  await user.save();

  return order._id;
}

export { placeOrderForSpecificUser };
