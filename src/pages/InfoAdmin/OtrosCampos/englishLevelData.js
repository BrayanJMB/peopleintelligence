/*import { useState } from 'react';
import { useSnackbar } from 'notistack';

import {
  deleteEnglishLevelAPI,
  fetchEnglishLevelByCompanyAPI,
} from '../../../services/getEnglishLevel.service';
import { handleDelete } from '../../../utils/helpers';

export const useEnglishLevel = (
  currentCompany,
  setCurrentCreate,
  setOpenCreateDialog
) => {
  const { enqueueSnackbar } = useSnackbar();
  const [englishLevels, setEnglishLevel] = useState([]);
  const englishLevelColumns = [
    {
      id: 'name',
      label: 'Nivel de inglés',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];
  const handleCreateEnglishLevel = () => {
    setCurrentCreate({
      type: 'englishLevel',
      title: 'Crear nivel de ingles',
      fields: [
        {
          label: 'Nivel de inglés',
          name: 'nivelIngles',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapEnglishLevel = (EnglishLevel) =>
    EnglishLevel.map((EnglishLevel) => [
      {
        column: 'name',
        value: EnglishLevel.nivelIngles, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteEnglishLevel,
          //handleEdit: handleEditEnglishLevel,
          id: EnglishLevel.id,
        },
      },
    ]);

  const handleDeleteEnglishLevel = async (id) => {
    handleDelete(
      id,
      currentCompany,
      englishLevels,
      setNivelIngles,
      deleteEnglishLevelAPI,
      enqueueSnackbar,
      'Nivel de inglés'
    );
  };

  const fetchEnglishLevel = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchEnglishLevelByCompanyAPI(currentCompany.id);
    setNivelIngles(data);
  };
  return {
    englishLevels,
    englishLevelColumns,
    setEnglishLevel,
    mapEnglishLevel,
    fetchEnglishLevel,
    handleCreateEnglishLevel,
  };
};*/
