import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { useMounAndUnMount } from "./utils/hooks";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Provider store={store}>
      <MainApplication />
    </Provider>
  );
}

function MainApplication() {
  const dispatch = useDispatch();
  const user = useSelector<any, any>(state => state.auth.user);

  useEffect(() => {
    if (!user) return;

    dispatch<any>(loadInitialThings());
  }, [user]);

  return (
    <>
      <div className="App bg-slate-100 px-4 pb-4 h-fit">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Order />} />
            <Route path="*" element={<Navigate replace to="" />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
