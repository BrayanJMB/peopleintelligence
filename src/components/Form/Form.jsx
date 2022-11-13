import styles from "./Form.module.css";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const renderForm = (type) => {
  switch (type) {
    case "Texto corto":
      return <></>;
    case "Escala Likert":
      return <></>;
    case "Opcion multipe":
      return <></>;
    case "Opcion multipe con imagenes":
      return <></>;
    case "Calificaciones":
      return <></>;
    default:
      return null;
  }
};

export default function Form(props) {
  return (
    <div className={styles.form}>
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
    </div>
  );
}
