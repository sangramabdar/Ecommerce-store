import Checkout from "../modules/order/components/Checkout";
import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";

function CheckoutPage() {
  return (
    <MountAndUnmountAnimation>
      <h1 className="font-bold mb-5">Checkout</h1>
      <Checkout />
    </MountAndUnmountAnimation>
  );
}

export default CheckoutPage;
