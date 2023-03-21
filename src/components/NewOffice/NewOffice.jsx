import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from './NewOffice.module.css';

export default function NewCampus(props) {
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

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
    setErrorMessage(error);
    setHelperText(helperText);
  };

  return (
    <div className={styles.form}>
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Sede"
          value={props.info.sede}
          name="sede"
          onChange={props.handleChangeOficina}
          style={{ flexBasis: '40%' }}
          error={errorMessage.sede}
          helperText={helperText.sede}
          size="small"
          onBlur={handleBlur}
        />
        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: '40%' }}
          options={props.content.company}
          clearOnEscape
          value={props.info.IdCompania}
          onChange={(e, value) => {
            props.handleAutocomplete('IdCompania', value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={'No se ha encontrado ninguna compañia'}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorMessage.numeroDocumento}
              helperText={helperText.numeroDocumento}
              label="Compañia"
            />
          )}
          size="small"
        />
      </div>
      <div className={styles.impexp}>
        <Button variant="text" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={props.handleOffice}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
