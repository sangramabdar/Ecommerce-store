import AppLoading from "../app-loading";
import { Navigate } from "react-router-dom";
import Product from "./product";
import { useQuery } from "@tanstack/react-query";
import { getProductsService } from "../../services/product.service";

function Products() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery<any[]>({
    queryKey: ["products"],
    queryFn: getProductsService,
  });

  if (isLoading) {
    return <AppLoading />;
  }

  if (error) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div>
      <h1 className="font-bold mb-5">Products</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product: any) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default Products;
