import { useDispatch } from "react-redux";
import { showSuccessToast } from "../../../utils/toast";
import { removeItemFromCartService } from "../../cart/services/cart";

function OrderProduct(product: any) {
  const { id, image, title, price, quantity } = product;

  const dispatch = useDispatch();

  const handleRemoveProduct = (id: number) => {
    showSuccessToast("Removed");
    dispatch<any>(removeItemFromCartService(product));
  };

  return (
    <div
      className="flex justify-between
     p-2 items-center rounded-md space-x-6
      "
    >
      <div className="w-10">
        <img className="h-fit w-12 object-cover" src={image} alt="" />
      </div>

      <p className="text-center ">{quantity}</p>
      <p className="text-center w-44">{title}</p>
      <p className="text-center w-10">${price}</p>
      {/* <button
        className="text-center p-1 rounded bg-violet-600 text-white"
        onClick={() => {
          handleRemoveProduct(id);
        }}
      >
        remove
      </button> */}
    </div>
  );
}

export default OrderProduct;
