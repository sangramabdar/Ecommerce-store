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
    element: <OrderPage />,
  },
  {
    path: "*",
    element: <Navigate replace to="/" />,
  },
];

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
              {routes.map((route: any) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
