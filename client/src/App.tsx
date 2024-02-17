import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

import Auth from "./components/auth";
import { router } from "./pages/_routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Auth>
          <RouterProvider router={router}></RouterProvider>
        </Auth>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
