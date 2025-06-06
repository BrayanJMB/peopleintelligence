import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useSnackbar } from 'notistack';

import MyCard from '../../components/MyCard/MyCard';
import MyCreateDialog from '../../components/MyCreateDialog/MyCreateDialog';
import MyEditDialog from '../../components/MyEditDialog/MyEditDialog';
import MyLoader from '../../components/MyLoader/MyLoader';
import MyPageHeader from '../../components/MyPageHeader/MyPageHeader';
import MyTable from '../../components/MyTable/MyTable';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import {
  deleteCategoryAPI,
  fetchCategoriesAPI,
  fetchCategoriesByCompanyAPI,
  storeCategoryAPI,
  updateCategoryAPI,
} from '../../services/getCategories.service';
import {
  deleteJourneyMapAPI,
  fetchJourneyMapAPI,
  storeJourneyMapAPI,
  updateJourneyMapAPI} from '../../services/getJourneyMap.service';
import {
  deleteJourneyMapAPI as deleteJourneyMapsAPI,
  fetchJourneyMapsAPI,
  fetchJourneyMapsCompanyAPI,
} from '../../services/journeys.service';
import {
  deleteTemplateAPI,
  fetchTemplatesAPI,
  fetchTemplatesByCompanyAPI,
} from '../../services/templates.service';
import axios from '../../utils/axiosInstance';
import { isAdmin, isJourney } from '../../utils/helpers';

import styles from './JourneySettingsPage.module.css';

// category columns
const categoryColumns = [
  {
    id: 'id',
    label: 'ID',
    numeric: true,
  },
  {
    id: 'name',
    label: 'Nombre',
    numeric: false,
  },
  {
    id: 'description',
    label: 'Descripción',
    numeric: false,
  },
  {
    id: 'options',
    label: 'Opciones',
    numeric: false,
  },
];

// journey map columns
const journeyMapColumns = [
  {
    id: 'id',
    label: 'ID',
    numeric: true,
  },
  {
    id: 'name',
    label: 'Nombre',
    numeric: false,
  },
  {
    id: 'description',
    label: 'Descripción',
    numeric: false,
  },
  {
    id: 'options',
    label: 'Opciones',
    numeric: false,
  },
];

// template columns
const templateColumns = [
  {
    id: 'id',
    label: 'ID',
    numeric: true,
  },
  {
    id: 'name',
    label: 'Nombre',
    numeric: false,
  },
  {
    id: 'description',
    label: 'Descripción',
    numeric: false,
  },
  {
    id: 'options',
    label: 'Opciones',
    numeric: false,
  },
];

// map survey columns
const mapSurveyColumns = [
  {
    id: 'id',
    label: 'ID',
    numeric: true,
  },
  {
    id: 'name',
    label: 'Nombre',
    numeric: false,
  },
  {
    id: 'description',
    label: 'Descripción',
    numeric: false,
  },
  {
    id: 'options',
    label: 'Opciones',
    numeric: false,
  },
];

/**
 * Journey settings page component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const JourneySettingsPage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [loading, setLoading] = useState(false);
  const [journeyMap, setJourneyMap] = useState([]);
  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [mapSurveys, setMapSurveys] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentCreate, setCurrentCreate] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [editLogo, setEditLogo] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const currentCompany = useSelector((state) => state.companies.currentCompany);

  /**
   * Handle tab change.
   *
   * @param event
   * @param newValue
   */
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  /**
   * Fetch categories.
   *
   * @returns {Promise<void>}
   */
  const fetchCategories = async () => {
    setLoading(true);

    const { data } = await fetchCategoriesByCompanyAPI(currentCompany.id);

    setCategories(data);
    setLoading(false);
  };

  /**
   * Fetch journey map.
   *
   * @returns {Promise<void>}
   */
  const fetchJourneyMap = async () => {
    setLoading(true);
    
    const { data } = await fetchJourneyMapAPI(currentCompany.id);

    setJourneyMap(data);
    setLoading(false);
  };

  /**
   * Fetch templates.
   * 
   * @returns {Promise<void>}
   */
  const fetchTemplates = async () => {
    setLoading(true);

    //const { data } = await fetchTemplatesAPI();

    //setTemplates(data);
  };

  
  const fetchTemplatesByCompany = async (currentCompany) => {
    setLoading(true);
    const { data } = await fetchTemplatesByCompanyAPI(currentCompany);
    setTemplates(data);

  };


  /**
   * Fetch map surveys.
   * 
   * @returns {Promise<void>}
   */
  /*
  const fetchMapSurveys = async () => {
    setLoading(true);

    const { data } = await fetchJourneyMapsCompanyAPI(currentCompany.id);

    setMapSurveys(data);
    setLoading(false);
  };*/
  
  const fetchMapSurveys = async () => {
    setLoading(true);

    //const { data } = await fetchJourneyMapsAPI();
    const { data } = await fetchJourneyMapsCompanyAPI(currentCompany.id);
    setMapSurveys(data);
    setLoading(false);
  };

  /**
   * Handle edit category.
   *
   * @param id
   */
  const handleEditCategory = (id) => {
    // find category
    const category = categories.find((category) => category.id === id);

    if (category === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'category',
      id: category.id,
      title: 'Editar categoría',
      fields: [
        {
          label: 'Nombre',
          name: 'name',
          type: 'text',
          value: category.nameCatogory,
        },
        {
          label: 'Descripción',
          name: 'description',
          type: 'text',
          value: category.descriptionCategory,
        },
      ],
    });
    setOpenEditDialog(true);
  };

  /**
   * Handle delete journey map.
   *
   * @param id
   */
  const handleEditJourneyMap = (id) => {
    // find category

    const map = journeyMap.find((map) => map.id === id);
    setEditLogo(map.iconUrl);
    if (map === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'journeyMap',
      id: id,
      title: 'Editar mapa de viaje',
      fields: [
        {
          label: 'Nombre',
          name: 'name',
          type: 'text',
          value: map.mapJourney,
        },
        {
          label: 'Descripción',
          name: 'description',
          type: 'text',
          value: map.description,
        },
        {
          label: 'URL de icono',
          name: 'icon',
          type: 'icon',
        },
      ],
    });
    setOpenEditDialog(true);
  };

  /**
   * Go to edit template page.
   * 
   * @param {number} id The template id.
   */
  const handleEditTemplate = (id) => {
    navigate(`/journey/update-template/${id}`);
  };

  /**
   * Handle create category.
   */
  const handleCreateCategory = () => {
    setCurrentCreate({
      type: 'category',
      title: 'Crear categoría',
      fields: [
        {
          label: 'Nombre',
          name: 'name',
          type: 'text',
          isRequired: true,
        },
        {
          label: 'Descripción',
          name: 'description',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  /**
   * Handle create journey map.
   */
  const handleCreateJourneyMap = () => {
    setCurrentCreate({
      type: 'journeyMap',
      title: 'Crear mapa de viaje',
      fields: [
        {
          label: 'Nombre',
          name: 'name',
          type: 'text',
          isRequired: true,
        },
        {
          label: 'Descripción',
          name: 'description',
          type: 'text',
          isRequired: true,
        },
        {
          label: 'URL de icono',
          name: 'icon',
          type: 'icon',
          isRequired: false,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  /**
   * Handle create template.
   */
  const handleCreateTemplate = () => {
    // redirect to create template page
    navigate('/journey/create-survey?isTemplate=true&isSurvey=true');
  };

  /**
   * Handle create map survey.
   */
  const handleCreateMapSurvey = () => {
    // redirect to create template page
    navigate('/journey/create-survey?isTemplate=true&isMap=true');
  };

  /**
   * Handle delete category.
   *
   * @param id
   */
  const handleDeleteCategory = async (id) => {
    const index = categories.findIndex((category) => category.id === id);

    if (index === -1) {
      return;
    }

    try{
      await deleteCategoryAPI(id, currentCompany.id);
      setCategories((categories) => categories.filter((category) => category.id !== id));
      enqueueSnackbar(
        'Categoría eliminada con éxito',
        {
          variant: 'success',
          autoHideDuration:3000,
        },
      );
    }catch(Exception){
      enqueueSnackbar(
        'Hubo un error al eliminar la categoría',
        {
          variant: 'success',
          autoHideDuration:3000,
        },
      );
    }
  };

  /**
   * Handle delete journey map.
   *
   * @param id
   */
  const handleDeleteJourneyMap = async (id) => {
    // find category
    const index = journeyMap.findIndex((map) => map.id === id);

    if (index === -1) {
      return;
    }
    try{
      await deleteJourneyMapAPI(id);
      setJourneyMap((journeyMap) => journeyMap.filter((map) => map.id !== id));
      enqueueSnackbar(
        'Mapa de viaje eliminado con éxito',
        {
          variant: 'success',
          autoHideDuration:3000,
        },
      );
    }catch(Exception){
      enqueueSnackbar(
        'Hubo un error al eliminar mapa de viaje',
        {
          variant: 'error',
          autoHideDuration:3000,
        },
      );
    }

  };

  /**
   * Handle delete template.
   * 
   * @param {number} id The template id.
   */
  const handleDeleteTemplate = async (id) => {
    // find template
    const template = templates.find((template) => template.id === id);

    if (template === undefined) {
      return;
    }

    try {
      await deleteTemplateAPI(id);
      setTemplates((template) => templates.filter((template) => template.id !== id));
      enqueueSnackbar(
        'Plantilla eliminada con éxito',
        {
          variant: 'success',
          autoHideDuration:3000,
        },
      );
    } catch (e) {
      enqueueSnackbar(
        'Hubo un error al eliminar la plantilla',
        {
          variant: 'error',
          autoHideDuration:3000,
        },
      );
    }

  };

  /**
   * Handle delete map survey.
   * 
   * @param {number} id The map survey id.
   */
  const handleDeleteMapSurvey = async (id) => {
    // find map survey
    const mapSurvey = mapSurveys.find((mapSurvey) => mapSurvey.id === id);

    if (mapSurvey === undefined) {
      return;
    }

    try {
      await deleteJourneyMapsAPI(id);
      setMapSurveys((mapSurvey) => mapSurvey.filter((mapSurvey) => mapSurvey.id !== id));
      enqueueSnackbar(
        'Encuesta de mapa eliminada con éxito',
        {
          variant: 'success',
          autoHideDuration:3000,
        },
      );
    } catch (e) {
      enqueueSnackbar(
        'No se pudo eliminar la encuesta de mapa',
        {
          variant: 'error',
          autoHideDuration:3000,
        },
      );
    }

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

  const createLogotipo = async (formValues) => {
    let urlLogo = null;
    if (file) {
      const formData = new FormData();
      formData.append('logoTipo', file); // Asegúrate de utilizar el nombre correcto para el campo de la imagen
      try {
        const response = await axios.post(
          `MapImage/${formValues.name}/${currentCompany.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response) {
          urlLogo = response.data.urlLogo;
        } else {
          console.error('Error al subir la imagen:', response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return urlLogo;
  };
  /**
   * Handle submitted edit dialog.
   *
   * @param formValues
   * @returns {Promise<void>}
   */
  const handleSubmittedEditDialog = async (formValues) => {
    if (currentEdit.type === 'category') {
      // find category
      const category = categories.find((category) => category.id === currentEdit.id);

      if (category === undefined) {
        return;
      }

      category.nameCatogory = formValues.name || category.nameCatogory;
      category.descriptionCategory = formValues.description || category.descriptionCategory;

      const { data } = await updateCategoryAPI(category);

      setCategories((categories) => categories.map((category) => {
        if (category.id === data.id) {
          return data;
        }

        return category;
      }));
      enqueueSnackbar(
        'Categoría actualizada con éxito',
        {
          variant: 'success',
        },
      );
    }
    if (currentEdit.type === 'journeyMap') {
      // find category
      let urlLogo = await createLogotipo(formValues);
      const map = journeyMap.find((map) => map.id === currentEdit.id);
      
      if (map === undefined) {
        return;
      }

      map.mapJourney = formValues.name || map.mapJourney;
      map.description = formValues.description || map.description;
      map.iconUrl = urlLogo || map.iconUrl;

      const { data } = await updateJourneyMapAPI(map);

      setJourneyMap((journeyMap) => journeyMap.map((map) => {
        if (map.id === data.id) {
          return data;
        }

        return map;
      }));
      enqueueSnackbar(
        'Mapa de viaje actualizado con éxito',
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
    if (currentCreate.type === 'category') {
      const { data } = await storeCategoryAPI({
        companyId: currentCompany.id,
        nameCatogory: formValues.name,
        descriptionCategory: formValues.description,
      });

      setCategories((categories) => [...categories, data]);
      enqueueSnackbar(
        'Categoría creada con éxito',
        {
          variant: 'success',
        },
      );
    }
    if (currentCreate.type === 'journeyMap') {
      let urlLogo = await createLogotipo(formValues);

      const { data } = await storeJourneyMapAPI({
        mapJourney: formValues.name,
        description: formValues.description,
        iconUrl: urlLogo,
        companyId: currentCompany.id,
      });

      setJourneyMap((journeyMap) => [...journeyMap, data]);
      enqueueSnackbar(
        'Mapa de viaje creado con éxito',
        {
          variant: 'success',
        },
      );
    }

    setCurrentCreate(null);
    setOpenCreateDialog(false);
  };

  /**
   * Map categories response to use in table.
   *
   * @param categories
   * @returns {*}
   */
  const mapCategories = (categories) => categories.map((category) => [
    {
      column: 'id',
      value: category.id.toString(),
    },
    {
      column: 'name',
      value: category.nameCatogory,
    },
    {
      column: 'description',
      value: category.descriptionCategory,
    },
    {
      column: 'options',
      value: '',
      payload: {
        handleDelete: handleDeleteCategory,
        //handleEdit: handleEditCategory,
        id: category.id,
      },
    },
  ]);

  /**
   * Map journey map response to use in table.
   *
   * @param journeyMap
   * @returns {*}
   */
  const mapJourneyMap = (journeyMap) => journeyMap.map((map) => [
    {
      column: 'id',
      value: map.id.toString(),
    },
    {
      column: 'name',
      value: map.mapJourney,
    },
    {
      column: 'description',
      value: map.description,
    },
    {
      column: 'options',
      value: '',
      payload: {
        handleDelete: handleDeleteJourneyMap,
        handleEdit: handleEditJourneyMap,
        id: map.id,
      },
    },
  ]);

  /**
   * Map templates response to use in table.
   * 
   * @param {array} templates The templates array.
   * @returns 
   */
  const mapTemplates = (templates) => templates.map((template) => [
    {
      column: 'id',
      value: template.id.toString(),
    },
    {
      column: 'name',
      value: template.nameSurvey,
    },
    {
      column: 'description',
      value: template.descriptionSurvey,
    },
    {
      column: 'options',
      value: '',
      payload: {
        handleDelete: handleDeleteTemplate,
        //handleEdit: handleEditTemplate,
        id: template.id,
      },
    },
  ]);

  /**
   * Map map surveys response to use in table.
   * 
   * @param {array} mapSurveys The map surveys array.
   * @returns 
   */
  const mapMapSurveys = (mapSurveys) => mapSurveys.map((mapSurvey) => [
    {
      column: 'id',
      value: mapSurvey.id.toString(),
    },
    {
      column: 'name',
      value: mapSurvey.nameSurvey,
    },
    {
      column: 'description',
      value: mapSurvey.descriptionSurvey,
    },
    {
      column: 'options',
      value: '',
      payload: {
        handleDelete: handleDeleteMapSurvey,
        id: mapSurvey.id,
      },
    },
  ]);

  /**
   * Update current tab if query param is present.
   */
  const updateCurrentTab = () => {
    if (tabQuery === 'survey') {
      setCurrentTab(2);
    }

    if (tabQuery === 'map') {
      setCurrentTab(3);
    }
  };

  // component did mount
  useEffect(() => {
    if (!isAdmin(userInfo) && !isJourney(userInfo)) {
      enqueueSnackbar(
        'No tiene permiso para acceder a esta funcionalidad',
        {
          variant: 'error',
        }
      );
      navigate('/dashboard');

      return;
    }
    if (!currentCompany){
      return;
    }
    fetchCategories();
    fetchJourneyMap();
    fetchMapSurveys();
    fetchTemplates();
    fetchTemplatesByCompany(currentCompany.id);
    updateCurrentTab();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!currentCompany){
      return;
    }
    //fetchJourneyMap();
    fetchCategories();
    fetchJourneyMap();
    fetchMapSurveys();
    fetchTemplates();
    fetchTemplatesByCompany(currentCompany.id);
    updateCurrentTab();
  }, [currentCompany]); // eslint-disable-line react-hooks/exhaustive-deps
  // watch tab query param
  useEffect(() => {
    updateCurrentTab();
  }, [tabQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <IconSidebar />

      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.JourneySettingsPage}>
          <div className={styles.JourneySettingsPage__content}>
            <MyPageHeader
              title="Administrar encuestas"
            />

            {loading === true && (
              <MyLoader />
            )}

            {loading === false && (
              <MyCard>
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
                        label="Categorías"
                        id="settings-tab-0"
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
                              Crear categoría
                            </Button>
                          </Stack>
                          <MyTable
                            title={'Listado de categorías'}
                            columns={categoryColumns}
                            rows={mapCategories(categories)}
                          />
                        </Box>
                      )}
                    </div>
                    {/* maps */}
                    <div
                      hidden={currentTab !== 1}
                      id="settings-tabpanel-1"
                    >
                      {currentTab === 1 && (
                        <Box
                          sx={{ p: 3 }}
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
                              onClick={handleCreateJourneyMap}
                            >
                              Crear mapa
                            </Button>
                          </Stack>
                          <MyTable
                            title={'Listado de mapas'}
                            columns={journeyMapColumns}
                            rows={mapJourneyMap(journeyMap)}
                          />
                        </Box>
                      )}
                    </div>
                    {/* templates */}
                    <div
                      hidden={currentTab !== 2}
                      id="settings-tabpanel-2"
                    >
                      {currentTab === 2 && (
                        <Box
                          sx={{ p: 3 }}
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
                              onClick={handleCreateTemplate}
                            >
                              Crear plantilla
                            </Button>
                          </Stack>
                          <MyTable
                            title={'Listado de plantillas'}
                            columns={templateColumns}
                            rows={mapTemplates(templates)}
                          />
                        </Box>
                      )}
                    </div>
                    {/* map surveys */}
                    <div
                      hidden={currentTab !== 3}
                      id="settings-tabpanel-3"
                    >
                      {currentTab === 3 && (
                        <Box
                          sx={{ p: 3 }}
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
                              onClick={handleCreateMapSurvey}
                            >
                              Crear encuesta de mapa
                            </Button>
                          </Stack>
                          <MyTable
                            title={'Listado de encuestas de mapas'}
                            columns={mapSurveyColumns}
                            rows={mapMapSurveys(mapSurveys)}
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
          type={currentEdit.type}
          file={file}
          setFile={setFile}
          logo={editLogo}
          setLogo={setEditLogo}
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
          type={currentCreate.type}
          file={file}
          setFile={setFile}
        />
      )}
    </Box>
  );
};

export default JourneySettingsPage;