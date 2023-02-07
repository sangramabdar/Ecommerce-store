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
import { useEffect } from "react";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import ProductsPage from "./pages/ProductsPage";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import { loadInitialThingsService } from "./modules/authentication/services/auth";

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

    dispatch<any>(loadInitialThingsService());
  }, [user]);

  return (
    <>
      <div className="App bg-slate-100 px-4 pb-4 h-fit">
        <NavBar />
        <main className="mt-12">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
