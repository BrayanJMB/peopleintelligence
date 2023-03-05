import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import styles from './Introduction.module.css';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import client from '../../../../utils/axiosInstance';

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
      default:
        break;
    }
  }

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
    const { data } = await client.get('GetJorneyMap/');
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
    }
  }

  // component did mount
  useEffect(() => {
    fetchMaps();

    if (previousData) {
      setMap(previousData.map);
      setTitle(previousData.title);
      setDescription(previousData.description);
      setMailingMessage(previousData.mailingMessage);
    }
  }, []);

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
      title,
      description,
      mailingMessage,
      isValid,
    });

    if (checkForm || (map && title && description && mailingMessage)) {
      validate();
    }
  }, [map, title, description, mailingMessage, isValid]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.form}>
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
}

Introduction.propTypes = {
  onUpdated: PropTypes.func.isRequired,
  checkForm: PropTypes.bool.isRequired,
  previousData: PropTypes.object,
}

Introduction.defaultProps = {
  previousData: {},
}

export default Introduction;
