import Cart from "../components/Cart";
import NavBar from "../components/NavBar";
import VariantAnimation from "../components/VariantAnimation";

function CartPage() {
  return (
    <NavBar>
      <VariantAnimation>
        <h1 className="font-bold mb-5">Cart</h1>
        <Cart />
      </VariantAnimation>
    </NavBar>
  );
}

export default CartPage;
