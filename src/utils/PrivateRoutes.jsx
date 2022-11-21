import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo.role === "Registrado") {
    alert(
      "No tiene acceso ningún servicio, por favor comuncarse con el adminitrador"
    );
    window.location.replace(
      "https://pruebaapib2c.b2clogin.com/PruebaAPib2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignInSingUp&client_id=eebc60fc-d861-4c0e-ac9f-20ae8577c9f9&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fhappy-island-0e573c910.2.azurestaticapps.net&scope=https%3A%2F%2FPruebaAPib2c.onmicrosoft.com%2Feebc60fc-d861-4c0e-ac9f-20ae8577c9f9%2FFiles.Read&response_type=token&prompt=login"
    );
  }

  return userInfo && userInfo.role !== "Registrado" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
