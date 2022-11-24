import Sidebar from "../../Layout/Sidebar/Sidebar";
import Navbar from "../../Layout/Navbar/Navbar";
import styles from "./Journey.module.css";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import starIcon from "../../assets/icons/star_icon.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Card from "../../components/CardSlider/CardSlider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJourneyMapAPI } from "../../services/getJourneyMap.service";
import enps from "../../assets/enps.svg";
import empleados from "../../assets/empleados.svg";
import last from "../../assets/last.svg";
import pulso from "../../assets/pulso.svg";

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

const dataSlider = [
  {
    icon: TroubleshootIcon,
  },
  {
    icon: TipsAndUpdatesIcon,
  },
  {
    icon: TouchAppIcon,
  },
  {
    icon: SettingsInputCompositeIcon,
  },
  {
    icon: PsychologyIcon,
  },
  {
    icon: MeetingRoomIcon,
  },
  {
    icon: RecordVoiceOverIcon,
  },
  {
    icon: RecordVoiceOverIcon,
  },
  {
    icon: MeetingRoomIcon,
  },
  {
    icon: SettingsInputCompositeIcon,
  },
  {
    icon: TipsAndUpdatesIcon,
  },
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

const settings = {
  className: "center",
  adaptiveHeight: true,
  centerMode: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  dots: true,
  infinity: true,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        className: "center",
        adaptiveHeight: true,
        centerMode: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

export default function Journey() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState([]);

  const handleExplorar = () => {
    navigate("/journey/survey-template");
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === "Journey") < 0 &&
      userInfo?.role.findIndex((p) => p === "Administrador") < 0
    ) {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
    getJourneyMapAPI().then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Sidebar />
        <div style={{ backgroundColor: "white" }}>
          <div className={styles.content}>
            <div className={styles.journey}>
              <div className={styles.heading}>
                <div style={{ paddingRight: "16px" }}>
                  <img src={starIcon} alt="" className={styles.icon} />
                </div>
                <div style={{ paddingRight: "1em" }} className={styles.text}>
                  <h1
                    style={{
                      fontSize: "24px",
                      letterSpacing: 0,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Encuestas del ciclo de vida de los empleados
                  </h1>
                </div>
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
              <div className={styles.slider}>
                <Slider {...settings}>
                  {data.map((val, key) => {
                    return (
                      <Card
                        key={key}
                        title={val.mapJourney}
                        content={val.description}
                        icon={dataSlider[key].icon}
                      />
                    );
                  })}
                </Slider>
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
