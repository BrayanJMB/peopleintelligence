import React, { useState } from "react";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

export default function InsertQuestion({
  dataDump,
  radioValuesByAttribute,
  textValuesByAttribute,
  errors,
  currentAttributeIndex,
  setTextValuesByAttribute,
  setRadioValuesByAttribute,
}) {
  const handleRadioChange = (attributeIndex, questionIndex, event) => {
    const newValue = event.target.value;
    setRadioValuesByAttribute((prev) => ({
      ...prev,
      [attributeIndex]: {
        ...prev[attributeIndex],
        [questionIndex]: newValue,
      },
    }));

    // Si el valor no es "Si", limpia el TextField asociado para esta pregunta
    if (newValue !== "Si") {
      setTextValuesByAttribute((prev) => ({
        ...prev,
        [attributeIndex]: {
          ...prev[attributeIndex],
          [questionIndex]: "",
        },
      }));
    }
  };

  const handleTextChange = (attributeIndex, questionIndex, event) => {
    const newValue = event.target.value;
    setTextValuesByAttribute((prev) => ({
      ...prev,
      [attributeIndex]: {
        ...prev[attributeIndex],
        [questionIndex]: newValue,
      },
    }));
  };

  return (
    <Box>
      {dataDump.preguntasRadio.map((preguntaRadio, indexPreguntaRadio) => (
        <Box key={indexPreguntaRadio}>
          <p>{preguntaRadio.tituloPregunta}</p>
          <FormControl
            error={Boolean(
              errors[`radio-${currentAttributeIndex}-${indexPreguntaRadio}`]
            )} // Error específico para cada pregunta radio
            component="fieldset"
          >
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name={`radio-buttons-group-${indexPreguntaRadio}`}
              value={
                radioValuesByAttribute[currentAttributeIndex]?.[
                  indexPreguntaRadio
                ] || ""
              }
              onChange={(event) =>
                handleRadioChange(
                  currentAttributeIndex,
                  indexPreguntaRadio,
                  event
                )
              }
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          {radioValuesByAttribute[currentAttributeIndex]?.[
            indexPreguntaRadio
          ] === "Si" && (
            <TextField
              label="¿Cuál?"
              variant="outlined"
              fullWidth
              error={Boolean(
                errors[`text-${currentAttributeIndex}-${indexPreguntaRadio}`]
              )} // Error específico para cada TextField
              value={
                textValuesByAttribute[currentAttributeIndex]?.[
                  indexPreguntaRadio
                ] || ""
              }
              onChange={(event) =>
                handleTextChange(
                  currentAttributeIndex,
                  indexPreguntaRadio,
                  event
                )
              }
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
