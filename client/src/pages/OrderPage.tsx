import NavBar from "../components/NavBar";
import OrderTable from "../components/Order";

function OrderPage() {
  return (
    <NavBar>
      <h1 className="font-bold md:ml-3">Orders</h1>
      <OrderTable />
    </NavBar>
  );
}

export default OrderPage;
