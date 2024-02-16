import { configureStore } from "@reduxjs/toolkit";
import productReducer, {
  productsApi,
} from "../features/products/product.slice";
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
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
