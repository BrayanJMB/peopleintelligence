import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from './NewDepartment.module.css';

const validphone = new RegExp('^[0-9]{12,15}$');

export default function NewDepartment(props) {
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
    if (event.target.name === 'phoneNumber') {
      if (!validphone.test(event.target.value)) {
        helperText[event.target.name] = 'Solo puede escirbir números';
        error[event.target.name] = true;
      }
    }
    setErrorMessage(error);
    setHelperText(helperText);
  };

  return (
    <div className={styles.form}>
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="codigoDepartamento"
          value={props.info.codigoDepartamento}
          name="codigoDepartamento"
          onChange={props.handleChangeDepartment}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
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
          label="departamento"
          value={props.info.departamento}
          name="departamento"
          onChange={props.handleChangeDepartment}
          error={errorMessage.departamento}
          helperText={helperText.departamento}
          size="small"
          onBlur={handleBlur}
        />
      </div>

      <div className={styles.impexp}>
        <Button variant="text" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={props.handleDepartment}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
