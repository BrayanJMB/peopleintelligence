import styles from "./Cuestionario.module.css";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Divider from "@mui/material/Divider";

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
          <div className={styles.data}>
            <DragDropContext onDragEnd={props.onEnd}>
              <Droppable droppableId="droppable">
                {(provided) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {props.questions.map((val, index) => {
                        return (
                          <Draggable
                            key={val.id}
                            draggableId={val.id}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <>
                                  {" "}
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={styles.drag}
                                  >
                                    <div className={styles.showedit}>
                                      <div className={styles.number}>
                                        <span className={styles.order}>
                                          Q{index}
                                        </span>
                                      </div>

                                      <div className={styles.question_data}>
                                        <div className={styles.quest}>
                                          {val.name}
                                        </div>
                                        <div className={styles.desc}>
                                          {val.description}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Divider variant="middle" />
                                </>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
}
