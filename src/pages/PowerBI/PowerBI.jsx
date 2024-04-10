import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";

import IconSidebar from "../../Layout/IconSidebar/IconSidebar";
import Navbar from "../../Layout/Navbar/Navbar";
import axios from "../../utils/axiosInstance";

import styles from "./PowerBI.module.css";
// Lifetime is 3600 sec/ 1 hour
export default function PowerBi() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const { idDashboard } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const decodeToken = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(base64);
  };
  // Creamos una tabla
  const accessToken = async () => {
    const storedResponses =
      JSON.parse(localStorage.getItem("powerBiResponses")) || {};
    const currentTime = new Date().getTime();

    if (storedResponses[idDashboard]) {
      const { expiry, ...rest } = storedResponses[idDashboard];
      if (currentTime < expiry) {
        setResponse(rest);
        return; // Token válido para el dashboard actual, no necesitamos hacer una nueva solicitud
      } else {
        // Opcional: Proceder a eliminar el token expirado si se desea
        delete storedResponses[idDashboard];
        localStorage.setItem("powerBiResponses", JSON.stringify(storedResponses));
      }
    }

    try {
      const res = await axios.get("PowerBy/" + idDashboard);
      if (
        res.data.powerBiEmbedToken === null ||
        res.data.powerBiReport === null
      ) {
        alert("El reporte no existe o está deshabilitado");
        navigate("/powerbi");
      } else {
        const responseToStore = {
          token: res.data.powerBiEmbedToken?.token,
          id: res.data.powerBiReport?.id,
          embedUrl: res.data.powerBiReport?.embedUrl,
          expiry: new Date().getTime() + 1000 * 60 * 60, // Asume duración de token de 1 hora
        };
        storedResponses[idDashboard] = responseToStore;
        localStorage.setItem(
          "powerBiResponses",
          JSON.stringify(storedResponses)
        );
        setResponse(responseToStore);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert("Este dashboard no está habilitado");
        navigate("/powerbi");
      }
    }
  };

  useEffect(() => {
    if (userInfo.role.findIndex((p) => p === "PowerBiDashboard") > -1) {
      accessToken();
    } else {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
    // Esto asume que decodeToken es una función sincrónica que decodifica el accessToken del usuario.
    setUserEmail(decodeToken(userInfo.accessToken));
  }, []); // Dependencias vacías para ejecutar solo en montaje

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <IconSidebar />
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <PowerBIEmbed
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual and qna
              id: response?.id,
              embedUrl: response?.embedUrl,
              accessToken: response?.token,
              tokenType: models.TokenType.Embed,
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
              },
              filters: [
                {
                  $schema: "http://powerbi.com/product/schema#basic",
                  target: {
                    table: "z_RLS", // Nombre de la tabla
                    column: "user_name", // Nombre de la columna a buscar
                  },
                  operator: "In", //Forma de busqueda
                  values: [userEmail.email], //Este es el valor a buscar
                },
              ],
            }}
            eventHandlers={
              new Map([
                [
                  "loaded",
                  function () {
                    console.log("Report loaded");
                  },
                ],
                [
                  "rendered",
                  function () {
                    console.log("Report rendered");
                  },
                ],
                [
                  "error",
                  function (event) {
                    console.log(event.detail);
                  },
                ],
              ])
            }
            cssClassName={styles.Embed_container}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </div>
      </div>
    </Box>
  );
}
