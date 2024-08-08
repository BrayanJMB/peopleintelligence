import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { List, ListItem, ListItemText } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import {
  DemographicContext,
  QuestionContext,
} from '../../../pages/Conversation/Conversation';
import { storeSurveyChatAPI } from '../../../services/ChatLive/storeSurveyChat.service';
import {
  updateModeratorChatAPI,
  updateSurveyChatAPI,
} from '../../../services/ChatLive/updateSurveyChat.service';

import AccordionDiscussion from './AccordionDicussion/AccordionDiscussion';
import {
  storeAvatarAndSurveyImage,
  storeSurveyImageQuestion,
  storeSurveyVideoQuestion,
} from './services/service';

import styles from './Discussion.module.css';
export const filesImageQuestionContext = createContext();
//
export default function Discussion({
  moderator,
  survey,
  questions,
  demographics,
  setQuestions,
  setDemographics,
  handleMove,
  handleBack,
  surveyImage,
  avatarImage,
  surveyChat,
  isUpdate,
  currentCompany,
}) {
  const demographicRefs = useContext(DemographicContext);
  const questionRefs = useContext(QuestionContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [filesImageQuestion, setFilesImageQuestion] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isDemographicsAccordionOpen, setIsDemographicsAccordionOpen] =
    useState(false);
  const [isConversationAccordionOpen, setIsConversationAccordionOpen] =
    useState(false);

  const handleOpenAccordion = () => {
    setAccordionOpen(true);
  };

  const handleCloseAccordion = () => {
    setAccordionOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    if (validate()) {
      event.preventDefault();
      setIsDisabled(true);
      setOpenSnackbar(true);
      setSnackbarMessage('Creando encuesta, por favor espere...');
      setSnackbarSeverity('info');
      let urls = null;
      const filesImage =
        questions?.filter((q) => q.type === 'Imagen').map((q) => q.urlMedia) ??
        [];
      const filesVideo =
        questions?.filter((q) => q.type === 'Video').map((q) => q.urlMedia) ??
        [];

      const payload = {
        moderator: {
          ...moderator,
        },
        survey: {
          ...survey,
          questions: questions.map((q, index) => ({
            ...q,
            orderNumber: index + 1,
            urlMedia: '',
            options: q.options.map((option) => {
              const { ...rest } = option;
              return rest;
            }),
          })),
          demographic: demographics.map((demo) => ({
            ...demo,
            demographicDetails: demo.demographicDetails.map((detail) => {
              const { ...rest } = detail;
              return rest;
            }),
          })),
        },
      };
      let response;

      if (!isUpdate) {
        // Manejar creación
        const imageQuestions = payload.survey.questions.filter(
          (question) => question.type === 'Imagen'
        );
        const videoQuestions = payload.survey.questions.filter(
          (video) => video.type === 'Video'
        );
        console.log(videoQuestions)
        response = await storeSurveyChatAPI(payload);
        if (surveyImage || avatarImage) {
          urls = await storeAvatarAndSurveyImage(
            response.data.survey.id,
            surveyImage,
            avatarImage,
            currentCompany
          );
          payload.moderator.avatarUrl = urls ? urls.data.files[1].url : '';
          payload.survey.imageUrl = urls
            ? urls.data.files[0].url
            : survey.imageUrl;
        }
        const updateData = {
          id: payload.survey.id,
          title: payload.survey.title,
          imageUrl: payload.survey.imageUrl, //Se cambia debido a que el objeto cambio
          description: payload.survey.description,
          moderatorName: payload.moderator.name,
          moderatorId: payload.moderator.moderatorId,
          avatarUrl: payload.moderator.avatarUrl, //Se cambia debido a que el objeto cambio
        };
        await updateModeratorChatAPI(updateData);
        if (imageQuestions.length > 0) {
          await storeSurveyImageQuestion(
            filesImage,
            imageQuestions,
            response.data.survey.id
          );
        }
        if (videoQuestions.length > 0) {
          await storeSurveyVideoQuestion(
            filesVideo,
            videoQuestions,
            response.data.survey.id
          );
        }
      } else {
        // Manejar actualización
        if (surveyImage || avatarImage) {
          urls = await storeAvatarAndSurveyImage(
            payload.survey.id,
            surveyImage,
            avatarImage,
            currentCompany
          );
          payload.moderator.avatarUrl = urls ? urls.data.files[0].url : '';
          payload.survey.imageUrl = urls
            ? urls.data.files[1].url
            : survey.imageUrl;
        }
        response = await updateSurveyChatAPI(payload.survey);
        const updateData = {
          id: payload.survey.id,
          title: payload.survey.title,
          imageUrl: payload.survey.imageUrl,
          description: payload.survey.description,
          moderatorName: payload.moderator.name,
          moderatorId: payload.moderator.moderatorId,
          avatarUrl: payload.moderator.avatarUrl,
        };
        await updateModeratorChatAPI(updateData);
      }

      // Manejar respuesta
      if (response.status === 200) {
        setSnackbarMessage(
          `Chat Live ${!isUpdate ? 'creado' : 'actualizado'} satisfactoriamente`
        );
        setSnackbarSeverity('success');
        setIsDisabled(false);
        setTimeout(() => {
          handleMove('/conversation/Live', 'basic');
        }, 2000);
      } else {
        setIsDisabled(false);
        setSnackbarMessage('Hubo un error al crear la encuesta de chat');
        setSnackbarSeverity('error');
      }
    }
  };

  const validate = () => {
    let allErrors = {
      demographics: [],
      questions: [],
    };
    let errorMessages = [];

    // Validar si el array de demográficos está vacío
    if (demographics.length === 0) {
      errorMessages.push(
        'Para crear la encuesta debe haber al menos un demográfico.'
      );
    }
    demographics.forEach((demographic, demoIndex) => {
      let currentErrors = {};

      // Validar si el nombre del demográfico está vacío
      if (!demographic.name.trim()) {
        currentErrors.name = 'El nombre demográfico no puede estar vacío.';
      } else {
        // Validar si hay al menos 2 opciones
        if (demographic.demographicDetails.length < 1) {
          currentErrors.name = 'Debe haber al menos 1 opcion.';
        }
      }

      // Validar si las opciones están vacías
      demographic.demographicDetails.forEach((opcion, index) => {
        if (!opcion.value.trim()) {
          currentErrors[`option${index}`] = 'Esta opción no puede estar vacía.';
        }
      });

      allErrors.demographics[demoIndex] = currentErrors;
    });
    if (questions.length === 0) {
      errorMessages.push(
        'Para crear la encuesta debe haber al menos una pregunta.'
      );
    }
    questions.forEach((question, questionIndex) => {
      let currentQuestionErrors = {};

      // Validar si el nombre de la pregunta está vacío
      if (
        question.type.toLowerCase() !== 'imagen' &&
        question.type.toLowerCase()  !== 'video'
      ) {
        if (!question.name.trim()) {
          currentQuestionErrors.name =
            'El nombre de la pregunta no puede estar vacío.';
        } else {
          // Validar si hay al menos 2 opciones
          if (
            question.options.length < 2 &&
            question.type.toLowerCase() !== 'texto' &&
            question.type !== 'Opinión'
          ) {
            currentQuestionErrors.name = 'Debe haber al menos 2 opciones.';
          }
        }
      } else {
        if (
          typeof question.urlMedia === 'string' &&
          !question.urlMedia.trim()
        ) {
          currentQuestionErrors.name =
            'No puede ir vacío, debe subir un archivo';
        }
        // Verifica si question.urlMedia es un objeto File pero no tiene tamaño (lo que indicaría un archivo vacío)
        else if (
          question.urlMedia instanceof File &&
          question.urlMedia.size === 0
        ) {
          currentQuestionErrors.name = 'El archivo no puede estar vacío.';
        }
      }

      // Validar si el timeLimit es nulo

      if (
        !question.timeLimit &&
        question.type.toLowerCase() !== 'texto' &&
        question.type.toLowerCase() !== 'imagen' &&
        question.type.toLowerCase() !== 'video'
      ) {
        currentQuestionErrors.timeLimit = 'Debe seleccionar un tiempo';
      }

      // Validar si las opciones están vacías
      question.options.forEach((option, index) => {
        if (option.value && !option.value.trim()) {
          currentQuestionErrors[`option${index}`] =
            'Esta opción no puede estar vacía.';
        }
        if (option.experienceQuestion && !option.experienceQuestion.trim()) {
          currentQuestionErrors[`experienceQuestion${index}`] =
            'Esta opción no puede estar vacía.';
        }
      });

      allErrors.questions[questionIndex] = currentQuestionErrors;
    });
    setErrors(allErrors);

    const hasErrorsInDemographics = allErrors.demographics.some(
      (errorObj) => Object.keys(errorObj).length > 0
    );
    const hasErrorsInQuestions = allErrors.questions.some(
      (errorObj) => Object.keys(errorObj).length > 0
    );
    const hasErrors = hasErrorsInDemographics || hasErrorsInQuestions;
    if (errorMessages.length > 0) {
   
    }

    if (hasErrors) {
      if (hasErrorsInDemographics) {
        setIsDemographicsAccordionOpen(true);
        const firstErrorIndex = allErrors.demographics.findIndex(
          (errorObj) => Object.keys(errorObj).length > 0
        );
        demographicRefs.current[firstErrorIndex].current.scrollIntoView({
          behavior: 'smooth',
        });
      }
      if (hasErrorsInQuestions) {
        setIsConversationAccordionOpen(true);
        const firstErrorIndex = allErrors.questions.findIndex(
          (errorObj) => Object.keys(errorObj).length > 0
        );
        questionRefs.current[firstErrorIndex].current.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
    // Si no hay errores en ningún demográfico o pregunta, devuelve true. De lo contrario, devuelve false.
    return !hasErrors && !errorMessages.length;
  };

  useEffect(() => {
    // Si hay más demográficos que referencias, agregamos las referencias faltantes
    while (demographicRefs.current.length < demographics.length) {
      demographicRefs.current.push(createRef());
    }
    // Si hay menos demográficos que referencias, recortamos las referencias sobrantes
    demographicRefs.current = demographicRefs.current.slice(
      0,
      demographics.length
    );
  }, [demographics]);

  useEffect(() => {
    // Si hay más demográficos que referencias, agregamos las referencias faltantes
    while (questionRefs.current.length < questions.length) {
      questionRefs.current.push(createRef());
    }
    // Si hay menos demográficos que referencias, recortamos las referencias sobrantes
    questionRefs.current = questionRefs.current.slice(0, questions.length);
  }, [questions]);

  return (
    <div className={styles.discussion}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Button
        onClick={() => {
          handleMove('', 'basic');
          handleBack();
        }}
      >
        Atrás
      </Button>
      <div className={styles.content}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <p>{survey.title}</p>
          <div>
            <Button
              onClick={handleOpenModal}
              sx={{
                color: '#00B0F0',
              }}
            >
              Importar
            </Button>
            <Button
              sx={{
                color: '#00B0F0',
              }}
            >
              Compartir
            </Button>
            <Button
              onClick={(event) => handleSubmit(event)}
              disabled={isDisabled}
              sx={{
                color: isDisabled ? '#9b9b9b' : '#00B0F0',
              }}
            >
              {isUpdate ? 'Editar' : 'Publicar'}
            </Button>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.left}>
            <div>
              <span
                style={{
                  marginLeft: '2rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                Guía de discusión
              </span>
            </div>
          </div>
        </div>
        <div className={styles.impexp}>
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modal}>
              <div className={styles.modaltop}>
                <p style={{ fontWeight: 'bold', marginTop: '0.8rem' }}>
                  Acá puedes usar/importar una conversacion existente
                </p>
                <div>
                  <IconButton onClick={handleCloseModal}>
                    <ClearIcon sx={{ fontSize: '40px' }} />
                  </IconButton>
                </div>
              </div>
              <div className={styles.modalbuttom}>
                {!accordionOpen ? (
                  <div className={styles.blocks} onClick={handleOpenAccordion}>
                    <ForumOutlinedIcon sx={{ fontSize: '40px' }} />
                    <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                      Conversación existente
                    </p>
                    <p style={{ color: 'grey', fontSize: '0.8rem' }}>
                      Grab the discussion guide from another conversation
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      maxWidth: '600px',
                      maxHeight: '300px',
                      overflowY: 'auto',
                    }}
                  >
                    <Accordion expanded={true}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Conversaciones</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {surveyChat.map((opcion, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={opcion.title} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                    <Button onClick={handleCloseAccordion}>Atrás</Button>
                  </div>
                )}
              </div>
            </Box>
          </Modal>
        </div>
        <filesImageQuestionContext.Provider
          value={{ filesImageQuestion, setFilesImageQuestion }}
        >
          <AccordionDiscussion
            isConversation={false}
            questions={questions}
            setQuestions={setQuestions}
            demographics={demographics}
            setDemographics={setDemographics}
            errors={errors}
            setErrors={setErrors}
            isAccordionOpen={isDemographicsAccordionOpen}
            setIsAccordionOpen={setIsDemographicsAccordionOpen}
            demographicRefs={demographicRefs}
            questionRefs={questionRefs}
            accordionTitle={'Datos Demográficos'}
          />

          <AccordionDiscussion
            isConversation={true}
            questions={questions}
            setQuestions={setQuestions}
            demographics={demographics}
            setDemographics={setDemographics}
            questionRefs={questionRefs}
            demographicRefs={demographicRefs}
            errors={errors}
            setErrors={setErrors}
            isAccordionOpen={isConversationAccordionOpen}
            setIsAccordionOpen={setIsConversationAccordionOpen}
            accordionTitle={'Preguntas'}
          />
        </filesImageQuestionContext.Provider>
      </div>
    </div>
  );
}
