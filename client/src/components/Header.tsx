import { Link } from "react-router-dom";

import { useAuthContext } from "./auth";
import AccountDropDown from "./account/account-drop-down";
import CartIcon from "./cart/cart-icon";
import Button from "./ui/button";

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
            <Link to="login">
              <Button>Login</Button>
            </Link>
            <Link to="signup">
              <Button>Sign up</Button>
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

export default Header;
