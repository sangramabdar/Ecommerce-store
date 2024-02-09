import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MouseEventHandler, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";
import { removeUser } from "../features/authentication/store/authSlice";
import cn from "../utils/cn";
import { fetchCartItemsThunk } from "../features/cart/store/cartSlice";

function SideNavigation({ open, onClick }: { open: boolean; onClick: any }) {
  return (
    <div
      className={cn(
        "block md:hidden absolute right-0 top-0 h-screen transition-all duration-200 bg-gray-100/80 backdrop-blur-lg w-full",
        open ? "translate-x-0" : "translate-x-[100%]"
      )}
    >
      <div className="flex flex-col justify-between items-start gap-6 pt-12 pl-4 font-bold text-xl">
        <Link to="/" onClick={onClick}>
          Home
        </Link>
        <Link to="/products" onClick={onClick}>
          Products
        </Link>
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
        "block sm:hidden absolute right-0 top-0 h-screen transition-all duration-200 bg-gray-100/80 backdrop-blur-lg w-full",
        open ? "translate-x-0" : "translate-x-[100%]"
      )}
    >
      <div className="flex flex-col justify-between items-start gap-6 pt-12 pl-4 font-bold text-xl">
        <Link to="/" onClick={onClick}>
          Home
        </Link>
        <Link to="/products" onClick={onClick}>
          Products
        </Link>
        <Link className="flex" to="/cart" onClick={onClick}>
          <span>Cart</span>
          {cartItems.length > 0 && (
            <p className="font-bold">: {cartItems.length}</p>
          )}
        </Link>
        <Link to="/orders" onClick={onClick}>
          Orders
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
  const user = useSelector<any, any>(state => state.auth.user);
  const { cartItems } = useSelector<any, any>(state => state.cart);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    dispatch(fetchCartItemsThunk(null));
  }, [user]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch(removeUser());
    navigate("/");
    location.reload();
  };

  const handleSideNavbarClick = () => {
    setOpen(!open);
  };

  const handleLinkClick = () => {
    setOpen(!open);
  };

  if (!user) {
    return (
      <header className="bg-secondary top-0 left-0 right-0 fixed border-b-2">
        <nav className="flex max-w-7xl mx-auto px-4 sm:px-8 justify-between items-center h-20">
          <Link to="/" className="font-bold md:text-xl">
            E-COMMERCE STORE
          </Link>
          {open ? (
            <ImCross
              className="h-6 w-10 z-10 md:hidden"
              onClick={handleSideNavbarClick}
            />
          ) : (
            <GiHamburgerMenu
              className="h-6 w-10 z-10 md:hidden"
              onClick={handleSideNavbarClick}
            />
          )}
          <SideNavigation open={open} onClick={handleLinkClick} />
          <div className="hidden md:flex justify-evenly gap-4 items-center font-bold">
            <Link to="/">Home</Link>
            <Link to="products">Products</Link>
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
      <nav className="flex max-w-7xl mx-auto px-4 sm:px-8 justify-between items-center h-20">
        <div className="md:ml-5">E-COMMERCE STORE</div>
        {open ? (
          <ImCross
            className="md:hidden h-6 w-10 z-10"
            onClick={handleSideNavbarClick}
          />
        ) : (
          <GiHamburgerMenu
            className="md:hidden h-8 w-10 z-10"
            onClick={handleSideNavbarClick}
          />
        )}
        <LogOutSideNavigation
          open={open}
          cartItems={cartItems}
          handleLogOut={handleLogOut}
          onClick={handleLinkClick}
        />
        <div className="hidden md:flex justify-evenly gap-3 items-center">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link className="flex " to="/cart">
            Cart
            {cartItems.length > 0 && (
              <p className="font-bold">: {cartItems.length}</p>
            )}
          </Link>

          <Link to="/orders">Orders</Link>
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

export default Header;
