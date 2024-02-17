import React from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import cn from "../../../utils/cn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductTocartSerivce } from "../cart.service";
import { useAuthContext } from "../../../components/auth";
import Button from "../../../components/ui/button";

interface CartProductProps {
  cartProduct: {
    quantity: number;
    id: number;
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

  const { user }: any = useAuthContext();

  const queryClient = useQueryClient();

  const removeProductMutation = useMutation({
    mutationFn: ({ product, quantity }: any) =>
      addProductTocartSerivce(
        { productId: product._id, quantity },
        {
          Authorization: "Bearer " + user.accessToken,
        }
      ),
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ product, quantity }: any) =>
      addProductTocartSerivce(
        { productId: product._id, quantity },
        {
          Authorization: "Bearer " + user.accessToken,
        }
      ),
  });

  const handleRemoveProduct = async () => {
    try {
      await removeProductMutation.mutateAsync({
        product: cartProduct,
        quantity: 0,
      });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      showSuccessToast("Removed");
    } catch (error) {
      showErrorToast("something went wrong");
    }
  };

  const handleIncrement = async () => {
    try {
      await updateProductMutation.mutateAsync({
        product: cartProduct,
        quantity: quantity + 1,
      });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error) {
      showErrorToast("something went wrong");
    }
  };

  const handleDecrement = async () => {
    try {
      await updateProductMutation.mutateAsync({
        product: cartProduct,
        quantity: quantity - 1,
      });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error) {
      showErrorToast("something went wrong");
    }
  };

  return (
    <div
      className="bg-white flex flex-col
    p-2 items-center rounded-md shadow-lg h-fit md:w-[70%] md:flex-row md:mx-auto
      "
    >
      <section className="flex justify-between items-center w-full  md:min-w-[400px]">
        <div className="w-10">
          <img className="h-fit object-cover" src={image} alt="" />
        </div>
        <Button
          className={cn(
            "bg-accent rounded-md w-7 font-bold text-white",
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
            "bg-accent rounded-md w-7 font-bold text-white",
            updateProductMutation.isPending && "opacity-50"
          )}
          onClick={handleDecrement}
          disabled={updateProductMutation.isPending}
        >
          -
        </Button>
        <p className="text-center w-44">{title}</p>
        <p className="text-center">$ {price * quantity}</p>
      </section>

      <section className="flex w-full justify-end">
        <Button
          className={cn(
            "text-center p-1 rounded bg-accent text-white",
            removeProductMutation.isPending && "opacity-50"
          )}
          onClick={() => {
            handleRemoveProduct();
          }}
          disabled={removeProductMutation.isPending}
        >
          remove
        </Button>
      </section>
    </div>
  );
}

export default CartProduct;
