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
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});
const steps = ["Introduccion", "Cuestionario", "Intimidad"];

export default function CreateSurvey() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestions] = useState([{ type: "text" }]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ title: "", description: "" });
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const handleContinuar = () => {
    let helperText = {};
    let error = {};
    let bad = false;
    if (data.title.length < 5) {
      helperText.title = "Se requiere un mínimo de 5 caracteres.";
      error.title = true;
      bad = true;
    } else {
      helperText.title = "";
      error.title = false;
    }
    if (data.description.length < 5) {
      helperText.description = "Se requiere un mínimo de 5 caracteres.";
      error.description = true;
      bad = true;
    } else {
      helperText.description = "";
      error.description = false;
    }
    if (bad) {
      setErrorMessage(error);
      setHelperText(helperText);
    } else {
      setErrorMessage({});
      setHelperText({});
      setActiveStep(1);
      setOpen(true);
    }
  };
  const handleCerrar = () => {
    if (activeStep === 0) {
      navigate("/journey");
    } else if (activeStep === 1) {
      setActiveStep((val) => val - 1);
    }
  };
  const handlechange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const renderSwitch = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          <Introduction
            data={data}
            handleChange={handlechange}
            errorMessage={errorMessage}
            helperText={helperText}
          />
        );
      case 1:
        return <Cuestionario questions={questions} />;
      case 2:
        return <Intimidad data={data} />;
      default:
        return null;
    }
  };
  const handleCloseModal = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modal}>
            <div className={styles.modaltop}>
              <div>
                <IconButton onClick={handleCloseModal}>
                  <ClearIcon sx={{ fontSize: "40px" }} />
                </IconButton>
              </div>
            </div>
            <div className={styles.modalbuttom}>
              <h3 style={{ fontWeight: "500" }}>Agregar pregunta</h3>
            </div>
          </Box>
        </Modal>
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
                      {activeStep === 0 ? "Cerrar" : "atras"}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleContinuar}
                      disabled={activeStep !== 0 && questions.length === 0}
                    >
                      Continuar
                    </Button>
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
