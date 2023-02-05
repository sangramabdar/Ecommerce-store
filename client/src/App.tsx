import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Order from "./components/Order";
import { useEffect } from "react";
import { loadInitialThings } from "./store/auth";

import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import ProductsPage from "./pages/ProductsPage";
import { AnimatePresence, Variants } from "framer-motion";

const variants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    x: "100%",
  },
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainApplication />
      </BrowserRouter>
    </Provider>
  );
}

function MainApplication() {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector<any, any>(state => state.auth.user);

  useEffect(() => {
    if (!user) return;

    dispatch<any>(loadInitialThings());
  }, [user]);

  return (
    <>
      <div className="App bg-slate-100 px-4 pb-4 h-fit">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </AnimatePresence>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
