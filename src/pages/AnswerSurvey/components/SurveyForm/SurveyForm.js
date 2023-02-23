import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from './SurveyForm.module.css';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

const SurveyForm = ({ questions }) => {
  const [formValues, setFormValues] = useState(questions.map((question) => ({
    id: question.questionId,
    value: '',
    values: {},
  })));

  /**
   * Returns true if the type of question is radio.
   *
   * @param typeQuestion
   * @returns {boolean}
   */
  const isRadio = (typeQuestion) => {
    switch (typeQuestion) {
      case 'Escala Likkert':
        return true;
      default:
        return false;
    }
  };

  /**
   * Returns true if the type of question is checkbox.
   *
   * @param typeQuestion
   * @returns {boolean}
   */
  const isCheckbox = (typeQuestion) => {
    switch (typeQuestion) {
      case 'Opcion Multiple':
        return true;
      case 'Opcion Multiple con Imagenes':
        return true;
      default:
        return false;
    }
  };

  /**
   * Returns true if the type of question is range.
   *
   * @param typeQuestion
   * @returns {boolean}
   */
  const isRange = (typeQuestion) => {
    switch (typeQuestion) {
      case 'Calificaciones':
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
  }

  /**
   * Handles the change of the range.
   *
   * @param value
   * @param index
   */
  const handleRangeChange = (value, index) => {
    setFormValues((prevFormValues) => {
      const newFormValues = [...prevFormValues];

      newFormValues[index].value = value;

      return newFormValues;
    });
  };

  return (
    <div className={styles.SurveyForm}>
      {questions.map(({ questionId, typeQuestion, questionName, options, score }, index) => (
        <FormControl
          key={questionId}
          style={{
            marginBottom: '1em',
            width: '100%',
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
              >
                {options.map(({ numberOption, optionName }) => (
                  <FormControlLabel
                    key={numberOption}
                    value={optionName}
                    control={<Radio />}
                    label={<Typography variant="body2" color="textSecondary">
                      {optionName}
                    </Typography>}
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
                  marginBottom: '0.8m',
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
                margin: '0.5em 0',
                overflow: 'auto',
              }}>
                {[...Array(score).keys()].map((value) => (
                  <Box>
                    <IconButton
                      key={value}
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
                {formValues[index].value} / {score}
              </Typography>
            </Fragment>
          )}
        </FormControl>)
      )}
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
  })),
};

SurveyForm.defaultProps = {
  questions: [],
};

export default SurveyForm;
