import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../store/store";
import { getOrdersService } from "../services/order";
import { DEFAULT_HEADERS, RequestStatus } from "../../../services/constants";
import { fetchProductsThunk } from "../../products/store/productSlice";
import { wait } from "../../../utils/wait";

interface OrderSliceType {
  status: RequestStatus;
  orders: any[] | null;
}

const initialOrders: OrderSliceType = {
  orders: [],
  status: RequestStatus.LOADING,
};

const fetchOrdersThunk = createAsyncThunk<any, any, { state: RootState }>(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    const result = await getOrdersService({
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    if (result.status === RequestStatus.ERROR) {
      return rejectWithValue(result);
    }
    return result.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrders,
  reducers: {
    loadInitialOrders(state, action) {
      state.orders = [...action.payload];
    },

    addOrder(state, action) {
      state.orders!!.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProductsThunk.pending, (state, action) => {
      state.status = RequestStatus.LOADING;
    });

    builder.addCase(fetchOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.status = RequestStatus.SUCCESS;
    });

    builder.addCase(fetchOrdersThunk.rejected, (state, action) => {
      state.orders = [];
      state.status = RequestStatus.ERROR;
    });
  },
});

const { loadInitialOrders, addOrder } = orderSlice.actions;

export { loadInitialOrders };
export type { OrderSliceType };

export default orderSlice.reducer;
export { fetchOrdersThunk };
