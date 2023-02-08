import { useSelector } from "react-redux";
import OrderProduct from "./OrderProduct";

function OrderSummary(props: any) {
  const totalPrice = useSelector<any, any>(state => state.cart.totalPrice);
  const cartItems = useSelector<any, any>(state => state.cart.cartItems);
  return (
    <section>
      <h1 className="font-bold text-lg flex flex-col justify-center items-center">
        Order Summary
      </h1>
      {cartItems.map((item: any) => {
        return <OrderProduct key={item.id} {...item} />;
      })}
      <span className="mt-2 ml-2s">Total Price : ${totalPrice}</span>
    </section>
  );
}

export default OrderSummary;
