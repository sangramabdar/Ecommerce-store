import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import React from "react";
import { addItemToCartService } from "../../cart/services/cart";
import { ProductType } from "../store/productSlice";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

interface ProductProps {
  product: ProductType;
}

function Product({ product }: React.PropsWithChildren<ProductProps>) {
  const { _id, price, title, image } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector<any, any>(state => state.auth);

  const cartItem = useSelector<any, any>(state =>
    state.cart.cartItems.find((item: any) => item.product._id == _id)
  );

  const action = useMemo(() => (cartItem ? "remove" : "add"), [cartItem]);

  const handleAddToCartOrRemoveFromCart = async (product: any) => {
    if (!user) {
      showErrorToast("Plz login first");
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    try {
      if (action === "add") {
        await dispatch<any>(addItemToCartService(product, 1));
        showSuccessToast("Added");
      } else {
        await dispatch<any>(addItemToCartService(product, 0));
        showSuccessToast("Removed");
      }
    } catch (error: any) {
      showErrorToast("Something went wrong");
    }
  };

  const handleProductPageNavigation = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div
      className="flex flex-col sm:items-center justify-between 
       rounded-2xl space-y-2 bg-secondary p-4"
      key={_id}
      onClick={handleProductPageNavigation}
    >
      <div className="flex flex-col space-y-2">
        <img className="w-full h-[300px] object-fill rounded-2xl" src={image} />
        <p className="text-lg font-bold">{title}</p>
      </div>
      <div className="flex flex-col w-full justify-start items-start gap-2">
        <p className="text-center font-semibold text-gray-600">
          Price : ${price}
        </p>
        <button
          className="bg-tertiary font-bold text-white rounded p-1 px-2"
          onClick={e => {
            e.stopPropagation();
            handleAddToCartOrRemoveFromCart(product);
          }}
        >
          {action === "add" ? "Add to cart" : "Remove from cart"}
        </button>
      </div>
    </div>
  );
}

export default Product;
