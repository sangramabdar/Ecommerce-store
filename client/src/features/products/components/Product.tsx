import { useNavigate } from "react-router-dom";
import React from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductTocartSerivce } from "../../cart/cart.service";
import cn from "../../../utils/cn";
import { useAuthContext } from "../../../components/auth";

interface ProductProps {
  product: any;
}

function Product({ product }: React.PropsWithChildren<ProductProps>) {
  const { _id, price, title, image } = product;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user }: any = useAuthContext();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ productId, quantity }: any) =>
      addProductTocartSerivce(
        {
          productId,
          quantity,
        },
        {
          Authorization: "Bearer " + user?.accessToken,
        }
      ),
  });

  const handleAddToCartOrRemoveFromCart = async (product: any) => {
    if (!user) {
      showErrorToast("Plz login first");
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    try {
      await mutateAsync({ productId: product._id, quantity: 1 });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      showSuccessToast("Added");
    } catch (error: any) {
      showErrorToast("Something went wrong");
    }
  };

  const handleProductPageNavigation = () => {
    navigate({
      pathname: `/products/${title}`,
      search: `?id=${_id}`,
    });
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
          className={cn(
            "bg-accent font-bold text-white rounded p-1 px-2",
            isPending && "opacity-50"
          )}
          disabled={isPending}
          onClick={e => {
            e.stopPropagation();
            handleAddToCartOrRemoveFromCart(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Product;
