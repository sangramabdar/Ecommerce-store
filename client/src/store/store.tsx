import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/store/cartSlice";
import signedInUserReducer from "../features/authentication/authSlice";
import orderReducer from "../features/order/store/orderSlice";

import logger from "redux-logger";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: signedInUserReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
