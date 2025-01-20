import {
  useCallback,
  useContext,
  useInsertionEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
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
  demographicRefs,
  questionRefs,
}) {
  const [files, setFiles] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [time, setTime] = useState(() => {
    // Aquí puedes poner tu condición
    if (item == 'Opinión') {
      return '03:00';
    } else {
      return '00:00';
    }
  });
  //const files = useContext(filesImageQuestionContext);
  const onDropImages = useCallback((acceptedFiles) => {
    // Crear una URL de objeto para cada archivo
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // Actualizar el estado con los nuevos archivos, incluidos sus previews
    setFiles(mappedFiles);
    const newConversation = { ...question, urlMedia: mappedFiles[0] };
    setQuestion((prevState) => {
      const newConversations = [...prevState];
      const index = newConversations.findIndex((d) => d === question);
      newConversations[index] = newConversation;
      return newConversations;
    });
  }, []);

  const onDropRejectedImages = useCallback((fileRejections) => {
    // Lógica para manejar archivos rechazados
    // Puedes personalizar el mensaje de error basado en tu lógica
    const message =
      fileRejections.length > 0
        ? 'Tipo de archivo no válido. Por favor, sube un archivo con extensión .jpeg, .png.'
        : '';
    setOpenSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity('warning');
  }, []);

  const onDropVideos = useCallback((acceptedFiles) => {
    // Crear una URL de objeto para cada archivo
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // Actualizar el estado con los nuevos archivos, incluidos sus previews
    setFiles(mappedFiles);
    const newConversation = { ...question, urlMedia: mappedFiles[0] };
    setQuestion((prevState) => {
      const newConversations = [...prevState];
      const index = newConversations.findIndex((d) => d === question);
      newConversations[index] = newConversation;
      return newConversations;
    });
  }, []);

  const onDropRejectedVideos = useCallback((fileRejections) => {
    // Lógica para manejar archivos rechazados
    // Puedes personalizar el mensaje de error basado en tu lógica
    const message =
      fileRejections.length > 0
        ? 'Tipo de archivo no válido. Por favor, sube un archivo con extensión.mp4.'
        : '';
    setOpenSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity('warning');
  }, []);
  // Configuración para dropzone de imágenes
  const {
    getRootProps: getRootPropsImages,
    getInputProps: getInputPropsImages,
    isDragActive: isDragActiveImages,
  } = useDropzone({
    onDrop: onDropImages,
    onDropRejected: onDropRejectedImages,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 2,
  });

  // Configuración para dropzone de vídeos
  const {
    getRootProps: getRootPropsVideos,
    getInputProps: getInputPropsVideos,
    isDragActive: isDragActiveVideos,
  } = useDropzone({
    onDrop: onDropVideos,
    onDropRejected: onDropRejectedVideos,
    accept: { 'video/mp4': ['.mp4', '.MP4'] },
    maxFiles: 1,
  });

  const removeFile = (file) => {
    const newFiles = files.filter((f) => f.name !== file.name);
    setFiles(newFiles);
  };

  const previews = files.map((file) => {
    // Determinar si el archivo es un vídeo o una imagen por su tipo MIME
    const isVideo = file.type.startsWith('video');

    // Crear un elemento JSX basado en el tipo de archivo
    let mediaElement;
    if (isVideo) {
      mediaElement = (
        <video
          src={file.preview}
          style={{ width: '100%' }}
          controls
          alt="Preview"
        />
      );
    } else {
      mediaElement = (
        <img src={file.preview} style={{ width: '100%' }} alt="Preview" />
      );
    }
    return (
      <div key={file.name}>
        {mediaElement}
        <IconButton onClick={() => removeFile(file)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    );
  });

  function limpiarTexto(texto) {
    let textoSinEspacios = texto.replace(/\s+/g, '');
    let textoSinTildes = textoSinEspacios
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return textoSinTildes;
  }

  const isText = (item) => {
    switch (item.toLowerCase()) {
      case 'texto':
        return true;
      default:
        return false;
    }
  };
  const isOpinion = (item) => {
    switch (limpiarTexto(item.toLowerCase())) {
      case 'opinion':
        return true;
      default:
        return false;
    }
  };
  const isExperience = (item) => {
    switch (limpiarTexto(item.toLowerCase())) {
      case 'preguntacondicional':
        return true;
      default:
        return false;
    }
  };
  const isImage = (item) => {
    switch (limpiarTexto(item.toLowerCase())) {
      case 'imagen':
        return true;
      default:
        return false;
    }
  };
  const isVideo = (item) => {
    switch (limpiarTexto(item.toLowerCase())) {
      case 'video':
        return true;
      default:
        return false;
    }
  };
  const isSelecionSimple = (item) => {
    switch (limpiarTexto(item.toLowerCase())) {
      case 'seleccionsimple':
        return true;
      default:
        return false;
    }
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

      if (item === 'pregunta condicional') {
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
      Object.values(files).forEach((file) => URL.revokeObjectURL(file.preview));
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

    // Si el ítem es "Opinión" y los minutos son menores a 03, ajusta después de la entrada
    if (item === 'Opinión' && totalSeconds < 180) {
      minutes = '03';
      seconds = '00';
      newValue = '03:00';
      totalSeconds = 180; // Fija los segundos a 180 para garantizar el mínimo de 03:00
    }

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
      <Snackbar open={openSnackbar} autoHideDuration={2000}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {!isConversation ? (
        <>
          <Card
            style={{
              padding: '20px',
              marginBottom: '20px',
              maxHeight: '300px',
            }}
            ref={demographicRefs}
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
              ref={questionRefs}
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
          {isOpinion(item) && (
            <Card ref={questionRefs}>
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
                </div>
              </CardContent>
            </Card>
          )}
          {isExperience(item) && (
            <Card ref={questionRefs}>
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
                      label="Pregunta Condicional"
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
                      label="Pregunta Condicional"
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
                          <p
                            style={{ marginTop: '10px', marginBottom: '10px' }}
                          >
                            Por favor ingresa la pregunta para esta opción
                          </p>
                          <TextField
                            size="small"
                            label={`Pregunta Opción ${index + 1}`}
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
            <Card ref={questionRefs}>
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
                            marginBottom: '20px',
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
          {isImage(item) && (
            <Card ref={questionRefs}>
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
                      alignItems: 'start',
                      flexDirection: 'column',
                    }}
                  >
                    {files.length === 0 && (
                      <Box
                        {...getRootPropsImages()}
                        sx={{
                          border: '2px dashed gray',
                          borderRadius: '10px',
                          padding: '20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: isDragActiveImages
                            ? '#eeeeee'
                            : '#fafafa',
                        }}
                      >
                        <input {...getInputPropsImages()} />
                        {
                          <>
                            <CloudUploadIcon sx={{ fontSize: 60 }} />
                            <Typography variant="body1">
                              {isDragActiveImages
                                ? 'Suelta los archivos aquí...'
                                : 'Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos'}
                            </Typography>
                          </>
                        }
                      </Box>
                    )}
                    {!!errors.questions?.[currentIndex]?.name && (
                      <Typography color="error" style={{ marginTop: '10px' }}>
                        {errors.questions?.[currentIndex]?.name}
                      </Typography>
                    )}

                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                      {previews}
                    </Grid>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {isVideo(item) && (
            <Card ref={questionRefs}>
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
                      alignItems: 'start',
                      flexDirection: 'column',
                    }}
                  >
                    {files.length === 0 && (
                      <Box
                        {...getRootPropsVideos()}
                        sx={{
                          border: '2px dashed gray',
                          borderRadius: '10px',
                          padding: '20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: isDragActiveVideos
                            ? '#eeeeee'
                            : '#fafafa',
                        }}
                      >
                        <input {...getInputPropsVideos()} />
                        <>
                          <CloudUploadIcon sx={{ fontSize: 60 }} />
                          <Typography variant="body1">
                            {isDragActiveVideos
                              ? 'Suelta los archivos aquí...'
                              : 'Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos'}
                          </Typography>
                        </>
                      </Box>
                    )}
                    {!!errors.questions?.[currentIndex]?.name && (
                      <Typography color="error" style={{ marginTop: '10px' }}>
                        {errors.questions?.[currentIndex]?.name}
                      </Typography>
                    )}
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                      {previews}
                    </Grid>
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
