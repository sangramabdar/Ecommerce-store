interface OrderProps {
  order: {
    _id: string;
    orderItems: any[];
    orderStatus: string;
    totalPrice: number;
    orderAddress: {
      address: string;
      city: string;
      pincode: number;
    };
  };
}

function OrderRow({ order }: OrderProps) {
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

export default OrderRow;
