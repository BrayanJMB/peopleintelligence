import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

import { removeItem } from '../features/adminSlice';
import { removeItemBi } from '../features/powerBiSlice';
import IconSidebar from '../Layout/IconSidebar/IconSidebar';
import Navbar from '../Layout/Navbar/Navbar';
import { deleteDashboardAPI } from '../services/deleteDashboard.service';
import { deleteReportAPI } from '../services/deleteReport.service';
import {
  deleteContractTypeAPI,
  fetchContractTypeAPI,
  storeContractTypeAPI,
  updateContractTypeAPI,
} from '../services/getContractType.service';
import {
  deleteDocumentTypeAPI,
  fetchDocumentTypeAPI,
  storeDocumentTypeAPI,
  updateDocumentTypeAPI,
} from '../services/getDocumentType.service';
import axios from '../utils/axiosInstance';

import MyCard from './MyCard/MyCard';
import MyCreateDialog from './MyCreateDialog/MyCreateDialog';
import MyEditDialog from './MyEditDialog/MyEditDialog';
import MyLoader from './MyLoader/MyLoader';
import MyPageHeader from './MyPageHeader/MyPageHeader';
import MyTable from './MyTable/MyTable';

import styles from '../pages/JourneySettingsPage/JourneySettingsPage.module.css';


const search = (id, inputArray, field, proprety) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === id) {
      return inputArray[i][field];
    }
  }
};

export default function Table(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contractTypes, setcontractType] = useState([]);
  const [categories, setCategories] = useState([]);
  const [documentsTypes, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentCreate, setCurrentCreate] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [pageSize, setpageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
 //Tipo de documento
 const documentTypeColumns = [

    {
      id: 'id',
      label: 'ID',
      numeric: true,
    },
    {
      id: 'name',
      label: 'Tipo Documento',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },

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
  const mapDocumentType = (documentType) => documentType.map((documentType) => [
    {
      column: 'id',
      value: documentType.documentTypeId.toString(),
    },
    {
      column: 'name',
      value: documentType.tipoDocumento,
    },
    {
      column: 'options',
      value: '',
      /*payload: {
        handleDelete: handleDeleteDocumentType,
        handleEdit: handleEditDocumentType,
        id: documentType.id,
      },*/
    },
  ]);
 /* const handleDeleteDocumentType = async (id) => {
    const documentType = documentsTypes.find((documentType) => documentType.id === id);

    if (documentType === undefined) {
      return;
    }

    try {
      await deleteContractTypeAPI(id);
    } catch (e) {}
    enqueueSnackbar(
      'Tipo contrato eliminado con éxito',
      {
        variant: 'success',
      },
    );
  };
  const handleEditDocumentType = (id) => {
    // find category
    const documentType = documentsTypes.find((documentType) => documentType.id === id);

    if (documentType === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'documentType',
      id: documentType.id,
      title: 'Editar tipo de documento',
      fields: [
        {
          label: 'Tipo documento',
          name: 'name',
          type: 'text',
          value: documentType.tipoDocumento,
        },
      ],
    });
    setOpenEditDialog(true);
  };
*/
  const fetchDocumentType = async () => {
    setLoading(true);

    const { data } = await fetchDocumentTypeAPI();
    console.log(data);
    setDocumentos(data);
    setLoading(false);
  };
    /**
   * Handle tab change.
   *
   * @param event
   * @param newValue
   */

    const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue);
      if (newValue < 1) {
        newValue = 15; // Regresar al último Tab
      } else if (newValue >= 15) {
        newValue = 1; // Regresar al primer Tab
      }
      setCurrentTab(newValue);
    };

    /**
   * Handle create category.
   */
  const handleCreateCategory = () => {
    setCurrentCreate({
      type: 'contractType',
      title: 'Crear tipo contrato',
      fields: [
        {
          label: 'Tipo Contratoooooo',
          name: 'tipoContrato',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  // category columns


  /**
   * Map categories response to use in table.
   *
   * @param categories
   * @returns {*}
   */
  const mapContractType = (contractType) => contractType.map((contractType) => [
    {
      column: 'id',
      value: contractType.id.toString(),
    },
    {
      column: 'name',
      value: contractType.tipoContrato,
    },
    {
      column: 'options',
      value: '',
      payload: {
        handleDelete: handleDeleteContractType,
        handleEdit: handleEditContractType,
        id: contractType.id,
      },
    },
  ]);


    /**
   * Handle delete category.
   *
   * @param id
   */
    const handleDeleteContractType = async (id) => {
      const contractType = contractTypes.find((contractType) => contractType.id === id);
  
      if (contractType === undefined) {
        return;
      }
  
      try {
        await deleteContractTypeAPI(id);
      } catch (e) {}
      enqueueSnackbar(
        'Tipo contrato eliminado con éxito',
        {
          variant: 'success',
        },
      );
    };

      /**
   * Handle edit category.
   *
   * @param id
   */
  const handleEditContractType = (id) => {
    // find category
    const contractType = contractTypes.find((contractType) => contractType.id === id);

    if (contractType === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'contractType',
      id: contractType.id,
      title: 'Editar tipo contrato',
      fields: [
        {
          label: 'Tipo Contrato',
          name: 'name',
          type: 'text',
          value: contractType.tipoContrato,
        },
      ],
    });
    setOpenEditDialog(true);
  };

    /**
   * Handle close edit dialog.
   */
    const handleCloseEditDialog = () => {
      setOpenEditDialog(false);
    };
  
    /**
     * Handle close create dialog.
     */
    const handleCloseCreateDialog = () => {
      setOpenCreateDialog(false);
    };

      /**
   * Handle submitted edit dialog.
   *
   * @param formValues
   * @returns {Promise<void>}
   */
  const handleSubmittedEditDialog = async (formValues) => {
    if (currentEdit.type === 'contractType') {
      // find category
      const category = categories.find((category) => category.id === currentEdit.id);

      if (category === undefined) {
        return;
      }

      category.nameCatogory = formValues.name || category.nameCatogory;
      category.descriptionCategory = formValues.description || category.descriptionCategory;

      try {
        await updateContractTypeAPI(category);
      } catch (e) {}
      enqueueSnackbar(
        'Categoría actualizada con éxito',
        {
          variant: 'success',
        },
      );
    }
    if (currentEdit.type === 'documentType') {
      // find category
      const documentType = documentsTypes.find((documentType) => documentType.id === currentEdit.id);

      if (documentType === undefined) {
        return;
      }

      documentType.nameCatogory = formValues.name || documentType.nameCatogory;
      documentType.descriptionCategory = formValues.description || documentType.descriptionCategory;

      try {
        await updateContractTypeAPI(documentType);
      } catch (e) {}
      enqueueSnackbar(
        'Categoría actualizada con éxito',
        {
          variant: 'success',
        },
      );
    }

    setCurrentEdit(null);
    setOpenEditDialog(false);
  };

  /**
   * Handle submitted create dialog.
   *
   * @param formValues
   * @returns {Promise<void>}
   */
  const handleSubmittedCreateDialog = async (formValues) => {
    if (currentCreate.type === 'contractType') {
      try {
        await storeContractTypeAPI({
          tipoContrato: formValues.tipoContrato,
        });
      } catch (e) {}
      enqueueSnackbar(
        'Tipo Contrato creado con éxito',
        {
          variant: 'success',
        },
      );
    }
    if (currentCreate.type === 'documentType') {
      try {
        await storeContractTypeAPI({
          tipoDocumento: formValues.tipoDocumento,
        });
      } catch (e) {}
      enqueueSnackbar(
        'Tipo de documento creado con éxito',
        {
          variant: 'success',
        },
      );
    }
    setCurrentCreate(null);
    setOpenCreateDialog(false);
  };

    /**
   * Fetch categories.
   *
   * @returns {Promise<void>}
   */
    const fetchContractType = async () => {
      setLoading(true);
  
      const { data } = await fetchContractTypeAPI();
      console.log(data);
      setcontractType(data);
      setLoading(false);
    };


    // component did mount
    useEffect(() => { 
      fetchContractType();
      fetchDocumentType();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteItem = async (id, trueid) => {
    dispatch(removeItem({ id: id, type: props.type }));
    await axios.delete('companias/' + trueid);
  };


  const handleDeleteItemOffice = async (id, trueid) => {
    dispatch(removeItem({ id: id, type: props.type }));
    await axios.delete('Campus/' + trueid);
  };
  const handleRedirect = (id) => {
    navigate('/powerbi/' + id);
  };
  const handleDeleteItemBi = (_id, id) => {
    dispatch(removeItemBi({ id: _id, type: props.type }));
    switch (props.type) {
      case 'dashboard':
        deleteDashboardAPI(id);
        break;
      case 'report':
        deleteReportAPI(id);
        break;

      default:
        break;
    }
  };

  const company = [
    {
      field: 'nombreCompania',
      flex: 1,
      headerName: 'Nombre Empresa',
      headerAlign: 'center',
      align: 'center',
      editable: 'true',
    },
    {
      field: 'IdPais',
      flex: 1,
      headerName: 'Pais',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        isNaN(params.row.IdPais)
          ? params.row.IdPais
          : search(params.row.IdPais, props.ids.country, 'pais', 'id'),
    },
    {
      field: 'Sede',
      flex: 1,
      headerName: 'Sede',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'direccion',
      flex: 1,
      headerName: 'Dirección',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'IdTamanoCompania',
      flex: 2,
      headerName: 'Tamaño Empresa',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        isNaN(params.row.IdTamanoCompania)
          ? params.row.IdTamanoCompania
          : search(
              params.row.IdTamanoCompania,
              props.ids.sizeCompany,
              'quantityOfEmployees',
              'id'
            ),
    },
    {
      field: 'SectorId',
      flex: 2.5,
      headerName: 'Sector',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        isNaN(params.row.SectorId)
          ? params.row.SectorId
          : search(params.row.SectorId, props.ids.sector, 'Sector', 'id'),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() => handleDeleteItem(params.row._id, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const office = [
    {
      field: 'sede',
      flex: 1,
      headerName: 'Sede',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'IdCompania',
      flex: 1,
      headerName: 'Compania',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        isNaN(params.row.IdCompania)
          ? params.row.IdCompania
          : search(params.row.IdCompania, props.ids.company, 'nombreCompania'),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton onClick={() => handleDeleteItemOffice(params.row._id, params.row.id)}>
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const employee = [
    {
      field: 'sede',
      flex: 1,
      headerName: 'Nombre',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'corroe',
      flex: 1,
      headerName: 'Correo electrónico',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fecha',
      flex: 1,
      headerName: 'Fecha de admisión',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'cargo',
      flex: 1,
      headerName: 'Cargo',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'area',
      flex: 1,
      headerName: 'Área',
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton onClick={() => handleDeleteItem(params.row._id)}>
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const dashboard = [
    {
      field: 'companyId',
      flex: 1,
      headerName: 'Nombre compañia',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return isNaN(params.row.companyId)
          ? params.row.companyId
          : search(
              params.row.companyId,
              props.ids.company,
              'nombreCompania',
              'id'
            );
      },
    },
    {
      field: 'reportName',
      flex: 1,
      headerName: 'Titulo Dashbord',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isActive',
      flex: 1,
      headerName: 'Estado',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Switch
            checked={params.row.isActive}
            onChange={(event) => props.handleSwitch(event, params.row)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 150,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() => handleDeleteItemBi(params.row._id, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>,
          <IconButton onClick={() => handleRedirect(params.row.id)}>
            <VisibilityIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const report = [
    {
      field: 'name',
      flex: 1,
      headerName: 'Nombre Reporte',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'descripcion',
      flex: 1,
      headerName: 'Descripción',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() => handleDeleteItemBi(params.row._id, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const department = [
    {
      field: 'codigoDepartamento',
      flex: 1,
      headerName: 'Department Code',
      headerAlign: 'center',
      align: 'center',
      editable: 'true',
    },
    {
      field: 'IdPais',
      flex: 1,
      headerName: 'Pais',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        isNaN(params.row.IdPais)
          ? params.row.IdPais
          : search(params.row.IdPais, props.ids.country, 'pais', 'id'),
    },

    {
      field: 'departamento',
      flex: 1,
      headerName: 'departamento',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton onClick={() => handleDeleteItem(params.row._id)}>
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const contractTypeColumns = [

    {
      id: 'id',
      label: 'ID',
      numeric: true,
    },
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

  const renderColumn = () => {
    switch (props.type) {
      case 'Empresas':
        return company;
      case 'Oficinas':
        return office;
      case 'Otros campos':
        return office;
      case 'Empleados':
        return employee;
      case 'dashboard':
        return dashboard;
      case 'report':
        return report;
      case 'Departamentos':
        return department;
      case 'Otros campos':
        return null;
      default:
        return null;
    }
  };

  const columns = useMemo(() => renderColumn(), [props.type]);

  useEffect(() => {
    setRows(props.tableData);
  }, [props.tableData]);

  if (props.type != 'Otros campos'){
      return (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? grey[200] : grey[900],
            },
          }}
        />
      );
  }else{
    return (
      <Box sx={{ display: 'flex' }} >
        <div style={{ backgroundColor: 'white' }}>
          <div className={styles.JourneySettingsPage}>
            <div className={styles.JourneySettingsPage__content}>  
              {loading === true && (
                <MyLoader />
              )}
  
              {loading === false && (
                <MyCard sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}>
                        
                      <Tabs
                        
                        value={currentTab}
                        onChange={(event, newValue) => handleTabChange(event, newValue)}
                        
                      >
                       
                        <Tab
                          label="Tipo Contrato"
                          id="settings-tab-0"
                        />
                        <Tab
                          label="Tipos de docmuentos"
                          id="settings-tab-1"
                        />
                        <Tab
                          label="Plantillas"
                          id="settings-tab-2"
                        />
                        <Tab
                          label="Encuestas de mapas"
                          id="settings-tab-3"
                        />
                        <Tab
                          label="Hola mundo"
                          id="settings-tab-3"
                        />
                         <Tab
                          label="Mapas"
                          id="settings-tab-1"
                        />
                        <Tab
                          label="Plantillas"
                          id="settings-tab-2"
                        />
                        <Tab
                          label="Encuestas de mapas"
                          id="settings-tab-3"
                        />
                        <Tab
                          label="Hola mundo"
                          id="settings-tab-3"
                        />
                         <Tab
                          label="Mapas"
                          id="settings-tab-1"
                        />
                        <Tab
                          label="Plantillas"
                          id="settings-tab-2"
                        />
                        <Tab
                          label="Encuestas de mapas"
                          id="settings-tab-3"
                        />
                        <Tab
                          label="Hola mundo"
                          id="settings-tab-3"
                        />
                         <Tab
                          label="Mapas"
                          id="settings-tab-1"
                        />
                        <Tab
                          label="Plantillas"
                          id="settings-tab-2"
                        />
                        <Tab
                          label="Encuestas de mapas"
                          id="settings-tab-3"
                        />
                        <Tab
                          label="Hola mundo"
                          id="settings-tab-3"
                        />
                        
                        
                      </Tabs>
                      
                      {/* categories */}
                      <div
                        hidden={currentTab !== 0}
                        id="settings-tabpanel-0"
                      >
                        {currentTab === 0 && (
                          <Box
                            sx={{
                              p: 3,
                          }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateCategory}
                              >
                                Crear Tipo Contrato
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Tipo Contrato'}
                              columns={contractTypeColumns}
                              rows={mapContractType(contractTypes)}
                            />
                          </Box>
                        )}
                      </div>



                      {/* categories */}
                      <div
                        hidden={currentTab !== 1}
                        id="settings-tabpanel-0"
                      >
                        {currentTab === 1 && (
                          <Box
                            sx={{
                              p: 3,
                          }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateDocumentType}
                              >
                                Crear tipo de documento
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Tipo Documento'}
                              columns={documentTypeColumns}
                              rows={mapDocumentType(documentsTypes)}
                            />
                          </Box>
                        )}
                      </div>
                      
                    </Box>
                  </Box>
                </MyCard>
              )}
            </div>
          </div>
        </div>
  
        {/* edit form */}
        {currentEdit !== null && (
          <MyEditDialog
            onClose={handleCloseEditDialog}
            onSubmit={handleSubmittedEditDialog}
            title={currentEdit.title}
            open={openEditDialog}
            fields={currentEdit.fields}
          />
        )}
  
        {/* create form */}
        {currentCreate !== null && (
          <MyCreateDialog
            onClose={handleCloseCreateDialog}
            onSubmit={handleSubmittedCreateDialog}
            title={currentCreate.title}
            open={openCreateDialog}
            fields={currentCreate.fields}
          />
        )}
      </Box>
    );
  }
}
