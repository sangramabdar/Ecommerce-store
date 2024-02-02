import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductSliceType, RequestStatus } from "../store/productSlice";
import Product from "./Product";
import Loading from "../../../components/Loading";
import { fetchProductsService, getProductsService } from "../services/products";
import { RootState } from "../../../store/store";
import AppLoading from "../../../components/AppLoading";

function Products() {
  const cards = Array.from({ length: 20 }).map((card, i) => {
    return (
      <div
        key={i}
        className="w-full relative animate-pulse h-56 shimmer rounded-md bg-secondary"
      ></div>
    );
  });
  const dispatch = useDispatch<any>();
  const { data: products, status } = useSelector<RootState, ProductSliceType>(
    state => state.products
  );

  useEffect(() => {
    dispatch(fetchProductsService());
  }, []);

  if (status === RequestStatus.LOADING) {
    return <AppLoading />;
  }

  if (status === RequestStatus.ERROR) {
    return <div>something went wrong</div>;
  }

  return (
    <div>
      <h1 className="font-bold mb-5">Products</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default Products;
