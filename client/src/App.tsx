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
import { loadInitialThings } from "./store/authUser";
import { useMounAndUnMount } from "./utils/hooks";

function App() {
  return (
    <Provider store={store}>
      <MainApplication />
    </Provider>
  );
}

function MainApplication() {
  useMounAndUnMount("main application");
  const dispatch = useDispatch();
  const { user } = useSelector<any, any>(state => state.auth);

  useEffect(() => {
    if (!user) return;

    dispatch<any>(loadInitialThings());
  }, [user]);

  return (
    <>
      <div className="App bg-slate-100 px-4 pb-4 h-fit">
        <BrowserRouter>
          <Routes>
            <Route path="/ecommerce-cart-deploy" element={<HomePage />} />
            <Route path="/ecommerce-cart-deploy/login" element={<Login />} />
            <Route path="/ecommerce-cart-deploy/signup" element={<SignUp />} />

            <Route path="/ecommerce-cart-deploy/cart" element={<CartPage />} />
            <Route
              path="/ecommerce-cart-deploy/profile"
              element={<Profile />}
            />
            <Route path="/ecommerce-cart-deploy/orders" element={<Order />} />
            <Route
              path="*"
              element={<Navigate replace to="/ecommerce-cart-deploy" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
