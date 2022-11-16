import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Onas from "./pages/Onas/Onas";
import PowerBI from "./pages/PowerBI/PowerBI";
import Register from "./pages/Register/Register";
import InfoAdmin from "./pages/InfoAdmin/InfoAdmin";
import Conversation from "./pages/Conversation/Conversation";
import Journey from "./pages/Journey/Journey";
import Template from "./pages/Journey/Template/Template";
import CreateSurvey from "./pages/Journey/CreateSurvey/CreateSurvey";
import Error from "./pages/Error/Error";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onas" element={<Onas />} />
        <Route path="/powerbi" element={<PowerBI />} />
        <Route path="/register/:type" element={<Register />} />
        <Route path="/infoadmin/:type" element={<InfoAdmin />} />
        <Route path="/conversation/:type" element={<Conversation />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/journey/survey-template" element={<Template />} />
        <Route path="/journey/create-survey" element={<CreateSurvey />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}
