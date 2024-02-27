import { useQuery } from "@tanstack/react-query";
import { RequestStatus } from "../../services/constants";
import Loading from "../loading";
import { getOrdersService } from "../../services/order.service";
import OrderRow from "./order-row";

function OrderTable() {
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersService,
  });

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="bg-white w-[700px] mx-auto p-3 rounded-md shadow-md">
        Nothing
      </div>
    );

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
      <table className="table-auto w-full text-sm text-center">
        <thead className="text-xs text-gray-700 uppercase font-bold bg-accent/10">
          <tr>
            <th className="p-3">Id</th>
            <th className="p-3">TotalPrice</th>
            <th className="p-3">Address</th>
            <th className="p-3">City</th>
            <th className="p-3">State</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders!!.map((order: any) => {
            return <OrderRow key={order._id} order={order} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
