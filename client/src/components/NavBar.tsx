import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MouseEventHandler, useEffect, useState } from "react";
import { addUser, removeUser } from "../store/auth";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";

function SideNavigation({ open }: { open: boolean }) {
  let classes = `absolute right-0 top-0 h-screen transition-all duration-200 bg-white w-[200px] ${
    open ? "translate-x-0" : "translate-x-[200px]"
  }
  `;

  return (
    <div className={classes}>
      <div className="flex flex-col justify-center items-center pt-12">
        <Link className="m-2" to="/">
          Home
        </Link>
        <Link className="m-2" to="/products">
          Products
        </Link>
        <Link
          className="bg-violet-600 m-2 p-1 px-2 rounded-md text-white"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="bg-violet-600 m-2 p-1 px-2 rounded-md text-white"
          to="/signup"
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
}: {
  open: boolean;
  cartItems: any[];
  handleLogOut: MouseEventHandler<HTMLButtonElement>;
}) {
  let classes = `absolute right-0 top-0 h-screen transition-all duration-200 bg-white w-[200px] ${
    open ? "translate-x-0" : "translate-x-[200px]"
  }`;

  return (
    <motion.div className={classes}>
      <div className="flex flex-col justify-center items-center pt-12">
        <Link className="m-2" to="/">
          Home
        </Link>
        <Link className="m-2" to="/products">
          Products
        </Link>
        <Link className="m-2 flex" to="/cart">
          <span>Cart</span>
          {cartItems.length > 0 && (
            <p className="font-bold">: {cartItems.length}</p>
          )}
        </Link>
        <Link className="m-2" to="/orders">
          Orders
        </Link>
        <button
          className="bg-violet-600 py-1 px-2 rounded-md text-white"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </motion.div>
  );
}

function NavBar({ children }: any) {
  const user = useSelector<any, any>(state => state.auth.user);
  const { cartItems } = useSelector<any, any>(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user")) return;
    if (user) return;

    const authUser = JSON.parse(localStorage.getItem("user")!!);
    dispatch(addUser(authUser));
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch(removeUser(""));
    navigate("/");
    location.reload();
  };

  const handleSideNavbarClick = () => {
    setOpen(!open);
  };

  if (!user) {
    return (
      <>
        <nav className="flex bg-slate-200 top-0 left-0 right-0 fixed justify-between h-12 items-center p-2 font-bold">
          <div className="md:ml-5">E-COMMERCE STORE</div>
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
          <SideNavigation open={open} />
          <div className="hidden md:flex justify-evenly w-[300px] items-center">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link
              className="bg-violet-600 p-1 px-2 rounded-md text-white"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="bg-violet-600 p-1 px-2 rounded-md text-white"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </nav>
        <main className="mt-12">{children}</main>
      </>
    );
  }

  return (
    <>
      <nav className="flex bg-slate-200 top-0 left-0 right-0 fixed justify-between h-12 items-center p-2 font-bold">
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
            className="bg-violet-600 py-1 px-2 rounded-md text-white"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </div>
      </nav>
      <main className="mt-12">{children}</main>
    </>
  );
}

export default NavBar;
