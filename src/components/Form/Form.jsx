import { Fragment, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

import FormChildren from './FormChildrens';

import styles from './Form.module.css';

export default function Form(props) {
  const [categoryId, setCategoryId] = useState('');
  const [open, setOpen] = useState(false);

  // Funciones para abrir y cerrar el modal

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleAgregar = () => {
    // Lógica para agregar la pregunta
    handleCloseModal();
  };
  /**
   * Handle category id change.
   *
   * @param {object} event
   */
  const handleCategoryIdChange = ({ target }) => {
    props.handleCategoryIdChange(target.value);
    setCategoryId(target.value);
  };

  const renderForm = (type) => {
    switch (type.id) {
      case 1:
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>{`Q${props.questions}`}</div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                  InputProps={{
                    inputComponent: TextareaAutosize,
                  }}
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: '80px',
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>{`Q${props.questions}`}</div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: '80px',
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
            <div className={styles.options}>
              {props.information.options.map((val, key) => {
                return (
                  <div className={styles.option} key={key}>
                    <div
                      style={{
                        padding: '3px 9px',
                        backgroundColor: '#fce4e4',
                        borderRadius: '4px',
                        textAlign: 'center',
                        marginRight: '15px',
                        fontSize: '12px',
                        color: '#808080',
                      }}
                    >
                      {key + 1}
                    </div>
                    <TextField
                      id={`option-${key}`}
                      variant="standard"
                      placeholder="Añadir opción..."
                      value={props.information.options[key]}
                      onChange={(event) =>
                        props.handleChangeOptions(event, key)
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
          </div>
        );
      case 3:
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>{`Q${props.questions}`}</div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: '80px',
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
            <div className={styles.options}>
              {props.information.customOptions.map((val, key) => {
                return (
                  <div className={styles.option} key={key}>
                    <div
                      style={{
                        padding: '3px 9px',
                        backgroundColor: '#F0F2F5',
                        borderRadius: '4px',
                        textAlign: 'center',
                        marginRight: '15px',
                        fontSize: '14px',
                        color: 'rgb(134, 140, 204)',
                      }}
                    >
                      {key + 1}
                    </div>
                    <TextField
                      id="outlined-name"
                      variant="standard"
                      placeholder="Añadir opción..."
                      value={props.information.customOptions[key]}
                      onChange={props.handleinformationoptions(key)}
                      error={props.customOptionError[key]}
                      helperText={
                        props.customOptionError[key]
                          ? 'La opción no puede estar vacía'
                          : ''
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
            {props.information.customOptions.length < 10 ? (
              <Button
                variant="text"
                startIcon={<AddCircleOutlineIcon />}
                onClick={props.handleaddoption}
                style={{ backgroundColor: '#F7F7F7', width: '255px' }}
              >
                Añadir opción
              </Button>
            ) : null}
            {props.information.customOptions.length >= 3 ? (
              <Button
                variant="text"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() =>
                  props.handleRemoveOption(
                    props.information.customOptions.length - 1
                  )
                }
                style={{ backgroundColor: '#F7F7F7', width: '255px' }}
              >
                Eliminar opción
              </Button>
            ) : null}
          </div>
        );
      case 8:
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>{`Q${props.questions}`}</div>
              <div className={styles.input}>
                <TextField
                  id="unique-option"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="unique-option=description"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: '80px',
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
            <div className={styles.options}>
              {props.information.customOptions.map((val, key) => {
                return (
                  <div className={styles.option} key={key}>
                    <div
                      style={{
                        padding: '3px 9px',
                        backgroundColor: '#F0F2F5',
                        borderRadius: '4px',
                        textAlign: 'center',
                        marginRight: '15px',
                        fontSize: '14px',
                        color: 'rgb(134, 140, 204)',
                      }}
                    >
                      {key + 1}
                    </div>
                    <TextField
                      id={`unique-option-${key}`}
                      variant="standard"
                      placeholder="Añadir opción..."
                      value={props.information.customOptions[key]}
                      onChange={props.handleinformationoptions(key)}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      fullWidth
                      size="small"
                    />
                  </div>
                );
              })}
              {props.information.customOptions.length < 10 ? (
                <Button
                  variant="text"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={props.handleaddoption}
                  style={{
                    backgroundColor: '#F7F7F7',
                    width: '255px',
                  }}
                >
                  Añadir opción
                </Button>
              ) : null}
            </div>
          </div>
        );
      case 5:
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>{`Q${props.questions}`}</div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: '80px',
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
            <div className={styles.stars}>
              <Button
                variant="text"
                onClick={props.handledeletestars}
                style={{
                  backgroundColor: '#F7F7F7',
                  color: 'black',
                  fontSize: '1.8rem',
                  padding: '0',
                }}
              >
                -
              </Button>
              <div
                style={{
                  border: '1px solid #ddd',
                  padding: '18px 20px',
                  borderRadius: '4px',
                }}
              >
                {props.information.stars.length}
              </div>
              <Button
                variant="text"
                onClick={props.handleaddstars}
                style={{
                  backgroundColor: '#F7F7F7',
                  color: 'black',
                  fontSize: '1.8rem',
                  padding: '0',
                }}
              >
                +
              </Button>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '0.3em',
                }}
              >
                {props.information.stars.map((val, index) => {
                  return (
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      key={index}
                    >
                      <path
                        d="M12.978 15.544L8.00001 11.8854L3.02201 15.544L4.93334 9.63536L-0.0419922 6.00003H6.10067L8.00001 0.0813599L9.89934 6.00003H16.0413L11.0667 9.63536L12.978 15.544Z"
                        fill="#ddd"
                      ></path>
                    </svg>
                  );
                })}
              </div>
            </div>
            <sub>{props.starmsg}</sub>
          </div>
        );
      case 10:
      case 13:
        return (
          <div>
            {!props.isConditionalQuestion && (
              <div className={styles.top}>
                <div className={styles.question}>
                  <div className={styles.number}>{`Q${props.questions}`}</div>
                  <div className={styles.input}>
                    <TextField
                      id="outlined-name"
                      variant="standard"
                      label="Añadir pregunta"
                      placeholder="Añadir pregunta aquí..."
                      value={props.information.name}
                      name="name"
                      onChange={props.handleInformation}
                      error={props.errorMessage.name}
                      helperText={props.helperText.name}
                      fullWidth
                      size="small"
                      InputProps={{
                        inputComponent: TextareaAutosize,
                      }}
                    />
                  </div>
                </div>
                <div className={styles.input}>
                  <TextField
                    id="outlined-description"
                    label="Añadir descripción"
                    placeholder="Añadir descripción aquí (opcional)..."
                    InputProps={{
                      inputComponent: TextareaAutosize,
                      inputProps: {
                        style: {
                          height: '80px',
                        },
                      },
                    }}
                    value={props.information.description}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                    }}
                    name="description"
                    onChange={props.handleInformation}
                  />
                </div>
                <div className={styles.options}>
                  {[...Array(2)].map((_, key) => (
                    <div
                      key={key}
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <div className={styles.option}>
                        <div
                          style={{
                            padding: '3px 9px',
                            backgroundColor: '#F0F2F5',
                            borderRadius: '4px',
                            textAlign: 'center',
                            marginRight: '15px',
                            fontSize: '14px',
                            color: 'rgb(134, 140, 204)',
                          }}
                        >
                          {key + 1}
                        </div>
                        <TextField
                          id={`outlined-option-${key}`}
                          variant="standard"
                          placeholder="Añadir opción..."
                          value={props.information.customOptions[key]}
                          onChange={props.handleinformationoptions(key)}
                          error={props.customOptionError[key]}
                          helperText={
                            props.customOptionError[key]
                              ? 'La opción no puede estar vacía'
                              : ''
                          }
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </div>
                      <div style={{ marginTop: '5px' }}>
                        <Button
                          variant="text"
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={handleClickOpen}
                          style={{ backgroundColor: '#F7F7F7', width: '255px' }}
                        >
                          Añadir pregunta
                        </Button>
                        {open && (
                          <FormChildren
                            {...props}
                            open={open}
                            handleCloseModal={handleCloseModal}
                            handleAgregar={handleAgregar}
                            // Pasa los demás props necesarios aquí
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 14:
        return (
          <div className={styles.top}>
            <div className={styles.question}>
              <div className={styles.number}>{`Q${props.questions}`}</div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  variant="standard"
                  label="Añadir prequnta"
                  placeholder="Añadir prequnta aquí..."
                  value={props.information.name}
                  name="name"
                  onChange={props.handleInformation}
                  error={props.errorMessage.name}
                  helperText={props.helperText.name}
                  fullWidth
                  size="small"
                  InputProps={{
                    inputComponent: TextareaAutosize,
                  }}
                />
              </div>
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Añadir descripción"
                placeholder="Añadir descripción aquí (opcional)..."
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: {
                      height: '80px',
                    },
                  },
                }}
                value={props.information.description}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                }}
                name="description"
                onChange={props.handleInformation}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <Fragment>
      <div className={styles.form}>
        {props.type === '' || props.type === null
          ? null
          : renderForm(props.type)}
      </div>
      {!props.isConditionalQuestion && (
        <Box
          sx={{
            mt: 2,
          }}
        >
          <FormControl fullWidth error={props.categoryError.length > 0}>
            <InputLabel
              id="category-id-label"
              sx={{
                backgroundColor: 'white',
                paddingRight: '0 6px',
              }}
            >
              Seleccionar categoría
            </InputLabel>
            <Select
              labelId="category-id-label"
              id="category-id"
              label="Categoría"
              value={categoryId}
              onChange={handleCategoryIdChange}
            >
              <MenuItem value={props.categoryId}>
                <em>Seleccione</em>
              </MenuItem>
              {props.categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.nameCatogory}
                </MenuItem>
              ))}
            </Select>
            {props.categoryError.length > 0 && (
              <FormHelperText>{props.categoryError}</FormHelperText>
            )}
          </FormControl>
        </Box>
      )}
    </Fragment>
  );
}
