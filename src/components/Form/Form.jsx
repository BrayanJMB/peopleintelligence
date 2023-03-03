import styles from "./Form.module.css";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// likert options
const options = [
  'Discrepar',
  'Estar de acuerdo',
  'Muy en desacuerdo',
  'Neutral',
  'Totalmente de acuerdo',
];

export default function Form(props) {
  const renderForm = (type) => {
    switch (type) {
      case "Texto corto":
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>Q1.</div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: "80px",
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
          </div>
        );
      case "Escala Likert":
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>Q1.</div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: "80px",
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
            <div className={styles.options}>
              {options.map((val, key) => {
                return (
                  <div className={styles.option} key={key}>
                    <div
                      style={{
                        padding: "3px 9px",
                        backgroundColor: "#fce4e4",
                        borderRadius: "4px",
                        textAlign: "center",
                        marginRight: "15px",
                        fontSize: "12px",
                        color: "#808080",
                      }}
                    >
                      {key + 1}
                    </div>
                    <p> {val}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'Opción múltiple':
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>Q1.</div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: "80px",
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
            <div className={styles.options}>
              {props.information.customOptions.map((val, key) => {
                return (
                  <div className={styles.option} key={key}>
                    <div
                      style={{
                        padding: "3px 9px",
                        backgroundColor: "#F0F2F5",
                        borderRadius: "4px",
                        textAlign: "center",
                        marginRight: "15px",
                        fontSize: "14px",
                        color: "rgb(134, 140, 204)",
                      }}
                    >
                      {key + 1}
                    </div>
                    <TextField
                      id="outlined-name"
                      variant="standard"
                      placeholder="Añadir opción..."
                      value={props.information.customOptions[key]}
                      onChange={props.handleinformationoptions(key)}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      fullWidth
                      size="small"
                    />
                  </div>
                );
              })}
              {props.information.customOptions.length < 10 ? (
                <Button
                  variant="text"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={props.handleaddoption}
                  style={{ backgroundColor: "#F7F7F7", width: "255px" }}
                >
                  Añadir opción
                </Button>
              ) : null}
            </div>
          </div>
        );
        case 'Opción única':
          return (
            <div className={styles.top}>
              <div className={styles.question}>
                <div className={styles.number}>Q1.</div>
                <div className={styles.input}>
                  <TextField
                    id="unique-option"
                    variant="standard"
                    label="Añadir prequnta"
                    placeholder="Añadir prequnta aquí..."
                    value={props.information.name}
                    name="name"
                    onChange={props.handleInformation}
                    error={props.errorMessage.name}
                    helperText={props.helperText.name}
                    fullWidth
                    size="small"
                  />
                </div>
              </div>
              <div className={styles.input}>
                <TextField
                  id="unique-option=description"
                  label="Añadir descripción"
                  placeholder="Añadir descripción aquí (opcional)..."
                  InputProps={{
                    inputComponent: TextareaAutosize,
                    inputProps: {
                      style: {
                        height: "80px",
                      },
                    },
                  }}
                  value={props.information.description}
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                  }}
                  name="description"
                  onChange={props.handleInformation}
                />
              </div>
              <div className={styles.options}>
                {props.information.customOptions.map((val, key) => {
                  return (
                    <div
                      className={styles.option}
                      key={key}
                    >
                      <div
                        style={{
                          padding: "3px 9px",
                          backgroundColor: "#F0F2F5",
                          borderRadius: "4px",
                          textAlign: "center",
                          marginRight: "15px",
                          fontSize: "14px",
                          color: "rgb(134, 140, 204)",
                        }}
                      >
                        {key + 1}
                      </div>
                      <TextField
                        id={`unique-option-${key}`}
                        variant="standard"
                        placeholder="Añadir opción..."
                        value={props.information.customOptions[key]}
                        onChange={props.handleinformationoptions(key)}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        size="small"
                      />
                    </div>
                  );
                })}
                {props.information.customOptions.length < 10 ? (
                  <Button
                    variant="text"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={props.handleaddoption}
                    style={{
                      backgroundColor: '#F7F7F7',
                      width: '255px',
                  }}
                  >
                    Añadir opción
                  </Button>
                ) : null}
              </div>
            </div>
          );
      case "Calificaciones":
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>Q1.</div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: "80px",
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
            <div className={styles.stars}>
              <Button
                variant="text"
                onClick={props.handledeletestars}
                style={{
                  backgroundColor: "#F7F7F7",
                  color: "black",
                  fontSize: "1.8rem",
                  padding: "0",
                }}
              >
                -
              </Button>
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "18px 20px",
                  borderRadius: "4px",
                }}
              >
                {props.information.stars.length}
              </div>
              <Button
                variant="text"
                onClick={props.handleaddstars}
                style={{
                  backgroundColor: "#F7F7F7",
                  color: "black",
                  fontSize: "1.8rem",
                  padding: "0",
                }}
              >
                +
              </Button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.3em",
                }}
              >
                {props.information.stars.map((val, index) => {
                  return (
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      key={index}
                    >
                      <path
                        d="M12.978 15.544L8.00001 11.8854L3.02201 15.544L4.93334 9.63536L-0.0419922 6.00003H6.10067L8.00001 0.0813599L9.89934 6.00003H16.0413L11.0667 9.63536L12.978 15.544Z"
                        fill="#ddd"
                      ></path>
                    </svg>
                  );
                })}
              </div>
            </div>
            <sub>{props.starmsg}</sub>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className={styles.form}>
      {props.type === "" || props.type === null ? null : renderForm(props.type)}
    </div>
  );
}
