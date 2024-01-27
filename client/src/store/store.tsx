import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../modules/products/store/productSlice";
import cartReducer from "../modules/cart/store/cartSlice";
import signedInUserReducer from "../modules/authentication/store/authSlice";
import orderReducer from "../modules/order/store/orderSlice";

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
