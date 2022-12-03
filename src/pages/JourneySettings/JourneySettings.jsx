import IconSidebar from "../../Layout/IconSidebar/IconSidebar";
import Navbar from "../../Layout/Navbar/Navbar";
import styles from "./JourneySettings.module.css";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import starIcon from "../../assets/icons/star_icon.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import enps from "../../assets/enps.svg";
import empleados from "../../assets/empleados.svg";
import last from "../../assets/last.svg";
import pulso from "../../assets/pulso.svg";
import encuesta from "../../assets/icons/encuesta.png";

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

const encuestaCard = [
  {
    icon: encuesta,
    title: "fgfgfggfg",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
  },
  { icon: encuesta, title: "fgfgfggfg", description: "dfgdfgdfdfg" },
  { icon: encuesta, title: "fgfgfggfg", description: "dfgdfgdfdfg" },
  { icon: encuesta, title: "fgfgfggfg", description: "dfgdfgdfdfg" },
];

const cards = [
  {
    image: enps,
    title: "Encuesta eNPS",
    description:
      "Conozca el puntaje neto de promotor de empleados de su organización a través de una encuesta rápida",
  },
  {
    image: pulso,
    title: "Encuesta de pulso de empleados",
    description:
      "Comprenda las palancas de compromiso en detalle e impulse mejoras en toda su organización.",
  },
  {
    image: empleados,
    title: "Encuesta del Día 7 de Incorporación de Empleados",
    description:
      "Obtenga comentarios sobre el proceso de incorporación de nuevos empleados después de que los empleados completen 7 días en la organización.",
  },
  {
    image: last,
    title: "Encuesta del día 30 de incorporación de empleados",
    description:
      "Dar seguimiento a la encuesta del día 7 para conocer la experiencia de los nuevos empleados luego de cumplir 30 días en la organización",
  },
];

export default function JourneySettings() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleExplorar = () => {
    navigate("/journey/survey-template");
  };

  const handleSettings = () => {
    navigate("/journeysettings");
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === "Journey") < 0 &&
      userInfo?.role.findIndex((p) => p === "Administrador") < 0
    ) {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <IconSidebar />
        <div style={{ backgroundColor: "white" }}>
          <div className={styles.content}>
            <div className={styles.journey}>
              <div className={styles.heading}>
                <Button
                  variant="contained"
                  className={styles.explorar}
                  style={{
                    color: "white",
                    marginRight: "1.5em",
                  }}
                  color="blue"
                  onClick={handleSettings}
                >
                  Journey Settings
                </Button>
                <Button
                  variant="contained"
                  className={styles.explorar}
                  style={{
                    color: "white",
                  }}
                  color="blue"
                  onClick={handleExplorar}
                >
                  Explorar plantillas
                </Button>
              </div>

              <div className={styles.templates}>
                {cards.map((val, key) => {
                  return (
                    <div key={key} className={styles.card}>
                      <img
                        src={val.image}
                        alt=""
                        width="146"
                        height="81"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                      <p
                        style={{
                          fontSize: "18px",
                          letterSpacing: "0.5px",
                          fontWeight: "500",
                        }}
                      >
                        {val.title}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          letterSpacing: "0.25px",
                          fontWeight: "300",
                        }}
                      >
                        {val.description}
                      </p>
                      <Button
                        variant="outlined"
                        style={{
                          color: "#03aae4",
                          width: "30%",
                          alignSelf: "flex-end",
                        }}
                        color="blue"
                      >
                        Empezar
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}
