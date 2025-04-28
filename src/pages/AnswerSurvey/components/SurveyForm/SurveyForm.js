import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
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
import Slider from '@mui/material/Slider';
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
import { storeSurvey } from '../../../../features/surveys/surveysSlice';
import { RelationalQuestion } from '../Questions/RelationalQuestion/RelationalQuestion';

import styles from './SurveyForm.module.css';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const SurveyForm = ({
  questions,
  onAnswered,
  companyId,
  nameStep,
  activeStepper,
  surveyId,
  handleNextAnswer,
  descriptionSurvey,
}) => {
  const [visibleQuestions, setVisibleQuestions] = useState(
    questions.map(() => true)
  );
  const [formValues, setFormValues] = useState(() => {
    return questions.map((question) => ({
      id: question.questionId,
      questionType: question.typeQuestion,
      value: '',
      values: {},
      selectionValues: {},
    }));
  });
  const [apiOptions, setApiOptions] = useState({});
  const [isZeroIndexActive, setIsZeroIndexActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [error, setError] = useState(formValues.map(() => false));
  const [values, setValues] = useState({});
  const isMobile = useIsMobile();
  const [verMas, setVerMas] = useState(false);
  const textoSinBr = descriptionSurvey
    ? descriptionSurvey.replace(/<br\/>/g, '\n')
    : '';
  const textoAMostrar =
    !isMobile || verMas || !descriptionSurvey
      ? textoSinBr
      : `${textoSinBr.substring(0, 30)}...`;

  const [questionRefs, setQuestionRefs] = useState({});

  const handleNext = () => {
    if (verifyCurrentStepAnswersSelected()) {
      if (activeStep + 1 !== totalOfSteps()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        return;
      }
      handleNextAnswer();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeSlider = (event, newValue, index) => {
    if (newValue === null) return; // <- Seguridad, si deselecciona todo
  
    setFormValues((prevFormValues) => {
      const newFormValues = [...prevFormValues];
      newFormValues[index].value = newValue.toString();
      return newFormValues;
    });
  
    setUnansweredQuestions((prevUnanswered) =>
      prevUnanswered.filter((unansweredIndex) => unansweredIndex !== index)
    );
  
    setValues((prevValues) => ({
      ...prevValues,
      [index]: newValue, // 👈 Aquí debes usar newValue, no event.target.value
    }));
  };

  const marks = [];

  for (let i = 0; i <= 10; i++) {
    marks.push({
      value: i,
      label: `${i}`,
    });
  }

  function calculateValue(value) {
    return value; // Ahora no necesitamos el cálculo de la potencia, solo devuelve el valor tal cual
  }

  const sliderColor = (index) => {
    if (
      values[index] === undefined ||
      (values[index] >= 0 && values[index] <= 6)
    ) {
      return 'red';
    } else if (values[index] >= 7 && values[index] <= 8) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  /**
   * Returns true if the type of question is radio.
   *
   * @param {string} typeQuestion
   * @returns {boolean}
   */

  const isRadioFace = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'sentimental':
        return true;
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
      case 'escala likert -eng':
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

  const isInformativeText = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'texto infomativo':
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
   * Returns true if the type of question is select .
   *
   * @param typeQuestion
   * @returns {boolean}
   */
  const isRelational = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'relacional':
        return true;
      default:
        return false;
    }
  };

  /**
   * Returns true if the type of question is stepper.
   *
   * @param typeQuestion
   * @returns {boolean}
   */
  const isSlider = (typeQuestion) => {
    switch (typeQuestion) {
      case 'E-NPS':
        return true;
      default:
        return false;
    }
  };

  const isENPSPromoter = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'escala de opinión':
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
  const isBipolarSlider = (typeQuestion) => {
    switch (typeQuestion.toLowerCase()) {
      case 'evaluación':
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

  const handleRadioChange = (
    event,
    index,
    conditional,
    childrenQuestionNumber
  ) => {
    const newFormValues = [...formValues];
    newFormValues[index].value = event.target.value;
    setFormValues(newFormValues);

    setUnansweredQuestions((prevUnanswered) =>
      prevUnanswered.filter((unansweredIndex) => unansweredIndex !== index)
    );

    if (conditional) {
      updateVisibility(index, childrenQuestionNumber);
    }
  };

  const updateVisibility = (index, childrenQuestionNumber) => {
    let newVisibleQuestions = [...visibleQuestions];

    // Mostrar preguntas desde el índice de childrenQuestionNumber
    let questionNumber =
      parseInt(childrenQuestionNumber) === 0
        ? questions.length + 1
        : childrenQuestionNumber;
    if (parseInt(childrenQuestionNumber) === 0) {
      // Verifica si i es igual a 0 y actualiza el estado
      setIsZeroIndexActive(true);
    } else {
      setIsZeroIndexActive(false);
    }
    for (let i = questionNumber - 1; i < questions.length; i++) {
      if (questions[i].questionNumber >= parseInt(questionNumber)) {
        newVisibleQuestions[i] = true;
        // Si la pregunta es condicional, ocultar las preguntas hijas de esta
        if (questions[i].conditional) {
          for (let j = i + 1; j < questions.length; j++) {
            if (questions[j].conditional) {
              newVisibleQuestions[j] = false;
            }
          }
        }
      } else {
        newVisibleQuestions[i] = false;
      }
    }

    for (let k = index + 1; k < questionNumber - 1; k++) {
      newVisibleQuestions[k] = false;
    }

    setVisibleQuestions(newVisibleQuestions);
  };

  useEffect(() => {
    if (isZeroIndexActive) {
      if (verifyCurrentStepAnswersSelected()) {
        handleNextAnswer();
      }
    }
  }, [visibleQuestions]);

  const verifyCurrentStepAnswersSelected = () => {
    const currentStepAnswers = formValues.slice(
      activeStep * 5,
      (activeStep + 1) * 5
    );
    const unansweredIndexes = currentStepAnswers
      .map((formValue, i) => {
        if (
          !visibleQuestions[i + activeStep * 5] ||
          isInformativeText(currentStepAnswers[i + activeStep * 5].questionType)
        ) {
          return -1; // Ignora las preguntas no visibles y de texto informativo
        }

        let isUnanswered;
        if (formValue.questionType === 'Opción Múltiple') {
          isUnanswered =
            formValue.values === null ||
            Object.keys(formValue.values).length === 0 ||
            !Object.values(formValue.values).some((val) => val === true);
        } else if (formValue.questionType === 'Relacional') {
          // Verifica cada selección individual en preguntas relacionales
          isUnanswered =
            formValue.selectionValues === null ||
            Object.keys(formValue.selectionValues).length === 0 ||
            Object.values(formValue.selectionValues).some(
              (val) => val === '' || val === null
            );
        } else {
          // Para otros tipos de preguntas, verifica si value es nulo o vacío
          isUnanswered = formValue.value === null || formValue.value === '';
        }

        return isUnanswered ? i + activeStep * 5 : -1;
      })
      .filter((index) => index !== -1);
    setUnansweredQuestions(unansweredIndexes);

    if (unansweredIndexes.length > 0) {
      questionRefs[
        questions[unansweredIndexes[0]].questionId
      ].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return unansweredIndexes.length === 0;
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
      setUnansweredQuestions((prevUnanswered) =>
        prevUnanswered.filter((unansweredIndex) => unansweredIndex !== index)
      );

      return newFormValues;
    });
  };

  /**
   * Handles the change of the checkbox.
   *
   * @param event
   * @param index
   */
  const handleRelationalChange = (newValue, index) => {
    setFormValues((prevFormValues) => {
      const newFormValues = [...prevFormValues];
      newFormValues[index].selectionValues = {
        ...newFormValues[index].selectionValues,
        ...newValue,
      };
      setUnansweredQuestions((prevUnanswered) =>
        prevUnanswered.filter((unansweredIndex) => unansweredIndex !== index)
      );
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

      setUnansweredQuestions((prevUnanswered) =>
        prevUnanswered.filter((unansweredIndex) => unansweredIndex !== index)
      );

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
          [question.questionId]: data.map(({ id, value }) => ({
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

  // Función para parsear texto con **negrilla**
  const parseTextWithStyles = (text) => {
    if (!text) return null;

    const elements = [];
    const lines = text.split('\n'); // Dividir primero por saltos de línea

    lines.forEach((line, lineIndex) => {
      const parts = line.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/g); // Formato dentro de cada línea

      parts.forEach((part, partIndex) => {
        if (part.startsWith('***') && part.endsWith('***')) {
          const content = part.slice(3, -3);
          elements.push(
            <strong key={`${lineIndex}-${partIndex}`}>
              <em>{content}</em>
            </strong>
          );
        } else if (part.startsWith('**') && part.endsWith('**')) {
          const content = part.slice(2, -2);
          elements.push(
            <strong key={`${lineIndex}-${partIndex}`}>{content}</strong>
          );
        } else if (part.startsWith('*') && part.endsWith('*')) {
          const content = part.slice(1, -1);
          elements.push(<em key={`${lineIndex}-${partIndex}`}>{content}</em>);
        } else {
          elements.push(part);
        }
      });

      // Después de cada línea (excepto la última), agregar un salto de línea
      if (lineIndex < lines.length - 1) {
        elements.push(<br key={`br-${lineIndex}`} />);
      }
    });

    return elements;
  };

  useEffect(() => {
    // Establecer refs para cada pregunta en la primera renderización
    const newRefs = questions.reduce((acc, { questionId }) => {
      acc[questionId] = React.createRef();
      return acc;
    }, {});

    setQuestionRefs(newRefs);
  }, []);

  // component did mount
  useEffect(() => {
    const fetchApiOptions = async () => {
      for (const question of questions) {
        if (question.api && !question.api.match(/[{ }]/g)) {
          question.api = question.api.replace();
          const { data } = await axios.get(question.api);
          setApiOptions((prevState) => ({
            ...prevState,
            [question.questionId]: data.map(({ id, value }) => ({
              numberOption: id,
              optionName: value,
            })),
          }));
        } else if (
          question.api &&
          question.api.includes('{CompanyId}') &&
          (question.urlParam === null || question.urlParam === '')
        ) {
          let consumo = question.api.replace('{CompanyId}', companyId);
          const { data } = await axios.get(consumo);
          setApiOptions((prevState) => ({
            ...prevState,
            [question.questionId]: Array.isArray(data)
              ? data.map(({ id, value }) => ({
                  numberOption: id,
                  optionName: value,
                }))
              : [],
          }));
        }
      }
    };

    fetchApiOptions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // watch changes in form values
  useEffect(() => {
    if (nameStep && nameStep[activeStepper] === 'Datos demográficos') {
      localStorage.setItem('formValues', JSON.stringify(formValues));
    }
    onAnswered(formValues);
  }, [formValues]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Al iniciar, solo mostrar las preguntas no condicionales
    let isConditional = true;
    let isConditional2 = true;
    const visibility = questions.map((question, index) => {
      isConditional = isConditional2;
      if (question.conditional) {
        isConditional2 = !isConditional; // Niega el valor de isConditional
      }
      return isConditional;
    });

    setVisibleQuestions(visibility);
  }, [questions]);

  useEffect(() => {
    setFormValues((prevFormValues) =>
      prevFormValues.map((formValue, index) => ({
        ...formValue,
        selectionValues: questions[index].options.reduce((acc, option) => {
          acc[option.optionName] = '';
          return acc;
        }, {}),
      }))
    );
  }, []);

  let firstUncheckedIndex = -1;
  let firstUnansweredQuestionIndex = unansweredQuestions[0];
  // Estos bucles buscan el primer checkbox sin marcar
  for (let i = 0; i < formValues.length; i++) {
    const questionValues = formValues[i].values;
    const uncheckedOptions = Object.keys(questionValues).filter(
      (optionName) => !questionValues[optionName]
    );

    if (uncheckedOptions.length > 0) {
      firstUncheckedIndex = i;
      break;
    }
  }

  const isFirstVisibleQuestionInGroup = (
    index,
    activeStep,
    visibleQuestions
  ) => {
    const groupStart = activeStep * 5;
    // Recorremos desde el inicio del grupo hasta el índice actual (excluyéndolo)
    for (let i = groupStart; i < index; i++) {
      if (visibleQuestions[i]) {
        // Si encontramos una pregunta visible antes del índice actual,
        // entonces este no es el primero visible.
        return false;
      }
    }
    // Si la pregunta actual es visible, y no se encontró ninguna visible antes en el grupo,
    // es la primera visible.
    return visibleQuestions[index];
  };

  return (
    <div className={styles.SurveyForm}>
      {activeStep === 0 && (
        <>
          <Typography
            variant="h6"
            style={{
              whiteSpace: 'pre-line',
              textAlign: 'justify',
              fontSize: '15px',
              display: 'block',
              fontStyle: 'italic',
              marginBottom: '50px',
            }}
          >
            {textoAMostrar}
          </Typography>
          {isMobile && (
            <Button onClick={() => setVerMas(!verMas)}>
              {verMas ? 'Ver menos' : 'Ver más'}
            </Button>
          )}
        </>
      )}

      {questions.map(
        (
          {
            questionId,
            typeQuestion,
            questionName,
            options,
            score,
            urlParam,
            description,
            conditional,
            selectOptions,
            textBipolarBar,
          },
          index
        ) => (
          <FormControl
            key={questionId}
            style={{
              marginTop: isFirstVisibleQuestionInGroup(
                index,
                activeStep,
                visibleQuestions
              )
                ? '0'
                : '4em',
              marginBottom: '1.1em',
              width: '100%',
              display:
                index >= activeStep * 5 && index < (activeStep + 1) * 5
                  ? 'inherit'
                  : 'none',
            }}
            className={
              visibleQuestions[index] &&
              index >= activeStep * 5 &&
              index < (activeStep + 1) * 5
                ? ''
                : styles.hiddenQuestion
            }
          >
            {isRadio(typeQuestion) && (
              <Fragment>
                <FormLabel
                  id={`${questionId}-${typeQuestion}`}
                  style={{
                    fontSize: '1.1',
                    fontWeight: 'bold',
                    marginBottom: '0.8m',
                    color: unansweredQuestions.includes(index)
                      ? 'red'
                      : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {questionName}
                </FormLabel>
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
                <RadioGroup
                  name={`${questionId}-${typeQuestion}`}
                  onChange={(event) => {
                    const selectedOption = options.find(
                      (opt) => opt.optionName === event.target.value
                    );
                    handleRadioChange(
                      event,
                      index,
                      conditional,
                      selectedOption?.childrenQuestionNumber
                    );
                  }}
                  row
                  style={{
                    margin: '1.2em 0',
                    color: unansweredQuestions.includes(index)
                      ? 'red'
                      : 'inherit',
                  }}
                >
                  {options.map(({ numberOption, optionName }, indexOption) => (
                    <FormControlLabel
                      ref={indexOption === 0 ? questionRefs[questionId] : null}
                      key={numberOption}
                      value={optionName}
                      control={<Radio />}
                      label={<Box>{optionName}</Box>}
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
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
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
                      label={
                        <Box
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          {getLikertIcon(optionName) && (
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
                          )}
                        </Box>
                      }
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
                    color: unansweredQuestions.includes(index)
                      ? 'red'
                      : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {questionName}
                </FormLabel>
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
                <FormGroup>
                  {options.map(({ numberOption, optionName }, optionIndex) => {
                    const isChecked =
                      formValues[index].values[optionName] || false;
                    const selectedCount = Object.values(
                      formValues[index].values
                    ).filter((v) => v).length;

                    const limitActive =
                      score !== null && score !== undefined && score > 0;
                    const disableCheckbox =
                      limitActive && !isChecked && selectedCount >= score;

                    return (
                      <FormControlLabel
                        ref={
                          optionIndex === 0 ? questionRefs[questionId] : null
                        }
                        key={numberOption}
                        control={
                          <Checkbox
                            checked={isChecked}
                            name={optionName}
                            value={optionName}
                            onChange={(event) =>
                              handleCheckboxChange(event, index)
                            }
                            disabled={disableCheckbox}
                            style={{
                              color: unansweredQuestions.includes(index)
                                ? 'red'
                                : '#03aae4',
                            }}
                          />
                        }
                        label={optionName}
                      />
                    );
                  })}
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
                    color: unansweredQuestions.includes(index)
                      ? 'red'
                      : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {questionName}
                </FormLabel>
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '1.1em 0',
                    overflow: 'auto',
                  }}
                >
                  {[...Array(score).keys()].map((value, scoreIndex) => (
                    <Box key={value}>
                      <div>
                        <IconButton
                          ref={
                            scoreIndex === 0 ? questionRefs[questionId] : null
                          }
                          color="primary"
                          component="label"
                          onClick={() => handleRangeChange(value + 1, index)}
                          style={{
                            color: unansweredQuestions.includes(index)
                              ? 'red'
                              : '#03aae4',
                          }}
                        >
                          {formValues[index].value >= value + 1 ? (
                            <StarIcon />
                          ) : (
                            <StarBorderIcon />
                          )}
                        </IconButton>
                      </div>
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
                    color: unansweredQuestions.includes(index)
                      ? 'red'
                      : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {questionName}
                </FormLabel>
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
                <TextField
                  inputRef={questionRefs[questionId]}
                  id={`${questionId}-${typeQuestion}`}
                  name={`${questionId}-${typeQuestion}`}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                    }
                  }}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  onChange={(event) => handleRadioChange(event, index)}
                  error={unansweredQuestions.includes(index)}
                />
                <Divider variant="middle" />
              </Fragment>
            )}
            {isInformativeText(typeQuestion) && (
              <Fragment>
                <div
                  style={{
                    backgroundColor: '#f5f5f5', // gris claro
                    padding: '1em',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '1.5em',
                  }}
                >
                  <FormLabel
                    style={{
                      fontSize: '1.1rem',
                      marginBottom: '0.5em',
                      display: 'block',
                    }}
                  >
                    {parseTextWithStyles(questionName)}
                  </FormLabel>
                  <Typography
                    variant="caption"
                    style={{
                      display: 'block',
                      color: 'rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {parseTextWithStyles(description)}
                  </Typography>
                </div>
              </Fragment>
            )}

            {isSlider(typeQuestion) && (
              <>
                <FormLabel
                  id={`${questionId}-${typeQuestion}`}
                  style={{
                    fontSize: '1.1',
                    fontWeight: 'bold',
                    marginBottom: '1.1m',
                    color: unansweredQuestions.includes(index)
                      ? 'red'
                      : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {questionName}
                </FormLabel>
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
                <Box width="100%" ref={questionRefs[questionId]}>
                  <Slider
                    ref={questionRefs[questionId]}
                    value={values[index] || 0}
                    min={0}
                    step={1}
                    max={10}
                    scale={calculateValue}
                    onChange={(event, newValue) =>
                      handleChangeSlider(event, newValue, index)
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="non-linear-slider"
                    marks={marks}
                    style={{ color: sliderColor(index) }}
                    sx={{
                      '& .MuiSlider-track': {
                        height: 10, // Cambia este valor para ajustar el tamaño del control deslizante
                      },
                      '& .MuiSlider-rail': {
                        height: 10, // Cambia este valor para ajustar el tamaño del control deslizante
                      },
                    }}
                  />
                </Box>
              </>
            )}

            {isENPSPromoter(typeQuestion) && (
              <>
                <FormLabel
                  id={`${questionId}-${typeQuestion}`}
                  style={{
                    fontSize: '1.1',
                    fontWeight: 'bold',
                    marginBottom: '1.1m',
                    color: unansweredQuestions.includes(index)
                      ? 'red'
                      : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {questionName}
                </FormLabel>
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt={2}
                >
                  {/* Botones */}
                  <ToggleButtonGroup
                    value={values[index] || 0}
                    exclusive
                    aria-label="Net Promoter Score"
                    onChange={(event, newValue) =>
                      handleChangeSlider(event, newValue, index)
                    }
                  >
                    {Array.from(
                      {
                        length:
                          Number(textBipolarBar.valueLeft) -
                          Number(textBipolarBar.valueRight) +
                          1,
                      },
                      (_, i) => Number(textBipolarBar.valueRight) + i
                    ).map((num) => (
                      <ToggleButton
                        key={num}
                        value={num}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          '&.Mui-selected': {
                            backgroundColor: '#1976d2',
                            color: 'white',
                          },
                        }}
                      >
                        {num}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>

                  {/* Textos debajo */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width={`calc(48px * ${
                      Number(textBipolarBar.valueLeft) -
                      Number(textBipolarBar.valueRight) +
                      1
                    })`} // 👈 ajustamos el ancho exacto de los botones
                    mt={1}
                  >
                    <Typography variant="caption">
                      {textBipolarBar.leftText}
                    </Typography>
                    <Typography variant="caption">
                      {textBipolarBar.rightText}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
            {isBipolarSlider(typeQuestion) && (
              <>
                <FormLabel
                  id={`${questionId}-${typeQuestion}`}
                  style={{
                    fontSize: '1.1',
                    fontWeight: 'bold',
                    marginBottom: '1.1m',
                    color: unansweredQuestions.includes(index)
                      ? 'red'
                      : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {questionName}
                </FormLabel>
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
                <Slider
                  min={-Math.abs(Number(score))}
                  max={Math.abs(Number(score))}
                  step={1}
                  value={values[index] || 0}
                  onChange={(event, newValue) =>
                    handleChangeSlider(event, newValue, index)
                  }
                  marks={[
                    {
                      value: -Math.abs(score),
                      label: textBipolarBar.leftText,
                    },
                    { value: 0, label: '' },
                    {
                      value: Math.abs(score),
                      label: textBipolarBar.rightText,
                    },
                  ]}
                  valueLabelDisplay="on"
                />
              </>
            )}
            {isSelect(typeQuestion) && (
              <FormControl
                fullWidth
                error={unansweredQuestions.includes(index)}
                ref={questionRefs[questionId]}
              >
                <InputLabel id={`${questionId}-${typeQuestion}`}>
                  {questionName}
                </InputLabel>
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
                <Select
                  labelId={`${questionId}-${typeQuestion}`}
                  id={`${questionId}-${typeQuestion}`}
                  value={formValues[index].value}
                  label={questionName}
                  onChange={(event) => {
                    handleRadioChange(event, index, urlParam);
                    fetchApiOptionsByParamId(
                      urlParam,
                      event.target.value,
                      getOptions(options, questionId)
                    );
                  }}
                  disabled={getOptions(options, questionId).length === 0}
                  error={error[index]}
                >
                  {getOptions(options, questionId).map(
                    ({ numberOption, optionName }) => (
                      <MenuItem key={numberOption} value={optionName}>
                        {optionName}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            )}
            {isRelational(typeQuestion) && (
              <Fragment>
                <FormLabel
                  style={{
                    fontSize: '1.1',
                    fontWeight: 'bold',
                    marginBottom: '1.1em',
                    color: unansweredQuestions.includes(index)
                      ? 'red'
                      : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {questionName}
                </FormLabel>
                <Typography
                  variant="caption"
                  style={{ display: 'block', fontStyle: 'italic' }}
                >
                  {description}
                </Typography>
                <Divider variant="middle" />
                <RelationalQuestion
                  options={options}
                  selectOptions={selectOptions}
                  handleRelationalChange={handleRelationalChange}
                  indexQuestion={index}
                  unansweredQuestions={unansweredQuestions}
                />
              </Fragment>
            )}
          </FormControl>
        )
      )}

      <MobileStepper
        variant="text"
        steps={totalOfSteps()}
        position="static"
        activeStep={activeStep}
        sx={{
          maxWidth: 400,
          flexGrow: 1,
          margin: '0 auto',
        }}
        nextButton={
          <Button size="small" onClick={handleNext}>
            {nameStep[activeStep] !== 'Encuesta' &&
            activeStep + 1 === totalOfSteps()
              ? 'Finalizar'
              : 'Siguiente'}
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
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          numberOption: PropTypes.number.isRequired,
          optionName: PropTypes.string.isRequired,
        })
      ),
      questionId: PropTypes.number.isRequired,
      questionName: PropTypes.string.isRequired,
      questionNumber: PropTypes.number.isRequired,
      typeQuestion: PropTypes.string.isRequired,
      api: PropTypes.string,
      urlParam: PropTypes.string,
    })
  ),
  onAnswered: PropTypes.func.isRequired,
};

SurveyForm.defaultProps = {
  questions: [],
};

export default SurveyForm;
