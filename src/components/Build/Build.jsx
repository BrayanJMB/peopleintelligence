import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  fecthModeradorAPI,
  fecthSurveyChatAPI,
} from "../../services/ChatLive/fetchSurveyChat.service";
import { StepperSurvey } from "./Stepper";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Basic from "./Basic/Basic";
import Discussion from "./Discussion/Discussion";
import styles from "./Build.module.css";
const steps = ["Detalles básicos", "Preguntas y demográficos"];
export default function Build({
  stage,
  handleMove,
  openSnackbar,
  setOpenSnackbar,
  snackbarMessage,
  setSnackbarMessage,
  activeStep,
  setActiveStep,
  completed,
  setCompleted,
  surveyImage,
  setSurveyImage,
  avatarImage,
  setAvatarImage,
  loading,
  setLoading,
  surveyChat,
  setSurveyChat,
  moderator,
  setModerator,
  survey,
  setSurvey,
  demographics,
  setDemographics,
  questions,
  setQuestions,
  currentCompany,
}) {
  const { id } = useParams();
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isUpdate = location.pathname.indexOf("Build/update-survey-chat") !== -1;

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const resetModerator = () => {
    setModerator({
      moderatorId: userInfo.user,
      name: "",
      avatarUrl: "",
    });
  };

  const resetSurvey = () => {
    setSurvey({
      id: uuidv4(),
      title: "",
      timeDemographics: 300,
      companyId: currentCompany?.id,
      description: "",
      imageUrl: "",
    });
    setQuestions([]);
    setDemographics([]);
  };

  const updateStatesFromSurveyChat = () => {
    // Actualizar el estado del moderador
    setModerator((prevState) => ({
      ...prevState,
      moderatorId: userInfo.user,
      avatarUrl: moderator.avatarUrl,
    }));

    // Actualizar el estado de la encuesta
    setSurvey((prevState) => ({
      ...prevState,
      id: surveyChat.id,
      title: surveyChat.title,
      companyId: currentCompany?.id,
      timeDemographics: surveyChat.timeDemographics,
      description: surveyChat.description,
      imageUrl: surveyChat.imageUrl,
    }));
    // Actualizar el estado de las preguntas y demográficos
    setQuestions(surveyChat.questions);
    setDemographics(surveyChat.demographic);
  };

  const handlePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 500000) {
        setSnackbarMessage(
          "El tamaño de la imagen no puede ser mayor a 500kB."
        );
        setOpenSnackbar(true);
      } else {
        if (event.target.name.includes("avatar")) {
          const url = URL.createObjectURL(event.target.files[0]);
          setAvatarImage(event.target.files[0]);
          setModerator({ ...moderator, [event.target.name]: url });
        } else {
          const url = URL.createObjectURL(event.target.files[0]);
          setSurvey({ ...survey, [event.target.name]: url });
          setSurveyImage(event.target.files[0]);
        }
      }
    }
  };

  const handleReset = (name) => {
    if (name.includes("avatar")) {
      setModerator({ ...moderator, [name]: null });
    } else {
      setSurvey({ ...survey, [name]: null });
    }
  };

  const handleChange = (event, type) => {
    if (type === "moderator")
      setModerator({ ...moderator, [event.target.name]: event.target.value });
    if (type === "survey")
      setSurvey({ ...survey, [event.target.name]: event.target.value });
  };

  const handleNextStepper = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const fetchSurveyChat = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fecthSurveyChatAPI(currentCompany.id);
    const currentSurvey = id ? data.find((element) => element.id === id) : data;

    setSurveyChat(currentSurvey);
    const { data: moderator } = await fecthModeradorAPI(currentSurvey.id);
    setModerator(moderator);
  };

  useEffect(() => {
    fetchSurveyChat();
  }, [currentCompany]);

  useEffect(() => {
    if (isUpdate) {
      updateStatesFromSurveyChat();
    } else {
      resetModerator();
      resetSurvey();
    }
  }, [isUpdate, surveyChat]);

  const renderSwitch = (type) => {
    switch (type.toLowerCase()) {
      case "basic":
        return (
          <Basic
            moderator={moderator}
            survey={survey}
            handleChange={handleChange}
            handlePhoto={handlePhoto}
            handleReset={handleReset}
            handleMove={handleMove}
            handleNextStepper={handleNextStepper}
            loading={loading}
          />
        );
      case "discussion":
        return (
          <Discussion
            moderator={moderator}
            survey={survey}
            questions={questions}
            demographics={demographics}
            setQuestions={setQuestions}
            setDemographics={setDemographics}
            handleMove={handleMove}
            handleBack={handleBack}
            avatarImage={avatarImage}
            surveyImage={surveyImage}
            surveyChat={surveyChat}
            isUpdate={isUpdate}
            setSurveyChat={setSurveyChat}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <div className={styles.build}>
        <div className={styles.content}>
          <div style={{ margin: "30px auto", width: "90%" }}>
            <StepperSurvey
              activeStep={activeStep}
              completed={completed}
              steps={steps}
            />
          </div>
          {renderSwitch(stage)}
        </div>
      </div>
    </>
  );
}
