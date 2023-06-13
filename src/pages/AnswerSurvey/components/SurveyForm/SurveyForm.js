import React, { Fragment, useEffect, useState } from 'react';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MobileStepper from '@mui/material/MobileStepper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';

import Deacuerdo from '../../../../assets/icons/deacuerdo.svg';
import EnDesacuerdo from '../../../../assets/icons/en desacuerdo.svg';
import NiDeacuerdoNiEnDesacuerdo from '../../../../assets/icons/ni deacuerdo ni en desacuerdo.svg';
import TotalmenteDeAcuerdo from '../../../../assets/icons/totalmente de acuerdo.svg';
import TotalmenteEnDesacuerdo from '../../../../assets/icons/totalmente en desacuerdo.svg';

import styles from './SurveyForm.module.css';

const SurveyForm = ({ questions, onAnswered, companyId }) => {
  const [formValues, setFormValues] = useState(questions.map((question) => ({
    id: question.questionId,
    value: '',
    values: {},
  })));
  const [apiOptions, setApiOptions] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**
   * Returns true if the type of question is radio.
   *
   * @param {string} typeQuestion
   * @returns {boolean}
   */
  
  const isRadioFace = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      /*
      case 'escala likert':
        return true;
        */
      default:
        return false;
    }
  };

  /**
   * Returns true if the type of question is radio.
   *
   * @param typeQuestion
   * @returns {boolean}
   */
  const isRadio = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'selección':
      case 'escala likert':
        return true;
      default:
        return false;
    }
  };

  /**
   * Returns true if the type of question is checkbox.
   *
   * @param {string} typeQuestion
   * @returns {boolean}
   */
  const isCheckbox = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'opción múltiple':
        return true;
      case 'opcion multiple con imagenes':
        return true;
      default:
        return false;
    }
  };

  /**
   * Returns true if the type of question is range.
   *
   * @param {string} typeQuestion
   * @returns {boolean}
   */
  const isRange = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'calificaciones':
        return true;
      default:
        return false;
    }
  };

  /**
   * Returns true if the type of question is text.
   *
   * @param typeQuestion
   * @returns {boolean}
   */
  const isText = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'texto':
        return true;
      default:
        return false;
    }
  };

  /**
   * Returns true if the type of question is select .
   *
   * @param typeQuestion
   * @returns {boolean}
   */
  const isSelect = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'select':
        return true;
      default:
        return false;
    }
  };

  /**
   * Handles the change of the radio button.
   *
   * @param event
   * @param index
   */
  const handleRadioChange = (event, index) => {
    setFormValues((prevFormValues) => {
      const newFormValues = [...prevFormValues];

      newFormValues[index].value = event.target.value;

      return newFormValues;
    });
  };

  /**
   * Handles the change of the checkbox.
   *
   * @param event
   * @param index
   */
  const handleCheckboxChange = (event, index) => {
    setFormValues((prevFormValues) => {
      const newFormValues = [...prevFormValues];

      newFormValues[index].values[event.target.value] = event.target.checked;

      return newFormValues;
    });
  };

  /**
   * Handles the change of the range.
   *
   * @param value
   * @param index
   */
  const handleRangeChange = (value, index) => {
    setFormValues((prevFormValues) => {
      const newFormValues = [...prevFormValues];

      newFormValues[index].value = value.toString();

      return newFormValues;
    });
  };

  /**
   * Get likert icon.
   *
   * @param value
   * @returns {*|string}
   */
  const getLikertIcon = (value) => {
    switch (value.toLowerCase().replace(/\s\s+/g, ' ')) {
      case 'de acuerdo':
        return Deacuerdo;
      case 'en desacuerdo':
        return EnDesacuerdo;
      case 'ni de acuerdo ni en desacuerdo':
        return NiDeacuerdoNiEnDesacuerdo;
      case 'totalmente de acuerdo':
        return TotalmenteDeAcuerdo;
      case 'totalmente en desacuerdo':
        return TotalmenteEnDesacuerdo;
      default:
        return '';
    }
  };

  /**
   * Get normal options or options from api.
   *
   * @param options
   * @param questionId
   * @returns {*}
   */
  const getOptions = (options, questionId) => {
    if (apiOptions[questionId]) {
      return apiOptions[questionId];
    }

    return options;
  };

  /**
   * Fetch api options by param id.
   *
   * @param paramName
   * @param paramId
   * @param options
   * @returns {Promise<void>}
   */
  const fetchApiOptionsByParamId = async (paramName, paramId, options) => {
    for (const question of questions) {
      const regex = new RegExp(`{${paramName}}`, 'g');
      const option = options.find((option) => option.optionName === paramId);
      if (question.api && question.api.match(regex)) {
        const url = question.api.replace(regex, option.numberOption);
        const { data } = await axios.get(url);
        setApiOptions((prevState) => ({
          ...prevState,
          [question.questionId]: data.map(({id, value}) => ({
            numberOption: id,
            optionName: value,
          })),
        }));
      }
    }
  };

  /**
   * Total of steps.
   *
   * @returns {number}
   */
  const totalOfSteps = () => {
    // each step can have 5 questions
    const totalOfQuestions = questions.length;

    return Math.ceil(totalOfQuestions / 5);
  };

  // component did mount
  useEffect(() => {
    const fetchApiOptions = async () => {
      console.log(questions)
      for (const question of questions) {
        if (question.api && !question.api.match(/[{ }]/g)) {
          question.api = question.api.replace();
          const { data } = await axios.get(question.api);
          setApiOptions((prevState) => ({
            ...prevState,
            [question.questionId]: data.map(({id, value}) => ({
              numberOption: id,
              optionName: value,
            })),
          }));
        }else if (question.api && question.api.includes('{CompanyId}') && (question.urlParam === null || question.urlParam === '') ){
          console.log(question.api)
          let consumo = question.api.replace('{CompanyId}', companyId);
          const { data } = await axios.get(consumo);
          setApiOptions((prevState) => ({
            ...prevState,
            [question.questionId]: Array.isArray(data) ? data.map(({id, value}) => ({
              numberOption: id,
              optionName: value,
            })) : [],
          }));
        }
      }
    };

    fetchApiOptions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // watch changes in form values
  useEffect(() => {
    onAnswered(formValues);
  }, [formValues]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.SurveyForm}>
      <MobileStepper
        variant="text"
        steps={totalOfSteps()}
        position="static"
        activeStep={activeStep}
        sx={{
          maxWidth : 400,
          flexGrow: 1,
          margin: '0 auto',
        }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={(activeStep + 1) >= totalOfSteps()}>
            Siguiente
            {<KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {<KeyboardArrowLeft />}
            Atrás
          </Button>
        }
      />
      {questions.map(({ questionId, typeQuestion, questionName, options, score, urlParam }, index) => (
        <FormControl
          key={questionId}
          style={{
            marginBottom: '1.1em',
            width: '100%',
            display: (index + 1) >= ((activeStep + 1) * 5 - 5) && (index + 1) <= ((activeStep + 1) * 5) ? 'inherit' : 'none',
          }}
        >
          {isRadio(typeQuestion) && (
            <Fragment>
              <FormLabel
                id={`${questionId}-${typeQuestion}`}
                style={{
                  fontSize: '1.1',
                  fontWeight: 'bold',
                  marginBottom: '0.8m',
                }}
              >
                {questionName}
              </FormLabel>
              <RadioGroup
                name={`${questionId}-${typeQuestion}`}
                onChange={(event) => handleRadioChange(event, index)}
                row
                style={{
                  margin: '1.2em 0',
                }}
              >
                {options.map(({ numberOption, optionName }) => (
                  <FormControlLabel
                    key={numberOption}
                    value={optionName}
                    control={<Radio/>}
                    label={<Box
                    >
                      {optionName}
                    </Box>}
                    style={{
                      fontSize: '0.5em !important',
                      width: '100%',
                    }}
                  />
                ))}
              </RadioGroup>
              <Divider variant="middle" />
            </Fragment>
          )}
          {isRadioFace(typeQuestion) && (
            <Fragment>
              <FormLabel
                id={`${questionId}-${typeQuestion}`}
                style={{
                  fontSize: '1.1',
                  fontWeight: 'bold',
                  marginBottom: '0.8m',
                }}
              >
                {questionName}
              </FormLabel>
              <RadioGroup
                name={`${questionId}-${typeQuestion}`}
                onChange={(event) => handleRadioChange(event, index)}
                row
                style={{
                  justifyContent: 'center',
                  margin: '1.2em 0',
                }}
              >
                {options.map(({ numberOption, optionName }) => (
                  <FormControlLabel
                    key={numberOption}
                    value={optionName}
                    control={<Radio />}
                    labelPlacement="bottom"
                    label={<Box
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {getLikertIcon(optionName) &&
                        <Tooltip title={optionName}>
                          <img
                            src={getLikertIcon(optionName)}
                            alt={optionName}
                            style={{
                              width: '3em',
                              verticalAlign: 'middle',
                            }}
                          />
                        </Tooltip>
                      }
                    </Box>}
                    style={{
                      fontSize: '0.5em !important',
                    }}
                  />
                ))}
              </RadioGroup>
              <Divider variant="middle" />
            </Fragment>
          )}
          {isCheckbox(typeQuestion) && (
            <Fragment>
              <FormLabel
                style={{
                  fontSize: '1.1',
                  fontWeight: 'bold',
                  marginBottom: '1.1em',
                }}
              >
                {questionName}
              </FormLabel>
              <FormGroup>
                {options.map(({ numberOption, optionName }) => (
                  <FormControlLabel
                    key={numberOption}
                    control={
                      <Checkbox
                        checked={formValues[index].values[optionName] || false}
                        name={optionName}
                        value={optionName}
                        onChange={(event) => handleCheckboxChange(event, index)}
                      />
                    }
                    label={optionName}
                  />
                ))}
              </FormGroup>
              <Divider variant="middle" />
            </Fragment>
          )}
          {isRange(typeQuestion) && (
            <Fragment>
              <FormLabel
                style={{
                  fontSize: '1.1',
                  fontWeight: 'bold',
                  marginBottom: '0.8m',
                }}
              >
                {questionName}
              </FormLabel>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '1.1em 0',
                overflow: 'auto',
              }}>
                {[...Array(score).keys()].map((value) => (
                  <Box
                    key={value}
                  >
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => handleRangeChange(value + 1, index)}
                    >
                      {formValues[index].value >= (value + 1)  ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{ textAlign: 'center' }}
              >
                {Number(formValues[index].value)} / {score}
              </Typography>
              <Divider variant="middle" />
            </Fragment>
          )}
          {isText(typeQuestion) && (
            <Fragment>
              <FormLabel
                style={{
                  fontSize: '1.1',
                  fontWeight: 'bold',
                  marginBottom: '1.1em',
                }}
              >
                {questionName}
              </FormLabel>
              <TextField
                id={`${questionId}-${typeQuestion}`}
                name={`${questionId}-${typeQuestion}`}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                onChange={(event) => handleRadioChange(event, index)}
              />
              <Divider variant="middle" />
            </Fragment>
          )}
          {isSelect(typeQuestion) && (
            <FormControl fullWidth>
              <InputLabel
                id={`${questionId}-${typeQuestion}`}
              >
                {questionName}
              </InputLabel>
              <Select
                labelId={`${questionId}-${typeQuestion}`}
                id={`${questionId}-${typeQuestion}`}
                value={formValues[index].value}
                label={questionName}
                onChange={(event) => {
                  handleRadioChange(event, index, urlParam);
                  fetchApiOptionsByParamId(urlParam, event.target.value, getOptions(options, questionId));
                }}
                disabled={getOptions(options, questionId).length === 0}
              >
                {getOptions(options, questionId).map(({ numberOption, optionName }) => (
                  <MenuItem
                    key={numberOption}
                    value={optionName}
                  >
                    {optionName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </FormControl>)
      )}
      <MobileStepper
        variant="text"
        steps={totalOfSteps()}
        position="static"
        activeStep={activeStep}
        sx={{
          maxWidth : 400,
          flexGrow: 1,
          margin: '0 auto',
        }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={(activeStep + 1) >= totalOfSteps()}>
            Siguiente
            {<KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {<KeyboardArrowLeft />}
            Atrás
          </Button>
        }
      />
    </div>
  );
};

SurveyForm.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      numberOption: PropTypes.number.isRequired,
      optionName: PropTypes.string.isRequired,
    })),
    questionId: PropTypes.number.isRequired,
    questionName: PropTypes.string.isRequired,
    questionNumber: PropTypes.number.isRequired,
    typeQuestion: PropTypes.string.isRequired,
    api: PropTypes.string,
    urlParam: PropTypes.string,
  })),
  onAnswered: PropTypes.func.isRequired,
};

SurveyForm.defaultProps = {
  questions: [],
};

export default SurveyForm;
