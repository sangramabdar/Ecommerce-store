import { getRequest } from "../../../services/requests";
import { setStatus, STATUS, saveProducts } from "../store/productSlice";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

function getProductsService() {
  return async function (dispatch: any, getState: any) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const result = await getRequest(PRODUCTS_URL);
      dispatch(setStatus(STATUS.SUCCESS));
      dispatch(saveProducts(result.data));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}

export { getProductsService };
