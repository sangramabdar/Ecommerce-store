import { useNavigate } from "react-router-dom";
import CartProduct from "./cart-product";
import useCart from "../../hooks/use-cart";
import Skeleton from "../ui/skeleton";
import RupeeIcon from "../icons/rupee-icon";

function Cart() {
  const navigate = useNavigate();

  const { data, isLoading, error, isFetched } = useCart();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (isLoading) {
    return <Skeleton className="h-52" />;
  }

  if (error)
    return <h2 className="text-4xl text-center font-bold">Cart is empty</h2>;

  return (
    <div className="flex flex-col gap-5">
      {
        <div className="relative">
          {data.cartItems.map((item: any, index: any) => {
            return (
              <CartProduct
                key={index}
                cartProduct={{ ...item.product, quantity: item.quantity }}
              />
            );
          })}
        </div>
      }

      {data.cartItems.length ? (
        <div className="flex justify-end gap-1">
          Total Price :
          <RupeeIcon />
          {data.totalPrice}
        </div>
      ) : null}
      {data.cartItems.length ? (
        <div className="flex justify-end">
          <button
            className="bg-accent text-white rounded-md p-2"
            onClick={handleCheckout}
          >
            Proceed to checkout
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
