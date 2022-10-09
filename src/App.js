import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RegisterSuccesfully from "./pages/RegisterSucesfully";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/four" element={<RegisterSuccesfully  />} />
      </Routes>
    </Router>
  );
}
