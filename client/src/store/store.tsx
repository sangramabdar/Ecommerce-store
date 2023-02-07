import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../modules/products/store/product";
import cartReducer from "../modules/cart/store/cart";
import signedInUserReducer from "../modules/auth/store/auth";
import orderReducer from "../modules/order/store/order";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: signedInUserReducer,
    order: orderReducer,
  },
});

export default store;
