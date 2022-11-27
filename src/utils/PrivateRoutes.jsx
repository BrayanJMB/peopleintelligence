import { Outlet, Navigate } from "react-router-dom";
import { getCompaniesAPI } from "../services/getCompanies.service";
import { useNavigate, useLocation } from "react-router-dom";

export default function PrivateRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  getCompaniesAPI(userInfo?.user).then((res) => {
    if (res.data.length === 0 && location.pathname !== "/infoadmin/Empresas") {
      alert("No tienes una compañía registrada, por favor registra una.");
      navigate("/infoadmin/Empresas");
    }
  });

  return userInfo && userInfo.role.findIndex((p) => p === "Registrado") < 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/noaccess" />
  );
}
