import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import NavBar from "../components/NavBar";
import OrderTable from "../components/Order";

function OrderPage() {
  return (
    <NavBar>
      <MountAndUnmountAnimation>
        <h1 className="font-bold md:ml-3">Orders</h1>
        <OrderTable />
      </MountAndUnmountAnimation>
    </NavBar>
  );
}

export default OrderPage;
