import styles from "./Cuestionario.module.css";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Cuestionario(props) {
  return (
    <div className={styles.title}>
      <div className={styles.questions}>
        <div className={styles.top}>
          <div className={styles.left}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "24px",
                letterSpacing: "0.15px",
              }}
            >
              Cuestionario de encuesta
            </h3>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "300",
                lineHeight: "20px",
                letterSpacing: "0.25px",
              }}
            >
              Puede reorganizar, editar o eliminar preguntas de esta sección
            </p>
          </div>
          <Button
            color="blue"
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
          >
            ANADIR PREGUNTA
          </Button>
        </div>
        {props.questions.length === 0 ? (
          <p
            style={{
              fontSize: "12px",
              fontWeight: "300",
              lineHeight: "16px",
              letterSpacing: "0.25px",
            }}
          >
            ¡Aún no se agregaron preguntas!
          </p>
        ) : (
          <div className={styles.data}>data</div>
        )}
      </div>
    </div>
  );
}
