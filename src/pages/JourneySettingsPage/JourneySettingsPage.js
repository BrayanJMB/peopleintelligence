import React, { useEffect, useState } from 'react';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import styles from "./JourneySettingsPage.module.css";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { fetchJourneyMapAPI, deleteJourneyMapAPI } from "../../services/getJourneyMap.service";
import { deleteCategoryAPI, fetchCategoriesAPI } from "../../services/getCategories.service";
import MyLoader from '../../components/MyLoader/MyLoader';
import PageHeader from '../../components/PageHeader/PageHeader';
import MyCard from '../../components/MyCard/MyCard';
import MyTable from '../../components/MyTable/MyTable';
import { isAdmin, isJourney } from '../../utils/helpers';
import { useSnackbar } from 'notistack';

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

/**
 * Journey settings page component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const JourneySettingsPage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [journeyMap, setJourneyMap] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

    const { data } = await fetchCategoriesAPI();

    setCategories(data);
    setLoading(false);
  }

  /**
   * Fetch journey map.
   *
   * @returns {Promise<void>}
   */
  const fetchJourneyMap = async () => {
    setLoading(true);

    const { data } = await fetchJourneyMapAPI();

    setJourneyMap(data);
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
      fields: category,
    });
    setOpenEditDialog(true);
  };

  /**
   * Handle delete category.
   *
   * @param id
   */
  const handleDeleteCategory = async (id) => {
    const category = categories.find((category) => category.id === id);

    if (category === undefined) {
      return;
    }

    await deleteCategoryAPI(id);
  }

  /**
   * Handle delete journey map.
   *
   * @param id
   */
  const handleEditJourneyMap = (id) => {
    // find category
    const map = journeyMap.find((map) => map.id === id);

    if (map === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'journeyMap',
      fields: map,
    });
    setOpenEditDialog(true);
  }

  /**
   * Handle delete journey map.
   *
   * @param id
   */
  const handleDeleteJourneyMap = async (id) => {
    // find category
    const map = journeyMap.find((map) => map.id === id);

    if (map === undefined) {
      return;
    }

    await deleteJourneyMapAPI(id);
  }

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
        handleEdit: handleEditCategory,
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

    fetchCategories();
    fetchJourneyMap();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <IconSidebar />

      <div style={{ backgroundColor: "white" }}>
        <div className={styles.JourneySettingsPage}>
          <div className={styles.JourneySettingsPage__content}>
            <PageHeader
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
                      borderColor: 'divider'
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
                    </Tabs>
                    {/* categories */}
                    <div
                      hidden={currentTab !== 0}
                      id="settings-tabpanel-0"
                    >
                      {currentTab === 0 && (
                        <Box
                          sx={{ p: 3 }}
                        >
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
                          <MyTable
                            title={'Listado de mapas'}
                            columns={journeyMapColumns}
                            rows={mapJourneyMap(journeyMap)}
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
    </Box>
  );
}

export default JourneySettingsPage;