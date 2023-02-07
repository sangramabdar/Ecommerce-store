import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import OrderTable from "../modules/order/components/OrderTable";

function OrderPage() {
  return (
    <MountAndUnmountAnimation>
      <h1 className="font-bold md:ml-3">Orders</h1>
      <OrderTable />
    </MountAndUnmountAnimation>
  );
}

export default OrderPage;
