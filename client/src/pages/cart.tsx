import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import Cart from "../features/cart/components/Cart";

function CartPage() {
  return (
    <MountAndUnmountAnimation>
      <h1 className="font-bold mb-5">Cart</h1>
      <Cart />
    </MountAndUnmountAnimation>
  );
}

export default CartPage;
