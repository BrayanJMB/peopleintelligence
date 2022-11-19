import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./NewDashboard.module.css";
import Button from "@mui/material/Button";

const validphone = new RegExp("^[0-9]{12,15}$");

const search = (value, inputArray, field) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].name === value) {
      return inputArray[i][field];
    }
  }
};

export default function NewDashboard(props) {
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
    if (event.target.name === "phoneNumber") {
      if (!validphone.test(event.target.value)) {
        helperText[event.target.name] = "Solo puede escirbir números";
        error[event.target.name] = true;
      }
    }
    setErrorMessage(error);
    setHelperText(helperText);
  };

  return (
    <div className={styles.form}>
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Report Id"
          value={props.info.reportId}
          name="reportId"
          onChange={props.handleChangeDashboard}
          style={{ flexBasis: "40%" }}
          error={errorMessage.reportId}
          helperText={helperText.reportId}
          size="small"
          onBlur={handleBlur}
        />
        <TextField
          id="outlined-name"
          label="Group Id"
          value={props.info.groupId}
          name="groupId"
          onChange={props.handleChangeDashboard}
          style={{ flexBasis: "40%" }}
          error={errorMessage.groupId}
          helperText={helperText.groupId}
          size="small"
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.input}>
        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: "40%" }}
          options={props.content.company}
          clearOnEscape
          value={props.info.companyId}
          onChange={(e, value) => {
            props.handleAutocomplete("companyId", value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={"No se ha encontrado ningún País"}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorMessage.companyId}
              helperText={helperText.companyId}
              label="company Name"
            />
          )}
          size="small"
        />
        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: "40%" }}
          options={props.content.report}
          clearOnEscape
          value={props.info.reportName}
          onChange={(e, value) => {
            props.handleAutocomplete("reportName", value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={"No se ha encontrado ningún País"}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorMessage.reportName}
              helperText={helperText.reportName}
              label="Report Name"
            />
          )}
          size="small"
        />
      </div>
      <div className={styles.input}>
        <TextField
          style={{ flexBasis: "40%" }}
          id="outlined-name"
          label="descriptionReport"
          value={props.info.descriptionReport}
          name="descriptionReport"
          onChange={props.handleChangeDashboard}
          size="small"
          disabled
        />
        <TextField
          style={{ flexBasis: "40%" }}
          id="outlined-name"
          label="isActive"
          value={props.info.isActive}
          name="isActive"
          onChange={props.handleChangeDashboard}
          error={errorMessage.isActive}
          helperText={helperText.isActive}
          size="small"
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.impexp}>
        <Button variant="text" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={props.handleAddDashboard}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
