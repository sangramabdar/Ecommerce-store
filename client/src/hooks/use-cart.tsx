import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../components/authentication/auth-provider";
import { getCartItemsService } from "../services/cart.service";

function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      return getCartItemsService();
    },
    retry: 0,
  });
}
export default useCart;
