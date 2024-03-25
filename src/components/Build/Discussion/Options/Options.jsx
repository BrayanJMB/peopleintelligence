import { useCallback, useContext, useState } from 'react';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { filesImageQuestionContext } from '../Discussion';

const tiempoPregunta = [1, 2, 3, 4, 5];
function Options({
  currentIndex,
  demographic,
  setDemographics,
  remove,
  isConversation,
  item,
  question,
  setQuestion,
  handleRemoveConversation,
  errors,
}) {
  const [time, setTime] = useState('00:00');
  const files = useContext(filesImageQuestionContext);
  const onDrop = useCallback((acceptedFiles) => {
    files.ImageQuestion(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const removeFile = (file) => () => {
    const newFiles = files.filesImageQuestion.filter(
      (f) => f.name !== file.name
    );
    files.setFiles(newFiles);
  };

  const previews = Object.values(files.filesImageQuestion).map((file) => (
    <div key={file.name}>
      <img src={file.preview} style={{ width: '100%' }} alt="Preview" />
      <IconButton onClick={() => removeFile(file)}>
        <DeleteOutlineIcon />
      </IconButton>
    </div>
  ));

  function limpiarTexto(texto) {
    let textoSinEspacios = texto.replace(/\s+/g, '');
    let textoSinTildes = textoSinEspacios
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return textoSinTildes;
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const isText = (item) => {
    switch (item.toLowerCase()) {
      case 'texto':
        return true;
      default:
        return false;
    }
  };
  const isOpinion = () => {
    return 'Opinión';
  };
  const isExperience = () => {
    return 'experiencia';
  };
  const isImage = () => {
    return 'imagen';
  };
  const isVideo = () => {
    return 'video';
  };
  const isSelecionSimple = (item) => {
    switch (limpiarTexto(item.toLowerCase())) {
      case 'seleccionsimple':
        return true;
      default:
        return false;
    }
  };

  const handleFileChange = (event) => {
    // Acceder al archivo seleccionado
    files.setFilesImageQuestion(event.target.files[0]);
    const newConversation = { ...question };
    setQuestion((prevState) => {
      const newConversations = [...prevState];
      const index = newConversations.findIndex((d) => d === question);
      newConversations[index] = newConversation;
      return newConversations;
    });
  };

  const handleDemographicNameChange = (e) => {
    if (!isConversation) {
      const newDemographic = { ...demographic, name: e.target.value };
      setDemographics((prevState) => {
        const newDemographics = [...prevState];
        const index = newDemographics.findIndex((d) => d === demographic);
        newDemographics[index] = newDemographic;
        return newDemographics;
      });
    } else {
      const newConversation = { ...question, name: e.target.value };
      setQuestion((prevState) => {
        const newConversations = [...prevState];
        const index = newConversations.findIndex((d) => d === question);
        newConversations[index] = newConversation;
        return newConversations;
      });
    }
  };

  const handleOptionChange = (id, value, experienceQuestion) => {
    if (!isConversation) {
      debugger;
      const updatedOpciones = demographic.demographicDetails.map((opcion) =>
        opcion.id === id ? { ...opcion, value } : opcion
      );
      const newDemographic = {
        ...demographic,
        demographicDetails: updatedOpciones,
      };
      setDemographics((prevState) => {
        const newDemographics = [...prevState];
        const index = newDemographics.findIndex((d) => d === demographic);
        newDemographics[index] = newDemographic;
        return newDemographics;
      });
    } else {
      const updatedOpciones = question.options.map((opcion) =>
        opcion.id === id ? { ...opcion, value, experienceQuestion } : opcion
      );
      const newConversation = { ...question, options: updatedOpciones };
      setQuestion((prevState) => {
        const newConversations = [...prevState];
        const index = newConversations.findIndex((d) => d === question);
        newConversations[index] = newConversation;
        return newConversations;
      });
    }
  };

  const handleAddOption = () => {
    if (!isConversation) {
      const newId = Date.now().toString();
      const newDemographic = {
        ...demographic,
        demographicDetails: [
          ...demographic.demographicDetails,
          { id: newId, value: '' },
        ],
      };
      setDemographics((prevState) => {
        const newDemographics = [...prevState];
        const index = newDemographics.findIndex((d) => d === demographic);
        newDemographics[index] = newDemographic;
        return newDemographics;
      });
    } else {
      const newId = Date.now().toString();
      const newOption = {
        id: newId,
        value: '',
        statisticvalue: question.options.length + 1,
      };

      if (item === 'experiencia') {
        newOption.experienceQuestion = '';
      }

      const newConversation = {
        ...question,
        options: [...question.options, newOption],
      };

      setQuestion((prevState) => {
        const newConversations = [...prevState];
        const index = newConversations.findIndex((d) => d === question);
        newConversations[index] = newConversation;
        return newConversations;
      });
    }
  };

  const handleDeleteOption = (id) => {
    if (!isConversation) {
      const newOpciones = demographic.demographicDetails.filter(
        (opcion) => opcion.id !== id
      );
      const newDemographic = {
        ...demographic,
        demographicDetails: newOpciones,
      };
      setDemographics((prevState) => {
        const newDemographics = [...prevState];
        const index = newDemographics.findIndex((d) => d === demographic);
        newDemographics[index] = newDemographic;
        return newDemographics;
      });
    } else {
      // Filtramos las opciones que no coincidan con el ID proporcionado
      const newOpciones = question.options
        .filter((opcion) => opcion.id !== id)
        .map((option, index) => ({
          // reajustamos el valor de statisticvalue aquí
          ...option,
          statisticvalue: index + 1,
        }));

      // Creamos la nueva conversación con las opciones actualizadas
      const newConversation = { ...question, options: newOpciones };

      // Actualizamos el estado de la conversación
      setQuestion((prevState) => {
        const newConversations = [...prevState];
        const index = newConversations.findIndex((d) => d === question);
        newConversations[index] = newConversation;
        return newConversations;
      });
    }
  };

  const handleChangeTimeLimit = (e) => {
    let valueInSeconds;

    if (tiempoPregunta.includes(e.target.value)) {
      valueInSeconds = e.target.value * 60; // Convertir minutos a segundos
    } else {
      valueInSeconds = e.target.value; // Ya está en segundos
    }

    const newConversation = {
      ...question,
      timeLimit: valueInSeconds,
    };

    setQuestion((prevState) => {
      const newConversations = [...prevState];
      const index = newConversations.findIndex((d) => d === question);

      if (index !== -1) {
        newConversations[index] = newConversation;
      }

      return newConversations;
    });
  };

  useEffect(() => {
    return () =>
      Object.values(files.filesImageQuestion).forEach((file) =>
        URL.revokeObjectURL(file.preview)
      );
  }, [files]);

  const handleChangeTime = (event) => {
    let { value } = event.target;

    // Elimina cualquier carácter que no sea dígito
    let filteredValue = value.replace(/[^\d]/g, '');

    // Inserta automáticamente un ':' después de 2 dígitos
    if (filteredValue.length > 2) {
      filteredValue =
        filteredValue.substring(0, 2) + ':' + filteredValue.substring(2);
    }

    // Limita la entrada a 5 caracteres: MM:SS
    filteredValue = filteredValue.substring(0, 5);

    // Divide los minutos de los segundos
    let parts = filteredValue.split(':');
    let minutes = parts[0] ? parts[0].substring(0, 2) : '';
    let seconds = parts[1] ? parts[1].substring(0, 2) : '';

    // Asegura que los minutos y segundos no sean mayores de 59
    minutes = parseInt(minutes, 10) > 10 ? '10' : minutes;
    seconds = parseInt(seconds, 10) > 59 ? '59' : seconds;

    // Reconstruye el valor asegurándose de que cumpla con el formato MM:SS
    let newValue = `${minutes}:${seconds}`;

    // Convertir minutos y segundos a segundos totales
    let totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);

    const newConversation = {
      ...question,
      timeLimit: totalSeconds, // Aquí se asignan los segundos totales calculados
    };

    // Actualiza el estado con el nuevo valor y la nueva conversación
    setTime(newValue); // Actualiza el tiempo mostrado en la interfaz

    setQuestion((prevState) => {
      const newConversations = [...prevState];
      const index = newConversations.findIndex((d) => d === question);

      if (index !== -1) {
        newConversations[index] = newConversation;
      }

      return newConversations;
    });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {!isConversation ? (
        <>
          <Card
            style={{
              padding: '20px',
              marginBottom: '20px',
              maxHeight: '300px',
            }}
          >
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  overflowX: 'hidden',
                  overflowY: 'scroll',
                }}
              >
                <Typography variant="h5" style={{ marginBottom: '15px' }}>
                  Demográfico {currentIndex + 1}
                </Typography>
                <Button
                  onClick={remove}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                >
                  Eliminar Demográfico
                </Button>
              </div>
              <div
                style={{
                  marginBottom: '20px',
                }}
              >
                <TextField
                  fullWidth
                  label="Nombre Demográfico"
                  value={demographic.name}
                  onChange={handleDemographicNameChange}
                  style={{ marginRight: '20px' }}
                  error={!!errors.demographics?.[currentIndex]?.name}
                  helperText={errors.demographics?.[currentIndex]?.name}
                  size="small"
                />
                <Button
                  onClick={handleAddOption}
                  sx={{
                    color: '#00B0F0',
                  }}
                >
                  Añadir opción <AddCircleOutlineIcon />
                </Button>
              </div>
              <div
                style={{
                  overflowY: 'scroll',
                  height: '10em',
                }}
              >
                {demographic.demographicDetails.length > 0 && (
                  <>
                    <Typography
                      variant="h6"
                      style={{
                        marginBottom: '10px',
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '10px',
                      }}
                    >
                      Opciones demográfico
                    </Typography>
                    {demographic.demographicDetails.map((opcion, index) => (
                      <div
                        key={opcion.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '10px',
                        }}
                      >
                        <TextField
                          fullWidth
                          label={`Opción ${index + 1}`}
                          id="outlined-size-small"
                          defaultvalue="Small"
                          size="small"
                          value={opcion.value}
                          onChange={(e) =>
                            handleOptionChange(opcion.id, e.target.value)
                          }
                          style={{ marginRight: '20px' }}
                          error={
                            !!errors.demographics?.[currentIndex]?.[
                              `option${index}`
                            ]
                          }
                          helperText={
                            errors.demographics?.[currentIndex]?.[
                              `option${index}`
                            ]
                          }
                        />
                        <IconButton
                          onClick={() => handleDeleteOption(opcion.id)}
                          color="error"
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {isText(item) && (
            <Card
              style={{
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ marginBottom: '10px', color: '#00B0F0' }}>
                    <Chip
                      label="Texto"
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                    <Button onClick={handleRemoveConversation} color="error">
                      Eliminar
                    </Button>
                  </div>
                  <TextField
                    size="small"
                    label="Ingrese texto"
                    value={question.name}
                    onChange={handleDemographicNameChange}
                    error={!!errors.questions?.[currentIndex]?.name}
                    helperText={errors.questions?.[currentIndex]?.name}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          {isOpinion() === item && (
            <Card>
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div>
                    <Chip
                      label="Opinion"
                      color="primary"
                      size="small"
                      variant="outlined"
                      style={{ marginBottom: '5px', color: '#00B0F0' }}
                    />
                    <Button onClick={handleRemoveConversation} color="error">
                      Eliminar
                    </Button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      label="Opinion"
                      value={question.name}
                      onChange={handleDemographicNameChange}
                      error={!!errors.questions?.[currentIndex]?.name}
                      helperText={errors.questions?.[currentIndex]?.name}
                    />
                    <FormControl
                      error={!!errors.questions?.[currentIndex]?.timeLimit}
                      sx={{ minWidth: 120 }}
                      size="small"
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Tiempo
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={Math.round(question.timeLimit / 60)}
                        onChange={handleChangeTimeLimit}
                      >
                        {tiempoPregunta.map((value, index) => (
                          <MenuItem key={index} value={value}>
                            {`${value} ${value === 1 ? 'minuto' : 'minutos'}`}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.questions?.[currentIndex]?.timeLimit}
                      </FormHelperText>
                    </FormControl>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {isExperience(item) === item && (
            <Card>
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ marginBottom: '10px', color: '#00B0F0' }}>
                    <Chip
                      label="Experiencia"
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                    <Button onClick={handleRemoveConversation} color="error">
                      Eliminar
                    </Button>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      label="Experiencia"
                      value={question.name}
                      onChange={handleDemographicNameChange}
                      error={!!errors.questions?.[currentIndex]?.name}
                      helperText={errors.questions?.[currentIndex]?.name}
                    />
                    <FormControl
                      error={!!errors.questions?.[currentIndex]?.timeLimit}
                      sx={{ minWidth: 120 }}
                      size="small"
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Tiempo
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={
                          question.timeLimit < 60
                            ? question.timeLimit
                            : question.timeLimit / 60
                        }
                        onChange={handleChangeTimeLimit}
                      >
                        {tiempoPregunta.map((value, index) => (
                          <MenuItem key={index} value={value}>
                            {`${value} ${value === 1 ? 'minuto' : 'minutos'}`}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.questions?.[currentIndex]?.timeLimit}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <Button
                    onClick={handleAddOption}
                    sx={{
                      color: '#00B0F0',
                    }}
                  >
                    Añadir opción <AddCircleOutlineIcon />
                  </Button>
                  {question.options.length > 0 && (
                    <>
                      <Typography
                        variant="h6"
                        style={{
                          marginBottom: '10px',
                          borderBottom: '1px solid #ddd',
                          paddingBottom: '10px',
                        }}
                      >
                        Opciones
                      </Typography>
                      {question.options.map((opcion, index) => (
                        <div
                          key={opcion.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '5px',
                          }}
                        >
                          <TextField
                            size="small"
                            label={`Opción ${index + 1}`}
                            value={opcion.value}
                            onChange={(e) =>
                              handleOptionChange(
                                opcion.id,
                                e.target.value,
                                opcion.experienceQuestion
                              )
                            }
                            error={
                              !!errors.questions?.[currentIndex]?.[
                                `option${index}`
                              ]
                            }
                            helperText={
                              errors.questions?.[currentIndex]?.[
                                `option${index}`
                              ]
                            }
                            style={{ marginRight: '10px' }}
                          />
                          <p>Por favor ingresa la pregunta para esta opción</p>
                          <TextField
                            size="small"
                            label={`Opción ${opcion.id}`}
                            value={opcion.experienceQuestion}
                            onChange={(e) =>
                              handleOptionChange(
                                opcion.id,
                                opcion.value,
                                e.target.value
                              )
                            }
                            error={
                              !!errors.questions?.[currentIndex]?.[
                                `experienceQuestion${index}`
                              ]
                            }
                            helperText={
                              errors.questions?.[currentIndex]?.[
                                `experienceQuestion${index}`
                              ]
                            }
                            style={{ marginRight: '10px' }}
                          />
                          <Button
                            onClick={() => handleDeleteOption(opcion.id)}
                            color="error"
                          >
                            <DeleteOutlineIcon />
                          </Button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          {isSelecionSimple(item) && (
            <Card>
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ marginBottom: '10px', color: '#00B0F0' }}>
                    <Chip
                      label="Seleccion simple"
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                    <Button onClick={handleRemoveConversation} color="error">
                      Eliminar
                    </Button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      label="Ingrese pregunta"
                      value={question.name}
                      onChange={handleDemographicNameChange}
                      error={!!errors.questions?.[currentIndex]?.name}
                      helperText={errors.questions?.[currentIndex]?.name}
                    />
                    <FormControl
                      error={!!errors.questions?.[currentIndex]?.timeLimit}
                      sx={{ minWidth: 120 }}
                      size="small"
                    >
                      <TextField
                        label="Tiempo (MM:SS)"
                        size="small"
                        value={time}
                        onChange={handleChangeTime}
                        placeholder="MM:SS"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          maxLength: 5, // Limita la longitud del input a MM:SS
                        }}
                        sx={{ width: 120 }}
                      />
                      <FormHelperText>
                        {errors.questions?.[currentIndex]?.timeLimit}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <Button
                    onClick={handleAddOption}
                    size="small"
                    style={{ minWidth: 'fit-content' }}
                    sx={{
                      color: '#00B0F0',
                    }}
                  >
                    Añadir opción <AddCircleOutlineIcon />
                  </Button>
                  {question.options.length > 0 && (
                    <>
                      <Typography
                        variant="h6"
                        style={{
                          marginBottom: '10px',
                          borderBottom: '1px solid #ddd',
                          paddingBottom: '10px',
                        }}
                      >
                        Opciones
                      </Typography>
                      {question.options.map((opcion, index) => (
                        <div
                          key={opcion.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '5px',
                          }}
                        >
                          <TextField
                            label={`Opción ${index + 1}`}
                            value={opcion.value}
                            onChange={(e) =>
                              handleOptionChange(opcion.id, e.target.value)
                            }
                            style={{ marginRight: '10px' }}
                            error={
                              !!errors.questions?.[currentIndex]?.[
                                `option${index}`
                              ]
                            }
                            helperText={
                              errors.questions?.[currentIndex]?.[
                                `option${index}`
                              ]
                            }
                          />
                          <Button
                            onClick={() => handleDeleteOption(opcion.id)}
                            color="error"
                          >
                            <DeleteOutlineIcon />
                          </Button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          {isImage() === item && (
            <Card>
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '10px',
                  }}
                >
                  <div>
                    <Chip
                      label="Imagen"
                      color="primary"
                      size="small"
                      variant="outlined"
                      style={{ marginBottom: '5px', color: '#00B0F0' }}
                    />
                    <Button onClick={handleRemoveConversation} color="error">
                      Eliminar
                    </Button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {files.filesImageQuestion.length === 0 && (
                      <Box
                        {...getRootProps()}
                        sx={{
                          border: '2px dashed gray',
                          borderRadius: '10px',
                          padding: '20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: isDragActive ? '#eeeeee' : '#fafafa',
                        }}
                      >
                        <input
                          {...getInputProps({
                            onChange: (event) => {
                              handleFileChange(event); // Asumiendo que handleFileChange maneja el evento de cambio
                            },
                          })}
                          accept="image/*,video/*"
                        />
                        <CloudUploadIcon sx={{ fontSize: 60 }} />
                        <Typography variant="body1">
                          {isDragActive
                            ? 'Suelta los archivos aquí...'
                            : 'Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos'}
                        </Typography>
                      </Box>
                    )}
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                      {previews}
                    </Grid>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {isVideo() === item && (
            <Card>
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '10px',
                  }}
                >
                  <div>
                    <Chip
                      label="Vídeo"
                      color="primary"
                      size="small"
                      variant="outlined"
                      style={{ marginBottom: '5px', color: '#00B0F0' }}
                    />
                    <Button onClick={handleRemoveConversation} color="error">
                      Eliminar
                    </Button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      {...getRootProps()}
                      sx={{
                        border: '2px dashed gray',
                        borderRadius: '10px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: isDragActive ? '#eeeeee' : '#fafafa',
                      }}
                    >
                      <input {...getInputProps()} accept="image/*,video/*" />
                      {isDragActive ? (
                        <Typography>Arrastra los archivos aquí...</Typography>
                      ) : (
                        <Typography>
                          Arrastra y suelta imágenes o vídeos aquí, o haz clic
                          para seleccionar archivos
                        </Typography>
                      )}
                    </Box>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

export default Options;
