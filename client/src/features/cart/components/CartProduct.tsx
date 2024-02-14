import { useDispatch } from "react-redux";
import React from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import cn from "../../../utils/cn";
import { addProductToCartThunk } from "../store/cartSlice";

interface CartProductProps {
  cartProduct: {
    quantity: number;
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    totalPrice: number;
    rating: {
      rate: number;
      count: number;
    };
  };
}

function CartProduct({
  cartProduct,
}: React.PropsWithChildren<CartProductProps>) {
  const { image, title, price, quantity } = cartProduct;

  const dispatch = useDispatch<any>();

  const handleRemoveProduct = async () => {
    try {
      await dispatch(addProductToCartThunk(cartProduct, 0));
      showSuccessToast("Removed");
    } catch (error) {
      showErrorToast("something went wrong");
    }
  };

  const handleIncrement = async () => {
    await dispatch(addProductToCartThunk(cartProduct, quantity + 1));
  };

  const handleDecrement = async () => {
    await dispatch(addProductToCartThunk(cartProduct, quantity - 1));
  };

  return (
    <div
      className="bg-white flex flex-col
    p-2 items-center rounded-md shadow-lg h-fit md:w-[70%] md:flex-row md:mx-auto
      "
    >
      <section className="flex justify-between items-center w-full  md:min-w-[400px]">
        <div className="w-10">
          <img className="h-fit object-cover" src={image} alt="" />
        </div>
        <button
          className="bg-accent rounded-md w-7 font-bold text-white"
          onClick={handleIncrement}
        >
          +
        </button>
        <p className="text-center ">{quantity}</p>
        <button
          className="bg-accent text-white font-bold rounded-md w-7"
          onClick={handleDecrement}
        >
          -
        </button>
        <p className="text-center w-44">{title}</p>
        <p className="text-center">$ {price * quantity}</p>
      </section>

      <section className="flex w-full justify-end">
        <button
          className={cn(
            "text-center p-1 rounded bg-accent text-white",
            quantity === 0 && "opacity-50"
          )}
          onClick={() => {
            handleRemoveProduct();
          }}
          disabled={quantity === 0 ? true : false}
        >
          remove
        </button>
      </section>
    </div>
  );
}

export default CartProduct;
