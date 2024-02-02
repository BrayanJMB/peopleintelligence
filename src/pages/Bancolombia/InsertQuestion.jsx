import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

export default function InsertQuestion({
  dataDump,
  radioValuesByAttribute,
  textValuesByAttribute,
  errors,
  currentAttributeIndex,
  setTextValuesByAttribute,
  setRadioValuesByAttribute,
  color,
  setSurveyData,
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

    setSurveyData((prevData) => {
      const updatedRadioAnswers = [...prevData.radioAnswers];
      const answerIndex = updatedRadioAnswers.findIndex(
        (answer) => answer.id === questionIndex
      );

      if (answerIndex !== -1) {
        updatedRadioAnswers[answerIndex] = {
          ...updatedRadioAnswers[answerIndex],
          value: newValue,
          respuesta:
            newValue === 'Si' ? updatedRadioAnswers[answerIndex].respuesta : '',
        };
      } else {
        updatedRadioAnswers.push({
          id: questionIndex,
          value: newValue,
          respuesta: '',
        });
      }

      return { ...prevData, radioAnswers: updatedRadioAnswers };
    });

    if (newValue !== 'Si') {
      setTextValuesByAttribute((prev) => ({
        ...prev,
        [attributeIndex]: {
          ...prev[attributeIndex],
          [questionIndex]: '',
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

    if (radioValuesByAttribute[attributeIndex]?.[questionIndex] === 'Si') {
      setSurveyData((prevData) => {
        const updatedRadioAnswers = [...prevData.radioAnswers];
        const answerIndex = updatedRadioAnswers.findIndex(
          (answer) => answer.id === questionIndex
        );

        if (answerIndex !== -1) {
          updatedRadioAnswers[answerIndex] = {
            ...updatedRadioAnswers[answerIndex],
            respuesta: newValue,
          };
        } else {
          updatedRadioAnswers.push({
            id: questionIndex,
            value: 'Si',
            respuesta: newValue,
          });
        }

        return { ...prevData, radioAnswers: updatedRadioAnswers };
      });
    }
  };

  return (
    <Box>
      {dataDump.preguntasRadio.map((preguntaRadio, indexPreguntaRadio) => (
        <Box key={indexPreguntaRadio}>
          <p style={{ marginBottom: '5px' }}>
            {preguntaRadio.tituloPregunta}
          </p>
          <Grid container>
            <Grid item sm={4} xs={12}>
              <FormControl
                error={Boolean(
                  errors[`radio-${currentAttributeIndex}-${preguntaRadio.id}`]
                )} // Error específico para cada pregunta radio
                component="fieldset"
              >
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name={`radio-buttons-group-${preguntaRadio.id}`}
                  value={
                    radioValuesByAttribute[currentAttributeIndex]?.[
                      preguntaRadio.id
                    ] || ''
                  }
                  onChange={(event) =>
                    handleRadioChange(
                      currentAttributeIndex,
                      preguntaRadio.id,
                      event
                    )
                  }
                >
                  <FormControlLabel
                    value="Si"
                    control={
                      <Radio
                        sx={{
                          color: errors[
                            `radio-${currentAttributeIndex}-${preguntaRadio.id}`
                          ]
                            ? 'error.main'
                            : { color },
                          '&.Mui-checked': {
                            color: errors[
                              `radio-${currentAttributeIndex}-${preguntaRadio.id}`
                            ]
                              ? 'error.main'
                              : { color },
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: 16,
                          },
                        }}
                      />
                    }
                    label="Si"
                    sx={{
                      color: errors[
                        `radio-${currentAttributeIndex}-${preguntaRadio.id}`
                      ]
                        ? 'error.main'
                        : 'inherit',
                      '.MuiFormControlLabel-label': {
                        fontSize: 16, // Por ejemplo, si también quieres cambiar el tamaño del texto de la etiqueta
                      },
                    }}
                  />
                  <FormControlLabel
                    value="No"
                    control={
                      <Radio
                        sx={{
                          color: errors[
                            `radio-${currentAttributeIndex}-${preguntaRadio.id}`
                          ]
                            ? 'error.main'
                            : { color },
                          '&.Mui-checked': {
                            color: errors[
                              `radio-${currentAttributeIndex}-${preguntaRadio.id}`
                            ]
                              ? 'error.main'
                              : { color },
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: 16,
                          },
                        }}
                      />
                    }
                    label="No"
                    sx={{
                      color: errors[
                        `radio-${currentAttributeIndex}-${preguntaRadio.id}`
                      ]
                        ? 'error.main'
                        : 'inherit',
                      '.MuiFormControlLabel-label': {
                        fontSize: 16,
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sm={8} xs={12}>
              {radioValuesByAttribute[currentAttributeIndex]?.[
                preguntaRadio.id
              ] === 'Si' && (
                <TextField
                  size="small"
                  label="¿Cuál?"
                  variant="outlined"
                  fullWidth
                  error={Boolean(
                    errors[`text-${currentAttributeIndex}-${preguntaRadio.id}`]
                  )} // Error específico para cada TextField
                  value={
                    textValuesByAttribute[currentAttributeIndex]?.[
                      preguntaRadio.id
                    ] || ''
                  }
                  onChange={(event) =>
                    handleTextChange(
                      currentAttributeIndex,
                      preguntaRadio.id,
                      event
                    )
                  }
                />
              )}
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
