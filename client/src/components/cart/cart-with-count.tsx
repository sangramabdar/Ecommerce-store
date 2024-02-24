import { Link } from "react-router-dom";
import useCart from "../../hooks/use-cart";
import CartIcon from "../icons/cart-icon";

function CartWithCount() {
  const { data, isLoading, error } = useCart();

  if (error) {
    return (
      <Link to={"/cart"}>
        <CartIcon className="w-6 h-6" />
      </Link>
    );
  }

  return (
    <Link to={"/cart"}>
      <div className="relative">
        <CartIcon className="w-6 h-6" />
        {data && (
          <p className="absolute left-4 top-[-4px] flex justify-center items-center bg-secondary w-4 h-4 p-1 rounded-full right-[-10px]">
            {isLoading || data?.cartItems?.length}
          </p>
        )}
      </div>
    </Link>
  );
}

export default CartWithCount;
