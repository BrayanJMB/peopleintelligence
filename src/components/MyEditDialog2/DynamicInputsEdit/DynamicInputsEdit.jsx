import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, TextField } from '@mui/material';

export const DynamicInputsEdit = ({
  setValues,
  field,
  handleInputChange,
  values,
  setCurrentEdit,
}) => {
  const addInput = () => {
    let hasEmptyInput = false;

    setCurrentEdit((prevState) => {
      // Encuentra el índice del campo 'dominio'
      const domainFieldIndex = prevState.fields.findIndex(
        (field2) => field2.name === field.name
      );

      if (domainFieldIndex !== -1) {
        // Crea una nueva copia del arreglo de campos
        const updatedFields = [...prevState.fields];
        // Actualiza el campo 'dominio' con las nuevas opciones
        const updatedOptions = updatedFields[domainFieldIndex].options.map(
          (data) => {
            if (
              (!values[`${field.name}${data.id}`] || // Si el valor no está definido o es nulo
                values[`${field.name}${data.id}`].trim() ||
                data.value) === ''
            ) {
              hasEmptyInput = true;
              return { ...data, error: true };
            }
            return data;
          }
        );

        // Si hay entradas vacías, actualiza los campos y retorna el nuevo estado
        if (hasEmptyInput) {
          updatedFields[domainFieldIndex] = {
            ...updatedFields[domainFieldIndex],
            options: updatedOptions,
          };
          return {
            ...prevState,
            fields: updatedFields,
          };
        }
        // Si no hay entradas vacías, añade una nueva entrada
        updatedFields[domainFieldIndex] = {
          ...updatedFields[domainFieldIndex],
          options: [
            ...updatedOptions,
            { id: updatedOptions.length + 1, value: '', error: false },
          ],
        };

        return {
          ...prevState,
          fields: updatedFields,
        };
      }

      return prevState;
    });
  };

const removeInput = (id) => {
  setCurrentEdit((prevState) => {
    const updatedFields = prevState.fields.map((field) => {
      const updatedOptions = field.options
        ? field.options.filter((option) => option.id !== id)
        : [];

      // Reasignar IDs aquí para que los índices sean siempre consecutivos
      updatedOptions.forEach((option, index) => {
        option.id = index + 1;
      });

      return {
        ...field,
        options: updatedOptions,
      };
    });

    return {
      ...prevState,
      fields: updatedFields,
    };
  });

  // Actualizar el estado de los valores cuando se elimina un input
  setValues((prevValues) => {
    const newValues = { ...prevValues };

    // Eliminar la clave del valor que corresponde al input eliminado
    Object.keys(newValues).forEach((key) => {
      // Verificar si la clave corresponde al campo y al ID que estamos eliminando
      if (key.startsWith(field.name) && parseInt(key.substring(field.name.length)) === id) {
        delete newValues[key]; // Eliminar el valor asociado al input eliminado
      }

      // Actualizar las claves de los valores restantes si es necesario
      // Esto asume que el orden de los campos importa y que los IDs son secuenciales
      if (key.startsWith(field.name) && parseInt(key.substring(field.name.length)) > id) {
        const newKey = field.name + (parseInt(key.substring(field.name.length)) - 1);
        newValues[newKey] = newValues[key];
        delete newValues[key];
      }
    });

    return newValues;
  });
};


  useEffect(() => {
    // Mapear todas las opciones en field.options para actualizar values
    let updatedValues = { ...values };

    // Asignar cada opción al estado basado en `fieldname + id`
    field.options.forEach((option) => {
      const key = `${field.name}${option.id}`; // Construye la clave como 'dominion1', 'dominion2', etc.
      updatedValues[key] = option.value; // Asigna el valor de la opción a la clave
    });

    setValues(updatedValues); // Actualiza el estado con los nuevos valores
  }, [setValues]);

  return (
    <Grid container spacing={2}>
      {field.options.map((input, index) => (
        <Grid item xs={6} key={input.id}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={11}>
              <TextField
                fullWidth
                id={`${field.name}${input.id}`}
                label={`Dominio ${input.id}`}
                name={`${field.name}${input.id}`}
                type="text"
                value={values[`${field.name}${input.id}`] || ''}
                required={field.isRequired}
                onChange={(e) => handleInputChange(e)}
                error={values[`${field.name}${input.id}Error`] || input.error}
                helperText={
                  values[`${field.name}${input.id}Error`] || input.error
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
            {index > 0 && (
              <Grid item xs={1}>
                <IconButton color="error" onClick={() => removeInput(input.id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={addInput}>
          Agregar Dominio
        </Button>
      </Grid>
    </Grid>
  );
};
