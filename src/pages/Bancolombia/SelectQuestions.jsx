import { Grid, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import styles from "./Bancolombia.module.css";

export const SelectQuestions = ({
  dataDump,
  inputValues,
  setInputValues,
  errors,
  setErrors,
  firstEmptyRef,
  setSurveyData,
}) => {
  // Función para manejar cambios en los Select y actualizar el estado
  const handleChange = (index, indexPregunta, tituloPregunta) => (event) => {
    const selectedValue = event.target.value;
    setInputValues({ ...inputValues, [index]: selectedValue });

    if (errors[index]) {
      setErrors({ ...errors, [index]: false });
    }

    setSurveyData((prevData) => {
      const newAnswers = [...prevData.answers];
      const answerIndex = newAnswers.findIndex(
        (answer) => answer.id === indexPregunta
      );

      if (answerIndex !== -1) {
        // Encuentra la opción específica dentro de la pregunta y actualízala
        const optionIndex = newAnswers[answerIndex].options.findIndex(
          (option) => option.id === tituloPregunta
        );
        if (optionIndex !== -1) {
          newAnswers[answerIndex].options[optionIndex] = {
            id: tituloPregunta,
            opcion: selectedValue,
            valor:
              selectedValue === "Modificar"
                ? inputValues[`detail-${index}`] || ""
                : "",
          };
        } else {
          // Si la opción no existe, agrégala
          newAnswers[answerIndex].options.push({
            id: tituloPregunta,
            opcion: selectedValue,
            valor: "",
          });
        }
      } else {
        // Si la pregunta no existe, crea una nueva con esta opción
        newAnswers.push({
          id: indexPregunta,
          options: [
            {
              id: tituloPregunta,
              opcion: selectedValue,
              valor: "",
            },
          ],
        });
      }
      return { ...prevData, answers: newAnswers };
    });
  };

  const handleTextFieldChange =
    (indexKey, indexPregunta, opcionId) => (event) => {
      const textFieldValue = event.target.value;
      setInputValues({ ...inputValues, [indexKey]: textFieldValue });

      if (event.target.value.trim() !== "" && errors[indexKey]) {
        setErrors({ ...errors, [indexKey]: false });
      }

      setSurveyData((prevData) => {
        const newAnswers = [...prevData.answers];
        const answerIndex = newAnswers.findIndex(
          (answer) => answer.id === indexPregunta
        );
        if (answerIndex !== -1) {
          // Encuentra la opción específica por su ID único
          const optionIndex = newAnswers[answerIndex].options.findIndex(
            (option) => option.id === opcionId
          );

          if (optionIndex !== -1) {
            newAnswers[answerIndex].options[optionIndex] = {
              ...newAnswers[answerIndex].options[optionIndex],
              valor: textFieldValue,
            };
          }
        }

        return { ...prevData, answers: newAnswers };
      });
    };

  // Lógica para mostrar los Selects y manejar los errores
  return (
    <div>
      {dataDump.preguntas.map((pregunta, indexPregunta) => (
        <div key={indexPregunta}>
          <h2>{pregunta.tituloPregunta}</h2>
          <ul style={{ fontSize: "12px" }}>
            {pregunta.opciones.map((opcion, indexOpcion) => {
              const indexKey = `${indexPregunta}-${indexOpcion}`;
              const detailKey = `detail-${indexKey}`;
              return (
                <li className={styles.mb} key={indexKey}>
                  <Grid container>
                    <Grid
                      item
                      sm={8}
                      xs={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p>{opcion.option}</p>
                    </Grid>
                    <Grid item sm={1} xs={0}></Grid>
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
                          value={inputValues[indexKey] || ""}
                          onChange={handleChange(
                            indexKey,
                            pregunta.id,
                            opcion.option
                          )}
                          label="Acción"
                          ref={(el) => (firstEmptyRef.current[indexKey] = el)}
                          name="selectOption"
                        >
                          <MenuItem value="Mantener">Mantener</MenuItem>
                          <MenuItem value="Eliminar">Eliminar</MenuItem>
                          <MenuItem value="Modificar">Modificar</MenuItem>
                        </Select>
                      </FormControl>
                      {inputValues[indexKey] === "Modificar" && (
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="¿Cómo?"
                          sx={{ marginTop: "10px" }}
                          value={inputValues[detailKey] || ""}
                          onChange={handleTextFieldChange(
                            detailKey,
                            pregunta.id,
                            opcion.option
                          )}
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
