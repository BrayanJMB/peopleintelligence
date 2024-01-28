import { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { LayoutQuestions } from './LayoutQuestions';

import styles from './Bancolombia.module.css';

export const SelectQuestions = ({
  dataDump,
  inputValues,
  setInputValues,
  errors,
  setErrors,
  firstEmptyRef,
}) => {
  // Función para manejar cambios en los Select y actualizar el estado
  const handleChange = (index) => (event) => {
    setInputValues({ ...inputValues, [index]: event.target.value });
    if (errors[index]) {
      setErrors({ ...errors, [index]: false });
    }
  };

  const handleTextFieldChange = (indexKey) => (event) => {
    setInputValues({ ...inputValues, [indexKey]: event.target.value });
    // También podrías querer validar el input inmediatamente o quitar el error si ya hay texto
    if (event.target.value.trim() !== '' && errors[indexKey]) {
      setErrors({ ...errors, [indexKey]: false });
    }
  };

  // Lógica para mostrar los Selects y manejar los errores
  return (
    <div>
      {dataDump.preguntas.map((pregunta, indexPregunta) => (
        <div key={indexPregunta}>
          <h3>{pregunta.tituloPregunta}</h3>
          <ul style={{ fontSize: '12px' }}>
            {pregunta.opciones.map((opcion, indexOpcion) => {
                const indexKey = `${indexPregunta}-${indexOpcion}`;
                const detailKey = `detail-${indexKey}`;
              return (
                <li className={styles.mb} key={indexKey}>
                  <Grid container>
                    <Grid
                      item
                      sm={9}
                      xs={12}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <p>{opcion.option}</p>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                      <FormControl
                        fullWidth
                        size="small"
                        error={errors[indexKey]}
                      >
                        <InputLabel id={`action-select-label-${indexKey}`}>
                          Acción
                        </InputLabel>
                        <Select
                          labelId={`action-select-label-${indexKey}`}
                          id={`action-select-${indexKey}`}
                          value={inputValues[indexKey] || ''}
                          onChange={handleChange(indexKey)}
                          label="Acción"
                          ref={(el) => (firstEmptyRef.current[indexKey] = el)}
                        >
                          <MenuItem value="Mantener">Mantener</MenuItem>
                          <MenuItem value="Eliminar">Eliminar</MenuItem>
                          <MenuItem value="Modificar">Modificar</MenuItem>
                        </Select>
                      </FormControl>
                      {inputValues[indexKey] === 'Modificar' && (
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="¿Cómo?"
                          sx={{ marginTop: '10px' }}
                          value={inputValues[detailKey] || ''}
                          onChange={handleTextFieldChange(detailKey)}
                          error={errors[detailKey]} // Usa el estado de error para este campo también
                          ref={(el) => (firstEmptyRef.current[detailKey] = el)}
                        />
                      )}
                    </Grid>
                  </Grid>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
