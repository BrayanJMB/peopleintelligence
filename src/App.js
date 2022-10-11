import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RegisterSuccesfully from "./pages/RegisterSucesfully";
import OnasView from "./pages/onas";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/four" element={<RegisterSuccesfully  />} />
        <Route path="/onas" element={<OnasView />} />
      </Routes>
    </Router>
  );
}
