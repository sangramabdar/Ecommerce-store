import { ProductType } from "../store/product";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../utils/toast";
import { useState } from "react";
import { addItemToCartService, removeItemFromCartService } from "../store/cart";

interface ProductPropstype extends ProductType {}

function Product(product: ProductPropstype) {
  const { category, description, id, price, rating, title, image } = product;

  const cartItem = useSelector<any, any>(state =>
    state.cart.cartItems.find((product: any) => product.id == id)
  );

  const [action, setAction] = useState<"add" | "remove">(
    cartItem ? "remove" : "add"
  );

  const dispatch = useDispatch();
  const { user } = useSelector<any, any>(state => state.auth);
  const navigate = useNavigate();

  const handleAddTocart = (product: any) => {
    if (!user) {
      showErrorToast("Plz login first");
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    if (action === "add") {
      toast.success("Added", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          boxShadow: "none",
        },
      });
      dispatch<any>(addItemToCartService(product, ""));
      setAction("remove");
    } else {
      toast.success("removed", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          boxShadow: "none",
        },
      });
      dispatch<any>(removeItemFromCartService(product));
      setAction("add");
    }
  };

  return (
    <div
      className="flex flex-col justify-evenly items-center bg-white rounded h-[250px]"
      key={id}
    >
      <img className="h-fit w-9 object-cover" src={image} />
      <p className="text-center font-bold">{title}</p>
      <p className="text-center font-bold"> {price}</p>
      <button
        className="bg-violet-600 font-bold text-white rounded p-1"
        onClick={() => {
          handleAddTocart(product);
        }}
      >
        {action === "add" ? "Add to cart" : "Remove from cart"}
      </button>
    </div>
  );
}

export default Product;
