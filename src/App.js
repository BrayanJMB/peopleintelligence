import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import { Moderator } from './components/Build/Moderator/Moderator';
import AnswerSurvey from './pages/AnswerSurvey/AnswerSurvey';
import Conversation from './pages/Conversation/Conversation';
import Dashboard from './pages/Dashboard/Dashboard';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import InfoAdmin from './pages/InfoAdmin/InfoAdmin';
import CreateSurvey from './pages/Journey/CreateSurvey/CreateSurvey';
import Journey from './pages/Journey/Journey';
import Template from './pages/Journey/Template/Template';
import JourneySettingsPage from './pages/JourneySettingsPage/JourneySettingsPage';
import NoAccess from './pages/NoAccess/NoAccess';
import Onas from './pages/Onas/Onas';
import OnasDetails from './pages/OnasDetails/OnasDetails';
import OnasTable from './pages/OnasTable/OnasTable';
import PowerBI from './pages/PowerBI/PowerBI';
import PowerBiDashboard from './pages/PowerBiDashboard/PowerBiDashboard';
import Questions from './pages/Questions/Questions';
import Register from './pages/Register/Register';
import Roles from './pages/Roles/Roles';
import SurveyDetailPage from './pages/SurveyDetailPage/SurveyDetailPage';
import UserAdministrator from './pages/userAdministrator/UserAdministrator';
import { store } from './redux/store';
import IdleTimer from './utils/IdleTimer';
import PrivateRoutes from './utils/PrivateRoutes';

// custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#03aae4',
    },
  },
});

export default function App() {
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 1200,
      onTimeout: () => {
        // if current path has answer-survey then don't redirect
        if (window.location.pathname.includes('answer-survey')) {
          return;
        }

        alert('Session Expired after 20 minutes on Inactivity');
        localStorage.removeItem('userInfo');
        window.location.replace(
          'https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fsuite.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login'
        );
      },
    });
    return () => {
      timer.cleanUp();
    };
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/answer-survey/:surveyId/:companyId"
                element={<AnswerSurvey />}
              />
              <Route
                path="/answer-survey/:surveyId/:companyId/:answerId"
                element={<AnswerSurvey />}
              />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} exact />
                <Route path="/onas" element={<Onas />} exact />
                <Route path="/onas/:company/:version" element={<Onas />} exact />
                <Route path="/onas/ver-encuestas" element={<OnasTable />} exact />
                <Route path="/onas/details" element={<OnasDetails />} exact />
                <Route path="/rolescompany" element={<Roles />} exact />
                <Route path="/UserAministrator" element={<UserAdministrator/>} exact />
                <Route path="/powerbi" element={<PowerBiDashboard />} exact />
                <Route path="/powerbi/:idDashboard" element={<PowerBI />} exact />
                <Route path="/register/:type" element={<Register />} exact />
                <Route path="/infoadmin/:type" element={<InfoAdmin />} exact />

                <Route
                  path="/conversation/:type"
                  element={<Conversation />}
                  exact
                />
                <Route path="/conversation/:type/:id" element={<Conversation />} exact/>
                <Route path="/conversation/:type/update-survey-chat/:id" element={<Conversation />} exact/>
                

                <Route path="/journey" element={<Journey />} exact />
                <Route path="/journey/survey/:id/detail" element={<SurveyDetailPage />} />
                <Route
                  path="/journey/survey-template"
                  element={<Template />}
                  exact
                />
                <Route
                  path="/journeysettings"
                  element={<JourneySettingsPage />}
                  exact
                />
                <Route
                  path="/journey/create-survey"
                  element={<CreateSurvey />}
                  exact
                />
                <Route
                  path="/journey/edit-survey/:surveyId"
                  element={<CreateSurvey />}
                  exact
                />
                <Route
                  path="/journey/update-template/:id"
                  element={<CreateSurvey />}
                  exact
                />
              </Route>
              <Route path="/questions" element={<Questions />} exact />
              <Route path="/noaccess" element={<NoAccess />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}
