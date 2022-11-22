import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo?.role === "Registrado") {
    alert(
      "No tiene acceso ningún servicio, por favor comuncarse con el adminitrador"
    );
    window.location.replace(
      "https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login"
    );
  }

  return userInfo && userInfo.role !== "Registrado" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
