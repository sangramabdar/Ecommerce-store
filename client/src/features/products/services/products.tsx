import { getRequest } from "../../../services/requests";
import { setStatus, STATUS, saveProducts } from "../store/productSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE_URL,
  DEFAULT_HEADERS,
  RequestStatus,
} from "../../../services/constants";

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
      dispatch(setStatus(STATUS.LOADING));
      const result = await getRequest(PRODUCTS_URL);
      dispatch(setStatus(STATUS.SUCCESS));
      dispatch(saveProducts(result.data));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}

export { getProductsService, fetchProductsService };
