import React, { useState } from "react";
import { Grid, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const DynamicInputs = ({values, field, handleInputChange}) => {
  const [inputs, setInputs] = useState([{ id: 1, value: "", error: false }]);
  console.log(values)
console.log(field);
  const handleInputChange2 = (id, newValue) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, value: newValue, error: false } : input
      )
    );
  };

  const addInput = () => {
    let hasEmptyInput = false;

    setInputs((prevInputs) => {
      const updatedInputs = prevInputs.map((input) => {
        if (input.value.trim() === "") {
          hasEmptyInput = true;
          return { ...input, error: true };
        }
        return input;
      });

      if (hasEmptyInput) {
        return updatedInputs;
      }

      return [
        ...updatedInputs,
        { id: prevInputs.length + 1, value: "", error: false },
      ];
    });
  };

  const removeInput = (id) => {
    if (inputs.length === 1) {
      return;
    }
    setInputs((prevInputs) =>
      prevInputs
        .filter((input) => input.id !== id)
        .map((input, index) => ({ ...input, id: index + 1 }))
    );
  };

  return (
    <Grid container spacing={2}>
      {inputs.map((input, index) => (
        <Grid item xs={6} key={input.id}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={11}>
              <TextField
                fullWidth
                id={field.name}
                label={`Dominio ${input.id}`}
                name={`${field.name}${index+1}`}
                type="text"
                value={values[`${field.name}${index+1}`] || ""}
                required={field.isRequired}
                onChange={(e) => (handleInputChange(e), handleInputChange2(input.id, e.target.value))}
                error={values[`${field.name}${index+1}Error`]}
                helperText={values[`${field.name}${index+1}HelperText`] || ""}
              />
            </Grid>
            {inputs.length > 1 && (
              <Grid item xs={1}>
                <IconButton
                  color="error"
                  onClick={() => removeInput(input.id)}
                >
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