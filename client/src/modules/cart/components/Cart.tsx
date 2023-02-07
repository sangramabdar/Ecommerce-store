import { useSelector } from "react-redux";
import { useAuthentication } from "../../../utils/hooks";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";

function Cart() {
  const user = useAuthentication();
  const { cartItems, totalPrice } = useSelector<any, any>(state => state.cart);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5">
      {cartItems.map((item: any) => {
        return <CartProduct key={item.id} {...item} />;
      })}

      {cartItems.length ? (
        <div className="flex justify-end">Total Price : $ {totalPrice}</div>
      ) : null}
      {cartItems.length ? (
        <div className="flex justify-end">
          <button
            className="bg-violet-600 text-white rounded-md p-2"
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
