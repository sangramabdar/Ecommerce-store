import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import Checkout from "../features/order/components/Checkout";

function CheckoutPage() {
  return (
    <MountAndUnmountAnimation>
      <h1 className="font-bold mb-5">Checkout</h1>
      <Checkout />
    </MountAndUnmountAnimation>
  );
}

export default CheckoutPage;
