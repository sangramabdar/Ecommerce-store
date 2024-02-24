import { useMutation } from "@tanstack/react-query";
import { addProductTocartSerivce } from "../services/cart.service";

function useAddProductTocart() {
  const addProductMutation = useMutation({
    mutationFn: ({ productId, quantity }: any) =>
      addProductTocartSerivce({
        productId,
        quantity,
      }),
  });

  return addProductMutation;
}

export default useAddProductTocart;
