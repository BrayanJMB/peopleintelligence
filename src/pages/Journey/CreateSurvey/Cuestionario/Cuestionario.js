import { DragDropContext, Draggable,Droppable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import styles from './Cuestionario.module.css';

export default function Cuestionario(props) {
  return (
    <div className={styles.title}>
      <div className={styles.questions}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
            >
              Cuestionario de encuesta
            </Typography>
            
            <p
              style={{
                fontSize: '14px',
                fontWeight: '300',
                lineHeight: '20px',
                letterSpacing: '0.25px',
              }}
            >
              Puede reorganizar, editar o eliminar preguntas de esta sección
            </p>
          </div>
          <Button
            color="primary"
            variant="outlined"
            onClick={props.handleAdd}
            startIcon={<AddIcon />}
          >
            Pregunta
          </Button>
        </div>
        {props.questions.length === 0 ? (
          <p
            style={{
              fontSize: '12px',
              fontWeight: '300',
              lineHeight: '16px',
              letterSpacing: '0.25px',
            }}
          >
            ¡Aún no se agregaron preguntas!
          </p>
        ) : (
          <div className={styles.data}>
            <DragDropContext onDragEnd={props.onEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {props.questions.map((val, index) => {
                        return (
                          <Draggable
                            key={val.id}
                            draggableId={val.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <>
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={styles.drag}
                                  >
                                    <div className={styles.showedit}>
                                      <div className={styles.number}>
                                        <span className={styles.order}>
                                          Q{index + 1}
                                        </span>
                                      </div>
                                      <div className={styles.question_data}>
                                        <div className={styles.quest}>
                                          {val.name}
                                        </div>
                                        <div className={styles.desc}>
                                          {val.description}
                                        </div>
                                        <div className={styles.editdelete}>
                                        
                                          {/* question options */}
                                          {/* edit */}
                                          <IconButton
                                            onClick={() => {
                                              props.handleEdit(index);
                                            }}
                                          >
                                            <ModeOutlinedIcon
                                              sx={{
                                                fontSize: '30px',
                                              }}
                                            />
                                          </IconButton>
                                          {/* delete */}
                                          <IconButton
                                            onClick={() => {
                                              props.handleDelete(index);
                                            }}
                                          >
                                            <DeleteForeverOutlinedIcon
                                              sx={{ 
                                                fontSize: '30px',
                                              }}
                                            />
                                          </IconButton>

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
