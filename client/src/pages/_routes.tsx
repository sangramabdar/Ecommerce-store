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
import ProductsPage from "./products";
import ProductPage from "./products/[productId]";
import SignUpPage from "./signup";
import HomePage from "./index";
import RootPage from "./_app";
import NotFoundPage from "./404";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="products/:id" element={<ProductPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="orders" element={<OrderPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { router };
