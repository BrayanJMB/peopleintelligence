import { Grid, Paper, TextField } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";

export const LayoutDraggable = ({
  children,
  droppableId,
  type,
  opcionesInputs,
  preguntasInputs,
}) => {
  const inputs =
    opcionesInputs && opcionesInputs.length > 0
      ? opcionesInputs
      : preguntasInputs;
  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided) => (
        <Grid item xs={6} ref={provided.innerRef} {...provided.droppableProps}>
          <Paper style={{ padding: 16 }}>
            {opcionesInputs.map((input, index) => (
              <Draggable key={input.id} draggableId={input.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      {children(index)}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Paper>
        </Grid>
      )}
    </Droppable>
  );
};
