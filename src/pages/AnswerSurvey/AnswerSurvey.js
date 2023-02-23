import React, { Fragment, useEffect } from 'react';
import styles from './AnswerSurvey.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PollIcon from '@mui/icons-material/Poll';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSurveyForAnswer,
  selectCurrentSurveyForAnswer,
  selectSurveysStatus
} from '../../features/surveys/surveysSlice';
import MyLoader from '../../components/MyLoader/MyLoader';
import SurveyForm from './components/SurveyForm/SurveyForm';

const steps = [
  'Datos demográficos',
  'Encuesta',
  'Finalizar',
];

/**
 * Answer survey page.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const AnswerSurvey = () => {
  const { surveyId, companyId } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [age, setAge] = React.useState('');
  const surveyStatus = useSelector((state) => selectSurveysStatus(state));
  const currentSurvey = useSelector((state) => selectCurrentSurveyForAnswer(state));
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setAge(event.target.value);
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

  /**
   * Handle next step.
   */
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
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
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  /**
   * Handle reset.
   */
  const handleReset = () => {
    setActiveStep(0);
  };

  // watch surveyId and companyId changes
  useEffect(() => {
    dispatch(fetchSurveyForAnswer({ surveyId, companyId }));
  }, [surveyId, companyId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.AnswerSurvey}>
      <div className={styles.AnswerSurvey__Background}>
      </div>
      <div className={styles.AnswerSurvey__Content}>
        <Card
          sx={{
            minWidth: 300,
            maxWidth: 800,
          }}
        >
          <CardContent>
            {surveyStatus === 'loading' && (<MyLoader />)}
            {surveyStatus === 'succeeded' && currentSurvey !== null && (
              <Fragment>
                {/* company name */}
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  <PollIcon style={{
                    verticalAlign: 'middle',
                    marginRight: '0.8em',
                  }} />
                  <span style={{ verticalAlign: 'middle' }}>
                Nombre de la empresa
              </span>
                </Typography>

                <Divider
                  variant="middle"
                  style={{
                    margin: '1.3em 0',
                  }}
                />

                {/* survey name */}
                <Typography
                  variant="body1"
                  gutterBottom
                >
                  {currentSurvey.response.surveyName}
                </Typography>

                {/* stepper */}
                <Stepper
                  style={{ marginTop: '2em' }}
                  activeStep={activeStep}
                >
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
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
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleReset}>Reiniciar</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div style={{ padding: '1em' }}>
                      {/* first step */}
                      {activeStep === 0 && steps.length === 3 && (
                        <Fragment>
                          <form className={styles.AnswerSurvey__DemographicsForm}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <FormControl
                                  variant="standard"
                                  style={{ width: '100%' }}
                                >
                                  <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={age}
                                    onChange={handleChange}
                                    label="Age"
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl
                                  variant="standard"
                                  style={{ width: '100%' }}
                                >
                                  <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={age}
                                    onChange={handleChange}
                                    label="Age"
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </form>
                        </Fragment>
                      )}

                      {/* survey form */}
                      {((steps.length === 3 && activeStep === 1) ||
                      (steps.length === 2 && activeStep === 0)) && (
                        <SurveyForm
                          questions={currentSurvey.response.preguntas}
                        />
                      )}
                    </div>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Atrás
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                      {isStepOptional(activeStep) && (
                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                          Saltar
                        </Button>
                      )}

                      <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                      </Button>
                    </Box>
                  </React.Fragment>
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
