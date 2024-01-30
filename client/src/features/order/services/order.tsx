import { toast } from "react-toastify";
import {
  BASE_URL,
  DEFAULT_HEADERS,
  RequestStatus,
} from "../../../services/constants";
import { postRequest, getRequest } from "../../../services/requests";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { handleTokenError } from "../../../utils/tokenError";
import { emptyCart } from "../../cart/store/cartSlice";
import { loadInitialOrders } from "../store/orderSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

const ORDER_URL = BASE_URL + "/orders";

function placeOrderService(orderAddress: any) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const result = await postRequest(
      ORDER_URL,
      { orderAddress },
      {
        ...DEFAULT_HEADERS,
        Authorization: "Bearer " + getState().auth.user.accessToken,
      }
    );

    toast.dismiss();

    if (result.status === RequestStatus.ERROR) {
      handleTokenError(result.statusCode!!);
      showErrorToast("Something went wrong");
      return;
    }

    showSuccessToast("order placed");
    dispatch(getOrdersService());
    dispatch(emptyCart(""));
  };
}

const ORDERS_URL = BASE_URL + "/products";

const fetchOrdersService = createAsyncThunk<any, any, { state: RootState }>(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    const result = await getRequest(ORDERS_URL, {
      ...DEFAULT_HEADERS,
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    if (result.status === RequestStatus.ERROR) {
      return rejectWithValue(result);
    }
    return result.data.orders;
  }
);

function getOrdersService() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const result = await getRequest(ORDER_URL, {
      ...DEFAULT_HEADERS,
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    dispatch(loadInitialOrders(result.data.orders));
  };
}

export { getOrdersService, placeOrderService, fetchOrdersService };
