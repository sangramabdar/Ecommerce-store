import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import OrderRow from "./OrderRow";
import useAuthentication from "../../../hooks/useAuthentication";
import { RootState } from "../../../store/store";

function OrderTable() {
  useAuthentication();
  const orders = useSelector<RootState, null | []>(state => state.order.orders);

  if (!orders) return <Loading />;

  if (orders.length == 0)
    return (
      <div className="bg-white w-[700px] mx-auto p-3 rounded-md shadow-md">
        Nothing
      </div>
    );

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white p-4">
      <table className="table-auto w-full text-sm text-center">
        <thead className="text-xs text-gray-700 uppercase font-bold">
          <tr>
            <th className="p-3">Id</th>
            <th className="p-3">TotalPrice</th>
            <th className="p-3">Address</th>
            <th className="p-3">City</th>
            <th className="p-3">Pincode</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => {
            return <OrderRow key={order._id} order={order} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
