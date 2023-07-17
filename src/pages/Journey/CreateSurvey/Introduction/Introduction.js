import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

import client from '../../../../utils/axiosInstance';
import { isJourney } from '../../../../utils/helpers';

import styles from './Introduction.module.css';

/**
 * Introduction component for the create survey page. Step 1.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Introduction = ({ checkForm, onUpdated, previousData, isUpdate, mapsLoaded, setMapsLoaded }) => {
  const [maps, setMaps] = useState([]);
  const [map, setMap] = useState(null);
  const [isValidMap, setIsValidMap] = useState('');
  const [title, setTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isValidDescription, setIsValidDescription] = useState('');
  const [mailingMessage, setMailingMessage] = useState('');
  const [isValidMailingMessage, setIsValidMailingMessage] = useState('');
  const [emailMask, setEmailMask] = useState('');
  const [isValidEmailMask, setIsValidEmailMask] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [isValidEmailSubject, setIsValidEmailSubject] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const isMap = searchParams.get('isMap') === 'true';
  const [surveyOrMap, setSurveyOrMap] = useState(isMap ? 'map' : 'survey');
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  /**
   * Handel change.
   *
   * @param event
   */
  const handleChange = (event) => {
    switch (event.target.name) {
      case 'title':
        setTitle(event.target.value);
        break;
      case 'description':
        setDescription(event.target.value);
        break;
      case 'emailMask':
        setEmailMask(event.target.value);
        break;
      case 'emailSubject':
        setEmailSubject(event.target.value);
        break;
      case 'mailingMessage':
        setMailingMessage(event.target.value);
        break;
      case 'surveyOrMap':
        setSurveyOrMap(event.target.value);
        break;
      default:
        break;
    }
  };

  /**
   * Handle change map.
   *
   * @param newValue
   */
  const handleChangeMap = (newValue) => {
    setMap(newValue);
  };

  /**
   * Fetches the maps from the API.
   *
   * @returns {Promise<void>}
   */
  const fetchMaps = async () => {
    if (!currentCompany)
      return;
    const { data } = await client.get(`GetJorneyMapCompany/${currentCompany.id}`);
    const maps = data.map((item) => ({
      ...item,
      label: item.mapJourney,
    }));

    setMaps(maps);
    setMapsLoaded(true);
  };

  /**
   * validate the form.
   *
   * @returns {boolean}
   */
  const validate = () => {
    setIsValidMap('');
    setIsValidTitle('');
    setIsValidDescription('');
    setIsValidMailingMessage('');
    setIsValidEmailMask('');
    setIsValidEmailSubject('');
    setIsValid(true);
    // check null for map
    if (map === null) {
      setIsValidMap('Este campo es requerido');
      setIsValid(false);
    }

    // check empty for title
    if (title === '') {
      setIsValidTitle('Este campo es requerido');
      setIsValid(false);
    }
    // check length for title min 5
    if (title.length < 5) {
      setIsValidTitle('Este campo debe tener al menos 5 caracteres');
      setIsValid(false);
    }

    // check empty for description
    if (description === '') {
      setIsValidDescription('Este campo es requerido');
      setIsValid(false);
    }
    // check length for description min 5
    if (description.length < 5) {
      setIsValidDescription('Este campo debe tener al menos 5 caracteres');
      setIsValid(false);
    }

    // check empty for mailing message
    if (mailingMessage.length < 5) {
      setIsValidMailingMessage('Este campo debe tener al menos 5 caracteres');
      setIsValid(false);
    }else if (!mailingMessage.includes('@enlace')) {
        setIsValidMailingMessage('El mensaje debe contener "@enlace".');
        setIsValid(false);
    }
    // check length for mailing message min 5
    if((isTemplate() === false || isMap) && !isUpdate){
      if (!emailMask) {
        setIsValidEmailMask('La máscara de correo es requerido');
        setIsValid(false);
      } else {
        if (emailMask.length < 5) {
          setIsValidEmailMask(
            'La máscara debe tener al menos 5 carácteres'
          );
          setIsValid(false);
        }else if (emailMask.length > 30) {
          setIsValidEmailMask('La máscara debe tener máximo 30 carácteres');
        }
      }
      if (!emailSubject) {
        setIsValidEmailSubject('El asunto de correo es requerido');
        setIsValid(false);
      } else if (emailSubject.length < 5) {
          setIsValidEmailSubject(
            'El asunto de correo debe tener al menos 5 carácteres'
          );
          setIsValid(false);
      } 

      if (mailingMessage.length < 5) {
        setIsValidMailingMessage('Este campo debe tener al menos 5 caracteres');
        setIsValid(false);
      }else if (!mailingMessage.includes('@enlace')) {
          setIsValidMailingMessage('El mensaje debe contener "@enlace".');
          setIsValid(false);
      }
    }
  };

  /**
   * Returns true if the survey is a template.
   *
   * @returns {boolean}
   */
  const isTemplate = () => searchParams.get('isTemplate') === 'true';

  // component did mount
  useEffect(() => {
    fetchMaps();
  }, [currentCompany]); // eslint-disable-line react-hooks/exhaustive-deps

  // watch for changes in previous data
  useEffect(() => {
    if (!previousData || !mapsLoaded) {
      return;
    }
    
    if (previousData.map) {
      // if map is not number then find the map by name
      if (previousData.map) {
        const matchingMap = maps.find((item) => item.label === previousData.map);
        if (matchingMap) {
          setMap(matchingMap);
        }
        else{
          setMap(previousData.map);
        }
      }
    }

    if (previousData.title) {
      setTitle(previousData.title);
    }
    if (previousData.description) {
      setDescription(previousData.description);
    }
    if (previousData.emailMask) {
      setEmailMask(previousData.emailMask);
    }
    if (previousData.emailSubject) {
      setEmailSubject(previousData.emailSubject);
    }
    if (previousData.mailingMessage) {
      setMailingMessage(previousData.mailingMessage);
    }
    if (previousData.surveyOrMap) {
      setSurveyOrMap(previousData.surveyOrMap);
    }
  }, [previousData, mapsLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // listen changes in touched form
  useEffect(() => {
    if (checkForm) {
      validate();
    }
  }, [checkForm]);

  // eslint-disable-line react-hooks/exhaustive-deps

  // listen changes in form values
  useEffect(() => {
    onUpdated({
      map,
      surveyOrMap,
      title,
      description,
      emailMask,
      emailSubject,
      mailingMessage,
      isValid,
    });
    
    if (checkForm || (map && title && description && mailingMessage && emailMask && emailSubject)) {
      validate();
    }
  }, [map, title, description, mailingMessage, emailMask, emailSubject, isValid, surveyOrMap]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.form}>
      {isTemplate() === true && (
        <FormControl
          className={styles.Introduction__formControl}
          disabled={true}
        >
          <FormLabel
            id="survey-or-map"
          >
            Encuesta o ruta de mapa
          </FormLabel>
          <RadioGroup
            row
            name="surveyOrMap"
            value={surveyOrMap}
            onChange={handleChange}
          >
            <FormControlLabel
              value="survey"
              control={
                <Radio />
              }
              label="Encuesta"
            />
            <FormControlLabel
              value="map"
              control={
                <Radio />
              }
              label="Ruta de mapa"
            />
          </RadioGroup>
        </FormControl>
      )}
      {/* survey/template title */}
      <FormControl
        style={{
          marginBottom: '1.5em',
        }}
      >
        <Autocomplete
          id="select-map"
          options={maps}
          clearOnEscape
          onChange={(event, newValue) => handleChangeMap(newValue)}
          value={map}
          getOptionLabel={(option) => option.label || ''}
          noOptionsText={'No hay mapas disponibles'}
          name={'map'}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nombre del mapa"
              variant="outlined"
              error={isValidMap !== ''}
              helperText={isValidMap}
              name={'map'}
            />
          )}
          disabled={maps.length === 0}
        />
      </FormControl>
      <FormControl
        style={{
          marginBottom: '1.5em',
        }}
      >
        <TextField
          id="title"
          label="Nombre de la encuesta"
          value={title}
          name="title"
          onChange={handleChange}
          error={isValidTitle !== ''}
          helperText={isValidTitle}
          fullWidth
        />
      </FormControl>
      <FormControl
        style={{
          marginBottom: '1.5em',
        }}
      >
        <TextField
          id="description"
          label="Propósito de esta encuesta"
          variant="outlined"
          value={description}
          error={isValidDescription !== ''}
          helperText={isValidDescription}
          name="description"
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
      </FormControl>
      {isTemplate() === true && !isMap || isUpdate ? (
      <FormControl
        style={{
          marginBottom: '1.5em',
        }}
      >
        <TextField
          id="mailing-message"
          label="Mensaje de correo electrónico"
          variant="outlined"
          value={mailingMessage}
          error={isValidMailingMessage !== ''}
          helperText={isValidMailingMessage}
          name="mailingMessage"
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
      </FormControl>):
      (<>
        <FormLabel
              id="survey-or-map"
            >
              Datos correo electrónico
        </FormLabel>
        <FormControl
          style={{
            marginBottom: '1.5em',
          }}
        >
          <TextField
            id="email-mask"
            label="Máscara correo"
            variant="outlined"
            value={emailMask}
            error={isValidEmailMask !== ''}
            helperText={isValidEmailMask}
            name="emailMask" 
            fullWidth
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          style={{
            marginBottom: '1.5em',
          }}
        >
          <TextField
            id="email-subject"
            label="Asunto correo electrónico"
            variant="outlined"
            value={emailSubject}
            error={isValidEmailSubject !== ''}
            helperText={isValidEmailSubject}
            name="emailSubject"
            fullWidth
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          style={{
            marginBottom: '1.5em',
          }}
        >
          <TextField
            id="mailing-message"
            label="Mensaje de correo electrónico"
            variant="outlined"
            value={mailingMessage}
            error={isValidMailingMessage !== ''}
            helperText={isValidMailingMessage}
            name="mailingMessage"
            fullWidth
            multiline
            rows={4}
            onChange={handleChange}
          />
        </FormControl>
      </>)}
    </div>
  );
};

Introduction.propTypes = {
  onUpdated: PropTypes.func.isRequired,
  checkForm: PropTypes.bool.isRequired,
  previousData: PropTypes.object,
};

Introduction.defaultProps = {
  previousData: {},
};

export default Introduction;
