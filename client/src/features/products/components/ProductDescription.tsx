import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store/store";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import {
  ProductType,
  ProductSliceType,
  RequestStatus,
  fetchProductsThunk,
} from "../product.slice";
import { addProductToCartThunk } from "../../cart/cart.slice";
import Skeleton from "../../../components/ui/Skeleton";

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
    navigate(`/products/${title}`);
  };

  return (
    <div className="bg-primary my-[80px] rounded-md shadow-lg w-full p-4 md:max-w-[500px] md:mx-auto">
      <div
        className="flex flex-col p-3 space-y-2 justify-center items-center md:flex-row md:justify-evenly "
        key={_id}
        onClick={handleProductPageNavigation}
      >
        <img className="w-40" src={image} />

        <section className="flex flex-col justify-evenly items-center space-y-5">
          <p className="text-center font-bold leading-6 w-[200px] text-gray-900">
            {title}
          </p>
          <p className="text-center text-gray-600 font-semibold">
            Price : ${price}
          </p>
          <button
            className="bg-accent font-bold text-white rounded p-1"
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
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          Description :
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function ProductDescription() {
  const { title } = useParams();

  const { data, status } = useSelector<RootState, ProductSliceType>(
    state => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({} as ProductType);

  useEffect(() => {
    if (status === RequestStatus.SUCCESS) {
      let product = data.find(
        (product: any) => product.title === title
      ) as ProductType;

      if (!product) {
        navigate("/not-found");
        return;
      }

      setProduct(product);
    }
  }, [status]);

  useEffect(() => {
    setTimeout(() => {
      dispatch<any>(fetchProductsThunk());
    }, 2000);
  }, []);

  if (status === RequestStatus.LOADING)
    return (
      <Skeleton className="my-[80px] rounded-md shadow-lg w-full p-3 h-[500px] md:max-w-[500px] md:mx-auto shimmer relative"></Skeleton>
    );

  if (status === RequestStatus.ERROR) {
    return <Navigate to={"/not-found"} />;
  }

  return <Product product={product} />;
}

export default ProductDescription;
