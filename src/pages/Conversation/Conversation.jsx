import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';

import Build from '../../components/Build/Build';
import { Moderator } from '../../components/Build/Moderator/Moderator';
import { SurveyChat } from '../../components/Build/SurveysChats/SurveyChat';
import ConSidebar from '../../Layout/ConSidebar/ConSidebar';
import IconSidebarNavBar from '../../Layout/IconSideBarNavBar/IconSideBarNavBar';


export default function Conversation() {
  const { type, id } = useParams();
  const [stage, setStage] = useState('basic');
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [surveyImage, setSurveyImage] = useState(null);
  const currentCompany = useSelector((state) => state.companies.currentCompany);
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
  const theme = createTheme({
    palette: {
      blue: {
        main: '#00b0f0',
      },
      grey: {
        main: '#808080',
      },
    },
  });
  const handleMove = (path, val) => {
    navigate(path);
    setStage(val);
  };

  const renderSwitch = () => {
    switch (type) {
      case 'Build':
        return (
          <Build
            stage={stage}
            handleMove={handleMove}
            openSnackbar={openSnackbar}
            setOpenSnackbar={setOpenSnackbar}
            snackbarMessage={snackbarMessage}
            setSnackbarMessage={setSnackbarMessage}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            completed={completed}
            setCompleted={setCompleted}
            surveyImage={surveyImage}
            setSurveyImage={setSurveyImage}
            avatarImage={avatarImage}
            setAvatarImage={setAvatarImage}
            loading={loading}
            setLoading={setLoading}
            surveyChat={surveyChat}
            setSurveyChat={setSurveyChat}
            moderator={moderator}
            setModerator={setModerator}
            survey={survey}
            setSurvey={setSurvey}
            demographics={demographics}
            setDemographics={setDemographics}
            questions={questions}
            setQuestions={setQuestions}
            currentCompany={currentCompany}
          />
        );
      case 'Live':
        return <SurveyChat handleMove={handleMove} />;
      case 'moderator':
        return (
          <Moderator
            id={id}
            questions={questions}
            setQuestions2={setQuestions}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === 'Dinamyc') < 0 &&
      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
    ) {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <IconSidebarNavBar>
          <ConSidebar handleMove={handleMove} type={type} />
          {renderSwitch(type)}
        </IconSidebarNavBar>
      </Box>
    </ThemeProvider>
  );
}
