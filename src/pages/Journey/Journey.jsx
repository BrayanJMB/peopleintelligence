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

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

const data = [
  {
    title: "Hire",
    content: ["Pick stars", "more text"],
    icon: TroubleshootIcon,
  },
  {
    title: "Onboard",
    content: ["Affirm the decision", "more text"],
    icon: TipsAndUpdatesIcon,
  },
  {
    title: "Engage",
    content: ["Build purpose and strength", "more text"],
    icon: TouchAppIcon,
  },
  {
    title: "Perform",
    content: ["Drive expectations", "more text"],
    icon: SettingsInputCompositeIcon,
  },
  {
    title: "Develop",
    content: ["Coach career", "more text"],
    icon: PsychologyIcon,
  },
  {
    title: "Depart",
    content: ["Positive exit experience", "more text"],
    icon: MeetingRoomIcon,
  },
  {
    title: "Attract",
    content: ["Recruit top talent", "more text"],
    icon: RecordVoiceOverIcon,
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

  const handleExplorar = () => {
    navigate("/journey/survey-template");
  };

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
                        title={val.title}
                        content={val.content}
                        icon={val.icon}
                      />
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}
