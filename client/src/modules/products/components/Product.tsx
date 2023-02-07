import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useMemo } from "react";
import {
  addItemToCartService,
  removeItemFromCartService,
} from "../../cart/store/cart";

interface ProductPropstype {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function Product(product: any) {
  const { category, description, id, price, rating, title, image } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector<any, any>(state => state.auth);

  const cartItem = useSelector<any, any>(state =>
    state.cart.cartItems.find((product: any) => product.id == id)
  );

  const action = useMemo(() => (cartItem ? "remove" : "add"), [cartItem]);

  const handleAddToCartOrRemoveFromCart = (product: any) => {
    if (!user) {
      showErrorToast("Plz login first");
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    if (action === "add") {
      showSuccessToast("Added");
      dispatch<any>(addItemToCartService(product, ""));
    } else {
      showSuccessToast("Removed");
      dispatch<any>(removeItemFromCartService(product));
    }
  };

  const handleProductPageNavigation = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="flex flex-col justify-evenly items-center bg-white rounded-md h-[250px] shadow-lg"
      key={id}
      onClick={handleProductPageNavigation}
    >
      <img className="h-fit w-9 object-cover" src={image} />
      <p className="text-center font-bold">{title}</p>
      <p className="text-center font-bold">Price : ${price}</p>
      <button
        className="bg-violet-600 font-bold text-white rounded p-1"
        onClick={e => {
          e.stopPropagation();
          handleAddToCartOrRemoveFromCart(product);
        }}
      >
        {action === "add" ? "Add to cart" : "Remove from cart"}
      </button>
    </div>
  );
}

export default Product;
