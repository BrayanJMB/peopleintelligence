import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { esES } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import defaultImage from "../../assets/default.png";
import { validateField, validateForm } from "../../utils/helpers";
import { DynamicInputsEdit } from "./DynamicInputsEdit/DynamicInputsEdit";
import styles from "../MyCreateDialog2/MyCreateDialog2.module.css";

// form field types
const FIELD_TYPES = {
  TEXT: "text",
};

/**
 * My edit dialog component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MyEditDialog = ({
  title,
  fields,
  open,
  onClose,
  onSubmit,
  type,
  file,
  setFile,
  logo,
  setLogo,
  setCurrentEdit,
}) => {
  console.log(fields);
  const [image, setImage] = useState("");
  const [showDeleteIcon, setShowDeleteIcon] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const [maxWidth, setMaxWidth] = useState("80%");
  const maxDate = dayjs().subtract(18, "years");
  const createInitialValues = () => {
    const initialValues = {};

    if (type === "employee") {
      fields.forEach((sectionObj) =>
        Object.keys(sectionObj).forEach((section) =>
          sectionObj[section].forEach((field) => {
            initialValues[field.name] = field.value;
          })
        )
      );
    } else {
      fields.forEach((field) => {
        initialValues[field.name] = field.value;
      });
    }

    return initialValues;
  };
  const [values, setValues] = useState(createInitialValues());
  /**
   * Handle input change.
   *
   * @param event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const validationResult = validateField(name, value);
    let updatedValues = {
      ...values,
      [name]: value,
      [`${name}Error`]: validationResult.error,
      [`${name}HelperText`]: validationResult.helperText,
    };

    if (name === "dateBirth") {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      updatedValues = {
        ...updatedValues,
        ageEmployee: age,
      };
    }
    setValues(updatedValues);
  };

  /**
   * Handle form submit.
   *
   * @param event
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Agregar los campos que no tengan valor al objeto `values`
    let updatedValues = { ...values };
    for (let field of fields) {
      const { name, isRequired } = field;
      if (!(name in values) && !isRequired) {
        updatedValues[name] = "";
      }
      if (field.type === "options") {
        let regex = new RegExp(`^${name}(\\d+)$`);
        let matchingValues = []; // Arreglo para recolectar los valores que coinciden
        // Recorrer updatedValues para verificar coincidencias con la regex
        for (let key in updatedValues) {
          if (regex.test(key)) {
            if (updatedValues[key] != null) {
              // Solo añadir si no es null o undefined
              matchingValues.push(updatedValues[key]);
            }
          }
        }

        // Usar join para unir todos los valores recolectados en una cadena separada por comas
        updatedValues[name] = matchingValues.join(",");
      }
    }

    // Actualizar el objeto `values` con la copia actualizada
    setValues(updatedValues);
    const validationErrors = validateForm(fields, values, type);
    if (Object.keys(validationErrors).length > 0) {
      setValues((values) => ({ ...values, ...validationErrors }));
    } else {
      onSubmit(updatedValues);
    }
  };

  const handleTabChange = (event, newValue) => {
    // Agregar los campos que no tengan valor al objeto `values`
    let updatedValues = { ...values };
    for (let field of fields) {
      const { name, isRequired } = field;
      if (!(name in values) && !isRequired) {
        updatedValues[name] = "";
      }
    }

    // Actualizar el objeto `values` con la copia actualizada
    setValues(updatedValues);
    const validationErrors = validateForm(fields, values, type);
    if (Object.keys(validationErrors).length > 0) {
      setValues((values) => ({ ...values, ...validationErrors }));
    } else {
      setCurrentTab(newValue);
    }
  };

  const handleContinueButtonClick = () => {
    // Agregar los campos que no tengan valor al objeto `values`
    let updatedValues = { ...values };
    for (let field of fields) {
      const { name, isRequired } = field;
      if (!(name in values) && !isRequired) {
        updatedValues[name] = "";
      }
    }

    // Actualizar el objeto `values` con la copia actualizada
    setValues(updatedValues);
    const validationErrors = validateForm(fields, values, type);
    if (Object.keys(validationErrors).length > 0) {
      setValues((values) => ({ ...values, ...validationErrors }));
    } else {
      setCurrentTab(currentTab + 1);
    }
  };

  const handlePreviousButtonClick = () => {
    setCurrentTab(currentTab - 1);
  };

  //Logic for image
  const fileInputRef = useRef();

  const hiddenFileInput = {
    display: "none",
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handlePhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size < 500000) {
        setFile(e.target.files[0]); // Guarda el objeto File en lugar de la URL
        setShowDeleteIcon(true);
      } else {
        alert("El tamaño de la imagen no puede ser mayor a 500kB");
      }
    }
  };

  const handleDeleteImage = () => {
    setFile(null);
    setLogo(null);
    setShowDeleteIcon(false);
  };

  useEffect(() => {
    if (file) {
      setImage(file);
    } else {
      setImage(defaultImage); // Ruta a la imagen por defecto
    }
  }, [file]);

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth={maxWidth}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ maxWidth: "80vw" }}>
          <Box
            sx={{
              marginTop: 1,
            }}
          >
            {type === "employee" && (
              <>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "between" }}>
                    <Tabs
                      sx={{ width: "90%", justifyContent: "center" }}
                      value={currentTab}
                      onChange={(event, newValue) =>
                        handleTabChange(event, newValue)
                      }
                    >
                      <Tab label="Datos Personales" id="settings-tab-0" />
                      <Tab label="Datos Empleado" id="settings-tab-1" />
                      <Tab label="Otros Datos" id="settings-tab-2" />
                    </Tabs>
                  </Box>
                </Box>
                <Grid container spacing={4}>
                  {fields.map((sectionObj, index) =>
                    Object.keys(sectionObj).map((section, tabIndex) => {
                      return tabIndex === currentTab
                        ? sectionObj[section].map((field) => {
                            if (field.type === "text") {
                              return (
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  key={`${field.name}-${index}`}
                                >
                                  <TextField
                                    disabled={field.isDisabled}
                                    fullWidth
                                    id={field.name}
                                    label={field.label}
                                    name={field.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    value={
                                      values[field.name] !== undefined
                                        ? values[field.name]
                                        : field.value
                                    }
                                    variant="outlined"
                                    required={field.isRequired}
                                    error={values[`${field.name}Error`]}
                                    helperText={
                                      values[`${field.name}HelperText`] || ""
                                    }
                                    sx={{
                                      marginBottom: 2,
                                    }}
                                  />
                                </Grid>
                              );
                            } else if (field.type === "date") {
                              return (
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  key={`${field.name}-${index}`}
                                >
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    localeText={
                                      esES.components.MuiLocalizationProvider
                                        .defaultProps.localeText
                                    }
                                  >
                                    <DatePicker
                                      maxDate={
                                        field.name === "dateBirth"
                                          ? maxDate
                                          : undefined
                                      }
                                      slotProps={{
                                        textField: {
                                          helperText:
                                            values[`${field.name}HelperText`] ||
                                            "",
                                          error: values[`${field.name}Error`],
                                        },
                                      }}
                                      sx={{
                                        marginBottom: 2,
                                        width: "100%",
                                      }}
                                      id={field.name}
                                      label={field.label}
                                      name={field.name}
                                      value={dayjs(
                                        values[field.name] || field.value
                                      )}
                                      onChange={(date) =>
                                        handleInputChange({
                                          target: {
                                            name: field.name,
                                            value: date,
                                          },
                                        })
                                      }
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          variant="outlined"
                                          required={field.isRequired}
                                          error={values[`${field.name}Error`]}
                                          helperText={
                                            values[`${field.name}HelperText`] ||
                                            ""
                                          }
                                          sx={{
                                            marginBottom: 2,
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                              );
                            } else if (field.type === "select") {
                              return (
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  key={`${field.name}-${index}`}
                                >
                                  <Autocomplete
                                    fullWidth
                                    id={field.name}
                                    options={field.options}
                                    /*
                                    getOptionSelected={(option, value) =>
                                      option.value === value
                                    }*/
                                    value={
                                      field.options.find(
                                        (option) =>
                                          option.value === values[field.name]
                                      ) || field.value
                                    }
                                    onChange={(event, newValue) => {
                                      handleInputChange({
                                        target: {
                                          name: field.name,
                                          value: newValue ? newValue.value : "",
                                        },
                                      });
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={field.label}
                                        required={field.isRequired}
                                        error={values[`${field.name}Error`]}
                                        helperText={
                                          values[`${field.name}HelperText`] ||
                                          ""
                                        }
                                      />
                                    )}
                                  />
                                </Grid>
                              );
                            } else {
                              return null;
                            }
                          })
                        : null;
                    })
                  )}
                </Grid>
                <DialogActions>
                  <Button onClick={onClose} type="button">
                    Cancelar
                  </Button>
                  {currentTab === 2 ? (
                    <>
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={handleFormSubmit}
                      >
                        Actualizar
                      </Button>
                      {currentTab !== 0 && (
                        <Button
                          variant="contained"
                          type="button"
                          onClick={handlePreviousButtonClick}
                        >
                          Regresar
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      {currentTab !== 0 && (
                        <Button
                          variant="contained"
                          type="button"
                          onClick={handlePreviousButtonClick}
                        >
                          Regresar
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        type="button"
                        onClick={handleContinueButtonClick}
                      >
                        Continuar
                      </Button>
                    </>
                  )}
                </DialogActions>
              </>
            )}

            {type === "company" && (
              <div className={styles.containerImage}>
                <img
                  src={file ? URL.createObjectURL(file) : logo || image} // Muestra la URL del objeto File
                  alt="profile"
                  className={styles.photo}
                  onClick={handleClick}
                />

                <input
                  ref={fileInputRef}
                  style={hiddenFileInput}
                  type="file"
                  onChange={handlePhoto}
                  accept="image/*"
                  name="profile_image"
                />
                {((showDeleteIcon && logo) || file) && (
                  <Button variant="text" onClick={handleDeleteImage}>
                    Eliminar logotipo
                  </Button>
                )}
              </div>
            )}
            <Grid container spacing={2}>
              {/* form fields */}
              {fields.map((field) => {
                if (field.type === "text") {
                  return (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <TextField
                        fullWidth
                        id={field.name}
                        label={field.label}
                        name={field.name}
                        onChange={handleInputChange}
                        type="text"
                        value={values[field.name] || ""}
                        variant="outlined"
                        required={field.isRequired}
                        error={values[`${field.name}Error`]}
                        helperText={values[`${field.name}HelperText`] || ""}
                        sx={{
                          marginBottom: 2,
                        }}
                      />
                    </Grid>
                  );
                } else if (field.type === "select") {
                  return (
                    <Grid item xs={12} sm={6} key={`${field.name}`}>
                      <Autocomplete
                        fullWidth
                        id={field.name}
                        options={field.options}
                        /*
                        getOptionSelected={(option, value) =>
                          option.value === value
                        }*/
                        value={
                          field.options.find(
                            (option) => option.value === values[field.name]
                          ) || field.value
                        }
                        onChange={(event, newValue) => {
                          handleInputChange({
                            target: {
                              name: field.name,
                              value: newValue ? newValue.value : "",
                            },
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={field.label}
                            required={field.isRequired}
                            error={values[`${field.name}Error`]}
                            helperText={values[`${field.name}HelperText`] || ""}
                          />
                        )}
                      />
                    </Grid>
                  );
                } else if (field.type === "options") {
                  return (
                    <Grid item xs={12} sm={12} key={`${field.name}`}>
                      <DynamicInputsEdit
                        setValues={setValues}
                        values={values}
                        field={fields.find(
                          (fields) => fields.name === field.name
                        )}
                        handleInputChange={handleInputChange}
                        setCurrentEdit={setCurrentEdit}
                      />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Box>
        </DialogContent>
        {type !== "employee" && (
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleFormSubmit}>
              Actualizar
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

MyEditDialog.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

MyEditDialog.defaultProps = {};

export default MyEditDialog;
