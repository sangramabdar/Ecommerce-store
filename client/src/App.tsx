import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import SignUpPage from "./pages/SignUpPage";
import store from "./store/store";
import Auth from "./components/Auth";

function App() {
  return (
    <>
      <Provider store={store}>
        <Auth>
          <BrowserRouter>
            <NavBar />
            <main className="mt-24bg-primary max-w-7xl mx-auto px-4 sm:px-8">
              {/* <AnimatePresence mode="wait"> */}
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
                <Route path="*" element={<ProductsPage />} />
              </Routes>
              {/* </AnimatePresence> */}
            </main>
          </BrowserRouter>
        </Auth>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
