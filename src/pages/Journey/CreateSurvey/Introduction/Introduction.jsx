import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import styles from "./Introduction.module.css";

export default function Introduction(props) {
  return (
    <div className={styles.form}>
      <p>Introduction a la encuesta</p>
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Nombre de la encuesta"
          placeholder="Nombre de la encuesta aqui..."
          value={props.data.title}
          name="title"
          onChange={props.handleChange}
          error={props.errorMessage.title}
          helperText={props.helperText.title}
          fullWidth
          size="small"
        />
      </div>
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Propósito de esta encuesta"
          placeholder="Proposito de la encuesta aqui..."
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: {
              style: {
                height: "90px",
              },
            },
          }}
          value={props.data.description}
          error={props.errorMessage.description}
          helperText={props.helperText.description}
          style={{
            width: "100%",
            marginTop: "0.5rem",
          }}
          name="description"
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}
