import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import PrivateRoute from "../components/private-route";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import LoginPage from "./login";
import ProductPage from "./products/[productId]";
import SignUpPage from "./signup";
import RootPage from "./_app";
import NotFoundPage from "./not-found";
import HomePage from ".";
import ProfilePage from "./account/profile";
import OrdersPage from "./account/orders";
import SuccessPage from "./checkout/success";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/account">
          <Route path="" element={<Navigate to="profile" />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<SuccessPage />} />
      </Route>
      <Route path="not-found" element={<NotFoundPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Route>
  )
);

export { router };
