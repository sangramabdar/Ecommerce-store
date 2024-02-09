import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import OrderTable from "../features/order/components/OrderTable";

function OrderPage() {
  return (
    <>
      <h1 className="font-bold md:ml-3">Orders</h1>
      <OrderTable />
    </>
  );
}

export default OrderPage;
