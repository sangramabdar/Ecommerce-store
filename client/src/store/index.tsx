import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/product.slice";
import cartReducer from "../features/cart/cart.slice";
import signedInUserReducer from "../features/authentication/auth.slice";
import orderReducer from "../features/order/order.slice";

import logger from "redux-logger";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: signedInUserReducer,
    order: orderReducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
