import { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "./NewReport.module.css";
import Button from "@mui/material/Button";

export default function NewReport(props) {
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
    <div className={styles.form}>
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Name"
          value={props.info.name}
          name="name"
          onChange={props.handleChangeReport}
          style={{ flexBasis: "40%" }}
          error={errorMessage.name}
          helperText={helperText.name}
          size="small"
          onBlur={handleBlur}
        />
        <TextField
          id="outlined-name"
          label="Description"
          value={props.info.description}
          name="description"
          onChange={props.handleChangeReport}
          style={{ flexBasis: "40%" }}
          error={errorMessage.description}
          helperText={helperText.description}
          size="small"
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.impexp}>
        <Button variant="text" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={props.handleAddReport}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
