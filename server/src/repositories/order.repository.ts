import { Order } from "../models";

async function placeOrderForSpecificUser(
  user,
  cartProducts,
  orderAddress: any
) {
  const orderProducts = cartProducts.map(cartItem => ({
    product: { ...cartItem.product._doc },
    quantity: cartItem.quantity,
  }));

  const totalPrice = orderProducts.reduce((accumalator, orderItem) => {
    const price = orderItem.product.price;
    const quantity = orderItem.quantity;

    return price * quantity + accumalator;
  }, 0);

  const order = new Order({
    userId: user._id,
    orderProducts,
    totalPrice,
    orderAddress,
  });

  await order.save();

  user.orders.push(order._id);
  await user.save();

  return order._id;
}

export { placeOrderForSpecificUser };
