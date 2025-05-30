// offices.js

import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import {
  getAllCompaniesAPI,
  getCompaniesByIdAPI,
} from '../../../services/getCompanies.service';
import {
  deleteOfficeAPI,
  getOfficesAPI,
  storeOfficeAPI,
} from '../../../services/getOffices.service';

const getAllCompanies = async () => {
  const { data } = await getAllCompaniesAPI();
  return data;
};

export const officesColumns = [
  {
    id: 'name',
    label: 'Sede',
    numeric: false,
  },
  /*
  {
    id: 'company',
    label: 'Compañía',
    numeric: false,
  },*/
  {
    id: 'options',
    label: 'Opciones',
    numeric: false,
  },
];

export const useCreateOffice = (setOpenCreateDialog, setCurrentCreate) => {
  const handleCreateOffice = () => {
    setCurrentCreate({
      type: 'office',
      title: 'Crear Oficina',
      fields: [
        {
          label: 'Sede',
          name: 'sede',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  return {
    handleCreateOffice,
  };
};

export const useOffice = (currentCompany) => {
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteOffice = async (id) => {
    const office = offices.find((office) => office.id === id);

    if (office === undefined) {
      return;
    }

    try {
      await deleteOfficeAPI(id);
      setOffices((office) => office.filter((office) => office.id !== id));
      enqueueSnackbar('Oficina eliminada con éxito', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } catch (e) {

      enqueueSnackbar('Hubo un error al eliminar la oficina', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  const handleEditOffice = (id) => {
    const office = offices.find((office) => office.id === id);

    if (office === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'office',
      id: office.id,
      title: 'Editar tipo de documento',
      fields: [
        {
          label: 'Oficina',
          name: 'name',
          type: 'text',
          value: office.oficina,
        },
      ],
    });
    setOpenEditDialog(true);
  };

  const mapOffice = (office) =>
    office.map((office) => [
      {
        column: 'name',
        value: office.sede,
      },
      /*
    {
        column: 'company',
        value: office.nombreCompania,
    },*/
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteOffice,
          //handleEdit: handleEditOffice,
          id: office.id,
        },
      },
    ]);

  const fetchOffice = async () => {
    setLoading(true);

    const { data } = await getOfficesAPI(currentCompany.id);
    /*
      const companies = await getAllCompanies();
      const companyNames = companies.reduce((acc, company) => {
        acc[company.id] = company.nombreCompania;
        return acc;
      }, {});

      const offices = data.map((office) => ({
        ...office,
        nombreCompania: companyNames[office.IdCompania],
      }));*/

    setOffices(data);
    setLoading(false);
  };

  const handleSubmittedCreateOffice = async (formValues) => {
    try {
      await storeOfficeAPI({
        sede: formValues.sede,
        IdCompania: currentCompany.id,
      });
      await fetchOffice();
      enqueueSnackbar('Oficina creada con éxito', {
        variant: 'success',
      });
    } catch (e) {
      enqueueSnackbar('Hubo un error al crear la oficina', {
        variant: 'error',
      });
    }
  };

  return {
    offices,
    currentEdit,
    openEditDialog,
    handleDeleteOffice,
    handleEditOffice,
    mapOffice,
    setOffices,
    setLoading,
    setCurrentEdit,
    setOpenEditDialog,
    fetchOffice,
    handleSubmittedCreateOffice,
  };
};
