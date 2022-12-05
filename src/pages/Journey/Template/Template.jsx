import styles from "./Template.module.css";
import IconSidebar from "../../../Layout/IconSidebar/IconSidebar";
import Navbar from "../../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { getTemplatesAPI } from "../../../services/getTemplates.service";

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

const datatemplates = [
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 1,
  },
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 2,
  },
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 3,
  },
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 4,
  },
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 5,
  },
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 6,
  },
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 7,
  },
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 8,
  },
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 9,
  },
  {
    title: "Encuesta del dia 30",
    description:
      "Controle a los nuevos empleados sobre su experiencia de incorporación y aprendizaje durante el primer mes después de unirse.",
    icon: InsertEmoticonIcon,
    templateUrl: "",
    id: 10,
  },
];

export default function Template() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState([]);

  const handleGoBack = () => {
    navigate("/journey");
  };
  const handleCreateSurvey = () => {
    if (userInfo?.role.findIndex((p) => p === "Administrador") > -1) {
      navigate("/journey/create-survey");
    }
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === "Journey") < 0 &&
      userInfo?.role.findIndex((p) => p === "Administrador") < 0
    ) {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
    getTemplatesAPI().then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <IconSidebar />
        <div style={{ backgroundColor: "white" }}>
          <div className={styles.content}>
            <div className={styles.survey_template}>
              <div className={styles.heading}>
                <IconButton
                  style={{ marginRight: "1rem" }}
                  onClick={handleGoBack}
                >
                  <KeyboardBackspaceIcon sx={{ fontSize: "30px" }} />
                </IconButton>
                <div style={{ paddingRight: "1em" }} className={styles.text}>
                  <h1
                    style={{
                      fontSize: "24px",
                      letterSpacing: 0,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Plantilla de encuesta
                  </h1>
                </div>
              </div>
              <div className={styles.templates}>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Empezar desde el principio
                </p>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "6em" }}
                >
                  <div className={styles.template} onClick={handleCreateSurvey}>
                    <div className={styles.title}>
                      <AddCircleOutlineIcon /> <p>Crea tu plantilla</p>
                    </div>
                    <div className={styles.description}>
                      Cree su propia plantilla personalizada desde cero.
                    </div>
                    <div className={styles.create}>
                      <p>Crea plantilla</p>
                      <KeyboardArrowRightIcon />
                    </div>
                  </div>
                  <div className={styles.template} onClick={handleCreateSurvey}>
                    <div className={styles.title}>
                      <AddCircleOutlineIcon /> <p>Crea tu propia encuesta</p>
                    </div>
                    <div className={styles.description}>
                      Cree su propia encuesta personalizada desde cero.
                    </div>
                    <div className={styles.create}>
                      <p>Crea ahora</p>
                      <KeyboardArrowRightIcon />
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                    letterSpacing: "0.5px",
                  }}
                >
                  O usa una plantilla
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "1em",
                    flexWrap: "wrap",
                  }}
                >
                  {data.map((val, key) => {
                    let Icon = datatemplates[key].icon;
                    return (
                      <div key={val.id} className={styles.template}>
                        <div className={styles.title}>
                          <Icon /> {val.nameSurvey}
                        </div>
                        <div className={styles.description}>
                          {val.descriptionSurvey}
                        </div>
                        <div className={styles.bottom}>
                          <p>Usa esta plantilla</p>
                          <KeyboardArrowRightIcon />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}
