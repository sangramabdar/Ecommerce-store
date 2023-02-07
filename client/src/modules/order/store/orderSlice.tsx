import { createSlice } from "@reduxjs/toolkit";
import { emptyCart } from "../../cart/store/cartSlice";
import { getRequest, postRequest } from "../../../services/requests";
import {
  BASE_URL,
  DEFAULT_HEADERS,
  RequestStatus,
} from "../../../services/constants";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { toast } from "react-toastify";
import { handleTokenError } from "../../../utils/tokenError";

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

const { loadInitialOrders, addOrder } = orderSlice.actions;

export { loadInitialOrders };

export default orderSlice.reducer;
