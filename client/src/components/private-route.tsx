import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "./auth";

function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return <Navigate to="/" />;

  return <Outlet />;
}

export default PrivateRoute;
