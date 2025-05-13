import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PollIcon from '@mui/icons-material/Poll';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import MyLoader from '../../components/MyLoader/MyLoader';
import {
  fetchSurveyForAnswer,
  fetchSurveyForAnswerPersonal,
  selectCurrentSurveyForAnswer,
  selectSurveysStatus,
  storeSurvey,
} from '../../features/surveys/surveysSlice';
import client from '../../utils/axiosInstance';

import NotExclusiviness from './components/NotExclusiviness/NotExclusiviness';
import NotFoundMessage from './components/NotFoundMessage/NotFoundMessage';
import SuccessMessage from './components/SuccessMessage/SuccessMessage';
import SurveyForm from './components/SurveyForm/SurveyForm';

import styles from './AnswerSurvey.module.css';
/**
 * Answer survey page.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const AnswerSurvey = () => {
  const { surveyId, companyId, answerId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [steps, setSteps] = useState([
    'Datos demográficos',
    'Encuesta',
    'Finalizar',
  ]);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [stepsCompleted, setStepsCompleted] = useState([false, false, true]);
  const [answers, setAnswers] = useState([{}, {}]);
  const [answerIdAPI, setAnswerIdAPI] = useState('');
  const [demographicUserData, setDemographicUserData] = useState(null);
  const [isPersonal, setIsPersonal] = useState(false);
  const surveyStatus = useSelector((state) => selectSurveysStatus(state));
  const [exclusiviness, setExclusiviness] = useState(false);
  const currentSurvey = useSelector((state) =>
    selectCurrentSurveyForAnswer(state)
  );
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(true);
  const [isAlreadyResponse, setIsAlreadyResponse] = useState(false);
  const dispatch = useDispatch();

  /**
   * Handle email change.
   *
   * @param event
   */
  const handleEmailChange = (event) => {
    event.preventDefault();

    setEmail(event.target.value);
  };

  /**
   * Handle email submit.
   *
   * @param event
   */
  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    // validate email
    /*if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError(true);

      return;
    }*/

    try {
      const response = await client.get(
        `getMailPersonalSurvey/${surveyId}/${companyId}/${email}`
      );
      const { data } = response;

      setAnswerIdAPI(data.id);
      // if exists, set answers and skip demographic step
      if (data && data.demographics) {
        setDemographicUserData(data.demographics);

        setSteps((prevSteps) => {
          const newSteps = [...prevSteps];
          newSteps.splice(0, 1);

          return newSteps;
        });
      }
      setEmailSubmitted(true);
    } catch (error) {
      // Verificar si la excepción tiene una respuesta y un código de estado
      if (error.response && error.response.status === 409) {
        setSteps((prevSteps) => {
          const newSteps = [...prevSteps];
          newSteps.splice(0, 1);

          return newSteps;
        });
        setNotFound(false);
        setEmailSubmitted(true);
        setIsAlreadyResponse(true);
      } else if (error.response && error.response.status === 404) {
        setSteps((prevSteps) => {
          const newSteps = [...prevSteps];
          newSteps.splice(0, 1);

          return newSteps;
        });
        setExclusiviness(true);
      } else {
        console.error('Se produjo un error al hacer la solicitud', error);
      }
    }
  };

  /**
   * Returns true if the step is optional.
   *
   * @param step
   * @returns {boolean}
   */
  const isStepOptional = (step) => {
    return false;
  };

  /**
   * Returns true if the step is skipped.
   *
   * @param step
   * @returns {boolean}
   */
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  //DemographicForm

  /**
   * Returns true if is the demographic step.
   *
   * @returns {boolean}
   */
  const isDemographicStep = () => {
    return activeStep === 0 && steps.length === 3;
  };

  /**
   * Returns true if is the survey step.
   *
   * @returns {boolean}
   */
  const isSurveyStep = () => {
    return (
      (steps.length === 3 && activeStep === 1) ||
      (steps.length === 2 && activeStep === 0)
    );
  };

  /**
   * Returns true if the step is the last one.
   *
   * @returns {boolean}
   */
  const isFinalStep = () => {
    return activeStep === steps.length - 1;
  };

  /**
   * Handle next step.
   */
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    // store answers
    if (steps.length - activeStep === 2) {
      // demographic step
      const payload = {
        surveyId: Number.parseInt(surveyId),
        answerId: isPersonal ? answerId || answerIdAPI : null,
        demographics: answers.length > 1 ? answers[0] : [],
        answers: answers.length > 1 ? answers[1] : answers[0],
      };

      if (demographicUserData !== null) {
        if (
          typeof demographicUserData === 'object' &&
          !Array.isArray(demographicUserData)
        ) {
          payload.demographics = [demographicUserData];
        } else if (Array.isArray(demographicUserData)) {
          payload.demographics = demographicUserData;
        }
        payload.answers = answers[0];
      }
      dispatch(storeSurvey(payload));
      localStorage.setItem('formValues', JSON.stringify([]));
    }

    if (activeStep + 1 === steps.length) {
      // close window
      window.close();

      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  /**
   * Handle back step.
   */
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**
   * Handle skip step.
   */
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error('You can\'t skip a step that isn\'t optional.');
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  /**
   * Handle change on answers.
   *
   * @param answers
   * @param step
   */
  const handleAnswered = (answers, step) => {
    // store answers
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];

      newAnswers[step] = answers;

      return newAnswers;
    });

    setStepsCompleted((prevStepsCompleted) => {
      const newStepsCompleted = [...prevStepsCompleted];

      newStepsCompleted[step] = true;

      // find empty answers and set them to false
      answers.forEach(({ value, values }) => {
        // if values is an empty object and value is empty then return false
        if (Object.keys(values).length === 0 && !value) {
          newStepsCompleted[step] = false;

          return false;
        }
      });

      return newStepsCompleted;
    });
  };

  /**
   * Check if is personal survey.
   *
   * @returns {Promise<any>}
   */
  const checkIfIsPersonal = async () => {
    setLoading(true);

    const { data: isPersonal } = await client.get(
      `ValidateAnswerSurvey/${surveyId}/${companyId}`
    );
    if (!isPersonal) {
      setEmailSubmitted(true);
    }
    setIsPersonal(isPersonal);
    setLoading(false);
  };

  // watch surveyId and companyId changes
  useEffect(() => {
    if (answerId) {
      dispatch(
        fetchSurveyForAnswerPersonal({ surveyId, companyId, answerId })
      ).then((result) => {
        if (result.error.message.includes('409')) {
          setIsAlreadyResponse(true);
          setNotFound(false);
        }
      });
    } else {
      dispatch(fetchSurveyForAnswer({ surveyId, companyId }));
    }
  }, [surveyId, companyId, answerId]); // eslint-disable-line react-hooks/exhaustive-deps

  // watch currentSurvey changes
  useEffect(() => {
    if (currentSurvey === null) {
      return;
    }

    // if demographic data is not required, remove the first step
    if (currentSurvey.demograficos.length === 0) {
      setSteps(steps.slice(1));
      setStepsCompleted(stepsCompleted.slice(1));
      setAnswers(answers.slice(1));
    }
  }, [currentSurvey]); // eslint-disable-line react-hooks/exhaustive-deps

  // component did mount
  useEffect(() => {
    checkIfIsPersonal();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={styles.AnswerSurvey} translate="no">
      <div className={styles.AnswerSurvey__Background}></div>
      <div className={styles.AnswerSurvey__Content}>
        <Card
          sx={{
            minWidth: 300,
            maxWidth: 800,
          }}
        >
          <CardContent>
            {surveyStatus === 'loading' && <MyLoader />}
            {surveyStatus === 'failed' && isAlreadyResponse && (
              <SuccessMessage isAlreadyResponse={isAlreadyResponse} />
            )}
            {surveyStatus === 'failed' && notFound && (
              <NotFoundMessage
                infoMessage={'Lo sentimos esta encuesta no esta disponible :('}
              />
            )}
            {exclusiviness && <NotExclusiviness />}
            {surveyStatus === 'succeeded' &&
              currentSurvey !== null &&
              !exclusiviness && (
                <Fragment>
                  {/* company name */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: {
                        xs: 'column-reverse', 
                        sm: 'row',             
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{
                        flex: '1 0 65%',
                        fontSize: '25px',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                      }}
                    >
                      {currentSurvey.response.surveyName}
                    </Typography>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{
                        textAlign: 'right',
                        flex: '1 0 35%', // Asegura que este elemento siempre toma el 50% del espacio
                      }}
                    >
                      {currentSurvey.logo !== null &&
                        currentSurvey.logo.length !== 0 && (
                          <img
                            src={currentSurvey.logo}
                            alt="Logotipo de la empresa"
                            style={{
                              width: '1.5em',
                              verticalAlign: 'middle',
                            }}
                          />
                        )}
                      {(currentSurvey.logo === null ||
                        currentSurvey.logo.length === 0) && (
                        <PollIcon
                          style={{
                            verticalAlign: 'middle',
                            marginRight: '0.8em',
                          }}
                        />
                      )}

                      <span style={{ verticalAlign: 'middle' }}>
                        {currentSurvey.empresa}
                      </span>
                    </Typography>
                    {/* survey name */}
                  </Box>
                  <Divider
                    variant="middle"
                    style={{
                      margin: '1.3em 0',
                    }}
                  />

                  {/* email */}
                  {emailSubmitted === false && !answerId && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '3em 0',
                        flexDirection: 'column',
                      }}
                    >
                      <FormControl
                        style={{
                          width: '300px',
                        }}
                      >
                        <FormLabel
                          id="email"
                          sx={{
                            textAlign: 'center',
                            marginBottom: '1.3em',
                            fontSize: '1.4em',
                            fontWeight: 'bold',
                          }}
                          error={emailError}
                        >
                          {currentSurvey.response.welcomeMessage}
                        </FormLabel>
                        <TextField
                          id="email"
                          label={currentSurvey.response.inputMessage}
                          variant="outlined"
                          type="email"
                          onChange={handleEmailChange}
                          error={emailError}
                        />
                      </FormControl>
                      <FormControl>
                        <Button
                          variant="contained"
                          onClick={handleEmailSubmit}
                          style={{
                            marginTop: '1em',
                            width: '300px',
                          }}
                        >
                          Enviar
                        </Button>
                      </FormControl>
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: 'italic',
                          fontWeight: 'bold', // Negrilla
                          color: '#6c6c6c', // Gris oscuro
                          marginTop: 2, // Margen superior (ajusta según sea necesario)
                        }}
                      >
                        {currentSurvey.response.message}
                      </Typography>
                    </Box>
                  )}

                  {/* stepper */}
                  {(emailSubmitted === true || answerId || !isPersonal) && (
                    <Fragment>
                      <Stepper
                        style={{ marginTop: '2em' }}
                        activeStep={activeStep}
                      >
                        {steps.map((label, index) => {
                          const stepProps = {};
                          const labelProps = {};
                          if (isStepOptional(index)) {
                            labelProps.optional = (
                              <Typography variant="caption">
                                Optional
                              </Typography>
                            );
                          }
                          if (isStepSkipped(index)) {
                            stepProps.completed = false;
                          }
                          return (
                            <Step key={label} {...stepProps}>
                              <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                          );
                        })}
                      </Stepper>
                      <React.Fragment>
                        <div style={{ padding: '1em' }}>
                          {/* first step */}
                          {isDemographicStep() && (
                            <Fragment>
                              <SurveyForm
                                questions={currentSurvey.demograficos.map(
                                  (
                                    {
                                      id,
                                      name,
                                      description,
                                      type,
                                      urlApi,
                                      options,
                                      urlParam,
                                    },
                                    index
                                  ) => ({
                                    questionId: id,
                                    questionName: name,
                                    description: description,
                                    questionNumber: index + 1,
                                    typeQuestion: type,
                                    api: urlApi,
                                    urlParam,
                                    options: options.map(({ id, value }) => ({
                                      numberOption: value,
                                      optionName: value,
                                    })),
                                  })
                                )}
                                companyId={companyId}
                                nameStep={steps}
                                activeStepper={activeStep}
                                handleNextAnswer={handleNext}
                                onAnswered={(answers) =>
                                  handleAnswered(answers, activeStep)
                                }
                              />
                            </Fragment>
                          )}

                          {/* survey form */}
                          {isSurveyStep() && (
                            <SurveyForm
                              questions={currentSurvey.response.preguntas}
                              descriptionSurvey={
                                currentSurvey.response.descriptionSurvey
                              }
                              handleNextAnswer={handleNext}
                              nameStep={steps}
                              onAnswered={(answers) =>
                                handleAnswered(answers, activeStep)
                              }
                              activeStepper={activeStep}
                            />
                          )}
                          {/* success message */}
                          {isFinalStep() && (
                            <SuccessMessage
                              isAlreadyResponse={isAlreadyResponse}
                            />
                          )}
                        </div>

                        <Box
                          sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
                        >
                          {/*activeStep !== 0 && activeStep +1 !== steps.length && (
                          <Button
                            color="inherit"
                            disabled={activeStep === 0 || activeStep + 1 === steps.length}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Atrás
                          </Button>
                        )*/}
                          <Box sx={{ flex: '1 1 auto' }} />
                          {isStepOptional(activeStep) && (
                            <Button
                              color="inherit"
                              onClick={handleSkip}
                              sx={{ mr: 1 }}
                            >
                              Saltar
                            </Button>
                          )}
                          <Button
                            onClick={handleNext}
                            disabled={
                              !stepsCompleted[activeStep] ||
                              surveyStatus === 'loading'
                            }
                          >
                            {activeStep === steps.length - 2 ? '' : ''}
                          </Button>
                        </Box>
                      </React.Fragment>
                    </Fragment>
                  )}
                </Fragment>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnswerSurvey;
