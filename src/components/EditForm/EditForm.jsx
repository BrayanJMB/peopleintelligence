import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styles from './EditForm.module.css';

/**
 * Edit form component for create survey page.
 *
 * @param question
 * @param handleInformation
 * @param errorMessage
 * @param helperText
 * @param handleAddOption
 * @param handleInformationOptions
 * @param handleDeleteStars
 * @param handleAddStars
 * @param starMessage
 * @param questionNumber
 * @returns {JSX.Element}
 * @constructor
 */
const EditForm = ({
  question,
  handleInformation,
  errorMessage,
  helperText,
  handleAddOption,
  handleInformationOptions,
  handleDeleteStars,
  handleAddStars,
  starMessage,
  questionNumber,
}) => (
  <div className={styles.form}>
    <div className={styles.top}>

      {/* question name */}
      <div className={styles.question}>
        <div className={styles.number}>
          {`Q${questionNumber}`}
        </div>
        <div className={styles.input}>
          <TextField
            error={errorMessage.name}
            fullWidth
            helperText={helperText.name}
            id="name"
            label="Añadir prequnta"
            name="name"
            onChange={handleInformation}
            placeholder="Añadir prequnta aquí..."
            size="small"
            value={question.name}
            variant="standard"
          />
        </div>
      </div>

      {/* question description  */}
      <div className={styles.input}>
        <TextField
          id="description"
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: {
              style: {
                height: '80px',
              },
            },
          }}
          label="Añadir descripción"
          name="description"
          onChange={handleInformation}
          placeholder="Añadir descripción aquí (opcional)..."
          style={{
            width: '100%',
            marginTop: '0.5rem',
          }}
          value={question.description}
        />
      </div>

      {/* likert scale */}
      {question.type === 'Escala Likert' && (
        <div className={styles.options}>
          {question.options.map((val, key) => (
            <div
              className={styles.option}
              key={key}
            >
              <div
                style={{
                  backgroundColor: "#fce4e4",
                  borderRadius: '4px',
                  color: '#808080',
                  fontSize: '12px',
                  marginRight: '15px',
                  padding: '3px 9px',
                  textAlign: 'center',
                }}
              >
                {key + 1}
              </div>
              <p> {val}</p>
            </div>
          ))}
        </div>
      )}

      {/* multiple option */}
      {(question.type === 'Opción múltiple' || question.type === 'Opción única') && (
        <div className={styles.options}>
          {question.customOptions.map((val, key) => (
            <div
              className={styles.option}
              key={key}
            >
              <div
                style={{
                  backgroundColor: '#F0F2F5',
                  borderRadius: '4px',
                  color: 'rgb(134, 140, 204)',
                  fontSize: '14px',
                  marginRight: '15px',
                  padding: '3px 9px',
                  textAlign: 'center',
                }}
              >
                {key + 1}
              </div>
              <TextField
                fullWidth
                id={`option-{key}`}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={handleInformationOptions(key)}
                placeholder="Añadir opción..."
                size="small"
                value={question.customOptions[key]}
                variant="standard"
              />
            </div>
          ))}
          {question.customOptions.length < 10 && (
            <Button
              onClick={handleAddOption}
              startIcon={<AddCircleOutlineIcon />}
              style={{
                backgroundColor: '#F7F7F7',
                width: '255px',
              }}
              variant="text"
            >
              Añadir opción
            </Button>
          )}
        </div>
      )}

      {/* ratings */}
      {question.type === 'Calificaciones' && (
        <Fragment>
          <div className={styles.stars}>
            <Button
              onClick={handleDeleteStars}
              style={{
                backgroundColor: '#F7F7F7',
                color: 'black',
                fontSize: '1.8rem',
                padding: 0,
              }}
              variant="text"
            >
              -
            </Button>
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '18px 20px',
              }}
            >
              {question.stars.length}
            </div>
            <Button
              onClick={handleAddStars}
              style={{
                backgroundColor: '#F7F7F7',
                color: 'black',
                fontSize: '1.8rem',
                padding: 0,
              }}
              variant="text"
            >
              +
            </Button>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                marginTop: '0.3em',
              }}
            >
              {question.stars.map((val, index) => (
                <svg
                  fill="none"
                  height="50"
                  key={index}
                  viewBox="0 0 20 20"
                  width="50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.978 15.544L8.00001 11.8854L3.02201 15.544L4.93334 9.63536L-0.0419922 6.00003H6.10067L8.00001 0.0813599L9.89934 6.00003H16.0413L11.0667 9.63536L12.978 15.544Z"
                    fill="#ddd"
                  ></path>
                </svg>
              ))}
            </div>
          </div>
          <sub>{starMessage}</sub>
        </Fragment>
      )}
    </div>
  </div>
);

EditForm.propTypes = {
  question: PropTypes.object.isRequired,
  handleInformation: PropTypes.func.isRequired,
  errorMessage: PropTypes.object.isRequired,
  helperText: PropTypes.object.isRequired,
  handleAddOption: PropTypes.func.isRequired,
  handleInformationOptions: PropTypes.func.isRequired,
  handleDeleteStars: PropTypes.func.isRequired,
  handleAddStars: PropTypes.func.isRequired,
  starMessage: PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired,
}

EditForm.defaultProps = {
  question: {},
  questionNumber: 1,
}

export default EditForm;