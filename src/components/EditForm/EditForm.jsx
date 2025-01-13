import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { RelationalQuestionsEdit } from "../Questions/RelationQuestion/RelationalQuestionEdit";
import styles from "./EditForm.module.css";
// Abandonamos encuestas traducidas
// Javascript <--> Typescript
// Whatsapp
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
  setQuestion,
  questions,
  handleInformation,
  errorMessage,
  helperText,
  handleAddOption,
  handleRemoveOption,
  handleInformationOptions,
  handleDeleteStars,
  handleAddStars,
  starMessage,
  questionNumber,
  categoryError,
  categories,
  handleChangeOptions,
  conditionalQuestion,
  setChildQuestionNumber,
  handleInformationRelationalOptions,
  optionRelationalError,
  customOptionError,
  ...props
}) => {
  console.log(question);
  console.log(questions);
  const [categoryId, setCategoryId] = useState("");
  const [optionFilteredSelect, setOptionFilteredSelect] = useState([
    {
      id: "cc12a501-cf65-4f2f-bd23-44c79e5c4a64",
      categoryId: 6,
      typeId: 1,
      questionId: null,
      questionOptions: [],
      questionNumber: 0,
      type: "Texto corto",
      name: "Fin de la encuesta",
      description: "321321",
      customOptions: undefined,
    },
  ]);
  /**
   * Handle category id change.
   *
   * @param {object} event
   */
  const handleCategoryIdChange = ({ target }) => {
    props.handleCategoryIdChange(target.value);
    setCategoryId(target.value);
  };

  const handleSelect = (uniqueId, { selectedValue, questionNumber, index }) => {
    props.setSelections((prev) => {
      const updatedSelections = [...prev];
      updatedSelections[uniqueId] = selectedValue; // Actualiza el índice correspondiente
      return updatedSelections;
    });
    getFilteredOptions(`${uniqueId}`, questionNumber);

    if (question.conditionalQuestion) {
      setQuestion((prev) => {
        const newChildQuestionIds = [...prev.childQuestionIds]; // Asume que ya tienes este array en tu estado

        // Asignar el ID de la pregunta hija en la posición correspondiente
        newChildQuestionIds[index] = questionNumber?.toString();

        return {
          ...prev,
          childQuestionIds: newChildQuestionIds, // Actualiza solo el array de IDs de preguntas hijas
        };
      });
    }
  };
  const getFilteredOptions = (uniqueId, questionNumber) => {
    const currentQuestionId = uniqueId;
    // Extracción de todas las ids de preguntas ya seleccionadas, excluyendo la id de la pregunta actual
    const selectedValues = Object.values(props.selections)
      .map((value) => value?.id)
      .filter((id) => id && id !== props.selections[uniqueId]?.id);

    const filteredOptions = questions.filter(
      (question) =>
        question.id !== currentQuestionId &&
        question.questionNumber >= questionNumber
    );
    console.log(filteredOptions)
    setOptionFilteredSelect((prev) => [
      ...prev,
      ...filteredOptions.filter(
        (option) => !prev.some((existing) => existing.id === option.id) // Evitar duplicados en prev
      ),
    ]);
  };

  useEffect(() => {
    getFilteredOptions(`${question.id}`, question.questionNumber);
  }, []);

  useEffect(() => {
    // Actualiza `props.setSelections` cada vez que `optionFilteredSelect` cambie
    props.setSelections(optionFilteredSelect);
  }, [optionFilteredSelect]); // Depende del cambio en `optionFilteredSelect`

  useEffect(() => {
    console.log(props.selections);
    console.log(optionFilteredSelect);
  }, [props.selections]);
  console.log(question.questionOptions)
  return (
    <Fragment>
      <div className={styles.form}>
        <div className={styles.top}>
          {/* question name */}
          <div className={styles.question}>
            <div className={styles.number}>{`Q${questionNumber}`}</div>
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
                    height: "80px",
                  },
                },
              }}
              label="Añadir descripción"
              name="description"
              onChange={handleInformation}
              placeholder="Añadir descripción aquí (opcional)..."
              style={{
                width: "100%",
                marginTop: "0.5rem",
              }}
              value={question.description}
            />
          </div>

          {/* likert scale */}
          {(question.typeId === 2 || question.typeId === 16) && (
            <div className={styles.options}>
              {question.options.map((val, key) => (
                <div className={styles.option} key={key}>
                  <div
                    style={{
                      backgroundColor: "#fce4e4",
                      borderRadius: "4px",
                      color: "#808080",
                      fontSize: "12px",
                      marginRight: "15px",
                      padding: "3px 9px",
                      textAlign: "center",
                    }}
                  >
                    {key + 1}
                  </div>
                  <TextField
                    id={`option-${key}`}
                    variant="standard"
                    placeholder="Añadir opción..."
                    value={question.options[key]}
                    onChange={(event) => handleChangeOptions(event, key, true)}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    size="small"
                  />
                </div>
              ))}
            </div>
          )}

          {/* multiple option */}
          {(question.typeId === 3 || question.typeId === 8) && (
            <div className={styles.options}>
              {question.customOptions.map((val, key) => (
                <>
                  <div className={styles.option} key={key}>
                    <div
                      style={{
                        backgroundColor: "#F0F2F5",
                        borderRadius: "4px",
                        color: "rgb(134, 140, 204)",
                        fontSize: "14px",
                        marginRight: "15px",
                        padding: "3px 9px",
                        textAlign: "center",
                      }}
                    >
                      {key + 1}
                    </div>
                    <TextField
                      fullWidth
                      id={"option-{key}"}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onChange={handleInformationOptions(key)}
                      placeholder="Añadir opción..."
                      size="small"
                      value={question.customOptions[key]}
                      variant="standard"
                      error={customOptionError[key]}
                      helperText={
                        customOptionError[key]
                          ? "La opción no puede estar vacía"
                          : ""
                      }
                    />
                  </div>
                  {question.typeId === 8 && question.conditionalQuestion && (
                    <Autocomplete
                      key={key}
                      disablePortal
                      id={`autocomplete-${question.id}-${key}`}
                      options={props.selections}
                      getOptionLabel={(option) =>
                        `${option.questionNumber}. ${option.name}`
                      }
                      value={
                        props.selections &&
                        props.selections.find((item) =>
                          question.questionOptions.some(
                            (option) =>
                              option.childrenQuestionNumber ==
                                item.questionNumber &&
                              option.numberOption == key + 1
                          )
                        )
                      }
                      onChange={(event, value) => {
                        // Crear un objeto que incluya el valor seleccionado y el número de la pregunta
                        const dataToSend = {
                          selectedValue: value,
                          questionNumber: value ? value.questionNumber : null,
                          index: key,
                        };
                        handleSelect(question.id, {
                          selectedValue: optionFilteredSelect.find(
                            (opt) => opt.id === event.target.value
                          ),
                          questionNumber: question.questionNumber,
                          index: questions.indexOf(question),
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="preguntas"
                          error={
                            errorMessage.autocomplete &&
                            !props.selections[`${question.id}`]
                          }
                          helperText={
                            errorMessage.autocomplete &&
                            !props.selections[`${question.id}`]
                              ? helperText.autocomplete
                              : ""
                          }
                        />
                      )}
                    />
                  )}
                </>
              ))}
              {question.customOptions.length < 10 && (
                <Button
                  onClick={handleAddOption}
                  startIcon={<AddCircleOutlineIcon />}
                  style={{
                    backgroundColor: "#F7F7F7",
                    width: "255px",
                  }}
                  variant="text"
                >
                  Añadir opción
                </Button>
              )}
              {question.customOptions.length >= 3 ? (
                <Button
                  variant="text"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() =>
                    handleRemoveOption(question.customOptions.length - 1)
                  }
                  style={{ backgroundColor: "#F7F7F7", width: "255px" }}
                >
                  Eliminar opción
                </Button>
              ) : null}
            </div>
          )}

          {/* ratings */}
          {question.typeId === 5 && (
            <Fragment>
              <div className={styles.stars}>
                <Button
                  onClick={handleDeleteStars}
                  style={{
                    backgroundColor: "#F7F7F7",
                    color: "black",
                    fontSize: "1.8rem",
                    padding: 0,
                  }}
                  variant="text"
                >
                  -
                </Button>
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "18px 20px",
                  }}
                >
                  {question.stars.length}
                </div>
                <Button
                  onClick={handleAddStars}
                  style={{
                    backgroundColor: "#F7F7F7",
                    color: "black",
                    fontSize: "1.8rem",
                    padding: 0,
                  }}
                  variant="text"
                >
                  +
                </Button>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    marginTop: "0.3em",
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

          {/* ratings */}
          {question.type === "Relacional" && (
            <Fragment>
              <RelationalQuestionsEdit
                question={question}
                handleInformationOptions={handleInformationOptions}
                handleInformationRelationalOptions={
                  handleInformationRelationalOptions
                }
                optionRelationalError={optionRelationalError}
                customOptionError={customOptionError}
              />
            </Fragment>
          )}
        </div>
      </div>
      <Box
        sx={{
          mt: 4,
        }}
      >
        <FormControl fullWidth error={categoryError.length > 0}>
          <InputLabel
            id="category-id-label"
            sx={{
              backgroundColor: "white",
              paddingRight: "0 6px",
            }}
          >
            Seleccionar categoría
          </InputLabel>
          <Select
            labelId="category-id-label"
            id="category-id"
            label="Categoría"
            value={categoryId || question.categoryId}
            onChange={handleCategoryIdChange}
          >
            <MenuItem value={question.categoryId}>
              <em>Seleccione</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.nameCatogory}
              </MenuItem>
            ))}
          </Select>
          {categoryError.length > 0 && (
            <FormHelperText>{categoryError}</FormHelperText>
          )}
        </FormControl>
      </Box>
    </Fragment>
  );
};

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
  handleChangeOptions: PropTypes.func,
};

EditForm.defaultProps = {
  question: {},
  questionNumber: 1,
  handleInformation: () => {},
};

export default EditForm;
