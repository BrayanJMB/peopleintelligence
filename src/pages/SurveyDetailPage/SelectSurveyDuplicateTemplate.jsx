import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSnackbar } from 'notistack';

import client from '../../utils/axiosInstance';

import { templateFromSurveyByCompany } from './services/services';

export const SelectSurveyDuplicateTemplate = ({
  surveyId,
  currentCompanyId,
  handleOpenDialog,
  generateSurveyId,
  handleCloseDialog,
}) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [company, setCompany] = useState('');
  const [options, setOptions] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleChange = (event) => {
    setCompany(event.target.value);
    const datos = event.target.value.split('-');
    const id = generateSurveyId();
    handleOpenDialog(
       id,
      `Al ejecutar esta acción creará una plantilla para la empresa ${datos[1]}`,
      () => {
        handleTemplateByCompany(surveyId, event.target.value);
        handleCloseDialog(id);
      },
      false
    );
  };

  const handleTemplateByCompany = async (surveyId, currentCompany) => {
    const datos = currentCompany.split('-');
    const key = enqueueSnackbar(
      `Generando plantilla para la empresa ${datos[1]}...`,
      {
        variant: 'info',
        autoHideDuration: null, // Evita que se cierre automáticamente
      }
    );
    try {
      const response = await templateFromSurveyByCompany(
        surveyId,
        currentCompanyId.id,
        datos[0]
      );
      if (response.status === 200) {
        closeSnackbar(key);
        enqueueSnackbar(
          `Plantilla generada correctamente para la empresa ${datos[1]}.`,
          {
            variant: 'success',
          }
        );
      }
    } catch (error) {
      closeSnackbar(key);
      enqueueSnackbar(
        `Error al generar la plantilla para la empresa ${datos[1]}.`,
        {
          variant: 'error',
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
          value={company}
          label="companies"
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
