import { getRequest } from "../../../services/requests";
import { setStatus, STATUS, saveProducts } from "../store/productSlice";
import { RootState, AppDispatch } from "../../../store/store";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

function getProductsService() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
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
