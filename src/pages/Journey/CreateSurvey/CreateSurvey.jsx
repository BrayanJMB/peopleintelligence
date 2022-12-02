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
import EditForm from "../../../components/EditForm/EditForm";
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
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [target, setTarget] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({ title: "", description: "", mapa: "" });
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [type, setType] = useState("");
  const [starmsg, setStarmsg] = useState("");
  const [information, setInformation] = useState({
    name: "",
    description: "",
    options: [
      "Muy en desacuerdo",
      "Discrepar",
      "Neutral",
      "Estar de acuerdo",
      "Totalmente de acuerdo",
    ],
    customOptions: Array(2).fill(""),
    stars: Array(3).fill(""),
  });
  const [question, setQuestion] = useState();
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
  const handleQuestion = (event) => {
    setQuestion({ ...question, [event.target.name]: event.target.value });
  };
  const handleinformationoptions = (key) => (event) => {
    let holder = information.customOptions.map((val, index) => {
      if (index === key) {
        return event.target.value;
      } else return val;
    });
    setInformation({ ...information, customOptions: holder });
  };
  const handleeditoption = (key) => (event) => {
    let holder;
    holder = question.customOptions.map((val, i) => {
      if (i === key) {
        return event.target.value;
      } else {
        return val;
      }
    });
    setQuestion({ ...question, customOptions: holder });
  };
  const handleaddstars = () => {
    if (information.stars.length === 10) {
      setStarmsg("Elija un valor entre 3 y 10");
    } else {
      setStarmsg("");
      let holder = [...information.stars];
      holder.push("");
      setInformation({ ...information, stars: holder });
    }
  };
  const handleeditstars = () => {
    let holder = [...question.stars];
    if (holder.length === 10) {
      setStarmsg("Elija un valor entre 3 y 10");
    } else {
      setStarmsg("");
      holder.push("");
      setQuestion({ ...question, stars: holder });
    }
  };
  const handledeletestars = () => {
    if (information.stars.length === 3) {
      setStarmsg("Elija un valor entre 3 y 10");
    } else {
      setStarmsg("");
      let holder = [...information.stars];
      holder.splice(1, 1);
      setInformation({ ...information, stars: holder });
    }
  };
  const handleeditdeletestars = () => {
    let holder = [...question.stars];
    if (holder.length === 3) {
      setStarmsg("Elija un valor entre 3 y 10");
    } else {
      setStarmsg("");
      holder.splice(1, 1);
      setQuestion({ ...question, stars: holder });
    }
  };
  const handleaddoption = () => {
    let holder = [...information.customOptions];
    holder.push("");
    setInformation({ ...information, customOptions: holder });
  };
  const handleeditaddoption = () => {
    let holder = [...question.customOptions];
    holder.push("");
    setQuestion({ ...question, customOptions: holder });
  };
  const handleAdd = () => {
    setOpen(true);
  };
  const handleEdit = (index) => {
    setTarget(index);
    setQuestion(questions[index]);
    setEdit(true);
  };
  const handleActualizar = () => {
    let holder = questions.map((val, index) => {
      if (index === target) {
        return question;
      } else {
        return val;
      }
    });
    setQuestions(holder);
  };
  const handleSelect = (value) => {
    setData({ ...data, mapa: value });
  };
  const renderSwitch = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          <Introduction
            data={data}
            handleChange={handlechange}
            handleSelect={handleSelect}
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
            handleEdit={handleEdit}
          />
        );
      case 2:
        return <Intimidad anonyme={anonyme} handleAnonyme={handleanonyme} />;
      default:
        return null;
    }
  };
  const handleCloseModal = () => {
    setOpen(false);
    setEdit(false);
  };
  const handleCloseEditModal = () => setEdit(false);
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
    setType(val);
  };
  const handleAgregar = () => {
    let helperText = {};
    let error = {};
    if (edit) {
      handleActualizar();
    } else {
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
        if (type === "Texto corto") {
          handleAddQuestion({
            type: "Texto corto",
            name: information.name,
            description: information.description,
          });
        } else if (type === "Escala Likert") {
          handleAddQuestion({
            type: "Escala Likert",
            name: information.name,
            description: information.description,
            options: information.options,
          });
        } else if (type === "Opcion multipe") {
          handleAddQuestion({
            type: "Opcion multipe",
            name: information.name,
            description: information.description,
            customOptions: information.customOptions,
          });
        } else if (type === "Calificaciones") {
          handleAddQuestion({
            type: "Calificaciones",
            name: information.name,
            description: information.description,
            stars: information.stars,
          });
        }
      }
    }
    setInformation({
      name: "",
      description: "",
      options: [
        "Muy en desacuerdo",
        "Discrepar",
        "Neutral",
        "Estar de acuerdo",
        "Totalmente de acuerdo",
      ],
      customOptions: Array(2).fill(""),
      stars: Array(3).fill(""),
    });
    setQuestion("");
    setType("");
    handleCloseModal();
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
    if (
      userInfo?.role.findIndex((p) => p === "Journey") < 0 &&
      userInfo?.role.findIndex((p) => p === "Administrador") < 0
    ) {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
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
                    value={type}
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
                <Form
                  type={type}
                  information={information}
                  handleInformation={handleinformation}
                  errorMessage={errorMessage}
                  helperText={helperText}
                  handleinformationoptions={handleinformationoptions}
                  handleaddoption={handleaddoption}
                  handleaddstars={handleaddstars}
                  handledeletestars={handledeletestars}
                  starmsg={starmsg}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <Button variant="text" onClick={handleCloseModal}>
                CANCELAR
              </Button>
              <Button variant="contained" onClick={handleAgregar}>
                Agregar
              </Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={edit}
          onClose={handleCloseEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modal}>
            <div className={styles.modaltop}>
              <div>
                <IconButton onClick={handleCloseEditModal}>
                  <ClearIcon sx={{ fontSize: "40px" }} />
                </IconButton>
              </div>
            </div>
            <div className={styles.modalbuttom}>
              <h3 style={{ fontWeight: "500" }}>Editar pregunta</h3>
              <div className={styles.form}>
                <EditForm
                  question={question}
                  handleInformation={handleQuestion}
                  errorMessage={errorMessage}
                  helperText={helperText}
                  handleinformationoptions={handleeditoption}
                  handleaddoption={handleeditaddoption}
                  handleaddstars={handleeditstars}
                  handledeletestars={handleeditdeletestars}
                  starmsg={starmsg}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <Button variant="text" onClick={handleCloseEditModal}>
                CANCELAR
              </Button>
              <Button variant="contained" onClick={handleAgregar}>
                {edit ? "Actualizar" : "Agregar"}
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
