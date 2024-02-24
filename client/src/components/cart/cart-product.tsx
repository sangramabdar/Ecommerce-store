import React from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import cn from "../../utils/cn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductTocartSerivce } from "../../services/cart.service";
import Button from "../ui/button";

interface CartProductProps {
  cartProduct: {
    quantity: number;
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    totalPrice: number;
    rating: {
      rate: number;
      count: number;
    };
  };
}

function CartProduct({
  cartProduct,
}: React.PropsWithChildren<CartProductProps>) {
  const { image, title, price, quantity } = cartProduct;
  const queryClient = useQueryClient();

  const removeProductMutation = useMutation({
    mutationFn: addProductTocartSerivce,
  });

  const updateProductMutation = useMutation({
    mutationFn: addProductTocartSerivce,
  });

  const handleRemoveProduct = async () => {
    try {
      await removeProductMutation.mutateAsync({
        productId: cartProduct._id,
        quantity: 0,
      });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      showSuccessToast("Removed");
    } catch (error) {
      console.log(error);
      showErrorToast("something went wrong");
    }
  };

  const handleIncrement = async () => {
    try {
      await updateProductMutation.mutateAsync({
        productId: cartProduct._id,
        quantity: quantity + 1,
      });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error) {
      console.log(error);
      showErrorToast("something went wrong");
    }
  };

  const handleDecrement = async () => {
    try {
      await updateProductMutation.mutateAsync({
        productId: cartProduct._id,
        quantity: quantity - 1,
      });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error) {
      showErrorToast("something went wrong");
    }
  };

  return (
    <div
      className="bg-secondary flex flex-col
     rounded-md shadow-sm h-fit max-w-4xl md:flex-row p-4 gap-4 border
      "
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center w-full gap-4">
        <img className="object-fill w-24 h-24 md:w-32" src={image} alt="" />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg md:text-xl text-gray-900">{title}</h2>
          <p className="text-lg md:text-xl text-gray-600">Rs. {price}</p>
        </div>

        <div className="flex gap-2 md:justify-center items-center">
          <Button
            className={cn(
              "bg-accent rounded-md font-bold text-white",
              updateProductMutation.isPending && "opacity-50"
            )}
            onClick={handleIncrement}
            disabled={updateProductMutation.isPending}
          >
            +
          </Button>
          <p className="text-center ">{quantity}</p>
          <Button
            className={cn(
              "bg-accent rounded-md  font-bold text-white",
              updateProductMutation.isPending && "opacity-50"
            )}
            onClick={handleDecrement}
            disabled={updateProductMutation.isPending}
          >
            -
          </Button>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <Button
          className={cn(removeProductMutation.isPending && "opacity-50")}
          onClick={() => {
            handleRemoveProduct();
          }}
          disabled={removeProductMutation.isPending}
        >
          remove
        </Button>
      </div>
    </div>
  );
}

export default CartProduct;
