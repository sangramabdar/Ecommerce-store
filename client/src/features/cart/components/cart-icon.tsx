import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../useCart";

function CartIcon() {
  const { data, isLoading, error } = useCart();

  if (error) {
    return (
      <Link to={"/cart"}>
        <div className="relative">
          <FaShoppingCart className="w-6 h-6" />
        </div>
      </Link>
    );
  }

  return (
    <Link to={"/cart"}>
      <div className="relative">
        <FaShoppingCart className="w-6 h-6" />
        <p className="absolute top-[-10px] flex justify-center items-center bg-secondary w-4 h-4 p-1 rounded-full right-[-10px]">
          {isLoading || data?.cartItems?.length}
        </p>
      </div>
    </Link>
  );
}

export default CartIcon;
