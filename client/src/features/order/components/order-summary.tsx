import { useSelector } from "react-redux";
import OrderProduct from "./order-product";

function OrderSummary() {
  const totalPrice = useSelector<any, any>(state => state.cart.totalPrice);
  const cartItems = useSelector<any, any>(state => state.cart.cartItems);

  return (
    <section className="px-4">
      <h1 className="font-bold text-lg flex flex-col justify-center items-center">
        Order Summary
      </h1>
      {cartItems.map((item: any, index: number) => {
        return (
          <OrderProduct
            key={index}
            product={item.product}
            quantity={item.quantity}
          />
        );
      })}
      <span className="mt-4">Total Price : ${totalPrice}</span>
    </section>
  );
}

export default OrderSummary;
