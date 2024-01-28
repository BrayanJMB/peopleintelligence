import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Grid,
} from "@mui/material";

export default function InsertQuestion({
  dataDump,
  radioValuesByAttribute,
  textValuesByAttribute,
  errors,
  currentAttributeIndex,
  setTextValuesByAttribute,
  setRadioValuesByAttribute,
  color
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
          <p style={{ marginBottom: "5px" }}>{indexPreguntaRadio +1}.{" "}{preguntaRadio.tituloPregunta}</p>
          <Grid container>
            <Grid item sm={4} xs={12}>
              <FormControl
                error={Boolean(
                  errors[`radio-${currentAttributeIndex}-${indexPreguntaRadio}`]
                )} // Error específico para cada pregunta radio
                component="fieldset"
              >
                <RadioGroup
                  row
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
                  <FormControlLabel
                    value="Si"
                    control={
                      <Radio
                        sx={{
                          color: errors[
                            `radio-${currentAttributeIndex}-${indexPreguntaRadio}`
                          ]
                            ? "error.main"
                            : {color},
                          "&.Mui-checked": {
                            color: errors[
                              `radio-${currentAttributeIndex}-${indexPreguntaRadio}`
                            ]
                              ? "error.main"
                              : {color},
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 16,
                          },
                        }}
                      />
                    }
                    label="Si"
                    sx={{
                      color: errors[
                        `radio-${currentAttributeIndex}-${indexPreguntaRadio}`
                      ]
                        ? "error.main"
                        : "inherit",
                      ".MuiFormControlLabel-label": {
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
                            `radio-${currentAttributeIndex}-${indexPreguntaRadio}`
                          ]
                            ? "error.main"
                            : {color},
                          "&.Mui-checked": {
                            color: errors[
                              `radio-${currentAttributeIndex}-${indexPreguntaRadio}`
                            ]
                              ? "error.main"
                              : {color},
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 16,
                          },
                        }}
                      />
                    }
                    label="No"
                    sx={{
                      color: errors[
                        `radio-${currentAttributeIndex}-${indexPreguntaRadio}`
                      ]
                        ? "error.main"
                        : "inherit",
                      ".MuiFormControlLabel-label": {
                        fontSize: 16,
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sm={8} xs={12}>
              {radioValuesByAttribute[currentAttributeIndex]?.[
                indexPreguntaRadio
              ] === "Si" && (
                <TextField
                  size="small"
                  label="¿Cuál?"
                  variant="outlined"
                  fullWidth
                  error={Boolean(
                    errors[
                      `text-${currentAttributeIndex}-${indexPreguntaRadio}`
                    ]
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
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
