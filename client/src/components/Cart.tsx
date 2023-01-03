import { useDispatch, useSelector } from "react-redux";
import { getCartItemsService, removeItemFromCartService } from "../store/cart";
import { ProductType } from "../store/product";
import { useAuthentication } from "../utils/hooks";
import { useEffect } from "react";
import { placeOrderService } from "../store/order";
import { showLoadingToast, showSuccessToast } from "../utils/toast";
import { Result } from "../api/constants";
import { toast } from "react-toastify";

interface CartProductPropsType extends ProductType {
  quantity: number;
}

function CartProduct(product: CartProductPropsType) {
  const { id, image, title, price, quantity } = product;

  const dispatch = useDispatch();

  const handleRemoveProduct = (id: number) => {
    showSuccessToast("Removed");
    dispatch<any>(removeItemFromCartService(product));
  };

  return (
    <div
      className="bg-white flex justify-between
     p-2 items-center rounded-md h-fit
      "
    >
      {/* <div className="w-10">
        <img className="h-fit w-12 object-cover" src={image} alt="" />
      </div> */}

      <p className="text-center ">{quantity}</p>
      <p className="text-center w-44">{title}</p>
      <p className="text-center">{price}</p>
      <button
        className="text-center p-1 rounded bg-violet-600 text-white "
        onClick={() => {
          handleRemoveProduct(id);
        }}
      >
        remove
      </button>
    </div>
  );
}

function Cart() {
  useAuthentication();

  const { cartItems, totalPrice } = useSelector<any, any>(state => state.cart);

  const { user } = useSelector<any, any>(state => state.auth);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (!user) return;

    if (cartItems.length == 0) return;

    console.log("dispatch");

    dispatch(getCartItemsService());
  }, []);

  const handlePlaceOrder = () => {
    showLoadingToast("Processing");
    dispatch(placeOrderService());
  };

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      {cartItems.map((item: any) => {
        return <CartProduct key={item.id} {...item} />;
      })}

      {cartItems.length ? (
        <div className="flex justify-end">Total Price : {totalPrice}</div>
      ) : null}
      {cartItems.length ? (
        <button className="bg-red-300" onClick={handlePlaceOrder}>
          place order
        </button>
      ) : null}
    </div>
  );
}

export default Cart;
