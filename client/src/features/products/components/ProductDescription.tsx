import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import React from "react";

import { RootState } from "../../../store/store";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import {
  ProductType,
  ProductSliceType,
  RequestStatus,
  fetchProductsThunk,
} from "../store/productSlice";
import { addProductToCartThunk } from "../../cart/store/cartSlice";

interface ProductProps {
  product: ProductType;
}

function Product({ product }: React.PropsWithChildren<ProductProps>) {
  const { description, _id, price, rating, title, image } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector<any, any>(state => state.auth);

  const cartItem = useSelector<any, any>(state =>
    state.cart.cartItems.find((product: any) => product._id == _id)
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
      dispatch<any>(addProductToCartThunk(product, 1));
    } else {
      showSuccessToast("Removed");
      dispatch<any>(addProductToCartThunk(product, 0));
    }
  };

  const handleProductPageNavigation = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div className="bg-white my-[80px] rounded-md shadow-lg w-full p-3 md:max-w-[500px] md:mx-auto">
      <div
        className="flex flex-col p-3 space-y-2 justify-center items-center md:flex-row md:justify-evenly "
        key={_id}
        onClick={handleProductPageNavigation}
      >
        <img className="w-40" src={image} />

        <section className="flex flex-col justify-evenly items-center space-y-5">
          <p className="text-center font-bold w-[200px]">{title}</p>
          <p className="text-center font-bold">Price : ${price}</p>
          <button
            className="bg-tertiary font-bold text-white rounded p-1"
            onClick={e => {
              e.stopPropagation();
              handleAddToCartOrRemoveFromCart(product);
            }}
          >
            {action === "add" ? "Add to cart" : "Remove from cart"}
          </button>
        </section>
      </div>
      <div className="p-5">
        <span className="font-bold text-xl">Description :</span>
        <section className="p-1">{description}</section>
      </div>
    </div>
  );
}

function ProductDescription() {
  const { id } = useParams();
  const { data, status } = useSelector<RootState, ProductSliceType>(
    state => state.products
  );
  const dispatch = useDispatch();

  const [product, setProduct] = useState({} as ProductType);

  useEffect(() => {
    if (status === RequestStatus.LOADING) return;
    if (status === RequestStatus.ERROR) return;
    let product = data.find(
      (element: any) => element._id === id
    ) as ProductType;

    setProduct(product);
  }, [status]);

  useEffect(() => {
    setTimeout(() => {
      dispatch<any>(fetchProductsThunk());
    }, 2000);
  }, []);

  if (status === RequestStatus.LOADING)
    return (
      <div className="my-[80px] rounded-md shadow-lg w-full p-3 h-[500px] md:max-w-[500px] md:mx-auto shimmer relative"></div>
    );

  if (status === RequestStatus.ERROR) {
    return <div>something went wrong</div>;
  }

  return <Product product={product} />;
}

export default ProductDescription;
