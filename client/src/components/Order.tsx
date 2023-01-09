import { useAuthentication } from "../utils/hooks";
import { useSelector } from "react-redux";
import Loading from "./Loading";

interface OrderProps {
  _id: string;
  orderItems: any[];
  orderStatus: string;
  totalPrice: number;
  orderAddress: {
    address: string;
    city: string;
    pincode: number;
  };
}

function OrderRow({ order }: { order: OrderProps }) {
  const { _id, totalPrice, orderAddress, orderItems, orderStatus } = order;

  return (
    <tr>
      <td className="p-3">{_id}</td>
      <td>${totalPrice}</td>
      <td>{orderAddress.address}</td>
      <td>{orderAddress.city}</td>
      <td>{orderAddress.pincode}</td>
      <td>{orderStatus.toLowerCase()}</td>
    </tr>
  );
}

function OrderTable() {
  useAuthentication();

  const { orders } = useSelector<any, any>(state => state.order);

  if (!orders) return <Loading />;

  if (orders.length == 0)
    return (
      <div className="bg-white w-[700px] mx-auto p-3 rounded-md shadow-md">
        Nothing
      </div>
    );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4">
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
