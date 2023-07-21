import { useState } from 'react';
import { useSnackbar } from 'notistack';

import {
  deleteContractTypeAPI,
  fetchContractTypeByCompanyAPI,
  storeContractTypeAPI,
} from '../../../services/getContractType.service';
import { handleDelete } from '../../../utils/helpers';

export const useContractType = ({currentCompany, setCurrentCreate, setOpenCreateDialog}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [contractTypes, setContractType] = useState([]);
  const contractTypeColumns = [
    {
      id: 'name',
      label: 'Tipo Contrato',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];

  const mapContractType = (contractType) =>
    contractType.map((contractType) => [
      {
        column: 'name',
        value: contractType.tipoContrato,
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteContractType,
          //handleEdit: handleEditContractType,
          id: contractType.id,
        },
      },
    ]);

  const fetchContractType = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchContractTypeByCompanyAPI(currentCompany.id);
    setContractType(data);
  };

  const handleCreateContractType = () => {
    setCurrentCreate({
      type: 'contractType',
      title: 'Crear tipo contrato',
      fields: [
        {
          label: 'Tipo Contrato',
          name: 'tipoContrato',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  const handleDeleteContractType = async (id) => {
    handleDelete(
      id,
      currentCompany,
      contractTypes,
      setContractType,
      deleteContractTypeAPI,
      enqueueSnackbar,
      'Tipo Contrato'
    );
  };
  return {
    contractTypes,
    contractTypeColumns,
    setContractType,
    mapContractType,
    fetchContractType,
    handleCreateContractType,
  };
};
