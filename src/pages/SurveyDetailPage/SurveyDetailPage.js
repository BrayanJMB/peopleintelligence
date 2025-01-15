import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderMatches, useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PublicIcon from '@mui/icons-material/Public';
import ReplyIcon from '@mui/icons-material/Reply';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Divider } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { amber, blue, teal } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import QRCode from 'qrcode.react';

import DemographicDataForm from '../../components/DemographicDataForm/DemographicDataForm';
import MyCard from '../../components/MyCard/MyCard';
import MyLoader from '../../components/MyLoader/MyLoader';
import MyPageHeader from '../../components/MyPageHeader/MyPageHeader';
import { currentCompanySelected } from '../../features/companies/companiesSlice';
import {
  fetchSurveyByIdAndCompanyId,
  selectCurrentSurvey,
  selectSurveysStatus,
} from '../../features/surveys/surveysSlice';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import client, { API } from '../../utils/axiosInstance';
import NotFoundMessage from '../AnswerSurvey/components/NotFoundMessage/NotFoundMessage';

import SendInvitationDialog from './components/SendInvitationDialog/SendInvitationDialog';
import { SendInvitationDialogWhatsapp } from './components/SendInvitationWhatsapp/SendInvitationDialogWhatsapp';
import {
  templateFromSurveyAllCompanies,
  templateFromSurveyByCompany,
} from './services/services';
import { ConfirmDialog } from './ConfirmDialog';
import { SelectSurveyDuplicateTemplate } from './SelectSurveyDuplicateTemplate';

import styles from './SurveyDetailPage.module.css';
// survey options
const options = [
  /*{
    option: 'Editar',
    icon: <EditIcon />,
  },  */
  {
    option: 'Duplicar',
    icon: <ContentCopyIcon />,
  },
  {
    option: 'Generar plantilla (todos)',
    icon: <PublicIcon />,
  },
  {
    option: 'Generar plantilla (empresa)',
    icon: <BusinessIcon />,
  },
  {
    option: 'Borrar',
    icon: <DeleteIcon />,
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
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const surveysStatus = useSelector((state) => selectSurveysStatus(state));
  const currentSurvey = useSelector((state) => selectCurrentSurvey(state));
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [linkCopied, setLinkCopied] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);
  const [showDemographicData, setShowDemographicData] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [errorReminderDay, setErrorReminderDay] = useState(null);
  const [reminderDays, setReminderDays] = useState('60');
  const [openDialogs, setOpenDialogs] = useState({});
  const qrRef = useRef(null);
  const reminderDaysRef = useRef(reminderDays);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [visibility, setVisibility] = useState(null);
  const [visibilitySelectCompanies, setVisibilityCompanies] = useState(false);
  // flags, tags and counters.
  const [chips, setChips] = useState([
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
  ]);
  const [searchParams] = useSearchParams();
  const isOpenSendMail = searchParams.get('sendMail') === 'true';

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
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
  const handleCloseMenu = (option) => {
    if (option === 'Borrar') {
      handleOpenDialog(
        generateSurveyId(),
        'El ejecutar esta opción se eliminará la encuesta',
        () => handleDeleteSurvey(currentSurvey.response.surveyId),
        false
      );
    }
    if (option === 'Editar') {
      navigate(
        `/journey/edit-survey/${currentSurvey.response.surveyId}?isTemplate=False&isEdit=true`
      );
    }
    if (option === 'Duplicar') {
      handleOpenDialog(
        generateSurveyId(),
        'El ejecutar esta opción se duplicará la encuesta',
        () => handleDuplicateSurvey(currentSurvey.response.surveyId),
        false
      );
    }
    if (option === 'Generar plantilla (todos)') {
      handleOpenDialog(
        generateSurveyId(),
        'El ejecutar esta opción se generará una plantilla para todas las empresas',
        () =>
          handleTemplateFromSurveyAll(
            currentSurvey.response.surveyId,
            currentCompany.id
          ),
        false
      );
    }
    if (option === 'Generar plantilla (empresa)') {
      setVisibilityCompanies(true);
      /*
      handleTemplateFromSurveyByCompany(
        currentSurvey.response.surveyId,
        currentCompany.id,
        currentCompany.id
      );*/
    }
    setAnchorEl(null);
  };

  const handleDuplicateSurvey = async (idSurvey) => {
    if (!currentSurvey) {
      return;
    }

    try {
      const response = await client.post(
        `CloneJourney/${idSurvey}/${currentCompany.id}`
      );
      if (response.status === 200) {
        enqueueSnackbar('Encuesta duplicada satisfactoriamente', {
          variant: 'success',
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar('Error al duplicar la encuesta', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const handleTemplateFromSurveyAll = async (surveyId, currentCompany) => {
    try {
      enqueueSnackbar(
        'Creando plantilla para todas las empresas por favor espere.',
        {
          variant: 'info',
        }
      );
      const response = await templateFromSurveyAllCompanies(
        surveyId,
        currentCompany
      );
      if (response.status === 200) {
        enqueueSnackbar(
          'Plantilla creada para todas las empresas correctamente.',
          {
            variant: 'success',
          }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        'Hubo un error al crear la plantilla para todas las empresas',
        {
          variant: 'error',
        }
      );
    }
  };

  const handleTemplateFromSurveyByCompany = async (
    surveyId,
    currentCompany
  ) => {
    try {
      enqueueSnackbar(
        'Creando plantilla para todas las empresas por favor espere.',
        {
          variant: 'info',
        }
      );
      const response = await templateFromSurveyByCompany(
        surveyId,
        currentCompany,
        currentCompany
      );
      if (response.status === 200) {
        enqueueSnackbar(
          'Plantilla creada para todas las empresas correctamente.',
          {
            variant: 'success',
          }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        'Hubo un error al crear la plantilla para todas las empresas',
        {
          variant: 'error',
        }
      );
    }
  };

  const handleDeleteSurvey = async (idSurvey) => {
    if (!currentSurvey) {
      return;
    }

    try {
      const response = await client.delete(`deleteSurvey/${idSurvey}`);
      if (response.status === 200) {
        setSnackbarMessage('Encuesta eliminada satifactoriamente');
        setOpenSnackbar(true);
        setAlertType('success');

        setTimeout(() => {
          navigate('/journey');
        }, 1000);
      }
    } catch (error) {
      setSnackbarMessage('Hubo un error al momento de eliminar la encuesta');
      setOpenSnackbar(true);
      setAlertType('error');
    }
  };

  /**
   * Open survey in new tab.
   *
   * @param event
   */

  const handleClickDownload = async (event) => {
    event.preventDefault();

    const companyId = userInfo.Company;

    try {
      const response = await client.get(
        `JourneyDownloadFile/${companyId}/${surveyId}`,
        {
          responseType: 'blob', // Indica que se espera un archivo binario (como un PDF, imagen, etc.)
        }
      );
      const filename = response.headers['content-disposition']
        .split('filename=')[1]
        .split(';')[0]
        .replace(/"/g, '');
      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Aquí puedes especificar el nombre del archivo
      document.body.appendChild(link);
      link.click();

      // Limpiar el enlace temporal después de la descarga
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const handleClickDownloadQR = () => {
    const qrCodeURL = document
      .getElementById('qrCodeCanvas')
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = 'QR_Code.png';
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
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
  };

  /**
   * Copy survey url.
   *
   * @param event
   */
  const handleClickCopyUrlWhatsApp = (event) => {
    event.preventDefault();

    navigator.clipboard.writeText(
      `https://wa.me/573007038902?text=Hola quisiera responder la encuesta ${currentSurvey.response.surveyName}`
    );
    setLinkCopied(true);
  };

  /**
   * Handle close snackbar.
   */
  const handleCloseSnackbar = () => {
    setLinkCopied(false);
    setReminderSent(false);
  };

  /**
   * Send reminder to users.
   *
   * @param event
   */
  const sendReminder = async (idSurvey, dialogPosition) => {
    const currentReminderDays = reminderDaysRef.current.trim(); // Usar el valor del ref

    if (currentReminderDays === '') {
      setErrorReminderDay(true);
      return; // Sal de la función
    }
    
    handleCloseDialog(dialogPosition);
    const companyId = userInfo.Company;
    const url = `${API}SendReminder/${surveyId}/${companyId}/${reminderDays}`;

    await client.get(url);
    setReminderSent(true);
  };

  /**
   * Handle change show demographic data.
   *
   * @param event
   */
  const handleChangeShowDemographicData = (event) => {
    setShowDemographicData(event.target.checked);
  };

  /**
   * Dialog for Delete anwser survey
   *
   *
   *
   * **/
  const handleOpenDialog = (id, ...args) => {
    console.log(args);
    setOpenDialogs((prevDialogs) => ({
      ...prevDialogs,
      [id]: {
        isOpen: true,
        message: args[0],
        consume: args[1],
        needConfirm: args[2],
        confirmationInput: args[3],
      },
    }));
  };

  const handleCloseDialog = (id) => {
    setOpenDialogs((prevDialogs) => ({
      ...prevDialogs,
      [id]: {
        ...prevDialogs[id], // Mantén las otras propiedades como `message` o `loading`
        isOpen: false, // Solo actualiza el estado `isOpen` a `false` para cerrar el diálogo
      },
    }));
  };

  const handleConfirmAction = async (idSurvey, dialogPosition) => {
    try {
      // Aquí haces la acción deseada, como un consumo de API
      handleCloseDialog(dialogPosition);
      const response = await client.delete(`DeleteAnswers/${idSurvey}`);
      if (response.status === 200) {
        enqueueSnackbar('Repuestas eliminadas satisfactoriamente', {
          variant: 'success',
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar('Error al eliminar respuestas encuesta', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const handleNavigateJourney = () => {
    navigate('/journey');
  };
  // component did mount
  useEffect(() => {
    /**
     * Fetch current survey.
     *
     * @returns {Promise<void>}
     */
    const fetchCurrentSurvey = async () => {
      if (surveysStatus === 'loading') {
        return;
      }

      const companyId = userInfo.Company;

      await dispatch(fetchSurveyByIdAndCompanyId({ companyId, surveyId }));
    };

    fetchCurrentSurvey();
  }, [dispatch, surveyId, currentCompany]); // eslint-disable-line react-hooks/exhaustive-deps

  const isAdmin = userInfo?.role.findIndex((p) => p === 'Administrador') > 0;
  // watch currentSurvey state
  useEffect(() => {
    if (currentSurvey !== null) {
      setChips((prevChips) => {
        const newChips = [...prevChips];

        // set chips counters
        newChips[1].counter = currentSurvey.invitados;
        newChips[2].counter = currentSurvey.respuestas;

        // personal data
        if (currentSurvey.ispersonal) {
          newChips[0].text = 'Encuesta personalizada';
        } else {
          newChips[0].text = 'Encuesta anónima';
        }

        return newChips;
      });
      setVisibility(currentSurvey.response.visibleSurvey);
    }
  }, [currentSurvey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    reminderDaysRef.current = reminderDays;
  }, [reminderDays]);

  const generateSurveyId = () => Math.floor(Math.random() * 3) + 1; // Simula un ID dinámico entre 1 y 3

  return (
    <Box sx={{ display: 'flex' }} translate="no">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Cierra el Snackbar automáticamente después de 6 segundos
        onClose={() => setOpenSnackbar(false)} // Función para cerrar el Snackbar
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={alertType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Navbar />
      <IconSidebar />

      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.SurveyDetailPage}>
          <div className={styles.SurveyDetailPage__content}>
            {surveysStatus === 'loading' && <MyLoader />}
            {surveysStatus === 'failed' && (
              <div style={{display:'flex', flexDirection:'column'}}>
                <NotFoundMessage
                  infoMessage={
                    'Esta encuesta no esta disponible para esta compañía :('
                  }
                />
                <Button onClick={handleNavigateJourney}>
                  Volver a journey
                </Button>
              </div>
            )}
            {currentSurvey !== null && surveysStatus === 'succeeded' && (
              <Box sx={{ flexGrow: 1 }}>
                {/* header */}
                <Grid item xs={12}>
                  <MyPageHeader
                    surveyId={surveyId}
                    title={currentSurvey.response.surveyName}
                    visibility={visibility}
                    setVisibility={setVisibility}
                  />
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
                        {isAdmin && visibilitySelectCompanies && (
                          <SelectSurveyDuplicateTemplate
                            surveyId={surveyId}
                            currentCompanyId={currentCompany}
                            handleOpenDialog={handleOpenDialog}
                            generateSurveyId={generateSurveyId}
                          />
                        )}

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
                        >
                          {options
                            .filter(({ option }) => {
                              // Mostrar todas las opciones solo si el usuario es administrador
                              if (
                                !isAdmin &&
                                option === 'Generar plantilla (todos)'
                              ) {
                                return false; // Oculta estas opciones si no es administrador
                              }
                              return true;
                            })
                            .map(({ option, icon }) => (
                              <MenuItem
                                key={option}
                                onClick={() => handleCloseMenu(option)}
                              >
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
                        {chips.map(
                          ({
                            id,
                            text,
                            backgroundColor,
                            color,
                            icon,
                            counter,
                          }) => (
                            <Chip
                              key={id}
                              style={{
                                backgroundColor: backgroundColor,
                                color: color,
                              }}
                              icon={icon}
                              label={`${
                                typeof counter !== 'undefined' ? counter : ''
                              } ${text}`}
                            />
                          )
                        )}
                      </Stack>
                    </Stack>
                    {/* change status and send invitations */}
                    <div className={styles.SurveyDetailPage__sendInvitation}>
                      <div>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={showDemographicData}
                                onChange={handleChangeShowDemographicData}
                              />
                            }
                            label="Mostrar datos demográficos"
                          />
                        </FormGroup>
                      </div>
                      <div
                        className={
                          styles.SurveyDetailPage__sendInvitation__buttons
                        }
                      >
                        <Stack spacing={2} direction="row">
                          <Button
                            onClick={() =>
                              handleOpenDialog(
                                generateSurveyId(),
                                `Se enviarán los recordatorios a las personas
                                cuya antigüedad sea igual o menor al número de días indicado en la casilla.
                                El valor predeterminado es 60 días, pero puedes modificarlo si lo deseas:
                                `,
                                sendReminder,
                                false,
                                true
                              )
                            }
                            startIcon={<ScheduleSendIcon />}
                            variant="text"
                            disabled={!visibility}
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

                          {/* send invitation */}
                          <SendInvitationDialog
                            isPersonal={currentSurvey.ispersonal}
                            copyUrl={handleClickCopyUrl}
                            isOpen={isOpenSendMail}
                            mailMask={currentSurvey.response.emailMAsk}
                            mailSubject={currentSurvey.response.emailSubject}
                            emailMessage={currentSurvey.response.emailMessage}
                            visibility={visibility}
                          />

                          {/* send invitation  Whatsapp*/}
                          <SendInvitationDialogWhatsapp
                            isPersonal={currentSurvey.ispersonal}
                            copyUrl={handleClickCopyUrlWhatsApp}
                            isOpen={isOpenSendMail}
                            mailMask={currentSurvey.response.emailMAsk}
                            mailSubject={currentSurvey.response.emailSubject}
                            emailMessage={currentSurvey.response.emailMessage}
                            visibility={visibility}
                            hasWhatsApp={currentSurvey.response.hasWhatsApp}
                          />
                        </Stack>
                      </div>
                    </div>

                    {/* demographic data form */}
                    {showDemographicData === true && (
                      <Box mt={3}>
                        <Divider sx={{ margin: '21px 0' }} />
                        <DemographicDataForm surveyId={Number(surveyId)} />
                      </Box>
                    )}
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
                        <IconButton
                          onClick={handleClickCopyUrl}
                          disabled={!visibility}
                        >
                          <LinkIcon />
                        </IconButton>

                        <IconButton onClick={handleClickDownload}>
                          <DownloadIcon />
                        </IconButton>
                        <Button
                          onClick={handleOpen}
                          startIcon={<VisibilityIcon />}
                          disabled={!visibility}
                        >
                          Ver Código QR
                        </Button>
                        {userInfo?.role.findIndex(
                          (p) => p === 'Administrador'
                        ) > 0 && (
                          <Button
                            onClick={() =>
                              handleOpenDialog(
                                generateSurveyId(),
                                'Al ejecutar esta acción se borrarán todas las respuestas de \n la encuesta.',
                                handleConfirmAction,
                                true
                              )
                            }
                            startIcon={<DeleteOutlineIcon />}
                          >
                            Borrar respuestas
                          </Button>
                        )}
                      </div>
                    </div>
                  </MyCard>
                </Grid>
                {/* Modal */}
                <Modal
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={styles.SurveyDetailPageQR}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Código QR
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Escanea el código para acceder al enlace.
                    </Typography>
                    <div ref={qrRef}>
                      <QRCode
                        id="qrCodeCanvas"
                        value={currentSurvey.response.link}
                        size={256}
                        level={'H'}
                        bgColor={'#ffffff'}
                        fgColor={'#000000'}
                      />
                    </div>
                    <IconButton onClick={handleClickDownloadQR} sx={{ mt: 2 }}>
                      <p>Descargar código QR</p>
                    </IconButton>
                  </Box>
                </Modal>
                {/* questions */}
                <Grid item xs={12}>
                  <MyCard>
                    {currentSurvey.response.preguntas.map(
                      ({
                        questionId,
                        questionNumber,
                        questionName,
                        options,
                      }) => (
                        <div
                          key={questionId}
                          className={styles.SurveyDetailPage__question}
                        >
                          <div style={{ display: 'flex' }}>
                            <Typography
                              className={
                                styles.SurveyDetailPage__question__number
                              }
                              variant="body1"
                              style={{ fontWeight: 'bold' }}
                              gutterBottom
                            >
                              R{questionNumber}.
                            </Typography>
                            <Box sx={{ width: 1 }}>
                              <Typography
                                variant="body1"
                                style={{
                                  fontWeight: 'bold',
                                  wordBreak: 'break-word',
                                }}
                                gutterBottom
                              >
                                {questionName}
                              </Typography>
                              {/* answers */}
                              <div className={styles.SurveyDetailPage__answers}>
                                <Grid container spacing={2}>
                                  {options.map(
                                    ({ numberOption, optionName }) => (
                                      <Grid key={numberOption} sm={6} item>
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                        >
                                          <span
                                            className={
                                              styles.SurveyDetailPage__answers__answer
                                            }
                                          >
                                            {numberOption}
                                          </span>
                                          {optionName}
                                        </Typography>
                                      </Grid>
                                    )
                                  )}
                                </Grid>
                              </div>
                            </Box>
                          </div>
                        </div>
                      )
                    )}
                  </MyCard>
                </Grid>
              </Box>
            )}
          </div>
        </div>
      </div>
      {/*Dialogs */}
      {Object.keys(openDialogs).map((idDialog) => (
        <ConfirmDialog
          key={idDialog}
          open={openDialogs[idDialog]?.isOpen} // Verifica si el diálogo para el id está abierto
          onClose={() => handleCloseDialog(idDialog)}
          onConfirm={openDialogs[idDialog]?.consume}
          idSurvey={surveyId}
          message={openDialogs[idDialog]?.message} // Mensaje personalizado para cada id
          skipConfirmation={openDialogs[idDialog]?.needConfirm}
          confirmationInput={openDialogs[idDialog]?.confirmationInput}
          dialogPosition={idDialog}
          reminderDays={reminderDays}
          setReminderDays={setReminderDays}
          errorReminderDay={errorReminderDay}
        />
      ))}
    </Box>
  );
};

SurveyDetailPage.propTypes = {};

SurveyDetailPage.defaultProps = {};

export default SurveyDetailPage;
