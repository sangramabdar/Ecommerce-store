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
    <tr className="border-black border-2">
      <td className="border-black border-2 p-2 text-center">{_id}</td>
      <td className="border-black border-2 p-2 text-center">${totalPrice}</td>
      <td className="border-black border-2 p-2 text-center">
        {orderAddress.address}
      </td>
      <td className="border-black border-2 p-2 text-center">
        {orderAddress.city}
      </td>
      <td className="border-black border-2 p-2 text-center">
        {orderAddress.pincode}
      </td>
      <td className="border-black border-2 p-2 text-center">
        {orderStatus.toLowerCase()}
      </td>
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
    <div className="bg-white w-[700px] mx-auto p-3 rounded-md shadow-md">
      <table className="border-black border-2 mx-auto my-3 bg-white rounded-md shadow-lg ">
        <thead>
          <tr>
            <th className="border-black border-2 p-2">Id</th>
            <th className="border-black border-2 p-2">TotalPrice</th>
            <th className="border-black border-2 p-2">Address</th>
            <th className="border-black border-2 p-2">City</th>
            <th className="border-black border-2 p-2">Pincode</th>
            <th className="border-black border-2 p-2">Status</th>
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
