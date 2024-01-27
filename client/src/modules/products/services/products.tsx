import { getRequest } from "../../../services/requests";
import { setStatus, STATUS, saveProducts } from "../store/productSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, DEFAULT_HEADERS } from "../../../services/constants";

const PRODUCTS_URL = BASE_URL + "/products";

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const result = await getRequest(PRODUCTS_URL, {
    ...DEFAULT_HEADERS,
  });
  console.log(result.data);
  return result.data;
});

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

export { getProductsService, fetchProducts };
