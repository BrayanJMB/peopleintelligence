import { useState } from 'react';

import { fetchDocumentTypeAPI } from '../../../services/getDocumentType.service';

export const useDocumentType = ({setCurrentCreate, setOpenCreateDialog}) => {
  const [DocumentsTypes, setDocumentos] = useState([]);
  const documentTypeColumns = [
    {
      id: 'name',
      label: 'Tipo Documento',
      numeric: false,
    },
    /*
          {
            id: "options",
            label: "Opciones",
            numeric: false,
          },*/
  ];

  const handleCreateDocumentType = () => {
    setCurrentCreate({
      type: 'documentType',
      title: 'Crear tipo documento',
      fields: [
        {
          label: 'Tipo documento',
          name: 'tipoDocumento',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  const mapDocumentType = (documentType) =>
    documentType.map((documentType) => [
      {
        column: 'name',
        value: documentType.tipoDocumento,
      },
      {
        column: 'options',
        value: '',
        payload: {
          //handleDelete: handleDeleteDocumentType,
          //handleEdit: handleEditDocumentType,
          id: documentType.id,
        },
      },
    ]);

  const fetchDocumentType = async () => {
    const { data } = await fetchDocumentTypeAPI();
    setDocumentos(data);
  };

  return {
    DocumentsTypes,
    documentTypeColumns,
    mapDocumentType,
    handleCreateDocumentType,
    fetchDocumentType,
  };
};
