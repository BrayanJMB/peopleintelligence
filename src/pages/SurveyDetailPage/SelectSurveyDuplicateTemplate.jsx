import { useState } from "react";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { duplicateSurvey,templateFromSurveyAllCompanies } from "./services/services";
export const SelectSurveyDuplicateTemplate = ({ surveyId, currentCompany }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
    handleApiCall(event.target.value);
  };

  const handleApiCall = (value) => {
    switch (value) {
      case 1:
        handleDuplicateSurvey(surveyId, currentCompany.id);
        break;
      case 2:
        handleTemplateFromSurveyAll(surveyId, currentCompany.id);
        break;
    }
  };

  const handleDuplicateSurvey = async (surveyId, currentCompany) => {
    try {
      enqueueSnackbar("Duplicando encuesta por favor espere.", {
        variant: "info",
      });
      const response = await duplicateSurvey(surveyId, currentCompany);
      if (response.status === 200) {
        enqueueSnackbar("Encuesta duplicada correctamente.", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar("Hubo un error al duplicar la encuesta", {
        variant: "error",
      });
    }
  };

  const handleTemplateFromSurveyAll = async (surveyId, currentCompany) => {
    try {
      enqueueSnackbar(
        "Creando plantilla para todas las empresas por favor espere.",
        {
          variant: "info",
        }
      );
      const response = await templateFromSurveyAllCompanies(
        surveyId,
        currentCompany
      );
      if (response.status === 200) {
        enqueueSnackbar(
          "Plantilla creada para todas las empresas correctamente.",
          {
            variant: "success",
          }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        "Hubo un error al crear la plantilla para todas las empresas",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Seleccione una opcion
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>Duplicar.</MenuItem>

          <MenuItem value={2}>
            Generar plantilla a partir de una encuesta (todos).
          </MenuItem>
          <MenuItem value={3}>
            Generar plantilla para empresa especifica.
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
