import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser, loadInitialThings } from "../store/auth";

function NavBar({ children }: any) {
  const { user } = useSelector<any, any>(state => state.auth);
  const { cartItems } = useSelector<any, any>(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  if (!user) {
    return (
      <>
        <nav className="flex bg-slate-200 top-0 left-0 right-0 fixed justify-between h-12 items-center p-3 font-bold">
          <div className="md:ml-5">E-COMMERCE STORE</div>
          <div className="flex justify-evenly w-[300px]">
            <Link to="">Home</Link>
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
        <main className="mt-12 ml-4">{children}</main>
      </>
    );
  }

  return (
    <>
      <nav className="flex bg-slate-200 top-0 left-0 right-0 fixed justify-between h-12 items-center p-2 font-bold">
        <div className="md:ml-5">E-COMMERCE STORE</div>
        <div className="flex justify-evenly gap-3 items-center">
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
      <main className="mt-12 ml-4">{children}</main>
    </>
  );
}

export default NavBar;
