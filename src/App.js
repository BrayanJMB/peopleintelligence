import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Onas from "./pages/Onas/Onas";
import PowerBI from "./pages/PowerBI/PowerBI";
import InfoAdmin from "./pages/InfoAdmin/InfoAdmin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onas" element={<Onas />} />
        <Route path="/powerbi" element={<PowerBI />} />
        <Route path="/infoadmin/:type" element={<InfoAdmin />} />
      </Routes>
    </Router>
  );
}
