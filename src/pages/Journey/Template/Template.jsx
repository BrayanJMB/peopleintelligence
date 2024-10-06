import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button } from '@mui/material';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

import MyPageHeader from '../../../components/MyPageHeader/MyPageHeader';
import useNavigateSearch from '../../../hooks/useNavigateSearch';
import IconSidebar from '../../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../../Layout/Navbar/Navbar';
import {
  fetchTemplatesAPI,
  fetchTemplatesByCompanyAPI,
} from '../../../services/templates.service';
import { isAdmin, isAdminJourney, isJourney } from '../../../utils/helpers';

import { TemplateCards } from './TemplateCards';

import styles from './Template.module.css';

/**
 * Survey index page.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Template = () => {
  const navigate = useNavigate();
  const navigateSearch = useNavigateSearch();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [templates, setTemplates] = useState([]);
  const [templatesByCompany, setTemplatesByCompany] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalByCompany, setTotalByCompany] = useState(0);
  const [perPage, setPerPage] = useState(9);
  const [value, setValue] = useState(0);
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /**
   * Handle change page.
   *
   * @param {object} event
   * @param {number} newPage
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Handle change rows per page.
   *Stack
   * @param {object} event
   */
  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Handle create survey.
   *
   * @param isTemplate
   */
  const handleCreateSurvey = (isTemplate = false, templateId = null) => {
    if (!isAdmin(userInfo) && !isAdminJourney(userInfo)) {
      return;
    }

    const querySearch = {
      isTemplate,
      ...(templateId && { templateId }),
    };

    navigateSearch('/journey/create-survey', querySearch);
  };

  /**
   * Fetch templates.
   */
  const fetchTemplates = async () => {
    const { data } = await fetchTemplatesAPI();

    setTemplates(data);
    setTotal(data.length);
    setPage(0);
  };

  const fetchTemplatesByCompany = async (currentCompany) => {
    const { data } = await fetchTemplatesByCompanyAPI(currentCompany);

    setTemplatesByCompany(data);
    //setTotal(data.length);
    setTotalByCompany(data.length);
    setPage(0);
  };

  // component did mount
  useEffect(() => {
    if (!isAdmin(userInfo) && !isJourney(userInfo)) {
      enqueueSnackbar('No tiene permiso para acceder a esta funcionalidad', {
        variant: 'error',
      });
      navigate('/dashboard');

      return;
    }

    fetchTemplates();
    fetchTemplatesByCompany(currentCompany && currentCompany.id);
  }, [currentCompany]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <IconSidebar />
      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.content}>
          <div className={styles.survey_template}>
            <div className={styles.heading}>
              <MyPageHeader title="Plantilla de encuesta" />
            </div>

            <div className={styles.templates}>
              <Typography variant="h6" gutterBottom>
                Empezar desde el principio
              </Typography>
              <Grid container spacing={2}>
                {/* create survey */}
                <Grid item xs={4}>
                  <div
                    className={styles.template}
                    onClick={() => handleCreateSurvey()}
                  >
                    <div className={styles.title}>
                      <AddCircleOutlineIcon /> <p>Crea tu propia encuesta</p>
                    </div>
                    <div className={styles.description}>
                      Cree su propia encuesta personalizada desde cero.
                    </div>
                    <div className={styles.create}>
                      <p>Crea ahora</p>
                      <KeyboardArrowRightIcon />
                    </div>
                  </div>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                O usa una plantilla
              </Typography>
              {isAdmin(userInfo) ? (
                <>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Plantillas generales" />
                      <Tab label="Plantillas por empresa" />
                    </Tabs>
                  </Box>
                  <Box>
                    {value === 0 && (
                      <>
                        <Grid container spacing={2}>
                          <TemplateCards
                            handleCreateSurvey={handleCreateSurvey}
                            templates={templates}
                            page={page}
                            perPage={perPage}
                          />
                        </Grid>

                        <Box>
                          <TablePagination
                            component="div"
                            count={total}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={perPage}
                            rowsPerPageOptions={[9, 18, 27]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Filas por página"
                          />
                        </Box>
                      </>
                    )}
                  </Box>

                  <Box>
                    {value === 1 && (
                      <>
                        <Grid container spacing={2}>
                          <TemplateCards
                            handleCreateSurvey={handleCreateSurvey}
                            templates={templatesByCompany}
                            page={page}
                            perPage={perPage}
                          />
                        </Grid>

                        <Box>
                          <TablePagination
                            component="div"
                            count={totalByCompany}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={perPage}
                            rowsPerPageOptions={[9, 18, 27]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Filas por página"
                          />
                        </Box>
                      </>
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <Grid container spacing={2}>
                    <TemplateCards
                      handleCreateSurvey={handleCreateSurvey}
                      templates={templatesByCompany}
                      page={page}
                      perPage={perPage}
                    />
                  </Grid>

                  <Box>
                    <TablePagination
                      component="div"
                      count={totalByCompany}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={perPage}
                      rowsPerPageOptions={[9, 18, 27]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage="Filas por página"
                    />
                  </Box>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Template;
