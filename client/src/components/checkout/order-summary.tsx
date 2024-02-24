import { useQuery } from "@tanstack/react-query";
import { getCartItemsService } from "../../services/cart.service";
import OrderProduct from "./order-product";

function OrderSummary() {
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      return getCartItemsService();
    },

    retry: false,
  });

  return (
    <section className="mt-10">
      <h2 className="font-bold text-lg flex">Order Summary</h2>
      <div>
        {data.cartItems.map((item: any, index: number) => {
          return (
            <OrderProduct
              key={index}
              product={item.product}
              quantity={item.quantity}
            />
          );
        })}
      </div>

      <span className="mt-4">Total Price : ${data.totalPrice}</span>
    </section>
  );
}

export default OrderSummary;
