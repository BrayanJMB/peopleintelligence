import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import { v4 as uuidv4 } from 'uuid';

import ConSidebar from '../../Layout/ConSidebar/ConSidebar';
import { fecthSurveyChatAPI, fecthModeradorAPI } from '../../services/ChatLive/fetchSurveyChat.service';

import Basic from './Basic/Basic';
import Discussion from './Discussion/Discussion';
import Quota from './Quota/Quota';
import Segment from './Segment/Segment';
import { SurveyChat } from './SurveysChats/SurveyChat';

import styles from './Build.module.css';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { current } from '@reduxjs/toolkit';
const list = [
  'Detalles básicos',
  'Guía conversación',
  /*
  'Audience',
  'Discussion Guide',
  'Segments',
  ' Quota Targeting',*/
];

const root = [
  'basic',
  'schedule',
  'audience',
  'discussion',
  'segments',
  'quota',
];

const steps = ['Detalles básicos', 'Preguntas y demográficos'];

export default function Build({ stage, handleMove }) {
  const { id } = useParams();
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const isUpdate = location.pathname.indexOf('Build/update-survey-chat') !== -1;
  const [surveyImage, setSurveyImage] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [surveyChat, setSurveyChat] = useState([]);
  const [moderator, setModerator] = useState({
    moderatorId: '',
    name: '',
    avatarUrl: '',
  });

  const [survey, setSurvey] = useState({
    id: uuidv4(),
    title: '',
    timeDemographics: 300,
    companyId: currentCompany?.id,
    description: '',
    imageUrl: '',
  });
  const [demographics, setDemographics] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handlePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 500000) {
        setSnackbarMessage(
          'El tamaño de la imagen no puede ser mayor a 500kB.'
        );
        setOpenSnackbar(true);
      } else {
        if (event.target.name.includes('avatar')) {
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
    if (name.includes('avatar')) {
      setModerator({ ...moderator, [name]: null });
    } else {
      setSurvey({ ...survey, [name]: null });
    }
  };

  const handleChange = (event, type) => {
    if (type === 'moderator')
      setModerator({ ...moderator, [event.target.name]: event.target.value });
    if (type === 'survey')
      setSurvey({ ...survey, [event.target.name]: event.target.value });
  };

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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const fetchSurveyChat = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fecthSurveyChatAPI(currentCompany.id);
    const currentSurvey = id ? data.find((element) => element.id === id) : data;

    setSurveyChat(currentSurvey);
    const { data:moderator } = await fecthModeradorAPI(currentSurvey.id);
    setModerator(moderator);
  };

  useEffect(() => {
    fetchSurveyChat();
  }, [currentCompany]);

  const resetModerator = () => {
    setModerator({
      moderatorId: userInfo.user,
      name: '',
      avatarUrl: '',
    });
  };

  const resetSurvey = () => {
    setSurvey({
      id: uuidv4(),
      title: '',
      timeDemographics: 300,
      companyId: currentCompany?.id,
      description: '',
      imageUrl: '',
    });
    setQuestions([]);
    setDemographics([]);
  };

  const updateStatesFromSurveyChat = () => {
    // Actualizar el estado del moderador
    setModerator((prevState) => ({
      ...prevState,
      moderatorId: userInfo.user, 
    }));

    // Actualizar el estado de la encuesta
    setSurvey((prevState) => ({
      ...prevState,
      id: surveyChat.id,
      title: surveyChat.title,
      timeDemographics: surveyChat.timeDemographics,
      description: surveyChat.description,
      imageUrl: surveyChat.imageUrl,
    }));
    // Actualizar el estado de las preguntas y demográficos
    setQuestions(surveyChat.questions);
    setDemographics(surveyChat.demographic);
  };

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
      case 'basic':
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
      case 'discussion':
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
            setSurvey={setSurvey}
            setModerator={setModerator}
            surveyChat={surveyChat}
            isUpdate={isUpdate}
          />
        );
      case 'quota':
        return <Quota moderator={moderator} />;
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className={styles.build}>
        <div className={styles.content}>
          <div style={{margin:"30px auto", width:"90%", }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}
                sx={{
                  '& .MuiStepLabel-iconContainer .Mui-active':
                  {
                    color: '#00B0F0',
                  },
                  '& .MuiStepLabel-iconContainer .Mui-completed':
                  {
                    color: '#00B0F0',
                  },
                }}
                >
                  <StepButton style={{ pointerEvents: 'none' }}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              marginTop: '0.5rem',
            }}
          >
            <div
              style={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                marginLeft: '2rem',
              }}
            >
              {moderator.open ? <p>{moderator.title}</p> : null}
            </div>
          </div>
          {renderSwitch(stage)}
        </div>
      </div>
    </>
  );
}
