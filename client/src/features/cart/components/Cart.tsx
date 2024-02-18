import { useNavigate } from "react-router-dom";
import CartProduct from "./cart-product";
import Loading from "../../../components/loading";
import { useQuery } from "@tanstack/react-query";
import { getCartItemsService } from "../cart.service";
import { useAuthContext } from "../../../components/auth";

function Cart() {
  const navigate = useNavigate();

  const { user }: any = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      return getCartItemsService({
        Authorization: "Bearer " + user.accessToken,
      });
    },
    enabled: !!user?.accessToken,
    retry: false,
  });

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error)
    return <h2 className="text-4xl text-center font-bold">Cart is empty</h2>;

  return (
    <div className="flex flex-col gap-5">
      {data.cartItems.map((item: any, index: any) => {
        return (
          <CartProduct
            key={index}
            cartProduct={{ ...item.product, quantity: item.quantity }}
          />
        );
      })}

      {data.cartItems.length ? (
        <div className="flex justify-end">
          Total Price : $ {data.totalPrice}
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
