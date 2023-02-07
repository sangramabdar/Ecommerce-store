import Cart from "../components/Cart";
import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import NavBar from "../components/NavBar";

function CartPage() {
  return (
    <NavBar>
      <MountAndUnmountAnimation>
        <h1 className="font-bold mb-5">Cart</h1>
        <Cart />
      </MountAndUnmountAnimation>
    </NavBar>
  );
}

export default CartPage;
