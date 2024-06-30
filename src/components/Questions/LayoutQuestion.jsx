import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

import styles from '../Form/Form.module.css';

export const LayoutQuestion = ({ children, ...props }) => {
  return (
    <div className={styles.top}>
      <div className={styles.question}>
        <div className={styles.number}>{`Q${props.questions}`}</div>
        <div className={styles.input}>
          <TextField
            id="outlined-name"
            variant="standard"
            label="Añadir prequnta"
            placeholder="Añadir prequnta aquí..."
            value={props.information.name}
            name="name"
            onChange={props.handleInformation}
            error={props.errorMessage.name}
            helperText={props.helperText.name}
            fullWidth
            size="small"
            InputProps={{
              inputComponent: TextareaAutosize,
            }}
          />
        </div>
      </div>
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Añadir descripción"
          placeholder="Añadir descripción aquí (opcional)..."
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: {
              style: {
                height: '80px',
              },
            },
          }}
          value={props.information.description}
          style={{
            width: '100%',
            marginTop: '0.5rem',
          }}
          name="description"
          onChange={props.handleInformation}
        />
      </div>
      {children}
    </div>
  );
};
