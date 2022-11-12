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
          fullWidth
          size="small"
        />
      </div>
      <div className={styles.input}>
        <span style={{ color: "#03aae4", fontSize: "0.8rem" }}>
          Propósito de esta encuesta
        </span>
        <TextareaAutosize
          id="outlined-name"
          label="Proposito de la encuesta "
          placeholder="Proposito de la encuesta aqui..."
          value={props.data.description}
          style={{
            width: "100%",
            height: "100px",
            marginTop: "0.5rem",
            padding: "0.5em",
          }}
          name="description"
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}
