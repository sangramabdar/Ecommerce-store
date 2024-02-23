import { useNavigate } from "react-router-dom";
import CartProduct from "./cart-product";
import Loading from "../../../components/loading";
import useCart from "../useCart";

function Cart() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useCart();

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
      {
        <div className="relative">
          {/* {data.isPaid && (
            <div className="absolute bg-secondary/80 inset-0 flex justify-center items-center">
              Payment is done and plz place your order first
            </div>
          )} */}
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
