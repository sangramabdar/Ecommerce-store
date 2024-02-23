import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../components/auth";
import { addProductTocartSerivce } from "../cart/cart.service";

function useAddProductTocart() {
  const { user }: any = useAuthContext();

  const addProductMutation = useMutation({
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

  return addProductMutation;
}

export default useAddProductTocart;
