import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";
import { CartSliceType, fetchCartItemsThunk } from "../cart.slice";
import { useEffect } from "react";
import { RootState } from "../../../store/store";
import { RequestStatus } from "../../../services/constants";
import Loading from "../../../components/Loading";

function Cart() {
  const { cartItems, totalPrice, status, isFetched } = useSelector<
    RootState,
    CartSliceType
  >(state => state.cart);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchCartItemsThunk(null));
  }, []);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (status === RequestStatus.LOADING) {
    return <Loading />;
  }

  if (status === RequestStatus.ERROR) return <div>Empty</div>;

  return (
    <div className="flex flex-col gap-5">
      {cartItems.map((item: any, index) => {
        return (
          <CartProduct
            key={index}
            cartProduct={{ ...item.product, quantity: item.quantity }}
          />
        );
      })}

      {cartItems.length ? (
        <div className="flex justify-end">Total Price : $ {totalPrice}</div>
      ) : null}
      {cartItems.length ? (
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
