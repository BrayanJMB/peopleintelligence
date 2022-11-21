import React from "react";
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
import Roles from "./pages/Roles/Roles";
import Error from "./pages/Error/Error";
import PrivateRoutes from "./utils/PrivateRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
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
              path="/journey/create-survey"
              element={<CreateSurvey />}
              exact
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </Provider>
  );
}
