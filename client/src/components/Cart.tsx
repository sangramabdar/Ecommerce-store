import { useDispatch, useSelector } from "react-redux";
import { addItemToCartService, removeItemFromCartService } from "../store/cart";
import { useAuthentication } from "../utils/hooks";
import { useEffect } from "react";
import { showSuccessToast } from "../utils/toast";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

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
      className="bg-white flex justify-between
     p-2 items-center rounded-md shadow-lg h-fit lg:w-[70%] lg:mx-auto
      "
    >
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
      <button
        className="text-center p-1 rounded bg-violet-600 text-white"
        onClick={() => {
          handleRemoveProduct();
        }}
      >
        remove
      </button>
    </div>
  );
}

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
