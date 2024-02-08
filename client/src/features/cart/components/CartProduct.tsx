import { useDispatch } from "react-redux";
import React from "react";
import { addItemToCartService } from "../services/cart";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import cn from "../../../utils/cn";

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

  const dispatch = useDispatch();

  const handleRemoveProduct = async () => {
    try {
      await dispatch<any>(addItemToCartService(cartProduct, 0));
      console.log("toast");
      showSuccessToast("Removed");
    } catch (error) {
      showErrorToast("something went wrong");
    }
  };

  const handleIncrement = () => {
    dispatch<any>(addItemToCartService(cartProduct, quantity + 1));
  };

  const handleDecrement = () => {
    dispatch<any>(addItemToCartService(cartProduct, quantity - 1));
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
          className="bg-tertiary rounded-md w-7 font-bold text-white"
          onClick={handleIncrement}
        >
          +
        </button>
        <p className="text-center ">{quantity}</p>
        <button
          className="bg-tertiary text-white font-bold rounded-md w-7"
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
            "text-center p-1 rounded bg-tertiary text-white",
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
