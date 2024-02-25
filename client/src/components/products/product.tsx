import { useNavigate } from "react-router-dom";
import React from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import cn from "../../utils/cn";
import { useAuthContext } from "../authentication/auth-provider";
import Button from "../ui/button";
import useAddProductTocart from "../../hooks/use-add-product-to-cart";
import RupeeIcon from "../icons/rupee-icon";

interface ProductProps {
  product: any;
}

function Product({ product }: React.PropsWithChildren<ProductProps>) {
  const { _id, price, title, image } = product;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthContext();
  const addProductMutation = useAddProductTocart();

  const handleAddToCart = async (product: any) => {
    if (!isAuthenticated) {
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
    navigate(`/products/${_id}`);
  };

  return (
    <div
      className="flex flex-col sm:items-center justify-between
       rounded-2xl space-y-2 p-4 border"
      key={_id}
      onClick={handleProductPageNavigation}
    >
      <div className="flex flex-col space-y-2">
        <img
          className="w-[200px] sm:w-full h-[200px] sm:h-[300px] object-fill
          s rounded-2xl"
          src={image}
        />
        <p className="text-lg font-medium font-poppins">{title}</p>
      </div>
      <div className="flex flex-col w-full justify-start items-start gap-2">
        <p className="text-center font-semibold text-gray-600 flex gap-1">
          <RupeeIcon />
          {price}
        </p>

        <Button
          className={cn(
            "self-start",
            addProductMutation.isPending && "opacity-50",
            "px-4 py-2"
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
