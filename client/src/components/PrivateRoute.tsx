import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

function PrivateRoute() {
  const { isAuthenticated } = useSelector<RootState, any>(state => state.auth);

  if (!isAuthenticated) return <Navigate to="/" />;

  return <Outlet />;
}

export default PrivateRoute;
