import Cart from "../components/Cart";
import NavBar from "../components/NavBar";

function CartPage() {
  return (
    <NavBar>
      <div>
        <h1 className="font-bold mb-5">Cart</h1>
        <Cart />
      </div>
    </NavBar>
  );
}

export default CartPage;
