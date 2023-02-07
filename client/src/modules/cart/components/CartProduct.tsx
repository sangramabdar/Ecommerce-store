import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "../../../utils/toast";
import {
  removeItemFromCartService,
  addItemToCartService,
} from "../services/cart";

interface CartProductPropsType {
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
}

function CartProduct(product: CartProductPropsType) {
  const { image, title, price, quantity, totalPrice } = product;

  useEffect(() => {
    if (quantity > 0) return;
    dispatch<any>(removeItemFromCartService(product));
    showSuccessToast("Removed");
  }, [quantity]);

  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    showSuccessToast("Removed");
    dispatch<any>(removeItemFromCartService(product));
  };

  const handleIncrement = () => {
    dispatch<any>(addItemToCartService(product, "increment"));
  };

  const handleDecrement = () => {
    dispatch<any>(addItemToCartService(product, "decrement"));
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
          className="bg-violet-600 rounded-md w-7 font-bold text-white"
          onClick={handleIncrement}
        >
          +
        </button>
        <p className="text-center ">{quantity}</p>
        <button
          className="bg-violet-600 text-white font-bold rounded-md w-7"
          disabled={quantity === 0 ? true : false}
          onClick={handleDecrement}
        >
          -
        </button>
        <p className="text-center w-44">{title}</p>
        <p className="text-center">$ {totalPrice}</p>
      </section>

      <section className="flex w-full justify-end">
        <button
          className="text-center p-1 rounded bg-violet-600 text-white"
          onClick={() => {
            handleRemoveProduct();
          }}
        >
          remove
        </button>
      </section>
    </div>
  );
}

export default CartProduct;
