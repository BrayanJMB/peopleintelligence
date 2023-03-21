import { useEffect,useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import image from '../../assets/default.png';
import axios from '../../utils/axiosInstance';

import styles from './NewCompany.module.css';

const validphone = new RegExp('^[0-9]{12,15}$');

export default function NewCompany(props) {
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [image, setImage] = useState('');

  const handleBlur = (event) => {
    let helperText = {};
    let error = {};
    if (event.target.value === '') {
      helperText[event.target.name] = 'El campo no puede ir vacio';
      error[event.target.name] = true;
    } else {
      helperText[event.target.name] = '';
      error[event.target.name] = false;
    }
    if (event.target.name === 'phoneNumber') {
      if (!validphone.test(event.target.value)) {
        helperText[event.target.name] = 'Solo puede escirbir números';
        error[event.target.name] = true;
      }
    }
    setErrorMessage(error);
    setHelperText(helperText);
  };

  const getImage = async () => {
    await axios.get('companias/GetLogo/2?Id=1');
  };

  useEffect(() => {
    if (props.info.Logotipi !== null) {
      getImage();
    }
  }, [props.info]);

  return (
    <div className={styles.form}>
      <img
        src={
          props.info.Logotipo !== null
            ? URL.createObjectURL(props.info.Logotipo)
            : image
        }
        alt="profile"
        className={styles.photo}
      />

      <input
        type="file"
        onChange={props.handlePhoto}
        accept="image/*"
        name="profile_image"
      />

      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Nombre de la empresa"
          value={props.info.nombreCompania}
          name="nombreCompania"
          onChange={props.handleChangeCompania}
          style={{ flexBasis: '40%' }}
          error={errorMessage.nombreCompania}
          helperText={helperText.nombreCompania}
          size="small"
          onBlur={handleBlur}
        />
        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: '40%' }}
          options={props.content.sector}
          clearOnEscape
          value={props.info.SectorId}
          onChange={(e, value) => {
            props.handleAutocomplete('SectorId', value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={'No se ha encontrado ningún Sector'}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorMessage.numeroDocumento}
              helperText={helperText.numeroDocumento}
              label="Sector"
            />
          )}
          size="small"
        />
      </div>
      <div className={styles.input}>
        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: '40%' }}
          options={props.content.country}
          clearOnEscape
          value={props.info.IdPais}
          onChange={(e, value) => {
            props.handleAutocomplete('IdPais', value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={'No se ha encontrado ningún País'}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorMessage.IdPais}
              helperText={helperText.IdPais}
              label="País"
            />
          )}
          size="small"
        />
        <TextField
          style={{ flexBasis: '40%' }}
          id="outlined-name"
          label="Sede"
          value={props.info.Sede}
          name="Sede"
          onChange={props.handleChangeCompania}
          error={errorMessage.Sede}
          helperText={helperText.Sede}
          size="small"
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.input}>
        <TextField
          style={{ flexBasis: '40%' }}
          id="outlined-name"
          label="Dirección"
          value={props.info.direccion}
          name="direccion"
          onChange={props.handleChangeCompania}
          error={errorMessage.direccion}
          helperText={helperText.direccion}
          size="small"
          onBlur={handleBlur}
        />
        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: '40%' }}
          options={props.content.sizeCompany}
          clearOnEscape
          value={props.info.IdTamanoCompania}
          onChange={(e, value) => {
            props.handleAutocomplete('IdTamanoCompania', value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={'No se ha encontrado ningún País'}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorMessage.IdTamanoCompania}
              helperText={helperText.IdTamanoCompania}
              label="Tamaño de la empresa"
            />
          )}
          size="small"
        />
      </div>
      <div className={styles.impexp}>
        <Button variant="text" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={props.handleCompany}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
