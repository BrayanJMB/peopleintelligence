import styles from "./CreateSurvey.module.css";
import Sidebar from "../../../Layout/Sidebar/Sidebar";
import Navbar from "../../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Introduction from "./Introduction/Introduction";
import Cuestionario from "./Cuestionario/Cuestionario";
import Intimidad from "./Intimidad/Intimidad.jsx";
import { useState } from "react";

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});
const steps = ["Introduccion", "Cuestionario", "Intimidad"];

export default function CreateSurvey() {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ title: "", description: "" });

  const handleCerrar = () => {
    let validate = true;
  };
  const handlechange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const renderSwitch = (activeStep) => {
    switch (activeStep) {
      case 0:
        return <Introduction data={data} handleChange={handlechange} />;
      case 1:
        return <Cuestionario />;
      case 2:
        return <Intimidad data={data} />;
      default:
        return null;
    }
  };

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
              <div className={styles.data}>
                <div className={styles.display}>
                  <Stepper activeStep={activeStep} className={styles.stepper}>
                    {steps.map((label, index) => {
                      return (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </div>
                <div className={styles.display}>{renderSwitch(activeStep)}</div>
                <div
                  className={styles.display}
                  style={{ position: "sticky", bottom: 0 }}
                >
                  <div className={styles.impexp}>
                    <Button variant="text" onClick={handleCerrar}>
                      Cerrar
                    </Button>
                    <Button variant="contained">Continuar</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}
