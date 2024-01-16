import { useCallback, useState } from 'react';
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
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const removeFile = (file) => () => {
    const newFiles = files.filter((f) => f.name !== file.name);
    setFiles(newFiles);
  };

  const previews = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} style={{ width: '100%' }} alt="Preview" />
      <IconButton onClick={removeFile(file)}>
        <DeleteOutlineIcon />
      </IconButton>
    </div>
  ));

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
    switch (item.toLowerCase()) {
      case 'seleccionsimple':
        return true;
      default:
        return false;
    }
  };

  const handleFileChange = (event) => {
    // Acceder al archivo seleccionado
    const file = event.target.files[0];
    // Procesar el archivo o actualizar el estado según sea necesario
    console.log("Archivo seleccionado:", file.name);
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
    console.log(newConversation);
    setQuestion((prevState) => {
      const newConversations = [...prevState];
      const index = newConversations.findIndex((d) => d === question);
      console.log(index);

      if (index !== -1) {
        newConversations[index] = newConversation;
      }

      return newConversations;
    });
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

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
                  <div>
                    <Chip
                      sx={{
                        color: '#00B0F0',
                      }}
                      label="Pregunta de texto"
                      size="small"
                      variant="outlined"
                      style={{ marginBottom: '5px' }}
                    />
                    <Button onClick={handleRemoveConversation} color="error">
                      Eliminar
                    </Button>
                  </div>
                  <TextField
                    size="small"
                    label="Nombre pregunta"
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
                  <div>
                    <Chip
                      label="Experiencia"
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
                  <div>
                    <Chip
                      label="Seleccion simple"
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
                    <TextField
                      size="small"
                      fullWidth
                      label="seleccion simple"
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
                    {files.length === 0 && (
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
                        <input {...getInputProps()} accept="image/*,video/*"  />
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
