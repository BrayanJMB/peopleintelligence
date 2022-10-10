import React, { useState } from "react";
import styles from "./Multiple.module.css";
import Box from "@mui/material/Box";
import Logo from "../../assets/Logo.svg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

export default function Multiple(props) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const handlecheck1 = () => {
    setCheck1(!check1);
  };
  const handlecheck2 = () => {
    setCheck2(!check2);
  };

  const handleCaptcha = () => {
    setCaptcha(!captcha);
  };
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

  const submitHandler = async (e) => {
    e.preventDefault();
    let helperText = {};
    let error = {};
    let bad = false;
    for (const [key, value] of Object.entries({
      numeroDocumento: props.info.Usuario.numeroDocumento,
      NombreCompleto: props.info.Usuario.NombreCompleto,
      Cargo: props.info.Usuario.Cargo,
      correoElectronico: props.info.Usuario.correoElectronico,
      phoneNumber: props.info.Usuario.phoneNumber,
    })) {
      if (props.info.Usuario[key] === "") {
        helperText[key] = "El campo no puede ir vacio";
        error[key] = true;
        bad = true;
      } else {
        helperText[key] = "";
        error[key] = false;
      }
    }
    if (bad) {
      setErrorMessage(error);
      setHelperText(helperText);
    } else if (check1 && check2 && captcha) {
      let test = false;
      for (const [index, content] of Object.entries(props.info.Usuario)) {
        if (content === "" || content === null) {
          test = true;
        }
      }
      if (!test) {
        let match = search(
          props.info.Usuario.IdTipoDocumento,
          props.data.documentType
        );

        let field = match.documentTypeId;
        try {
          const response = await axios
            .create({
              baseURL:
                "https://dynamicliveconversationapi.azurewebsites.net/api",
            })
            .post("/Autenticacion", {
              Usuario: {
                IdTipoDocumento: field,
                numeroDocumento: props.info.Usuario.numeroDocumento,
                NombreCompleto: props.info.Usuario.NombreCompleto,
                Cargo: props.info.Usuario.Cargo,
                correoElectronico: props.info.Usuario.correoElectronico,
                phoneNumber: props.info.Usuario.phoneNumber,
              },
            });
          console.log(response);
        } catch (error) {
          console.log(error);
        }
        props.handleRegister();
      }
    }
  };

  const search = (key, inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].tipoDocumento === key) {
        return inputArray[i];
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Box
            component="img"
            sx={{
              backgroundColor: "white",
            }}
            alt="Your logo."
            src={Logo}
          />
          <h3 style={{ color: "#03aae4", textAlign: "center" }}>
            DATOS DEL USUARIO
          </h3>
        </div>
        <div className={styles.form}>
          <div className={styles.input}>
            <Autocomplete
              id="combo-box-demo"
              style={{ flexBasis: "40%" }}
              options={props.documentType}
              clearOnEscape
              value={props.info.Usuario.IdTipoDocumento}
              onChange={(e, value) => {
                props.handleAutocomplete("Usuario", "IdTipoDocumento", value);
              }}
              getOptionLabel={(option) => option}
              noOptionsText={"No se ha encontrado ningún IdTipoDocumento"}
              renderInput={(params) => (
                <TextField {...params} label="Tipo de documento de identidad" />
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
              type="number"
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
        <div className={styles.check}>
          <Checkbox onChange={handlecheck1} />
          <p style={{ color: "grey " }}>Acepto los términos y condiciones</p>
        </div>
        <div className={styles.check}>
          <Checkbox onChange={handlecheck2} />
          <p style={{ color: "grey " }}>
            Acepto las políticas de protección de datos
          </p>
        </div>
        <div className={styles.captcha}>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={handleCaptcha}
          />
        </div>
        <div className={styles.navigation}>
          <Button
            variant="text"
            style={{ marginRight: "1.5rem" }}
            onClick={props.handleCancel}
            color="blue"
          >
            REGRESAR
          </Button>
          <Button
            variant="contained"
            color="blue"
            sx={{ color: "white" }}
            type="submit"
          >
            SIGUIENTE
          </Button>
        </div>
      </div>
    </form>
  );
}
