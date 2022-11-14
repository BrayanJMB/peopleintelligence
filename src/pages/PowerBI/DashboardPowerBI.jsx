import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import Button from "@mui/material/Button";
import styles from "./DashboardPowerBI.module.css";
import Typography from '@mui/material/Typography';

export default function DashboardPowerBI(props) {
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const handleBlur = (event) => {
    let helperText = {};
    let error = {};
    if (event.target.value === "") {
      helperText[event.target.name] = "El campo no puede ir vacio";
      error[event.target.name] = true;
    } else {
      helperText[event.target.name] = "";
      error[event.target.name] = false;
    }
    setErrorMessage(error);
    setHelperText(helperText);
  };

  return (
    <Box sx={{ display: "flex",  width: '100%'}} >
      <Navbar />
      <Sidebar />
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
        <Typography variant="h2" gutterBottom>
            Registra tus tableros de powerBI
        </Typography>

        <Typography variant="h4" gutterBottom>
            Datos Demograficos
        </Typography>


        <Typography variant="h4" gutterBottom>
            ONAS
        </Typography>

        <Typography variant="h4" gutterBottom>
            Journey
        </Typography>


        <Typography variant="h4" gutterBottom>
            Dinamic Live Conversation
        </Typography>
        </div>
      </div>
    </Box>
  );
}
