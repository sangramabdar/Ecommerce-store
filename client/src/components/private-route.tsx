import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./authentication/auth-provider";

function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <Outlet />;
}

export default PrivateRoute;
