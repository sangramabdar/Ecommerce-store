import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Skeleton from "../ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductService } from "../../services/product.service";
import { useAuthContext } from "../authentication/auth-provider";
import Button from "../ui/button";
import useAddProductTocart from "../../hooks/use-add-product-to-cart";

interface ProductProps {
  product: any;
}

function Product({ product }: React.PropsWithChildren<ProductProps>) {
  const { description, _id, price, rating, title, image } = product;

  const navigate = useNavigate();
  const { user }: any = useAuthContext();
  const queryClient = useQueryClient();
  const addProductMutation = useAddProductTocart();

  const handleAddToCart = async (product: any) => {
    if (!user) {
      showErrorToast("Plz login first");
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    try {
      await addProductMutation.mutateAsync({
        productId: product._id,
        quantity: 1,
      });

      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      showSuccessToast("Added");
    } catch (error) {
      showErrorToast("Something went wrong");
    }
  };

  const handleProductPageNavigation = () => {
    navigate(`/products/${title}`);
  };

  return (
    <div className="bg-secondary my-[80px] rounded-md w-full p-4 md:max-w-[500px] md:mx-auto border">
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
          <Button
            onClick={e => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            disabled={addProductMutation.isPending}
          >
            Add to cart
          </Button>
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
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") || "";

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductService(id),
    staleTime: 3000,
  });

  if (isLoading)
    return (
      <div className="my-[80px] rounded-md w-full p-4 md:max-w-[500px] md:mx-auto bg-secondary">
        <div className="flex justify-start gap-10">
          <Skeleton className="w-40 h-52" />
          <div className="flex flex-col gap-4">
            <Skeleton className="w-40 h-10" />
            <Skeleton className="w-40 h-10" />
            <Skeleton className="w-40 h-10" />
          </div>
        </div>
        <div className="flex flex-col mt-10 gap-4">
          <Skeleton className="h-10 w-32"></Skeleton>
          <Skeleton className="h-52"></Skeleton>
        </div>
      </div>
    );

  if (error) {
    return <Navigate to={"/not-found"} />;
  }

  return <Product product={product} />;
}

export default ProductDescription;
