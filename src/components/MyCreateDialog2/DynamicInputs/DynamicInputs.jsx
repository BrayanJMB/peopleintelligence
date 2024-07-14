import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, IconButton, TextField } from "@mui/material";

export const DynamicInputs = ({
  setValues,
  field,
  handleInputChange,
  values,
  setCurrentCreate,
}) => {
  const addInput = () => {
    let hasEmptyInput = false;

    setCurrentCreate((prevState) => {
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
              !values[`${field.name}${data.id}`] || // Si el valor no está definido o es nulo
              values[`${field.name}${data.id}`].trim() === ""
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
            { id: updatedOptions.length + 1, value: "", error: false },
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
    setCurrentCreate((prevState) => {
      const updatedFields = prevState.fields.map((field) => {
        if (field.name === field.name) {
          const updatedOptions = field.options
            ? field.options
                .filter((option) => option.id !== id)
                .map((option, index) => ({ ...option, id: index + 1 })) // Reasigna IDs
            : [];
  
          return {
            ...field,
            options: updatedOptions,
          };
        }
        return field;
      });
  
      return {
        ...prevState,
        fields: updatedFields,
      };
    });
  
    // Suponiendo que tienes un estado llamado `setValues` para actualizar los valores del formulario
    setValues((prevValues) => {
      const newValues = { ...prevValues };
      delete newValues[`${field.name}${id}`];  // Elimina el valor del input que ha sido removido
      return newValues;
    });
  };
  
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
                value={values[`${field.name}${input.id}`] || ""}
                required={field.isRequired}
                onChange={(e) => handleInputChange(e)}
                error={values[`${field.name}${input.id}Error`] || input.error}
                helperText={
                  values[`${field.name}${input.id}Error`] || input.error
                    ? "Este campo es obligatorio"
                    : ""
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
