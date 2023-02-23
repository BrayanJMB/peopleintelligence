import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { blue, amber, teal } from '@mui/material/colors';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmailIcon from '@mui/icons-material/Email';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import LinkIcon from '@mui/icons-material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import Snackbar from '@mui/material/Snackbar';
import Navbar from '../../Layout/Navbar/Navbar';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import styles from './SurveyDetailPage.module.css';
import MyCard from '../../components/MyCard/MyCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSurveysStatus,
  selectCurrentSurvey,
  fetchSurveyByIdAndCompanyId
} from '../../features/surveys/surveysSlice';
import { useNavigate, useParams } from 'react-router-dom';
import client, { API } from '../../utils/axiosInstance';

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

// survey options
const options = [
  {
    option: 'Editar',
    icon: <EditIcon />,
  },
  {
    option: 'Duplicar',
    icon: <ContentCopyIcon />,
  },
  {
    option: 'Borrar',
    icon: <DeleteIcon />,
  },
];
// flags, tags and counters.
const chips = [
  {
    id: 1,
    text: 'Encuesta anónima',
    backgroundColor: blue[200],
    color: blue[900],
    icon: <AdminPanelSettingsIcon style={{ color: blue[900] }} />,
  },
  {
    id: 2,
    text: 'Usuarios invitados',
    backgroundColor: amber[100],
    color: amber[800],
    icon: <EmailIcon style={{ color: amber[800] }} />,
    counter: 0,
  },
  {
    id: 3,
    text: 'Respuestas',
    backgroundColor: teal['A100'],
    color: teal[900],
    icon: <ReplyIcon style={{ color: teal[900] }} />,
    counter: 0,
  },
];

/**
 * Survey Detail Page Component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const SurveyDetailPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { id: surveyId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const surveysStatus = useSelector((state) => selectSurveysStatus(state));
  const currentSurvey = useSelector((state) => selectCurrentSurvey(state));
  const [linkCopied, setLinkCopied] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);

  /**
   * Handle click menu for open survey options.
   *
   * @param event
   */
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handle close menu for close survey options.
   */
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /**
   * Open survey in new tab.
   *
   * @param event
   */
  const handleClickDownload = (event) => {
    event.preventDefault();

    const companyId = userInfo.Company;
    const url = `${API}JourneyDownloadFile/${companyId}/${surveyId}`;

    window.open(url, '_blank');
  };

  /**
   * Copy survey url.
   *
   * @param event
   */
  const handleClickCopyUrl = (event) => {
    event.preventDefault();

    navigator.clipboard.writeText(currentSurvey.response.link);
    setLinkCopied(true);
  }

  /**
   * Handle close snackbar.
   */
  const handleCloseSnackbar = () => {
    setLinkCopied(false);
    setReminderSent(false);
  }

  /**
   * Send reminder to users.
   *
   * @param event
   */
  const handleClickSendReminder = async (event) => {
      event.preventDefault();

      const companyId = userInfo.Company;
      const url = `${API}rememberMail/${surveyId}/${companyId}`;

      try {
        await client.get(url);
        setReminderSent(true);
      } catch (error) {
          alert('Error al enviar recordatorio. Intente nuevamente.');
      }
  };

  /**
   * Handle click back page.
   *
   * @param event
   */
  const handleClickBackPage = (event) => {
    event.preventDefault();

    navigate(-1);
  };

  // component did mount
  useEffect(() => {
    /**
     * Fetch current survey.
     *
     * @returns {Promise<void>}
     */
    const fetchCurrentSurvey = async () => {
      if (surveysStatus !== 'idle') {
        return;
      }

      const companyId = userInfo.Company;

      await dispatch(fetchSurveyByIdAndCompanyId({companyId, surveyId }));
    };

    fetchCurrentSurvey();
  }, [surveysStatus, dispatch, surveyId]);

  // watch currentSurvey state
  useEffect(() => {
    if (currentSurvey !== null) {
      // set chips counters
      chips[1].counter = currentSurvey.invitados;
      chips[2].counter = currentSurvey.respuestas;
    }
  }, [currentSurvey]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <IconSidebar />

        <div style={{ backgroundColor: "white" }}>
          <div className={styles.SurveyDetailPage}>
            <div className={styles.SurveyDetailPage__content}>
              {currentSurvey !== null && surveysStatus === 'succeeded' && (
                <Box sx={{ flexGrow: 1 }}>
                  {/* header */}
                  <Grid item xs={12}>
                    <MyCard>
                      <div className={styles.SurveyDetailPage__header}>
                        <div className={styles.SurveyDetailPage__header__icon}>
                          <IconButton
                            onClick={handleClickBackPage}
                            aria-label="Atrás"
                          >
                            <ArrowBackIcon />
                          </IconButton>
                        </div>
                        <div className={styles.SurveyDetailPage__header__title}>
                          <Typography variant="h4">
                            {currentSurvey.response.surveyName}
                          </Typography>
                        </div>
                      </div>
                    </MyCard>
                  </Grid>
                  {/* survey options */}
                  <Grid item xs={12}>
                    <MyCard>
                      {/* options */}
                      <div className={styles.SurveyDetailPage__options}>
                        <Typography variant="body1" gutterBottom>
                          {currentSurvey.response.surveyName}
                        </Typography>
                        <div className={styles.SurveyDetailPage__options__button}>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClickMenu}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            PaperProps={{
                              style: {
                                maxHeight: 48 * 4.5,
                                width: '20ch',
                              },
                            }}
                          >
                            {options.map(({ option, icon }) => (
                              <MenuItem key={option} onClick={handleCloseMenu}>
                                {icon}
                                {option}
                              </MenuItem>
                            ))}
                          </Menu>
                        </div>
                      </div>
                      {/* tags and/or counters */}
                      <Stack spacing={1} alignItems="left">
                        <Stack direction="row" spacing={1}>
                          {chips.map(({ id, text, backgroundColor, color, icon, counter }) => (
                            <Chip
                              key={id}
                              style={{
                                backgroundColor: backgroundColor,
                                color: color,
                              }}
                              icon={icon}
                              label={`${typeof counter !== 'undefined' ? counter : ''} ${text}`}
                            />
                          ))}
                        </Stack>
                      </Stack>
                      {/* change status and send invitations */}
                      <div className={styles.SurveyDetailPage__sendInvitation}>
                        <div className={styles.SurveyDetailPage__sendInvitation__buttons}>
                          <Stack spacing={2} direction="row">
                            <Button
                              onClick={handleClickSendReminder}
                              startIcon={<ScheduleSendIcon />}
                              variant="text"
                            >
                              Enviar recordatorio
                            </Button>
                            <Snackbar
                              open={reminderSent}
                              autoHideDuration={3000}
                              onClose={handleCloseSnackbar}
                              message="Recordatorio enviado"
                            />
                            <Snackbar
                              open={linkCopied}
                              autoHideDuration={3000}
                              onClose={handleCloseSnackbar}
                              message="Enlace copiado"
                            />
                            <Button
                              startIcon={<SendIcon />}
                              variant="outlined"
                            >
                              Enviar invitación
                            </Button>
                          </Stack>
                        </div>
                      </div>
                    </MyCard>
                  </Grid>
                  {/* resume */}
                  <Grid item xs={12}>
                    <MyCard>
                      <div className={styles.SurveyDetailPage__resume}>
                        <Typography variant="body1" gutterBottom>
                          Resumen de respuesta
                        </Typography>
                        <div className={styles.SurveyDetailPage__resume__share}>
                          <IconButton onClick={handleClickCopyUrl}>
                            <LinkIcon />
                          </IconButton>
                          <IconButton onClick={handleClickDownload}>
                            <DownloadIcon />
                          </IconButton>
                        </div>
                      </div>
                    </MyCard>
                  </Grid>

                  {/* questions */}
                  <Grid item xs={12}>
                    <MyCard>
                      {currentSurvey.response.preguntas.map(({ questionId, questionNumber, questionName, options }) => (
                        <div
                          key={questionId}
                          className={styles.SurveyDetailPage__question}
                        >
                          <Typography
                            className={styles.SurveyDetailPage__question__number}
                            variant="body1"
                            style={{ fontWeight: 'bold' }}
                            gutterBottom
                          >
                            R{questionNumber}.
                          </Typography>
                          <Box sx={{ width: 1 }}>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: 'bold' }}
                              gutterBottom
                            >
                              {questionName}
                            </Typography>
                            {/* answers */}
                            <div className={styles.SurveyDetailPage__answers}>
                              <Grid container spacing={2}>
                                {options.map(({ numberOption, optionName }) => (
                                  <Grid
                                    key={numberOption}
                                    sm={6}
                                    item
                                  >
                                    <Typography variant="body2" gutterBottom>
                                      <span className={styles.SurveyDetailPage__answers__answer}>
                                        {numberOption}
                                      </span>
                                      {optionName}
                                    </Typography>
                                  </Grid>
                                ))}
                              </Grid>
                            </div>
                          </Box>
                        </div>
                      ))}
                    </MyCard>
                  </Grid>
                </Box>
              )}
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
};

SurveyDetailPage.propTypes = {};

SurveyDetailPage.defaultProps = {};

export default SurveyDetailPage;
