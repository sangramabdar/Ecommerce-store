import { useAuthentication, useMounAndUnMount } from "../utils/hooks";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import Loading from "./Loading";

function OrderRow({ order }: any) {
  const { _id, totalPrice, orderAddress, orderItems } = order;
  console.log(orderItems);
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
    </tr>
  );
}

function OrderTable({ orders }: any) {
  return (
    <table className="border-black border-2 mx-auto my-3 bg-white rounded-md shadow-lg ">
      <thead>
        <th className="border-black border-2 p-2">Id</th>
        <th className="border-black border-2 p-2">TotalPrice</th>
        <th className="border-black border-2 p-2">Address</th>
        <th className="border-black border-2 p-2">City</th>
        <th className="border-black border-2 p-2">Pincode</th>
      </thead>
      <tbody>
        {orders.map((order: any) => {
          return <OrderRow key={order._id} order={order} />;
        })}
      </tbody>
    </table>
  );
}

function Order() {
  useAuthentication();
  useMounAndUnMount("order");
  const { orders } = useSelector<any, any>(state => state.order);

  if (!orders) return <Loading />;

  return (
    <div className="bg-white w-[700px] mx-auto p-3 rounded-md shadow-md">
      <OrderTable orders={orders} />
    </div>
  );
}

export default Order;
