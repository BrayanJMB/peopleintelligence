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

import styles from './Introduction.module.css';

/**
 * Introduction component for the create survey page. Step 1.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Introduction = ({ checkForm, onUpdated, previousData }) => {
  const [maps, setMaps] = useState([]);
  const [map, setMap] = useState(null);
  const [isValidMap, setIsValidMap] = useState('');
  const [title, setTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isValidDescription, setIsValidDescription] = useState('');
  const [mailingMessage, setMailingMessage] = useState('');
  const [isValidMailingMessage, setIsValidMailingMessage] = useState('');
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
    if (mailingMessage === '') {
      setIsValidMailingMessage('Este campo es requerido');
      setIsValid(false);
    }
    // check length for mailing message min 5
    if (mailingMessage.length < 5) {
      setIsValidMailingMessage('Este campo debe tener al menos 5 caracteres');
      setIsValid(false);
    }else if (!mailingMessage.includes('@enlace')) {
        setIsValidMailingMessage('El mensaje debe contener "@enlace".');
        setIsValid(false);
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
    if (!previousData) {
      return;
    }
    
    if (previousData.map) {
      // if map is not number then find the map by name
      if (typeof previousData.map !== 'number') {
        const map = maps.find((item) => item.mapJourney === previousData.map);
        
        if (map !== undefined) {
          setMap(map);
        }
      } else {
        setMap(previousData.map);
      }
    }
    if (previousData.title) {
      setTitle(previousData.title);
    }
    if (previousData.description) {
      setDescription(previousData.description);
    }
    if (previousData.mailingMessage) {
      setMailingMessage(previousData.mailingMessage);
    }
    if (previousData.surveyOrMap) {
      setSurveyOrMap(previousData.surveyOrMap);
    }
  }, [previousData]); // eslint-disable-line react-hooks/exhaustive-deps


  // listen changes in touched form
  useEffect(() => {
    if (checkForm) {
      validate();
    }
  }, [checkForm]); // eslint-disable-line react-hooks/exhaustive-deps

  // listen changes in form values
  useEffect(() => {
    onUpdated({
      map,
      surveyOrMap,
      title,
      description,
      mailingMessage,
      isValid,
    });

    if (checkForm || (map && title && description && mailingMessage)) {
      validate();
    }
  }, [map, title, description, mailingMessage, isValid, surveyOrMap]); // eslint-disable-line react-hooks/exhaustive-deps

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
          getOptionLabel={(option) => option.label}
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
