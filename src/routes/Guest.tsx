import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store";

const GuestRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
