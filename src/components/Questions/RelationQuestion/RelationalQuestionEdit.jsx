import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { LayoutQuestion } from '../LayoutQuestion';

import { RelationalOptions } from './RelationalOptions';

import styles from '../../Form/Form.module.css';
export const RelationalQuestionsEdit = (props) => {
  const addPreguntaOpcionInput = () => {
    props.handleaddoption(props.type.id);
  };

  const removePreguntaOpcionInput = (index) => {
    const newCustomOptions = props.question.customOptions.filter(
      (_, i) => i !== index
    );

    // Actualiza opcionesInputs eliminando el elemento en el índice dado
    const newOpcionesInputs = props.question.opcionesInputs.filter(
      (_, i) => i !== index
    );

    // Establece el nuevo estado de information con las listas actualizadas
    props.setInformation({
      ...props.question,
      customOptions: newCustomOptions,
      opcionesInputs: newOpcionesInputs,
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
        {props.question.customOptions.length < 10 && (
          <Button variant="contained" onClick={addPreguntaOpcionInput}>
            Añadir Pregunta y Opción
          </Button>
        )}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {props.question.customOptions.map((_, key) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 8,
                  flex: 1,
                }}
              >
                <TextField
                  id={`outlined-option-${key}`}
                  variant="outlined"
                  placeholder="Añadir pregunta..."
                  style={{ marginTop: 8, marginBottom: 8 }}
                  value={props.question.customOptions[key] || null}
                  onChange={props.handleInformationOptions(key)}
                  error={props.customOptionError[key]}
                  helperText={
                    props.customOptionError[key]
                      ? 'La opción no puede estar vacía'
                      : ''
                  }
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                  multiline // Esto convierte el TextField en un área de texto
                  minRows={3}
                  maxRows={3} // Establece el límite máximo de filas // Ajusta el número mínimo de filas según sea necesario
                  onkeydown={handleKeyPress} // Evitar Enter
                />
              </div>
            ))}
          </Grid>
          <Grid item xs={6}>
            {props.question.selectOptions.map((_, key) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 8,
                  flex: 1,
                }}
              >
                <TextField
                  label={`Opción ${key + 1}`}
                  variant="outlined"
                  style={{ marginTop: 8, marginBottom: 8 }}
                  value={props.question.selectOptions[key] || null}
                  onChange={props.handleInformationRelationalOptions(key)}
                  error={props.optionRelationalError[key]}
                  helperText={
                    props.optionRelationalError[key]
                      ? 'La opción no puede estar vacía'
                      : ''
                  }
                  fullWidth
                  multiline // Esto convierte el TextField en un área de texto
                  minRows={3}
                  maxRows={3} // Establece el límite máximo de filas // Ajusta el número mínimo de filas según sea necesario
                  onkeydown={handleKeyPress} // Evitar Enter
                />
                {key >= 2 && (
                  <IconButton
                    color="error"
                    onClick={() => removePreguntaOpcionInput(key)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </Grid>
        </Grid>
    </>
  );
};
