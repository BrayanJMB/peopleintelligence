import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { esES } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PropTypes from 'prop-types';

import styles from './MyCreateDialog2.module.css';

// form field types
const FIELD_TYPES = {
  TEXT: 'text',
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

/**
 * My create dialog component.
 *
 * @param title
 * @param fields
 * @param open
 * @param onClose
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
const MyCreateDialog = ({ title, fields, open, onClose, onSubmit, type }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [maxWidth, setMaxWidth] = useState('80%');


  const createInitialValues = () => {
    const initialValues = {};
    if (type === 'employee'){
      fields.forEach((sectionObj) =>
        Object.keys(sectionObj).forEach((section) =>
          sectionObj[section].forEach((field) => {
            initialValues[field.name] = '';
          })
        )
      );
    }

    return initialValues;
  };
  const [values, setValues] = useState(createInitialValues());


  //Valida si el campo es requerido y esta vacío
  const validateForm = () => {
    const validationErrors = {};
    if (type === 'employee'){
      fields.forEach((sectionObj) =>
        Object.keys(sectionObj).forEach((section) =>
          sectionObj[section].forEach((field) => {
            const { name, isRequired } = field;
            const value = values[name] || '';
            const { error, helperText } = validateField(name, value);
            if (isRequired && (!value || (typeof value === 'string' && value.trim() === ''))) {
              validationErrors[`${name}Error`] = true;
              validationErrors[`${name}HelperText`] = 'Este campo es obligatorio';
            } else if (error) {
              validationErrors[`${name}Error`] = error;
              validationErrors[`${name}HelperText`] = helperText;
            }
          })
        )
      );
    }else{
      fields.forEach((field) =>{
          const { name, isRequired } = field;
          const value = values[name] || '';
          const { error, helperText } = validateField(name, value);
          if (isRequired && (!value || (typeof value === 'string' && value.trim() === ''))) {
            validationErrors[`${name}Error`] = true;
            validationErrors[`${name}HelperText`] = 'Este campo es obligatorio';
          } else if (error) {
            validationErrors[`${name}Error`] = error;
            validationErrors[`${name}HelperText`] = helperText;
          }
        });
    }

    return validationErrors;
  };


  const validateDocumentNumber = (documentNumber) => {
    const regex = /^[0-9]{6,17}?$/;
    return regex.test(documentNumber);
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateAge = (age) => {
    return age <= 100;
  };

  const validateField = (name, value) => {
    const validationResult = { error: false, helperText: '' };
    if (name === 'email') {
      validationResult.error = !validateEmail(value);
      validationResult.helperText = validationResult.error
        ? 'Ingrese un correo válido'
        : '';
    } else if (name === 'documentNumber') {
      validationResult.error = !validateDocumentNumber(value);
      validationResult.helperText = validationResult.error
        ? (isNaN(value) ? 'El tipo documento debe ser un número' : 'Por favor ingrese un número documento válido')
        : '';
    } else if (name === 'age') {
      validationResult.error = !validateAge(value);
      validationResult.helperText = validationResult.error
        ? (isNaN(value) ? 'La edad debe ser un número' : 'La edad debe ser un número entre 0 y 100')
        : '';
    }
    return validationResult;
  };
  /**
   * Handle input change.
   *
   * @param event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const validationResult = validateField(name, value);

    setValues((values) => ({
      ...values,
      [name]: value,
      [`${name}Error`]: validationResult.error,
      [`${name}HelperText`]: validationResult.helperText,
    }));

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
    debugger;
    for (let field of fields) {
      const { name, isRequired } = field;
      if (!(name in values) && !isRequired) {
        updatedValues[name] = '';
      }
    }

    // Actualizar el objeto `values` con la copia actualizada
    setValues(updatedValues);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors);
      setValues((values) => ({ ...values, ...validationErrors }));
    } else {
      onSubmit(updatedValues);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleContinueButtonClick = () => {

    setCurrentTab(currentTab + 1);

  };

  const handlePreviousButtonClick = () => {
    setCurrentTab(currentTab - 1);
  };



  return (
    <div>
      <Dialog open={open} onClose={onClose}
        maxWidth={maxWidth}>
        <DialogTitle>{title}</DialogTitle>
        <form onSubmit={handleFormSubmit} noValidate>
          <DialogContent sx={{ maxWidth: '80vw' }} >
            <Box
              sx={{
                marginTop: 1,
              }}
            >
              {type === 'employee' && (
                <>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'between' }}>
                      <Tabs
                        sx={{ width: '90%', justifyContent: 'center' }}
                        value={currentTab}
                        onChange={(event, newValue) =>
                          handleTabChange(event, newValue)
                        }
                      >
                        <Tab label="Datos Personales" id="settings-tab-0" />
                        <Tab label="Tipos de documentos" id="settings-tab-1" />
                        <Tab label="Otros Datos" id="settings-tab-2" />
                      </Tabs>
                    </Box>
                  </Box>
                  <Grid container spacing={4}>
                    {fields.map((sectionObj, index) =>
                      Object.keys(sectionObj).map((section, tabIndex) => {
                        return tabIndex === currentTab
                          ? sectionObj[section].map((field) => {
                            if (field.type === 'text') {
                              return (
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  key={`${field.name}-${index}`}
                                >
                                  <TextField
                                    fullWidth

                                    id={field.name}
                                    label={field.label}
                                    name={field.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    value={values[field.name] || ''}
                                    variant="outlined"
                                    required={field.isRequired}
                                    error={values[`${field.name}Error`]}
                                    helperText={values[`${field.name}HelperText`] || ''}
                                    sx={{
                                      marginBottom: 2,
                                    }}
                                  />
                                </Grid>
                              );
                            }
                            else if (field.type === 'date') {
                              return (
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  key={`${field.name}-${index}`}
                                >
                                  <LocalizationProvider dateAdapter={AdapterDayjs} localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker

                                    sx={{
                                      marginBottom: 2,
                                      width: '100%',
                                    }}

                                      id={field.name}
                                      label={field.label}
                                      name={field.name}
                                      value={values[field.name] || null}
                                      inputFormat="MM/dd/yyyy"
                                      onChange={(date) => handleInputChange({ target: { name: field.name, value: date } })}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          variant="outlined"
                                          required={field.isRequired}
                                          error={values[`${field.name}Error`]}
                                          helperText={values[`${field.name}HelperText`] || ''}
                                          sx={{
                                            marginBottom: 2,
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                              );
                            } else if (field.type === 'select') {
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
                                    getOptionLabel={(option) => option.label}
                                    value={
                                      field.options.find(
                                        (option) =>
                                          option.value === values[field.name]
                                      ) || null
                                    }
                                    onChange={(event, newValue) => {
                                      handleInputChange({
                                        target: {
                                          name: field.name,
                                          value: newValue
                                            ? newValue.value
                                            : '',
                                        },
                                      });
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={field.label}
                                        required={field.isRequired}
                                        error={values[`${field.name}Error`]}
                                        helperText={values[`${field.name}HelperText`] || ''}
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
                        <Button variant="contained" type="submit">
                          Guardar
                        </Button>
                        {currentTab !== 0 && (
                          <Button variant="contained" type="button" onClick={handlePreviousButtonClick}>
                            Regresar
                          </Button>
                        )}
                      </>

                    ) : (
                      <>
                        {currentTab !== 0 && (
                          <Button variant="contained" type="button" onClick={handlePreviousButtonClick}>
                            Regresar
                          </Button>
                        )}
                        <Button variant="contained" type="button" onClick={handleContinueButtonClick}>
                          Continuar
                        </Button>

                      </>
                    )}
                  </DialogActions>
                </>

              )}
              <Grid container spacing={2}>
                {/* form fields */}
                {fields.map((field) => {
                  if (field.type === 'text') {
                    return (
                      <Grid item xs={12} sm={6} key={field.name}>
                        <TextField
                          fullWidth
                          id={field.name}
                          label={field.label}
                          name={field.name}
                          onChange={handleInputChange}
                          type="text"
                          value={values[field.name] || ''}
                          variant="outlined"
                          required={field.isRequired}
                          error={values[`${field.name}Error`]}
                          helperText={values[`${field.name}HelperText`] || ''}
                          sx={{
                            marginBottom: 2,
                          }}
                        />
                      </Grid>
                    );
                  } else if (field.type === 'select') {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        key={`${field.name}`}
                      >
                        <Autocomplete
                          fullWidth
                          id={field.name}
                          options={field.options}
                          getOptionLabel={(option) => option.label}
                          value={
                            field.options.find(
                              (option) =>
                                option.value === values[field.name]
                            ) || null
                          }
                          onChange={(event, newValue) => {
                            handleInputChange({
                              target: {
                                name: field.name,
                                value: newValue
                                  ? newValue.value
                                  : '',
                              },
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={field.label}
                              required={field.isRequired}
                              error={values[`${field.name}Error`]}
                              helperText={values[`${field.name}HelperText`] || ''}
                            />
                          )}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </Box>
          </DialogContent>
          {type !== 'employee' && (
            <DialogActions>
              <Button onClick={onClose} type="button">
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Guardar
              </Button>
            </DialogActions>
          )}
        </form>
      </Dialog>
    </div>
  );
};

MyCreateDialog.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isRequired: PropTypes.bool.isRequired,
    })
  ).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

MyCreateDialog.defaultProps = {};

export default MyCreateDialog;
