import { Link, useNavigate } from "react-router-dom";
import { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import cn from "../utils/cn";
import { useQuery } from "@tanstack/react-query";
import { getCartItemsService } from "../features/cart/cart.service";

import { FaShoppingCart } from "react-icons/fa";
import { useAuthContext } from "./auth";

function SideNavigation({ open, onClick }: { open: boolean; onClick: any }) {
  return (
    <div
      className={cn(
        "block md:hidden absolute right-0 top-0 h-screen transition-all duration-200 bg-gray-100/80 backdrop-blur-lg w-full",
        open ? "translate-x-0" : "translate-x-[100%]"
      )}
    >
      <div className="flex flex-col justify-between items-start gap-6 pt-12 pl-4 font-bold text-xl">
        <Link
          className="bg-accent p-2 px-4 rounded-md text-white"
          to="/login"
          onClick={onClick}
        >
          Login
        </Link>
        <Link
          className="bg-accent p-2 px-4 rounded-md text-white"
          to="/signup"
          onClick={onClick}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

function LogOutSideNavigation({
  open,
  cartItems,
  handleLogOut,
  onClick,
}: {
  open: boolean;
  cartItems: any[];
  handleLogOut: MouseEventHandler<HTMLButtonElement>;
  onClick: any;
}) {
  return (
    <motion.div
      className={cn(
        "block mds:hidden absolute right-0 top-0 h-screen transition-all duration-200 bg-gray-100/80 backdrop-blur-lg w-full",
        open ? "translate-x-0" : "translate-x-[100%]"
      )}
    >
      <div className="flex flex-col justify-between items-start gap-6 pt-12 pl-4 font-bold text-xl">
        <Link className="flex" to="/cart" onClick={onClick}>
          <span>Cart</span>
          {cartItems.length > 0 && (
            <p className="font-bold">: {cartItems.length}</p>
          )}
        </Link>

        <button
          className="bg-accent p-2 px-4 rounded-md text-white"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </motion.div>
  );
}

function Header() {
  const { user, removeUser } = useAuthContext();

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    removeUser();
    navigate("/");
    location.reload();
  };

  if (!user) {
    return (
      <header className="bg-secondary top-0 left-0 right-0 fixed border-b-2">
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
    <header className="bg-secondary top-0 left-0 right-0 fixed border-b-2">
      <nav className="flex max-w-7xl mx-auto px-4 sm:px-8 justify-between items-center p-4">
        <Link to="/" className="font-bold text-base md:text-xl">
          E-COMMERCE STORE
        </Link>

        <div className="flex justify-evenly gap-3 items-center">
          <CartIcon />
          <button
            className="bg-accent py-1 px-2 rounded-md text-white"
            onClick={handleLogOut}
          >
            Log out
          </button>
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
          <FaShoppingCart className="w-8 h-8" />
        </div>
      </Link>
    );
  }

  return (
    <Link to={"/cart"}>
      <div className="relative">
        <FaShoppingCart className="w-8 h-8" />
        <p className="absolute top-[-14px] flex justify-center items-center bg-secondary w-6 h-6 p-1 rounded-full right-[-10px]">
          {isLoading || data?.cartItems?.length}
        </p>
      </div>
    </Link>
  );
}

export default Header;
