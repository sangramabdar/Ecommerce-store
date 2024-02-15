import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import LoginPage from "./login";
import OrderPage from "./orders";
import ProductPage from "./products/[product-title]";
import SignUpPage from "./signup";
import RootPage from "./_app";
import NotFoundPage from "./not-found";
import HomePage from ".";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/products/:title" element={<ProductPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
      <Route path="not-found" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { router };
