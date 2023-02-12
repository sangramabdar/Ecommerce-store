import { createSlice } from "@reduxjs/toolkit";

interface OrderSliceType {
  orders: any;
}

const initialOrders: OrderSliceType = {
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
export type { OrderSliceType };

export default orderSlice.reducer;
