import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";
import useAuthentication from "../../../hooks/useAuthentication";
import { RootState } from "../../../store/store";
import { CartSliceType } from "../store/cartSlice";

function Cart() {
  const { cartItems, totalPrice } = useSelector<RootState, CartSliceType>(
    state => state.cart
  );
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // if (!user) {
  //   return <Loading />;
  // }

  return (
    <div className="flex flex-col gap-5">
      {cartItems.map((item: any) => {
        return <CartProduct key={item.id} cartProduct={item} />;
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
