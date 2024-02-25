import { Navigate } from "react-router-dom";
import Product from "./product";
import { useQuery } from "@tanstack/react-query";
import { getProductsService } from "../../services/product.service";
import ProductsLoading from "./products-loading";

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
    return <ProductsLoading />;
  }

  if (error) {
    return <Navigate to="*" />;
  }

  return (
    <div>
      <h1 className="font-semibold">Products</h1>
      <div className="mt-4 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product: any) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default Products;
