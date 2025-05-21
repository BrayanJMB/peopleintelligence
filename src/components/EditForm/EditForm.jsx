import React, { Fragment } from "react";
import { useEffect, useState } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel"
import { RelationalQuestionsEdit } from "../Questions/RelationQuestion/RelationalQuestionEdit";
import Switch from "@mui/material/Switch";
import styles from "./EditForm.module.css";

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
  console.log(question)
  const [categoryId, setCategoryId] = useState("");
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
    props.setSelections((prev) => ({
      ...prev,
      [uniqueId]: selectedValue, // Asumiendo que deseas almacenar solo el valor seleccionado
    }));
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
    const lastDashIndex = uniqueId.lastIndexOf("-");
    const currentQuestionId = uniqueId.substring(0, lastDashIndex);
    // Extracción de todas las ids de preguntas ya seleccionadas, excluyendo la id de la pregunta actual
    const selectedValues = Object.values(props.selections)
      .map((value) => value?.id)
      .filter((id) => id && id !== props.selections[uniqueId]?.id);

    const filteredQuestions = questions.filter(
      (question) =>
        question.id !== currentQuestionId &&
        !selectedValues.includes(question.id) &&
        question.questionNumber > questionNumber
      //&& !question.conditionalQuestion  // Solo incluye preguntas con un número mayor al actual
    );

    // Definir el objeto "pregunta final"
    const preguntaFinal = {
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
    };

    // Añadir el objeto "pregunta final" al array filtrado
    filteredQuestions.push(preguntaFinal);
    return filteredQuestions;
  };

  const isLastQuestion =
    questions.findIndex((q) => q.id === question.id) === questions.length - 1;

  useEffect(() => {
    const isLast =
      questions.findIndex((q) => q.id === question.id) === questions.length - 1;

    if (question.conditionalQuestion && isLast) {
      setQuestion((prev) => ({
        ...prev,
        conditionalQuestion: false,
      }));
    }
  }, [question.id, question.conditionalQuestion, questions]);

  useEffect(() => {
    if (question.limitType) {
      props.setLimitType(question.limitType); // sincroniza al cargar plantilla
    }
  }, [question.limitType]);

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
                InputProps={{
                  inputComponent: TextareaAutosize,
                  ...(question.typeId == 21
                    ? { style: { height: "80px" } }
                    : {}),
                }}
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
            {question.typeId == 21 && (
              <div
                style={{
                  backgroundColor: "#e8f0fe",
                  padding: "0.5em",
                  borderRadius: "6px",
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  color: "#333",
                }}
              >
                Para darle más estilo a tus textos puedes usar, los siguientes
                comandos:
                <ul style={{ margin: "0.3em 0 0 1em", padding: 0 }}>
                  <li>
                    <b>**negrita**</b> → <strong>negrita</strong>
                  </li>
                  <li>
                    <b>*cursiva*</b> → <em>cursiva</em>
                  </li>
                  <li>
                    <b>***negrita cursiva***</b> →{" "}
                    <strong>
                      <em>negrita cursiva</em>
                    </strong>
                  </li>
                </ul>
              </div>
            )}
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
            <>
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
                    {question.typeId === 8 &&
                      question.conditionalQuestion &&
                      !isLastQuestion && (
                        <Autocomplete
                          key={key}
                          disablePortal
                          id={`autocomplete-${question.id}-${key}`}
                          options={getFilteredOptions(
                            `${question.id}-${key}`,
                            question.questionNumber
                          )}
                          getOptionLabel={(option) =>
                            `${option.questionNumber}. ${option.name}`
                          }
                          value={
                            props.selections[`${question.id}-${key}`] || null
                          }
                          onChange={(event, value) => {
                            // Crear un objeto que incluya el valor seleccionado y el número de la pregunta
                            const dataToSend = {
                              selectedValue: value,
                              questionNumber: value
                                ? value.questionNumber
                                : null,
                              index: key,
                            };
                            handleSelect(`${question.id}-${key}`, dataToSend);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Preguntas"
                              error={
                                errorMessage.autocomplete &&
                                !props.selections[`${question.id}-${key}`]
                              }
                              helperText={
                                errorMessage.autocomplete &&
                                !props.selections[`${question.id}-${key}`]
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
              {question.typeId === 3 && (
                <div className={styles.input}>
                  <FormControl
                    fullWidth
                    size="small"
                    style={{ marginTop: "1rem" }}
                  >
                    <InputLabel id="limit-type-label">
                      Tipo de límite
                    </InputLabel>
                    <Select
                      labelId="limit-type-label"
                      value={props.limitType}
                      label="Tipo de límite"
                      onChange={(event) => {
                        const newValue = event.target.value;
                        props.setLimitType(newValue); // actualiza estado externo
                        setQuestion((prev) => ({
                          ...prev,
                          limitType: newValue, // actualiza en la pregunta
                          stars: newValue === "ilimitado" ? [] : prev.stars, // limpia si se cambia a ilimitado
                        }));
                      }}
                    >
                      <MenuItem value="ilimitado">Ilimitado</MenuItem>
                      <MenuItem value="fijo">Valor fijo</MenuItem>
                    </Select>
                  </FormControl>

                  {props.limitType === "fijo" && (
                    <TextField
                      label="Valor fijo"
                      placeholder="Por favor ingresa el valor máximo que los usuarios pueden seleccionar:"
                      value={question.stars}
                      onChange={handleInformation}
                      style={{ marginTop: "0.8rem" }}
                      fullWidth
                      size="small"
                      name="stars"
                      error={errorMessage.maximunValueOptions}
                      helperText={helperText.maximunValueOptions}
                    />
                  )}
                </div>
              )}
            </>
          )}

          {/* ratings */}
          {(question.type === "Calificaciones" || question.typeId === 5) && (
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
          {(question.type === "Relacional" || question.typeId == 15) && (
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

          {/* ratings */}
          {question.typeId === 19 && (
            <Fragment>
              <div className={styles.top}>
                {/* Input numérico para el valor */}
                <div
                  style={{
                    marginTop: "4px",
                  }}
                >
                  <TextField
                    label="Valor de respuesta"
                    type="number"
                    inputProps={{ min: 0, max: 10 }}
                    value={question.stars}
                    name="stars"
                    onChange={handleInformation}
                    variant="standard"
                    fullWidth
                    error={errorMessage.bipolar}
                    helperText={errorMessage.bipolar ? helperText.bipolar : ""}
                  />
                </div>
                {/* Textos para los extremos de la escala */}
                <div
                  style={{
                    marginTop: "4px",
                  }}
                >
                  <TextField
                    label="Texto extremo izquierdo"
                    placeholder="Ej: Totalmente en desacuerdo"
                    value={question.textsBipolarBar.leftText}
                    name="textsBipolarBar.leftText"
                    onChange={handleInformation}
                    size="small"
                    variant="standard"
                    error={errorMessage.bipolarText}
                    fullWidth
                    inputProps={{
                      maxLength: 120, // ✅ Limita la entrada a 120 caracteres
                    }}
                    helperText={
                      errorMessage.bipolarText
                        ? helperText.bipolarText
                        : `${question.textsBipolarBar.leftText.length}/120` // ✅ Muestra el contador
                    }
                  />
                </div>
                <div
                  style={{
                    marginTop: "4px",
                  }}
                >
                  <TextField
                    label="Texto extremo derecho"
                    placeholder="Ej: Totalmente de acuerdo"
                    value={question.textsBipolarBar.rightText}
                    name="textsBipolarBar.rightText"
                    onChange={handleInformation}
                    size="small"
                    variant="standard"
                    error={errorMessage.bipolarText}
                    fullWidth
                    inputProps={{
                      maxLength: 120, // ✅ Limita la entrada a 120 caracteres
                    }}
                    helperText={
                      errorMessage.bipolarText
                        ? helperText.bipolarText
                        : `${question.textsBipolarBar.rightText.length}/120` // ✅ Muestra el contador
                    }
                  />
                </div>
              </div>
            </Fragment>
          )}

          {/* Escala Opinion*/}
          {question.typeId === 22 && (
            <div className={styles.top}>
              {/* Textos para los extremos de la escala */}
              <div
                style={{
                  marginTop: "4px",
                }}
              >
                <TextField
                  label="Texto extremo izquierdo"
                  placeholder="Ej: Totalmente en desacuerdo"
                  value={question.textsBipolarBar.leftText}
                  name="textsBipolarBar.leftText"
                  onChange={handleInformation}
                  size="small"
                  variant="standard"
                  style={{ width: "45%" }}
                  error={errorMessage.bipolarText}
                  inputProps={{
                    maxLength: 25, // ✅ Limita la entrada a 120 caracteres
                  }}
                  helperText={
                    errorMessage.bipolarText
                      ? helperText.bipolarText
                      : `${question.textsBipolarBar.leftText.length}/25` // ✅ Muestra el contador
                  }
                />
              </div>
              <div
                style={{
                  marginTop: "4px",
                }}
              >
                <TextField
                  label="Texto extremo derecho"
                  placeholder="Ej: Totalmente de acuerdo"
                  value={question.textsBipolarBar.rightText}
                  name="textsBipolarBar.rightText"
                  onChange={handleInformation}
                  size="small"
                  variant="standard"
                  style={{ width: "45%" }}
                  error={errorMessage.bipolarText}
                  inputProps={{
                    maxLength: 25, // ✅ Limita la entrada a 120 caracteres
                  }}
                  helperText={
                    errorMessage.bipolarText
                      ? helperText.bipolarText
                      : `${question.textsBipolarBar.rightText.length}/25` // ✅ Muestra el contador
                  }
                />
              </div>
              <div className={styles.input} style={{ marginTop: "1rem" }}>
                <FormControl
                  fullWidth
                  size="small"
                  style={{ marginBottom: "1rem" }}
                >
                  <InputLabel id="first-select-label">
                    Seleccionar 0 o 1
                  </InputLabel>
                  <Select
                    labelId="first-select-label"
                    value={
                      [0, 1].includes(
                        Number(question.textsBipolarBar.valueLeft)
                      )
                        ? question.textsBipolarBar.valueLeft
                        : "0"
                    }
                    label="Seleccionar 0 o 1"
                    onChange={handleInformation}
                    name="textsBipolarBar.valueLeft"
                  >
                    <MenuItem value={"0"}>0</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel id="second-select-label">
                    Seleccionar un número
                  </InputLabel>
                  <Select
                    labelId="second-select-label"
                    value={
                      question.secondSelectOptions.includes(
                        question.textsBipolarBar.valueRight
                      )
                        ? question.textsBipolarBar.valueRight
                        : question.secondSelectOptions.length > 0
                        ? question.secondSelectOptions[0].toString()
                        : ""
                    }
                    label="Seleccionar un número"
                    onChange={handleInformation}
                    name="textsBipolarBar.valueRight"
                  >
                    {question.secondSelectOptions.map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          )}

          {question.typeId === 24 && (
            <>
              <div className={styles.top}>
                <FormControl component="fieldset" sx={{ mt: 2, mb: 4 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={question.autoValidate}
                        onChange={handleInformation}
                        name="autoValidate"
                      />
                    }
                    label="¿Deseas que el valor de la escala se valide automáticamente?"
                  />
                  <FormHelperText>
                    Si se activa, el sistema validará automaticamente que el
                    valor esté dentro del rango esperado.
                  </FormHelperText>
                </FormControl>

                <div
                  style={{
                    marginTop: "4px",
                  }}
                >
                  <TextField
                    label="Valor de la escala"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={question.stars}
                    name="barBipolarValue"
                    onChange={handleInformation}
                    variant="standard"
                    fullWidth
                    error={errorMessage.bipolar}
                    helperText={
                      errorMessage.bipolar ? helperText.bipolar : ""
                    }
                  />
                </div>
                {question.customOptions.map((val, key) => {
                  return (
                    <div
                      className={styles.option}
                      key={key}
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          padding: "3px 9px",
                          backgroundColor: "#F0F2F5",
                          borderRadius: "4px",
                          textAlign: "center",
                          marginRight: "15px",
                          fontSize: "14px",
                          color: "rgb(134, 140, 204)",
                        }}
                      >
                        {key + 1}
                      </div>
                      <TextField
                        id="outlined-name"
                        variant="standard"
                        placeholder="Añadir opción..."
                        value={question.customOptions[key]}
                        onChange={handleInformationOptions(key)}
                        error={customOptionError[key]}
                        helperText={
                          customOptionError[key]
                            ? "La opción no puede estar vacía"
                            : ""
                        }
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        size="small"
                      />
                    </div>
                  );
                })}
              </div>
              {question.customOptions.length < 10 ? (
                <Button
                  variant="text"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={handleAddOption}
                  style={{ backgroundColor: "#F7F7F7", width: "255px" }}
                >
                  Añadir opción
                </Button>
              ) : null}
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
            </>
          )}
        </div>
      </div>
      {(question.typeId && question.typeId) !== 21 && (
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
      )}
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
