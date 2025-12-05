import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "../store";
import NotFound from "../pages/NotFound";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { token, role } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <NotFound />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
