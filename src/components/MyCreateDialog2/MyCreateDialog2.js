import React, { useEffect, useRef,useState } from 'react';
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

import defaultImage from '../../assets/default.png';
import { fetchUserGetRolsAPI } from '../../services/fetchUser.service';
import { validateField,validateForm } from '../../utils/helpers';

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
const MyCreateDialog = ({ title, fields, open, onClose, onSubmit, type , file, setFile, setUserRol}) => {
  const [image, setImage] = useState('');
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
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

  /**
   * Handle input change.
   *
   * @param event
   */
  const handleInputChange = async (event) => {
    
    const { name, value } = event.target;
    const validationResult = validateField(name, value);

    setValues((values) => ({
      ...values,
      [name]: value,
      [`${name}Error`]: validationResult.error,
      [`${name}HelperText`]: validationResult.helperText,
    }));

    if (name === 'userRolChange') {
      setUserRol([]);
      const { data } =  await fetchUserGetRolsAPI(event.target.value);
      setUserRol(data);
    }
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
        updatedValues[name] = '';
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
        updatedValues[name] = '';
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
        updatedValues[name] = '';
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
    display: 'none',
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
        alert('El tamaño de la imagen no puede ser mayor a 500kB');
      }
    }
  };

  const handleDeleteImage = () => {
    setFile(null);
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
                                      disableFuture
                                      label={field.label}
                                      value={values[field.name] || null}
                                      inputFormat="MM/dd/yyyy"
                                      onChange={(date) => handleInputChange({ target: { name: field.name, value: date } })}
                                      r
                                      renderInput={(params) => (
                                        <TextField
                                          name={field.name}
                                          id={field.name}
                                          variant="outlined"
                                          required={field.isRequired}
                                          {...params}

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
              {type === 'company' && (
              <div className={styles.containerImage}>
               <img
                src={file ? URL.createObjectURL(file) : image} // Muestra la URL del objeto File
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
                {showDeleteIcon && (
                  <Button 
                    variant="text"
                    onClick={handleDeleteImage}
                    >
                    Eliminar logotipo
                  </Button>
                )}
                </div>

              )}
              <Grid container spacing={2}>

                {/* form fields */}
                {fields.map((field) => {
                  const gridColumnSize = fields.length === 1 ? 12 : 6;
                  if (field.type === 'text') {
                    return (
                      <Grid item xs={12} sm={gridColumnSize} key={field.name} >
                        
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
                        sm={gridColumnSize}
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
                            fullWidth
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
