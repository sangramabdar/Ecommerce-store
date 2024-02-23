import { useNavigate } from "react-router-dom";
import React from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import cn from "../../../utils/cn";
import { useAuthContext } from "../../../components/auth";
import Button from "../../../components/ui/button";
import useAddProductTocart from "../products.hooks";

interface ProductProps {
  product: any;
}

function Product({ product }: React.PropsWithChildren<ProductProps>) {
  const { _id, price, title, image } = product;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user }: any = useAuthContext();
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
    <div
      className="flex flex-col sm:items-center justify-between
       rounded-2xl space-y-2 bg-secondary p-4 border"
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
        <Button
          className={cn(
            "self-start",
            addProductMutation.isPending && "opacity-50"
          )}
          disabled={addProductMutation.isPending}
          onClick={e => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default Product;
