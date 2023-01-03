import User from "../../models/User";
import { NotFound } from "../../utils/exceptions";
import { placeOrderForSpecifitUser } from "./order.repository";
import Cart from "../../models/Cart";
import Order from "../../models/Order";

async function placeOrderService(req: any) {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user.cartId) return [null, new NotFound("cart")];

    const cart = await Cart.findById(user.cartId);

    if (cart.cartItems.length === 0) return [null, new NotFound("cart")];

    const orderId = await placeOrderForSpecifitUser(user, cart);

    return [{ orderId }, null];
  } catch (error) {
    return [null, error];
  }
}

async function getOrdersService(req: any) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const orders = await Order.find({
      _id: { $in: user.orders },
    });

    return [{ orders }, null];
  } catch (error) {
    return [null, error];
  }
}

export { placeOrderService, getOrdersService };
