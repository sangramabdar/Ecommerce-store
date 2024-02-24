import { Link } from "react-router-dom";
import AccountDropDown from "./account/account-drop-down";
import { useAuthContext } from "./authentication/auth-provider";
import LoggedInAccountDropDown from "./account/logged-account-drop-down";
import CartWithCount from "./cart/cart-with-count";

function Header() {
  const { isAuthenticated } = useAuthContext();

  return (
    <header className="bg-secondary top-0 left-0 right-0 fixed border-b-2 z-10 ">
      <nav className="flex max-w-7xl mx-auto p-4 px-4 sm:px-8 justify-between items-center">
        <Link to="/" className="font-semibold text-base md:text-lg">
          E-commerce Store
        </Link>

        <div className="flex justify-evenly gap-3 items-center">
          <CartWithCount />
          {isAuthenticated ? <LoggedInAccountDropDown /> : <AccountDropDown />}
        </div>
      </nav>
    </header>
  );
}

export default Header;
