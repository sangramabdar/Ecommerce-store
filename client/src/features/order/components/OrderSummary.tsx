import { useSelector } from "react-redux";
import OrderProduct from "./OrderProduct";

function OrderSummary() {
  const totalPrice = useSelector<any, any>(state => state.cart.totalPrice);
  const cartItems = useSelector<any, any>(state => state.cart.cartItems);

  return (
    <section>
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
      <span className="mt-2 ml-2s">Total Price : ${totalPrice}</span>
    </section>
  );
}

export default OrderSummary;
