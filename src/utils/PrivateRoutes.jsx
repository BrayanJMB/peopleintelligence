import { Outlet, Navigate } from "react-router-dom";
import { getCompaniesAPI } from "../services/getCompanies.service";
import { useNavigate, useLocation } from "react-router-dom";

export default function PrivateRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    window.location.replace(
      "https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fsuite.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login"
      );

  }
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
