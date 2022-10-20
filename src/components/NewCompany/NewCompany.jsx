import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./NewCompany.module.css";

const validphone = new RegExp("^[0-9]{12,15}$");

export default function NewCompany(props) {
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
        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: "40%" }}
          options={props.content.documentType}
          clearOnEscape
          value={props.info.Usuario.IdTipoDocumento}
          onChange={(e, value) => {
            props.handleAutocomplete("Usuario", "IdTipoDocumento", value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={"No se ha encontrado ningún IdTipoDocumento"}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorMessage.numeroDocumento}
              helperText={helperText.numeroDocumento}
              label="Tipo de documento de identidad"
            />
          )}
          size="small"
        />
        <TextField
          id="outlined-name"
          label="Documento de identidad"
          value={props.info.Usuario.numeroDocumento}
          name="numeroDocumento"
          onChange={props.handleChange("Usuario")}
          style={{ flexBasis: "40%" }}
          error={errorMessage.numeroDocumento}
          helperText={helperText.numeroDocumento}
          size="small"
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.input}>
        <TextField
          style={{ flexBasis: "40%" }}
          id="outlined-name"
          label="Nombre Completo"
          value={props.info.Usuario.NombreCompleto}
          name="NombreCompleto"
          onChange={props.handleChange("Usuario")}
          error={errorMessage.NombreCompleto}
          helperText={helperText.NombreCompleto}
          size="small"
          onBlur={handleBlur}
        />
        <TextField
          style={{ flexBasis: "40%" }}
          id="outlined-name"
          label="Cargo"
          value={props.info.Usuario.Cargo}
          name="Cargo"
          onChange={props.handleChange("Usuario")}
          error={errorMessage.Cargo}
          helperText={helperText.Cargo}
          size="small"
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.input}>
        <TextField
          style={{ flexBasis: "40%" }}
          id="outlined-name"
          label="Correo electrónico"
          value={props.info.Usuario.correoElectronico}
          name="correoElectronico"
          onChange={props.handleChange("Usuario")}
          error={errorMessage.correoElectronico}
          helperText={helperText.correoElectronico}
          size="small"
          onBlur={handleBlur}
        />
        <TextField
          style={{ flexBasis: "40%" }}
          id="outlined-name"
          label="Número de teléfono"
          value={props.info.Usuario.phoneNumber}
          name="phoneNumber"
          onChange={props.handleChange("Usuario")}
          error={errorMessage.phoneNumber}
          helperText={helperText.phoneNumber}
          size="small"
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
