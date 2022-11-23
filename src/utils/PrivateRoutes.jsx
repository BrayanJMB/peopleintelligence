import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return userInfo && userInfo?.role !== "Registrado" ? (
    <Outlet />
  ) : (
    <Navigate to="/noaccess" />
  );
}
