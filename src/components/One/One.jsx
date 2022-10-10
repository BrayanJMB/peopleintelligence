import React, { useState } from "react";
import styles from "./One.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Logo from "../../assets/Logo.svg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ReCAPTCHA from "react-google-recaptcha";

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      className={styles.tab}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export default function One(props) {
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(true);
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

  const checkcompany = () => {
    const helperText = {};
    const error = {};
    let bad = false;
    for (const [key, value] of Object.entries({
      nombreCompania: props.info.Compania.nombreCompania,
      Sede: props.info.Compania.Sede,
      direccion: props.info.Compania.direccion,
    })) {
      if (props.info.Compania[key] === "") {
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
    } else {
      setChecked(false);
      setValue(1);
    }
  };
  const checkuser = () => {
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
      for (const [key, value] of Object.entries(props.info)) {
        for (const [index, content] of Object.entries(value)) {
          if (content === "" || content === null) {
            test = true;
          }
        }
      }
      if (!test) {
        props.handleRegister();
      }
    }
  };

  const handleCaptcha = () => {
    setCaptcha(!captcha);
  };

  const handletab = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrevious = () => {
    setValue(0);
  };

  return (
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
      </div>
      <div style={{ width: "100%", marginTop: "0.5rem" }}>
        <div style={{ border: "none" }}>
          <Tabs
            value={value}
            onChange={handletab}
            aria-label="basic tabs example"
            centered
          >
            <Tab
              label="INFORMACIÓN DE LA EMPRESA"
              style={{
                width: "100%",
                color: "#03aae4",
              }}
              {...a11yProps(0)}
            />
            <Tab
              label="DATOS DEL ADMINISTRADOR"
              style={{ width: "100%", color: "#03aae4" }}
              disabled={checked}
              {...a11yProps(1)}
            />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <div className={styles.profile}>
            <img
              src={props.info.Compania.Logotipo}
              alt="profile"
              className={styles.photo}
            />
            <Button variant="text" component="label" color="blue">
              Cargar logo de la compañía
              <input
                type="file"
                onChange={props.handlePhoto}
                accept="image/*"
                name="profile_image"
                hidden
              />
            </Button>
          </div>
          <div className={styles.form}>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Nombre de la empresa"
                value={props.info.Compania.nombreCompania}
                name="nombreCompania"
                onChange={props.handleChange("Compania")}
                style={{ flexBasis: "40%" }}
                error={errorMessage.nombreCompania}
                helperText={helperText.nombreCompania}
                size="small"
              />
              <Autocomplete
                id="combo-box-demo"
                style={{ flexBasis: "40%" }}
                options={props.sector}
                clearOnEscape
                value={props.info.Compania.SectorId}
                onChange={(e, value) => {
                  props.handleAutocomplete("Compania", "SectorId", value);
                }}
                noOptionsText={"No se ha encontrado ningún Sector"}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Sector" />
                )}
                size="small"
              />
            </div>
            <div className={styles.input}>
              <Autocomplete
                style={{ flexBasis: "40%" }}
                id="combo-box-demo"
                options={props.country}
                clearOnEscape
                value={props.info.Compania.IdPais}
                onChange={(e, value) => {
                  props.handleAutocomplete("Compania", "IdPais", value);
                }}
                noOptionsText={"No se ha encontrado ningún Sector"}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="País" />}
                size="small"
              />
              <TextField
                style={{ flexBasis: "40%" }}
                id="outlined-name"
                label="Sede"
                value={props.info.Compania.Sede}
                name="Sede"
                onChange={props.handleChange("Compania")}
                error={errorMessage.Sede}
                helperText={helperText.Sede}
                size="small"
              />
            </div>
            <div className={styles.input}>
              <TextField
                style={{ flexBasis: "40%" }}
                id="outlined-name"
                label="Dirección"
                value={props.info.Compania.direccion}
                name="direccion"
                onChange={props.handleChange("Compania")}
                error={errorMessage.direccion}
                helperText={helperText.direccion}
                size="small"
              />
              <Autocomplete
                style={{ flexBasis: "40%" }}
                id="combo-box-demo"
                options={props.sizeCompany}
                clearOnEscape
                value={props.info.Compania.IdTamanoCompania}
                onChange={(e, value) => {
                  props.handleAutocomplete(
                    "Compania",
                    "IdTamanoCompania",
                    value
                  );
                }}
                size="small"
                noOptionsText={"No se ha encontrado ningún Sector"}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Tamaño de la empresa" />
                )}
              />
            </div>
          </div>
          <div className={styles.navigation}>
            <Button
              variant="text"
              style={{ marginRight: "1.5rem" }}
              onClick={props.handleCancel}
              color="blue"
            >
              CANCELAR
            </Button>
            <Button
              variant="contained"
              onClick={checkcompany}
              color="blue"
              sx={{
                color: "white",
              }}
            >
              SIGUIENTE
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
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
                noOptionsText={"No se ha encontrado ningún IdTipoDocumento"}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
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
              />
            </div>
          </div>
          <div className={styles.check}>
            <Checkbox onChange={handlecheck1} checked={check1} />
            <p style={{ color: "grey ", marginLeft: "2rem" }}>
              Acepto los términos y condiciones
            </p>
          </div>
          <div className={styles.check}>
            <Checkbox onChange={handlecheck2} checked={check2} />
            <p style={{ color: "grey ", marginLeft: "2rem" }}>
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
              onClick={handlePrevious}
              color="blue"
            >
              REGRESAR
            </Button>
            <Button
              variant="contained"
              onClick={checkuser}
              color="blue"
              style={{ color: "white" }}
            >
              SIGUIENTE
            </Button>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
