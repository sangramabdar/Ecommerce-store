function OrderProduct({ product, quantity }: any) {
  const { image, title, price } = product;

  return (
    <div
      className="flex flex-col sm:flex-row
     p-2 items-center rounded-md space-x-6 gap-2
      "
    >
      <img className="h-fit w-12 object-cover" src={image} alt="" />
      <p className="text-center font-semibold">
        quantity
        <span className="block">{quantity}</span>
      </p>
      <p className="">{title}</p>
      <p className="text-center">${price}</p>
    </div>
  );
}

export default OrderProduct;
