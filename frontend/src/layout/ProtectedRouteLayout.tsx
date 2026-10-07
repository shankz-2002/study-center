import { useAuth } from "../context/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import type { RoleType } from "../types/User";
type ProtectedRouteLayoutProps = {
  allowedRoles: RoleType[];
};

function ProtectedRouteLayout({ allowedRoles }:ProtectedRouteLayoutProps) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
}

export default ProtectedRouteLayout;
