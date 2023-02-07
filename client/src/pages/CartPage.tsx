import Cart from "../modules/cart/components/Cart";
import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import NavBar from "../components/NavBar";

function CartPage() {
  return (
    <MountAndUnmountAnimation>
      <h1 className="font-bold mb-5">Cart</h1>
      <Cart />
    </MountAndUnmountAnimation>
  );
}

export default CartPage;
