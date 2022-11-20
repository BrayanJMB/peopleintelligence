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

export default function Dashboard() {
  const navigate = useNavigate();
  const handleOnas = () => {
    navigate("/onas");
  };
  const handlePowerBI = () => {
    navigate("/powerbi");
  };
  const handleConversation = () => {
    navigate("/conversation/Build");
  };
  const handleJourney = () => {
    navigate("/journey");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <div className={styles.cases}>
            <div className={styles.case}>
              <div className={styles.project}>
                <div>
                  <img src={Iletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Information Management</div>
                <div className={styles.subtitle}>
                  Módulo de carga y administración de bases de datos
                </div>
              </div>
              <div className={styles.project} onClick={handlePowerBI}>
                <div>
                  <img src={Aletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>
                  Advanced Analytics & Dashboards
                </div>
                <div className={styles.subtitle}>
                  Tableros interactivos de información corporativa
                </div>
              </div>
              <div className={styles.project} onClick={handleOnas}>
                <div>
                  <img src={Oletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>
                  Organizational Network Analysis
                </div>
                <div className={styles.subtitle}>
                  Análisis de Redes Organizacionales
                </div>
              </div>
            </div>
            <div className={styles.case}>
              <div className={styles.project} onClick={handleConversation}>
                <div>
                  <img src={Dletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Dynamic Live Conversations</div>
                <div className={styles.subtitle}>
                  Herramienta de conversaciones virtuales masivas con
                  inteligencia artificial
                </div>
              </div>
              <div className={styles.project} onClick={handleJourney}>
                <div>
                  <img src={Jletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Employee Journey</div>
                <div className={styles.subtitle}>
                  Medición del ciclo de experiencia del colaborador
                </div>
                <div className={styles.sticker}>En Diseño</div>
              </div>
              <div className={styles.project}>
                <div>
                  <img src={Sletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Sentiment Analysis</div>
                <div className={styles.subtitle}>
                  Medición y análisis de sentimientos de los colaboradores
                </div>
                <div className={styles.sticker}>En Diseño</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
