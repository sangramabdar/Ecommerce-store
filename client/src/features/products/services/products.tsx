import { BASE_URL, DEFAULT_HEADERS } from "../../../services/constants";
import { getRequest } from "../../../services/requests";
import { AppDispatch, RootState } from "../../../store/store";
import { setStatus, RequestStatus, saveProducts } from "../store/productSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";

const PRODUCTS_URL = BASE_URL + "/products";

const fetchProductsService = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    const result = await getRequest(PRODUCTS_URL, {
      ...DEFAULT_HEADERS,
    });

    if (result.status === RequestStatus.ERROR) {
      return thunkApi.rejectWithValue(result);
    }
    return result.data;
  }
);

function getProductsService() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    try {
      dispatch(setStatus(RequestStatus.LOADING));
      const result = await getRequest(PRODUCTS_URL);
      dispatch(setStatus(RequestStatus.SUCCESS));
      dispatch(saveProducts(result.data));
    } catch (error) {
      dispatch(setStatus(RequestStatus.ERROR));
    }
  };
}

export { getProductsService, fetchProductsService };
