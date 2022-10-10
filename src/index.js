import React from "react";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./index.css";

import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
