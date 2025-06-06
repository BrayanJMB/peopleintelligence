import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';

import MyConfirmation from '../../../../components/MyConfirmation/MyConfirmation';

import styles from './Cuestionario.module.css';

export default function Cuestionario(props) {
  const anyConditional = props.questions.some(
    (question) => question.conditionalQuestion
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [checked, setChecked] = useState(() =>
    Object.fromEntries(
      props.questions.map((q) => [q.id, q.conditionalQuestion || false])
    )
  );
  const [shouldEdit, setShouldEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  /**
   * Handle on close delete dialog.
   *
   * @param {boolean} isConfirmed Is true if the user confirmed the action.
   * @returns
   */
  const onCloseDeleteDialog = (isConfirmed) => {
    if (!isConfirmed) {
      setDeleteDialogOpen(false);

      return;
    }

    props.handleDelete(currentQuestionId);
    setDeleteDialogOpen(false);
  };

  /**
   * Open delete dialog.
   *
   * @param {number} id The id of the question to delete.
   */
  const openDeleteDialog = (id) => {
    setCurrentQuestionId(id);
    setDeleteDialogOpen(true);
  };

  const handleChange = (e, idQuestion) => {
    const isChecked = e.target.checked;
  
    setChecked((prev) => ({
      ...prev,
      [idQuestion]: isChecked,
    }));
  
    props.setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === idQuestion
          ? { ...question, conditionalQuestion: isChecked }
          : question
      )
    );
  
    props.setConditionalQuestion(isChecked);
    if (isChecked) {
      const index = props.questions.findIndex((q) => q.id === idQuestion);
      setShouldEdit(true);
      setEditIndex(index);
    }
  };
  

  useEffect(() => {
    if (shouldEdit) {
      props.handleEdit(editIndex);
      setShouldEdit(false); // Resetear el indicador para futuras ediciones
    }
  }, [props.questions, shouldEdit, editIndex]);

  return (
    <div className={styles.title}>
      <div className={styles.questions}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
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
                            //isDragDisabled={anyConditional} // Deshabilitar el drag si 'conditionalQuestion' es true
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
                                              openDeleteDialog(val.id);
                                            }}
                                          >
                                            <DeleteForeverOutlinedIcon
                                              sx={{
                                                fontSize: '30px',
                                              }}
                                            />
                                          </IconButton>
                                          {/* Conditional */}
                                          {val.typeId === 8 &&
                                            index !==
                                              props.questions.length - 1 && (
                                              <FormControlLabel
                                                control={
                                                  <Switch
                                                    checked={
                                                      checked[val.id] || false
                                                    }
                                                    onChange={(e) =>
                                                      handleChange(e, val.id)
                                                    }
                                                  />
                                                }
                                                label="¿Es condicional?"
                                              />
                                            )}
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

      <MyConfirmation
        open={deleteDialogOpen}
        onClose={onCloseDeleteDialog}
        title="¿Estás seguro de eliminar esta pregunta?"
        message="Esta acción no se puede deshacer."
      />
    </div>
  );
}
