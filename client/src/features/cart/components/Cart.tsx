import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";
import { CartSliceType } from "../store/cartSlice";
import { useEffect } from "react";
import { fetchCartItemsService } from "../services/cart";
import { RootState } from "../../../store/store";

function Cart() {
  const { cartItems, totalPrice } = useSelector<RootState, CartSliceType>(
    state => state.cart
  );

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchCartItemsService(null));
  }, []);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

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
