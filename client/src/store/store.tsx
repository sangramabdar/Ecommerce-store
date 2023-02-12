import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../modules/products/store/productSlice";
import cartReducer from "../modules/cart/store/cartSlice";
import signedInUserReducer from "../modules/authentication/store/authSlice";
import orderReducer from "../modules/order/store/orderSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: signedInUserReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
