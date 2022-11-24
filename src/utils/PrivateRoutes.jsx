import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return userInfo && userInfo.role.findIndex((p) => p === "Registrado") < 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/noaccess" />
  );
}
