import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../components/auth";
import { getCartItemsService } from "../cart.service";

function CartIcon() {
  const { user }: any = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      return getCartItemsService({
        Authorization: "Bearer " + user.accessToken,
      });
    },
    enabled: !!user?.accessToken,
    retry: false,
  });

  console.log(data?.cartItems.length);

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
