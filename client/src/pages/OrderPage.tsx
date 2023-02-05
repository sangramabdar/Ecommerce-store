import NavBar from "../components/NavBar";
import OrderTable from "../components/Order";
import VariantAnimation from "../components/VariantAnimation";

function OrderPage() {
  return (
    <NavBar>
      <VariantAnimation>
        <h1 className="font-bold md:ml-3">Orders</h1>
        <OrderTable />
      </VariantAnimation>
    </NavBar>
  );
}

export default OrderPage;
