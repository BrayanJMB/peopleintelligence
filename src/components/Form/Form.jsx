import styles from "./Form.module.css";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const options = [
  "Muy en desacuerdo",
  "Discrepar",
  "Neutral",
  "Estar de acuerdo",
  "Totalmente de acuerdo",
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
                  label="Anadir prequnta"
                  placeholder="Anadir prequnta aqui..."
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
                label="Anadir description"
                placeholder="Anadir description aqui (opcional)..."
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
                  label="Anadir prequnta"
                  placeholder="Anadir prequnta aqui..."
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
                label="Anadir description"
                placeholder="Anadir description aqui (opcional)..."
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
      case "Opcion multipe":
        return <></>;
      case "Calificaciones":
        return <></>;
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
