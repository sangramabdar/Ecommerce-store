import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

import store from "./store/store";
import Auth from "./components/Auth";
import { router } from "./pages/_routes";

function App() {
  return (
    <>
      <Provider store={store}>
        <Auth>
          <RouterProvider router={router}></RouterProvider>
        </Auth>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
