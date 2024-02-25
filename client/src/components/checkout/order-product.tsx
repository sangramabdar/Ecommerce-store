import RupeeIcon from "../icons/rupee-icon";

function OrderProduct({ product, quantity }: any) {
  const { image, title, price } = product;

  return (
    <div
      className="flex flex-col sm:flex-row
     rounded-md space-y-2 sm:space-x-6 gap-2 mt-4 border px-4 py-2
      "
    >
      <img className="h-fit w-12 object-cover" src={image} alt="" />
      <p>
        quantity
        <span className="block font-semibold">{quantity}</span>
      </p>
      <p className="">{title}</p>
      <p className=" flex gap-1">
        <RupeeIcon />
        {price}
      </p>
    </div>
  );
}

export default OrderProduct;
