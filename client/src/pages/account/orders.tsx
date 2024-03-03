import { useQuery } from "@tanstack/react-query";
import { getOrdersService } from "../../services/order.service";
import OrderRow from "../../components/account/order-row";
import Skeleton from "../../components/ui/skeleton";

function OrdersPage() {
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersService,
  });

  if (isLoading) return <Skeleton className="h-60" />;

  if (error)
    return (
      <div className="bg-white w-[700px] mx-auto p-3 rounded-md shadow-md">
        Nothing
      </div>
    );

  return (
    <div>
      <h1 className="font-semibold">Orders</h1>
      <div className="flex gap-2 flex-col justify-start items-start mt-10">
        {orders.map((order: any, index: number) => {
          return <OrderRow key={order._id} order={order} index={index + 1} />;
        })}
      </div>
    </div>
  );
}

export default OrdersPage;
