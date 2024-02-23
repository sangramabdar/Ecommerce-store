import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../components/auth";
import { getCartItemsService } from "./cart.service";

function useCart() {
  const { user }: any = useAuthContext();

  return useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      return getCartItemsService({
        Authorization: "Bearer " + user.accessToken,
      });
    },
    enabled: !!user?.accessToken,
    retry: 0,
  });
}
export default useCart;
