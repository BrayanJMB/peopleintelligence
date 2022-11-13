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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Form from "../../../components/Form/Form";
import * as uuid from "uuid";

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});
const steps = ["Introduccion", "Cuestionario", "Intimidad"];
const types = [
  "Texto corto",
  "Escala Likert",
  "Opcion multipe",
  "Opcion multipe con imagenes",
  "Calificaciones",
];

export default function CreateSurvey() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ title: "", description: "" });
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [information, setInformation] = useState({
    type: "",
    name: "",
    description: "",
  });
  const [anonyme, setAnonyme] = useState(true);

  const handleContinuar = () => {
    if (activeStep === 0) {
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
        setOpen(true);
        setActiveStep(1);
      }
    } else if (activeStep === 1) {
      setActiveStep((val) => val + 1);
    } else if (activeStep === 2) {
      console.log("submit to api");
    }
  };
  const handleCerrar = () => {
    if (activeStep === 0) {
      navigate("/journey");
    } else {
      setActiveStep((val) => val - 1);
    }
  };
  const handlechange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleinformation = (event) => {
    setInformation({ ...information, [event.target.name]: event.target.value });
  };
  const handleAdd = () => {
    setOpen(true);
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
        return (
          <Cuestionario
            questions={questions}
            onEnd={onEnd}
            handleAdd={handleAdd}
            handleDelete={handledelete}
          />
        );
      case 2:
        return <Intimidad anonyme={anonyme} handleAnonyme={handleanonyme} />;
      default:
        return null;
    }
  };
  const handleCloseModal = () => setOpen(false);
  const handleanonyme = (event) => {
    setAnonyme(event.target.value);
  };

  const reorder = (list, start, end) => {
    const result = Array.from(list);
    const [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);
    return result;
  };
  const onEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      questions,
      result.source.index,
      result.destination.index
    );
    setQuestions(reorderedItems);
  };
  const handleAutocomplete = (val) => {
    setInformation({ ...information, type: val });
  };
  const handleAgregar = () => {
    let helperText = {};
    let error = {};
    let bad = false;
    if (information.name.length < 5) {
      helperText.name = "Se requiere un mínimo de 5 caracteres.";
      error.name = true;
      bad = true;
    } else {
      helperText.name = "";
      error.name = false;
    }
    if (bad) {
      setErrorMessage(error);
      setHelperText(helperText);
    } else {
      setErrorMessage({});
      setHelperText({});
      handleAddQuestion(information);
      setInformation({
        type: "",
        name: "",
        description: "",
      });
      handleCloseModal();
    }
  };
  const handleAddQuestion = (question) => {
    let tmp = [...questions];
    let holder = question;
    holder.id = uuid.v4();
    tmp.push(question);
    setQuestions(tmp);
  };

  const handledelete = (key) => {
    let tmp = [...questions];
    tmp.splice(key, 1);
    setQuestions(tmp);
  };

  useEffect(() => {
    setQuestions(questions);
  }, [questions]);

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
              <div className={styles.form}>
                <div className={styles.input}>
                  <Autocomplete
                    id="combo-box-demo"
                    style={{ flexBasis: "40%" }}
                    options={types}
                    clearOnEscape
                    value={information.type}
                    onChange={(e, value) => {
                      handleAutocomplete(value);
                    }}
                    getOptionLabel={(option) => option}
                    noOptionsText={"No se ha encontrado ningún IdTipoDocumento"}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errorMessage.IdTipoDocumento}
                        helperText={helperText.IdTipoDocumento}
                        label="Seleccionar tipo de pregunta"
                      />
                    )}
                    size="small"
                  />
                </div>
                {information.type === "" || information.type === null ? null : (
                  <Form
                    information={information}
                    handleInformation={handleinformation}
                    errorMessage={errorMessage}
                    helperText={helperText}
                  />
                )}
              </div>
            </div>
            <div className={styles.bottom}>
              <Button variant="text" onClick={handleCloseModal}>
                CANCELAR
              </Button>
              <Button
                variant="contained"
                onClick={handleAgregar}
                disabled={information.type === "" || information.type === null}
              >
                {information.type === "" || information.type === null
                  ? "AÑADIR PREGUNTA"
                  : "Agregar"}
              </Button>
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
                      {activeStep === 0 ? "Cerrar" : "atrás"}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleContinuar}
                      disabled={activeStep !== 0 && questions.length === 0}
                    >
                      {activeStep === 2
                        ? "Seleccionar encuestados"
                        : "Continuar"}
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
