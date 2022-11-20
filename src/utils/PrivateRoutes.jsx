import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? <Outlet /> : <Navigate to="/" />;
}
