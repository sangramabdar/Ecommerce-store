import OrderProduct from "./order-product";

function OrderSummary() {
  return <h1>Order summary</h1>;

  // return (
  //   <section className="px-4">
  //     <h1 className="font-bold text-lg flex flex-col justify-center items-center">
  //       Order Summary
  //     </h1>
  //     {cartItems.map((item: any, index: number) => {
  //       return (
  //         <OrderProduct
  //           key={index}
  //           product={item.product}
  //           quantity={item.quantity}
  //         />
  //       );
  //     })}
  //     <span className="mt-4">Total Price : ${totalPrice}</span>
  //   </section>
  // );
}

export default OrderSummary;
