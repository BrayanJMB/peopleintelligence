import { TextField } from "@mui/material";
import { useEffect } from "react";

export const OpenQuestions = ({
  dataDump,
  textOpenValuesByAttribute,
  setTextOpenValuesByAttribute,
  setSurveyData,
  currentAttributeIndex
}) => {
  const handleTextChange = (preguntaId, event) => {
    const updatedValue = event.target.value;

    setTextOpenValuesByAttribute(prev => ({
      ...prev,
      [preguntaId]: updatedValue,
    }));

    setSurveyData((prevState) => {
      const updatedRespuestasAbiertas = prevState.respuestasAbiertas.map(
        (respuesta) =>
          respuesta.id === preguntaId
            ? { ...respuesta, respuesta: updatedValue }
            : respuesta
      );

      // Si no se encontró una respuesta existente, agregar una nueva
      if (
        !updatedRespuestasAbiertas.some(
          (respuesta) => respuesta.id === preguntaId
        )
      ) {
        updatedRespuestasAbiertas.push({
          id: preguntaId,
          respuesta: updatedValue,
        });
      }

      return { ...prevState, respuestasAbiertas: updatedRespuestasAbiertas };
    });
  };
  const currentTextFieldValue = textOpenValuesByAttribute[dataDump.preguntaAbierta.id] || '';
  return (
    <>
      <p style={{ marginBottom: '5px' }}>{dataDump.preguntaAbierta.tituloPregunta}</p>
      <TextField
        size="small"
        label="¿Cuál?"
        variant="outlined"
        fullWidth
        value={currentTextFieldValue}
        onChange={(event) =>
          handleTextChange(dataDump.preguntaAbierta.id, event)
        }
      />
    </>
  );
};
