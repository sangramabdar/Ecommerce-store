import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getCartItemsService } from "../features/cart/cart.service";

import { FaShoppingCart } from "react-icons/fa";
import { useAuthContext } from "./auth";
import AccountDropDown from "../features/account/components/account-drop-down";

function Header() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <header className="bg-secondary top-0 left-0 right-0 fixed border-b-2 z-10 ">
        <nav className="flex max-w-7xl mx-auto p-4 px-4 sm:px-8 justify-between items-center">
          <Link to="/" className="font-bold text-base md:text-xl">
            E-COMMERCE STORE
          </Link>

          <div className="flex justify-evenly gap-4 items-center font-bold">
            <Link
              className="bg-accent text-center p-1 px-2 rounded-md text-white"
              to="login"
            >
              Login
            </Link>
            <Link
              className="bg-accent text-center p-1 px-2 rounded-md text-white"
              to="signup"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-secondary top-0 left-0 right-0 fixed border-b-2  z-10">
      <nav className="flex max-w-7xl mx-auto px-4 sm:px-8 justify-between items-center p-4">
        <Link to="/" className="font-bold text-base md:text-xl">
          E-COMMERCE STORE
        </Link>

        <div className="flex justify-evenly gap-3 items-center">
          <CartIcon />
          <AccountDropDown />
        </div>
      </nav>
    </header>
  );
}

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

export default Header;
