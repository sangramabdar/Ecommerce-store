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
import { getRequest } from "./services/requests";
import { BASE_URL, RequestStatus } from "./services/constants";
import Loading from "./components/Loading";
import { addUser, removeUser } from "./modules/authentication/store/authSlice";
import useAuthentication from "./hooks/useAuthentication";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <MainApplication />
    </Provider>
  );
}

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "products",
    element: <ProductsPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },
  {
    path: "products",
    element: <ProductsPage />,
  },
  {
    path: "products/:id",
    element: <ProductPage />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  {
    path: "checkout",
    element: <CheckoutPage />,
  },
  {
    path: "orders",
    element: (
      <Route element={<PrivateRoute />}>
        <OrderPage />
      </Route>
    ),
  },
  {
    path: "*",
    element: <Navigate replace to="/" />,
  },
];

function MainApplication() {
  useAuthentication();

  const { isAuthenticating } = useSelector<any, any>(state => state.auth);

  return (
    <>
      {isAuthenticating ? (
        <div className="bg-red-200 h-screen animate-bounce text-center flex justify-center items-center">
          Loading
        </div>
      ) : (
        <BrowserRouter>
          <div className="App bg-slate-100 px-4 pb-4 h-fit">
            <NavBar />
            <main className="mt-12">
              <AnimatePresence mode="wait">
                <Routes>
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
