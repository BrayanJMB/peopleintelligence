import styles from "./CreateSurvey.module.css";
import Sidebar from "../../../Layout/Sidebar/Sidebar";
import Navbar from "../../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

export default function CreateSurvey() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Sidebar />
        <div style={{ backgroundColor: "white" }}>
          <div className={styles.content}>
            <div className={styles.survey_template}>
              <div className={styles.heading}>
                <DesignServicesIcon
                  sx={{
                    fontSize: "40px",
                    marginLeft: "0.5em",
                    color: "#03aae4",
                  }}
                />

                <div style={{ paddingRight: "1em" }} className={styles.text}>
                  <h1
                    style={{
                      fontSize: "24px",
                      letterSpacing: 0,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Crear una encuesta
                  </h1>
                </div>
              </div>
              <div className={styles.display}></div>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}
