import { useDispatch, useSelector } from "react-redux";
import { getCartItemsService, removeItemFromCartService } from "../store/cart";
import { ProductType } from "../store/product";
import { useAuthentication, useMounAndUnMount } from "../utils/hooks";
import { useEffect, useState } from "react";
import { placeOrderService } from "../store/order";
import { showLoadingToast, showSuccessToast } from "../utils/toast";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

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
      <div className="w-10">
        <img className="h-fit w-12 object-cover" src={image} alt="" />
      </div>

      <p className="text-center ">{quantity}</p>
      <p className="text-center w-44">{title}</p>
      <p className="text-center">{price}</p>
      <button
        className="text-center p-1 rounded bg-violet-600 text-white"
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
  const user = useAuthentication();
  useMounAndUnMount("cart");
  const { cartItems, totalPrice } = useSelector<any, any>(state => state.cart);

  const dispatch = useDispatch<any>();
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
        <div className="flex justify-end">Total Price : {totalPrice}</div>
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
