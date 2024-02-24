import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../components/authentication/auth-provider";
import { addProductTocartSerivce } from "../services/cart.service";

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
