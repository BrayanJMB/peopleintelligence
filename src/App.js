import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Onas from "./pages/Onas/Onas";
import PowerBI from "./pages/PowerBI/PowerBI";
import PowerBiDashboard from "./pages/PowerBiDashboard/PowerBiDashboard";
import Register from "./pages/Register/Register";
import InfoAdmin from "./pages/InfoAdmin/InfoAdmin";
import Conversation from "./pages/Conversation/Conversation";
import Journey from "./pages/Journey/Journey";
import Template from "./pages/Journey/Template/Template";
import CreateSurvey from "./pages/Journey/CreateSurvey/CreateSurvey";
import OnasTable from "./pages/OnasTable/OnasTable";
import JourneySettings from "./pages/JourneySettings/JourneySettings";
import Roles from "./pages/Roles/Roles";
import Error from "./pages/Error/Error";
import PrivateRoutes from "./utils/PrivateRoutes";
import NoAccess from "./pages/NoAccess/NoAccess";
import OnasDetails from "./pages/OnasDetails/OnasDetails";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import IdleTimer from "./utils/IdleTimer";
import Questions from "./pages/Questions/Questions";

export default function App() {
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 1200,
      onTimeout: () => {
        alert("Session Expired after 20 minutes on Inactivity");
        localStorage.removeItem("userInfo");
        window.location.replace(
          "https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login"
        );
      },
    });
    return () => {
      timer.cleanUp();
    };
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/onas" element={<Onas />} exact />
            <Route path="/onas/:company/:version" element={<Onas />} exact />
            <Route path="/onas/ver-encuestas" element={<OnasTable />} exact />
            <Route path="/onas/details" element={<OnasDetails />} exact />
            <Route path="/rolescompany" element={<Roles />} exact />
            <Route path="/powerbi" element={<PowerBiDashboard />} exact />
            <Route path="/powerbi/:idDashboard" element={<PowerBI />} exact />
            <Route path="/register/:type" element={<Register />} exact />
            <Route path="/infoadmin/:type" element={<InfoAdmin />} exact />

            <Route
              path="/conversation/:type"
              element={<Conversation />}
              exact
            />
            <Route path="/journey" element={<Journey />} exact />
            <Route
              path="/journey/survey-template"
              element={<Template />}
              exact
            />
            <Route
              path="/journeysettings"
              element={<JourneySettings />}
              exact
            />
            <Route
              path="/journey/create-survey"
              element={<CreateSurvey />}
              exact
            />
          </Route>
          <Route path="/questions" element={<Questions />} exact />
          <Route path="/noaccess" element={<NoAccess />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </Provider>
  );
}
