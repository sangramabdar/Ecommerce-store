import RupeeIcon from "../icons/rupee-icon";

interface OrderProps {
  order: {
    _id: string;
    orderItems: any[];
    orderStatus: string;
    totalPrice: number;
    orderAddress: {
      address: string;
      city: string;
      state: string;
    };
  };
}

function OrderRow({ order }: OrderProps) {
  const { _id, totalPrice, orderAddress, orderStatus } = order;

  return (
    <tr>
      <td className="p-3">{_id}</td>
      <td className="flex gap-1 justify-center items-center bg-red-200">
        <RupeeIcon />
        {totalPrice}
      </td>
      <td>{orderAddress.address}</td>
      <td>{orderAddress.city}</td>
      <td>{orderAddress.state}</td>
      <td>{orderStatus.toLowerCase()}</td>
    </tr>
  );
}

export default OrderRow;
