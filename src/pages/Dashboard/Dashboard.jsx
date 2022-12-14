import styles from "./Dashboard.module.css";
import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Iletter from "../../assets/icons/Iletter.png";
import Aletter from "../../assets/icons/Aletter.png";
import Oletter from "../../assets/icons/Oletter.png";
import Dletter from "../../assets/icons/Dletter.png";
import Jletter from "../../assets/icons/Jletter.png";
import Sletter from "../../assets/icons/Sletter.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import { useEffect } from "react";
import axios from "../../utils/axiosInstance";

export default function Dashboard() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleOnas = (e) => {
    if (
      userInfo?.role.findIndex((p) => p === "Onas") > -1 ||
      userInfo?.role.findIndex((p) => p === "Administrador") > -1
    ) {
      navigate("/onas");
    } else {
      e.preventDefault();
    }
  };
  const handlePowerBI = (e) => {
    if (userInfo?.role.findIndex((p) => p === "PowerBiDashboard") > -1) {
      navigate("/powerbi");
    } else {
      e.preventDefault();
    }
  };
  const handleConversation = (e) => {
    if (
      userInfo?.role.findIndex((p) => p === "Dinamyc") > -1 ||
      userInfo?.role.findIndex((p) => p === "Administrador") > -1
    ) {
      navigate("/conversation/Build");
    } else {
      e.preventDefault();
    }
  };
  const handleJourney = (e) => {
    if (
      userInfo?.role.findIndex((p) => p === "Journey") > -1 ||
      userInfo?.role.findIndex((p) => p === "Administrador") > -1
    ) {
      let data = companyConsume(userInfo.user);
      if (data.length === 0) {
        navigate("infoadmin/Empresas");
      } else {
        navigate("/journey");
      }
    } else {
      e.preventDefault();
    }
  };
  const companyConsume = async (id) => {
    try {
      await axios.get("companias/GetCompanias/" + id).then((res) => {
        return res.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <div className={styles.cases}>
            <div className={styles.case}>
              <div
                className={styles.project}
                style={{
                  backgroundColor:
                    userInfo?.role.findIndex((p) => p === "Management") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "grey",
                  cursor:
                    userInfo?.role.findIndex((p) => p === "Management") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "default",
                }}
              >
                <div>
                  <img src={Iletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Information Management</div>
                <div className={styles.subtitle}>
                  M??dulo de carga y administraci??n de bases de datos
                </div>
              </div>
              <div
                className={styles.project}
                onClick={handlePowerBI}
                style={{
                  backgroundColor:
                    userInfo?.role.findIndex((p) => p === "PowerBiDashboard") >
                    -1
                      ? ""
                      : "grey",
                  cursor:
                    userInfo?.role.findIndex((p) => p === "PowerBiDashboard") >
                    -1
                      ? ""
                      : "default",
                }}
              >
                <div>
                  <img src={Aletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>
                  Advanced Analytics & Dashboards
                </div>
                <div className={styles.subtitle}>
                  Tableros interactivos de informaci??n corporativa
                </div>
              </div>
              <div
                className={styles.project}
                onClick={handleOnas}
                style={{
                  backgroundColor:
                    userInfo?.role.findIndex((p) => p === "Onas") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "grey",
                  cursor:
                    userInfo?.role.findIndex((p) => p === "Onas") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "default",
                }}
              >
                <div>
                  <img src={Oletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>
                  Organizational Network Analysis
                </div>
                <div className={styles.subtitle}>
                  An??lisis de Redes Organizacionales
                </div>
              </div>
            </div>
            <div className={styles.case}>
              <div
                className={styles.project}
                onClick={handleConversation}
                style={{
                  backgroundColor:
                    userInfo?.role.findIndex((p) => p === "Dinamyc") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "grey",
                  cursor:
                    userInfo?.role.findIndex((p) => p === "Dinamyc") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "default",
                }}
              >
                <div>
                  <img src={Dletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Dynamic Live Conversations</div>
                <div className={styles.subtitle}>
                  Herramienta de conversaciones virtuales masivas con
                  inteligencia artificial
                </div>
              </div>
              <div
                className={styles.project}
                onClick={handleJourney}
                style={{
                  backgroundColor:
                    userInfo?.role.findIndex((p) => p === "Journey") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "grey",
                  cursor:
                    userInfo?.role.findIndex((p) => p === "Journey") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "default",
                }}
              >
                <div>
                  <img src={Jletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Employee Journey</div>
                <div className={styles.subtitle}>
                  Medici??n del ciclo de experiencia del colaborador
                </div>
                <div className={styles.sticker}>En Dise??o</div>
              </div>
              <div
                className={styles.project}
                style={{
                  backgroundColor:
                    userInfo?.role.findIndex((p) => p === "Sentimental") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "grey",
                  cursor:
                    userInfo?.role.findIndex((p) => p === "Sentimental") > -1 ||
                    userInfo?.role.findIndex((p) => p === "Administrador") > -1
                      ? ""
                      : "default",
                }}
              >
                <div>
                  <img src={Sletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Sentiment Analysis</div>
                <div className={styles.subtitle}>
                  Medici??n y an??lisis de sentimientos de los colaboradores
                </div>
                <div className={styles.sticker}>En Dise??o</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
