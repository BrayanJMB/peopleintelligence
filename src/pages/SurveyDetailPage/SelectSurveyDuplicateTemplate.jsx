import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import client from "../../utils/axiosInstance";
import { templateFromSurveyByCompany } from "./services/services";

export const SelectSurveyDuplicateTemplate = ({ surveyId, currentCompany }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [age, setAge] = useState("");
  const [options, setOptions] = useState([]);
  const { enqueueSnackbar, closeSnackbar  } = useSnackbar();
  const handleChange = (event) => {
    setAge(event.target.value);
    handleTemplateByCompany(surveyId, event.target.value);
  };

  const handleTemplateByCompany = async (surveyId, currentCompany) => {
    console.log(currentCompany)
    const datos = currentCompany.split("-");
    const key = enqueueSnackbar(
      `Generando plantilla para la empresa ${datos[1]}...`,
      {
        variant: "info",
        autoHideDuration: null, // Evita que se cierre automáticamente
      }
    );
    try {
      const response = await templateFromSurveyByCompany(
        surveyId,
        datos[0],
        datos[0]
      );
      if (response.status === 200) {
        closeSnackbar(key); 
        enqueueSnackbar(
          `Plantilla generada correctamente para la empresa ${datos[1]}.`,
          {
            variant: "success",
          }
        );
      }
    } catch (error) {
      closeSnackbar(key);
      enqueueSnackbar(
        
        `Error al generar la plantilla para la empresa ${datos[1]}.`,
        {
          variant: "error",
        }
      );
    }
  };

  useEffect(() => {
    // Simulando el consumo de una API
    const fetchData = async () => {
      const { data } = await client.get(
        `companias/MultiCompani/${userInfo.user}`
      );
      // Suponiendo que data es un array de objetos [{id: 1, label: 'Opción 1'}, {id: 2, label: 'Opción 2'}, ...]
      setOptions(data); // Guarda los datos en el estado
    };

    fetchData();
  }, []);

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
          {options.map((option) => (
            <MenuItem
              key={option.id - option.nombreCompania}
              value={`${option.id}-${option.nombreCompania}`}
            >
              {option.nombreCompania}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
