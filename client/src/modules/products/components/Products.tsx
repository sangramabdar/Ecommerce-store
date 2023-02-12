import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductSliceType, ProductType, STATUS } from "../store/productSlice";
import Product from "./Product";
import Loading from "../../../components/Loading";
import { getProductsService } from "../services/products";
import { RootState } from "../../../store/store";

function Products() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector<RootState, ProductSliceType>(
    state => state.products
  );

  useEffect(() => {
    if (products.length > 0) return;

    setTimeout(() => {
      dispatch<any>(getProductsService());
    }, 2000);
  }, []);

  if (status === STATUS.LOADING) {
    return <Loading />;
  }

  if (status === STATUS.ERROR) {
    return <div>something went wrong</div>;
  }

  return (
    <div>
      <h1 className="font-bold mb-5">Products</h1>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default Products;
