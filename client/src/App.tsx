import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import ProductsPage from "./pages/ProductsPage";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import useAuthentication from "./hooks/useAuthentication";
import PrivateRoute from "./components/PrivateRoute";
import AppLoading from "./components/AppLoading";

function App() {
  return (
    <Provider store={store}>
      <MainApplication />
    </Provider>
  );
}

function MainApplication() {
  useAuthentication();

  const { isAuthenticating } = useSelector<any, any>(state => state.auth);

  return (
    <>
      {isAuthenticating ? (
        <AppLoading />
      ) : (
        <BrowserRouter>
          <div className="App bg-slate-100 px-4 pb-4 h-fit">
            <NavBar />
            <main className="mt-12">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<ProductsPage />} />
                  {/* <Route path="products" element={<ProductsPage />} /> */}
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignUpPage />} />
                  <Route path="products/:id" element={<ProductPage />} />
                  <Route element={<PrivateRoute />}>
                    <Route path="orders" element={<OrderPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                  </Route>
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </BrowserRouter>
      )}

      <ToastContainer />
    </>
  );
}

export default App;
