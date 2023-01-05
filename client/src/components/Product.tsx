import { ProductType } from "../store/product";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartService, addToCart } from "../store/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../utils/toast";
import { useAuthentication } from "../utils/hooks";

interface ProductPropstype extends ProductType {}

function Product(product: ProductPropstype) {
  const { category, description, id, price, rating, title, image } = product;

  const dispatch = useDispatch();
  const { user } = useSelector<any, any>(state => state.auth);
  const navigate = useNavigate();

  const addToCartHandler = (product: any) => {
    if (!user) {
      showErrorToast("Plz login first");
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

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

    dispatch<any>(addItemToCartService(product));
    // dispatch(addToCart(product));
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
          addToCartHandler(product);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export default Product;
