import { useState } from 'react';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

import styles from './NewReport.module.css';

export default function NewReport(props) {
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
          label="Name"
          value={props.info.name}
          name="name"
          onChange={props.handleChangeReport}
          style={{ flexBasis: '85.5%' }}
          error={errorMessage.name}
          helperText={helperText.name}
          size="small"
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.input}>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Type your welcome message..."
          style={{
            width: '85.5%',
            height: '100px',
            marginTop: '0.5rem',
          }}
          name="descripcion"
          value={props.info.descripcion}
          onChange={props.handleChangeReport}
        />
      </div>
      <div className={styles.impexp}>
        <Button variant="text" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={props.handleAddReport}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
