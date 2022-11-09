import { useState } from "react";
import styles from "./Multiple.module.css";
import Box from "@mui/material/Box";
import Logo from "../../assets/Logo.svg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import Notification from "../../components/Notification";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const validEmail = new RegExp(
  "^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$"
);

const validphone = new RegExp("^[0-9]{12,15}$");

const config = {
  headers: { "Content-type": "application/json" },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Multiple(props) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [checktext1, setChecktext1] = useState(false);
  const [checktext2, setChecktext2] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [values, setValues] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });
  const [open, setOpen] = useState(false);
  const handlemodalOpen = () => setOpen(true);
  const handlemodalClose = () => setOpen(false);

  const handlecheck1 = () => {
    setCheck1(!check1);
  };
  const handlecheck2 = () => {
    setCheck2(!check2);
  };

  const handleCaptcha = () => {
    setCaptcha(!captcha);
  };

  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let helperText = {};
    let error = {};
    let bad = false;

    if (check1 === false) {
      setChecktext1(true);
    } else {
      setChecktext1(false);
    }
    if (check2 === false) {
      setChecktext2(true);
    } else {
      setChecktext2(false);
    }

    for (const [key, value] of Object.entries({
      IdTipoDocumento: props.info.Usuario.IdTipoDocumento,
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
    if (!validEmail.test(props.info.Usuario.correoElectronico)) {
      helperText.correoElectronico = "El correo ingresado no es válido";
      error.correoElectronico = true;
      bad = true;
    }
    if (props.info.Usuario.numeroDocumento.length < 8) {
      helperText["numeroDocumento"] = "El tamaño minimo del campo es 8 digitos";
      error["numeroDocumento"] = true;
      bad = true;
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
        let matchdocumentid = search(
          props.info.Usuario.IdTipoDocumento,
          props.ids.documentType
        );
        let field = matchdocumentid.documentTypeId;
        try {
          const response = await axios
            .create({
              baseURL:
                "https://dynamicliveconversationapi.azurewebsites.net/api",
            })
            .post(
              "/Autenticacion",
              {
                Usuario: {
                  IdTipoDocumento: props.info.Usuario.IdTipoDocumento,
                  numeroDocumento: props.info.Usuario.numeroDocumento,
                  NombreCompleto: props.info.Usuario.NombreCompleto,
                  Cargo: props.info.Usuario.Cargo,
                  correoElectronico: props.info.Usuario.correoElectronico,
                  phoneNumber: props.info.Usuario.phoneNumber,
                },
              },
              config
            );
          props.handleRegister(response.data.message);
        } catch (error) {
          if (typeof error.response.data === "string") {
            setValues({
              ...values,
              message: error.response.data,
              isOpen: true,
              severity: "error",
            });
          }
          console.log(error);
        }
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handlemodalClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
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
                  error={errorMessage.IdTipoDocumento}
                  helperText={helperText.IdTipoDocumento}
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
          <Checkbox onChange={handlecheck1} />
          <p style={{ color: checktext1 ? "red" : "grey" }}>
            Acepto los{" "}
            <span
              className={styles.spanhover}
              style={{ color: "blue" }}
              onClick={handlemodalOpen}
            >
              términos y condiciones
            </span>
          </p>
        </div>
        <div className={styles.check}>
          <Checkbox onChange={handlecheck2} />
          <p style={{ color: checktext2 ? "red" : "grey" }}>
            Acepto las{" "}
            <span
              className={styles.spanhover}
              style={{ color: "blue" }}
              onClick={handlemodalOpen}
            >
              políticas de protección de datos
            </span>
          </p>
        </div>
        <div className={styles.captcha}>
          <ReCAPTCHA
            sitekey="6LcRRGsiAAAAAA8SOkyGQoKbGXASXitY2gfKKUup"
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
      <Notification
        severity={values.severity}
        message={values.message}
        isOpen={values.isOpen}
        onClose={handleClose}
      />
    </form>
  );
}
