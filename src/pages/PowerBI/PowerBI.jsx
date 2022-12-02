import axios from "../../utils/axiosInstance";
import styles from "./PowerBI.module.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Lifetime is 3600 sec/ 1 hour

export default function PowerBi() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const { idDashboard } = useParams();
  const accessToken = async () => {
    try {
      await axios.get("PowerBy/" + idDashboard).then((res) => {
        if (
          res.data.powerBiEmbedToken === null ||
          res.data.powerBiReport === null
        ) {
          alert("El reporte no existe o esta desahabilitado");
          navigate("/powerbi");
        }
        setResponse({
          token: res.data.powerBiEmbedToken?.token,
          id: res.data.powerBiReport?.id,
          embedUrl: res.data.powerBiReport?.embedUrl,
        });
      });
    } catch (e) {
      if (e.response.status === 400) {
        alert("Este dashborad no esta habilitado");
        navigate("/powerbi");
      }
    }
  };

  useEffect(() => {
    if (userInfo.role.findIndex((p) => p === "PowerBiDashboard") > -1) {
      if (response) {
        let timer1 = setInterval(() => accessToken(), 1000 * 60 * 60);
        return () => {
          clearInterval(timer1);
        };
      } else {
        accessToken();
      }
    } else {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
  }, [response]);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
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
