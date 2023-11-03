import { createRef,useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { List, ListItem, ListItemText } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import { storeSurveyChatAPI } from '../../../services/ChatLive/storeSurveyChat.service';
import { updateSurveyChatAPI } from '../../../services/ChatLive/updateSurveyChat.service';

import AccordionDiscussion from './AccordionDicussion/AccordionDiscussion';

import styles from './Discussion.module.css';
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    style: { backgroundColor: stringToColor(name) },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

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
  setSurvey,
  setModerator,
  surveyChat,
  isUpdate,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [opentemplate, setOpentemplate] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleOpenModaltemplate = () => setOpentemplate(true);
  const handleCloseModaltemplate = () => setOpentemplate(false);
  const [toogle, setToggle] = useState('edit');
  const [errors, setErrors] = useState([]);
  const [isDemographicsAccordionOpen, setIsDemographicsAccordionOpen] =
    useState(false);
  const [isConversationAccordionOpen, setIsConversationAccordionOpen] =
    useState(false);

  const demographicRefs = useRef([]);

  const handleOpenAccordion = () => {
    setAccordionOpen(true);
  };

  const handleCloseAccordion = () => {
    setAccordionOpen(false);
  };
  const handleSubmit = async () => {
    if (validate()) {
      let urls = null;
      if (!isUpdate || (surveyImage && avatarImage )) {
        urls = await storeAvatarAndSurveyImage();
      }
      const payload = {
        moderator: {
          ...moderator,
          avatarUrl: urls ? urls.data.files[1] : '',
        },
        survey: {
          ...survey,
          imageUrl: urls ? urls.data.files[0] : '',
          questions: questions.map((q, index) => ({
            ...q,
            orderNumber: index + 1,
            options: q.options.map((option) => {
              const {...rest } = option;
              return rest;
            }),
          })),
          demographic: demographics.map((demo) => ({
            ...demo,
            demographicDetails: demo.demographicDetails.map((detail) => {
              const {...rest } = detail;
              return rest;
            }),
          })),
        },
      };
      console.log(payload);
      if (!isUpdate) {
        const response = await storeSurveyChatAPI(payload);
        if (response.status === 200) {
          alert('Chat Live creado satisfactoriamente');
          handleMove('/conversation/Live', 'basic');
        } else {
          alert('Hubo un error al crear la encuesta de chat');
        }
      } else {
        const response = await updateSurveyChatAPI(payload.survey);
        if (response.status === 200) {
          alert('Chat Live actualizado satisfactoriamente');
          handleMove('/conversation/Live', 'basic');
        } else {
          alert('Hubo un error al crear la encuesta de chat');
        }
      }
    }
  };

  const storeAvatarAndSurveyImage = async () => {
    const formData = new FormData();
    formData.append('surveyImage', surveyImage);
    formData.append('moderatorAvatar', avatarImage);
    formData.append('companyId', '1');
    formData.append('surveyId', survey.id);
    try {
      const response = await axios.post(
        'https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/UploadImages',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response) {
        return response;
      } else {
        console.error('Error al subir la imagen:', response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    let allErrors = {
      demographics: [],
      questions: [],
    };

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

    questions.forEach((question, questionIndex) => {
      let currentQuestionErrors = {};

      // Validar si el nombre de la pregunta está vacío
      if (!question.name.trim()) {
        currentQuestionErrors.name =
          'El nombre de la pregunta no puede estar vacío.';
      } else {
        // Validar si hay al menos 2 opciones
        if (
          question.options.length < 2 &&
          question.type !== 'texto' &&
          question.type !== 'Opinión'
        ) {
          currentQuestionErrors.name = 'Debe haber al menos 2 opciones.';
        }
      }

      // Validar si el timeLimit es nulo
      if (!question.timeLimit && question.type !== 'texto') {
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

    if (hasErrors) {
      //setIsAccordionOpen(true);
      const firstErrorIndex = allErrors.demographics.findIndex(
        (errorObj) => Object.keys(errorObj).length > 0
      );
      demographicRefs.current[firstErrorIndex]?.current?.focus();
    }

    // Si no hay errores en ningún demográfico o pregunta, devuelve true. De lo contrario, devuelve false.
    return !hasErrors;
  };

  const handletoggle = (event, newAlignment) => {
    setToggle(newAlignment);
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

  return (
    <div className={styles.discussion}>
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
          <p> Nombre encuesta </p>
          <div>
            <Button>Compartir</Button>
            <Button onClick={handleSubmit}>
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
        {/*
        <div className={styles.grey}>
          <div className={styles.layout}>
            <div className={styles.leftbox}>
              <img
                src="https://www.jrmyprtr.com/wp-content/uploads/2014/06/messaging.png"
                alt="profile"
                className={styles.photo}
              />
            </div>
            <div className={styles.rightbox}>
              <p style={{ width: '60%' }}>
                Prepare messages and questions you will ask participants during
                this Conversation.
              </p>
              <p style={{ width: '60%' }}>
                Not sur where to start? Try a free template crafted by your
                Remesh Research Team
              </p>
            </div>
          </div>
              </div>*/}

        <div className={styles.impexp}>
          <Button variant="text" size="small" onClick={handleOpenModal}>
            Importar
          </Button>
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
        />
        <AccordionDiscussion
          isConversation={true}
          questions={questions}
          setQuestions={setQuestions}
          demographics={demographics}
          setDemographics={setDemographics}
          demographicRefs={demographicRefs}
          errors={errors}
          setErrors={setErrors}
          isAccordionOpen={isConversationAccordionOpen}
          setIsAccordionOpen={setIsConversationAccordionOpen}
        />
      </div>
    </div>
  );
}
