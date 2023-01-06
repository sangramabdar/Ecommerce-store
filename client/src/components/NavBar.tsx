import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../store/auth";

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
  };

  if (!user) {
    return (
      <>
        <nav className="flex bg-slate-200 top-0 left-0 right-0 fixed justify-between h-10 items-center p-3">
          <div className="md:ml-5">E-COMMERCE STORE</div>
          <div className="flex justify-evenly w-[300px]">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="">Home</Link>
          </div>
        </nav>
        <main className="mt-12 ml-4">{children}</main>
      </>
    );
  }

  return (
    <>
      <nav className="flex bg-slate-200 top-0 left-0 right-0 fixed justify-between h-10 items-center p-2">
        <div className="md:ml-5">E-COMMERCE STORE</div>
        <div className="flex justify-evenly gap-3">
          <button onClick={handleLogOut}>Log out</button>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          {cartItems.length > 0 && (
            <p className="font-bold">: {cartItems.length}</p>
          )}
          <Link to="/orders">Orders</Link>
        </div>
      </nav>
      <main className="mt-12 ml-4">{children}</main>
    </>
  );
}

export default NavBar;
