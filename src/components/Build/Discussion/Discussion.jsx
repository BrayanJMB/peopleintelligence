import { createContext, createRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { List, ListItem, ListItemText } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";

import { storeSurveyChatAPI } from "../../../services/ChatLive/storeSurveyChat.service";
import {
  updateModeratorChatAPI,
  updateSurveyChatAPI,
} from "../../../services/ChatLive/updateSurveyChat.service";

import AccordionDiscussion from "./AccordionDicussion/AccordionDiscussion";

import styles from "./Discussion.module.css";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    style: { backgroundColor: stringToColor(name) },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
//Context
export const filesImageQuestionContext = createContext();
//
export default function Discussion({
  moderator,
  survey,
  questions,
  demographics,
  setQuestions,
  setDemographics,
  handleMove,
  handleBack,
  surveyImage,
  avatarImage,
  setSurvey,
  setModerator,
  surveyChat,
  isUpdate,
}) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [opentemplate, setOpentemplate] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleOpenModaltemplate = () => setOpentemplate(true);
  const handleCloseModaltemplate = () => setOpentemplate(false);
  const [filesImageQuestion, setFilesImageQuestion] = useState([]);
  const [toogle, setToggle] = useState("edit");
  const [errors, setErrors] = useState([]);
  const [isDemographicsAccordionOpen, setIsDemographicsAccordionOpen] =
    useState(false);
  const [isConversationAccordionOpen, setIsConversationAccordionOpen] =
    useState(false);
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const demographicRefs = useRef([]);

  const handleOpenAccordion = () => {
    setAccordionOpen(true);
  };

  const handleCloseAccordion = () => {
    setAccordionOpen(false);
  };

  const handleSubmit = async () => {
    let urls = null;
    const filesImage = questions
      .filter((q) => q.type === "imagen") // Filtrar preguntas por tipo "imagen"
      .map((q) => q.urlMedia); // Extraer urlMedia de las preguntas filtradas
    const payload = {
      moderator: {
        ...moderator,
      },
      survey: {
        ...survey,
        questions: questions.map((q, index) => ({
          ...q,
          orderNumber: index + 1,
          urlMedia: "",
          options: q.options.map((option) => {
            const { ...rest } = option;
            return rest;
          }),
        })),
        demographic: demographics.map((demo) => ({
          ...demo,
          demographicDetails: demo.demographicDetails.map((detail) => {
            const { ...rest } = detail;
            return rest;
          }),
        })),
      },
    };
    //Javascript, Js
    console.log(payload);
    let response;

    if (!isUpdate) {
      // Manejar creación
      const imageQuestions = payload.survey.questions.filter(
        (question) => question.type === "imagen"
      );
      response = await storeSurveyChatAPI(payload);
      if (surveyImage || avatarImage) {
        urls = await storeAvatarAndSurveyImage(response.data.survey.id);
        payload.moderator.avatarUrl = urls ? urls.data.files[1] : "";
        payload.survey.imageUrl = urls ? urls.data.files[0] : survey.imageUrl;
      }
      const updateData = {
        id: payload.survey.id,
        title: payload.survey.title,
        imageUrl: payload.survey.imageUrl,
        description: payload.survey.description,
        moderatorName: payload.moderator.name,
        moderatorId: payload.moderator.moderatorId,
        avatarUrl: payload.moderator.avatarUrl,
      };
      await updateModeratorChatAPI(updateData);
      await storeSurveyImageQuestion(
        filesImage,
        imageQuestions,
        response.data.survey.id
      );
    } else {
      // Manejar actualización
      if (surveyImage || avatarImage) {
        urls = await storeAvatarAndSurveyImage(payload.survey.id);
        payload.moderator.avatarUrl = urls ? urls.data.files[1] : "";
        payload.survey.imageUrl = urls ? urls.data.files[0] : survey.imageUrl;
      }
      response = await updateSurveyChatAPI(payload.survey);
      const updateData = {
        id: payload.survey.id,
        title: payload.survey.title,
        imageUrl: payload.survey.imageUrl,
        description: payload.survey.description,
        moderatorName: payload.moderator.name,
        moderatorId: payload.moderator.moderatorId,
        avatarUrl: payload.moderator.avatarUrl,
      };
      await updateModeratorChatAPI(updateData);
    }

    // Manejar respuesta
    if (response.status === 200) {
      alert(
        `Chat Live ${!isUpdate ? "creado" : "actualizado"} satisfactoriamente`
      );
      handleMove("/conversation/Live", "basic");
    } else {
      alert("Hubo un error al crear la encuesta de chat");
    }
  };

  const storeSurveyImageQuestion = async (filesImage, questions, surveyId) => {
    const promises = questions.map(async (question, index) => {
      const formData = new FormData();
      formData.append("questionImage", filesImage[index]);
      formData.append("questionNumber", question.orderNumber);
      formData.append("surveyId", surveyId);

      try {
        const response = await axios.post(
          "https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/UploadImagesQuestion",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data; // Retorna los datos de respuesta para su uso posterior
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error; // Lanza el error para manejar rechazos en Promise.all
      }
    });

    try {
      const results = await Promise.all(promises); // Espera a que todas las promesas se resuelvan// Aquí manejas las respuestas
    } catch (error) {
      console.error("Error en alguna solicitud:", error);
    }
  };

  const storeAvatarAndSurveyImage = async (surveyId) => {
    const formData = new FormData();
    formData.append("surveyImage", surveyImage);
    formData.append("moderatorAvatar", avatarImage);
    formData.append("companyId", currentCompany?.id);
    formData.append("surveyId", surveyId);
    try {
      const response = await axios.post(
        "https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/UploadImages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        return response;
      } else {
        console.error("Error al subir la imagen:", response);
      }
    } catch (error) {}
  };

  const validate = () => {
    let allErrors = {
      demographics: [],
      questions: [],
    };

    demographics.forEach((demographic, demoIndex) => {
      let currentErrors = {};

      // Validar si el nombre del demográfico está vacío
      if (!demographic.name.trim()) {
        currentErrors.name = "El nombre demográfico no puede estar vacío.";
      } else {
        // Validar si hay al menos 2 opciones
        if (demographic.demographicDetails.length < 1) {
          currentErrors.name = "Debe haber al menos 1 opcion.";
        }
      }

      // Validar si las opciones están vacías
      demographic.demographicDetails.forEach((opcion, index) => {
        if (!opcion.value.trim()) {
          currentErrors[`option${index}`] = "Esta opción no puede estar vacía.";
        }
      });

      allErrors.demographics[demoIndex] = currentErrors;
    });

    questions.forEach((question, questionIndex) => {
      let currentQuestionErrors = {};

      // Validar si el nombre de la pregunta está vacío
      if (!question.name.trim()) {
        currentQuestionErrors.name =
          "El nombre de la pregunta no puede estar vacío.";
      } else {
        // Validar si hay al menos 2 opciones
        if (
          question.options.length < 2 &&
          question.type !== "texto" &&
          question.type !== "Opinión"
        ) {
          currentQuestionErrors.name = "Debe haber al menos 2 opciones.";
        }
      }

      // Validar si el timeLimit es nulo
      if (!question.timeLimit && question.type !== "texto") {
        currentQuestionErrors.timeLimit = "Debe seleccionar un tiempo";
      }

      // Validar si las opciones están vacías
      question.options.forEach((option, index) => {
        if (option.value && !option.value.trim()) {
          currentQuestionErrors[`option${index}`] =
            "Esta opción no puede estar vacía.";
        }
        if (option.experienceQuestion && !option.experienceQuestion.trim()) {
          currentQuestionErrors[`experienceQuestion${index}`] =
            "Esta opción no puede estar vacía.";
        }
      });

      allErrors.questions[questionIndex] = currentQuestionErrors;
    });

    setErrors(allErrors);

    const hasErrorsInDemographics = allErrors.demographics.some(
      (errorObj) => Object.keys(errorObj).length > 0
    );
    const hasErrorsInQuestions = allErrors.questions.some(
      (errorObj) => Object.keys(errorObj).length > 0
    );
    const hasErrors = hasErrorsInDemographics || hasErrorsInQuestions;

    if (hasErrors) {
      //setIsAccordionOpen(true);
      const firstErrorIndex = allErrors.demographics.findIndex(
        (errorObj) => Object.keys(errorObj).length > 0
      );
      demographicRefs.current[firstErrorIndex]?.current?.focus();
    }

    // Si no hay errores en ningún demográfico o pregunta, devuelve true. De lo contrario, devuelve false.
    return !hasErrors;
  };

  const handletoggle = (event, newAlignment) => {
    setToggle(newAlignment);
  };

  useEffect(() => {
    // Si hay más demográficos que referencias, agregamos las referencias faltantes
    while (demographicRefs.current.length < demographics.length) {
      demographicRefs.current.push(createRef());
    }

    // Si hay menos demográficos que referencias, recortamos las referencias sobrantes
    demographicRefs.current = demographicRefs.current.slice(
      0,
      demographics.length
    );
  }, [demographics]);

  return (
    <div className={styles.discussion}>
      <Button
        onClick={() => {
          handleMove("", "basic");
          handleBack();
        }}
      >
        Atrás
      </Button>
      <div className={styles.content}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <p>{survey.title}</p>
          <div>
            <Button
              onClick={handleOpenModal}
              sx={{
                color: "#00B0F0",
              }}
            >
              Importar
            </Button>
            <Button
              sx={{
                color: "#00B0F0",
              }}
            >
              Compartir
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{
                color: "#00B0F0",
              }}
            >
              {isUpdate ? "Editar" : "Publicar"}
            </Button>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.left}>
            <div>
              <span
                style={{
                  marginLeft: "2rem",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Guía de discusión
              </span>
            </div>
          </div>
        </div>
        <div className={styles.impexp}>
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modal}>
              <div className={styles.modaltop}>
                <p style={{ fontWeight: "bold", marginTop: "0.8rem" }}>
                  Acá puedes usar/importar una conversacion existente
                </p>
                <div>
                  <IconButton onClick={handleCloseModal}>
                    <ClearIcon sx={{ fontSize: "40px" }} />
                  </IconButton>
                </div>
              </div>
              <div className={styles.modalbuttom}>
                {!accordionOpen ? (
                  <div className={styles.blocks} onClick={handleOpenAccordion}>
                    <ForumOutlinedIcon sx={{ fontSize: "40px" }} />
                    <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Conversación existente
                    </p>
                    <p style={{ color: "grey", fontSize: "0.8rem" }}>
                      Grab the discussion guide from another conversation
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      maxWidth: "600px",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    <Accordion expanded={true}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Conversaciones</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {surveyChat.map((opcion, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={opcion.title} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                    <Button onClick={handleCloseAccordion}>Atrás</Button>
                  </div>
                )}
              </div>
            </Box>
          </Modal>
        </div>
        <filesImageQuestionContext.Provider
          value={{ filesImageQuestion, setFilesImageQuestion }}
        >
          <AccordionDiscussion
            isConversation={false}
            questions={questions}
            setQuestions={setQuestions}
            demographics={demographics}
            setDemographics={setDemographics}
            errors={errors}
            setErrors={setErrors}
            isAccordionOpen={isDemographicsAccordionOpen}
            setIsAccordionOpen={setIsDemographicsAccordionOpen}
            demographicRefs={demographicRefs}
            accordionTitle={"Datos Demográficos"}
          />

          <AccordionDiscussion
            isConversation={true}
            questions={questions}
            setQuestions={setQuestions}
            demographics={demographics}
            setDemographics={setDemographics}
            demographicRefs={demographicRefs}
            errors={errors}
            setErrors={setErrors}
            isAccordionOpen={isConversationAccordionOpen}
            setIsAccordionOpen={setIsConversationAccordionOpen}
            accordionTitle={"Preguntas"}
          />
        </filesImageQuestionContext.Provider>
      </div>
    </div>
  );
}
