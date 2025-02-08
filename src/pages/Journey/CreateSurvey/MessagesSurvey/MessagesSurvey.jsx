import { FormControl, TextField } from '@mui/material';
import { Typography } from '@mui/material';

import styles from './MessagesSurvey.module.css';

export const MessagesSurvey = ({ surveyMessages, setSurveyMessages }) => {
  const handleChangeMessage = (propertyName, event) => {
    setSurveyMessages((prev) => ({
      ...prev,
      [propertyName]: event.target.value,
    }));
  };

  return (
    <div className={styles.form}>
      <Typography
        variant="h6"
        style={{ fontWeight: 'bold', marginBottom: '15px' }}
      >
        Configuración mensaje de bienvenida encuesta:
      </Typography>
      <FormControl
        style={{
          marginBottom: '1.5em',
        }}
      >
        <TextField
          id="title"
          label="Mensaje de solicitud de ingreso"
          value={surveyMessages.welcomeMessage}
          name="welcomeMessage"
          fullWidth
          onChange={(event) => handleChangeMessage('welcomeMessage', event)}
          multiline
          rows={2}
        />
      </FormControl>
      <FormControl
        style={{
          marginBottom: '1.5em',
        }}
      >
        <TextField
          id="title"
          label="Tooltip para el campo de ingreso"
          value={surveyMessages.inputMessage}
          name="inputMessage"
          fullWidth
          onChange={(event) => handleChangeMessage('inputMessage', event)}
        />
      </FormControl>
      <FormControl
        style={{
          marginBottom: '1.5em',
        }}
      >
        <TextField
          id="title"
          label="Mensaje confidencialidad"
          value={surveyMessages.confidentialityMessage}
          name="confidentialityMessage"
          fullWidth
          onChange={(event) =>
            handleChangeMessage('confidentialityMessage', event)
          }
          multiline
          rows={3}
        />
      </FormControl>
    </div>
  );
};
