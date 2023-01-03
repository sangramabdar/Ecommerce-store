import { createSlice } from "@reduxjs/toolkit";
import { emptyCart } from "./cart";
import { getRequest, postRequest } from "../api/requests";
import { BASE_URL, DEFAULT_HEADERS } from "../api/constants";
import { showSuccessToast } from "../utils/toast";
import { toast } from "react-toastify";

const initialOrders: {
  orders: any;
} = {
  orders: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrders,
  reducers: {
    loadInitialOrders(state, action) {
      state.orders = [...action.payload];
    },

    addOrder(state, action) {
      if (!state.orders) state.orders = [];
      state.orders.push(action.payload);
    },
  },
});

function placeOrderService() {
  return async function (dispatch: any, getState: any) {
    const ORDER_URL = BASE_URL + "/orders";
    const result = await postRequest(
      ORDER_URL,
      {},
      {
        ...DEFAULT_HEADERS,
        Authorization: "Bearer " + getState().auth.user.accessToken,
      }
    );

    toast.dismiss();
    showSuccessToast("order placed");
    dispatch(addOrder({ id: result.data.orderId }));
    dispatch(emptyCart(""));
  };
}

function getOrdersService() {
  return async function (dispatch: any, getState: any) {
    const ORDER_URL = BASE_URL + "/orders";
    const result = await getRequest(ORDER_URL, {
      ...DEFAULT_HEADERS,
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    dispatch(loadInitialOrders(result.data.orders));
  };
}

const { loadInitialOrders, addOrder } = orderSlice.actions;

export { placeOrderService, getOrdersService };

export default orderSlice.reducer;
