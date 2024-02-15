import { toast } from "react-toastify";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE_URL,
  DEFAULT_HEADERS,
  RequestStatus,
} from "../../services/constants";
import { postRequest, getRequest } from "../../services/requests";
import { AppDispatch, RootState } from "../../store/store";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { handleTokenError } from "../../utils/tokenError";
import { loadInitialOrders } from "./order.slice";

const ORDER_URL = BASE_URL + "/orders";

function placeOrderService(orderAddress: any) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const result = await postRequest(
      ORDER_URL,
      {
        ...orderAddress,

        pincode: 222000,
      },
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
    // dispatch(getOrdersService());
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

async function getOrdersService(headers: {} = {}) {
  const result = await getRequest(ORDER_URL, {
    ...headers,
  });
  return result;
}

export { getOrdersService, placeOrderService, fetchOrdersService };
