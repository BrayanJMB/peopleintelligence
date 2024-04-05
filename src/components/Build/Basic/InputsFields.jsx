import NotesIcon from '@mui/icons-material/Notes';
import TextField from '@mui/material/TextField';

import styles from './Basic.module.css';

export const InputsFields = ({
  survey,
  moderator,
  error,
  helperText,
  handleChange,
}) => {
  const inputFields = [
    {
      labelInput: 'Título Conversación (Requerido)',
      label: 'Título Conversación',
      name: 'title',
      value: survey.title,
      size: 'small',
      color: '#00B0F0',
      width: '100%',
      error: error.title,
      helperText: helperText.title,
      parameterOnChange: 'survey',
    },
    {
      labelInput: 'Nombre moderador (Requerido)',
      label: 'Nombre moderador',
      name: 'name',
      value: moderator.name,
      size: 'small',
      color: '#00B0F0',
      width: '100%',
      error: error.moderatorName,
      helperText: helperText.moderatorName,
      parameterOnChange: 'moderator',
    },
  ];

  return (
    <>
      {inputFields.map((field, index) => (
        <div key={index}>
          <div className={styles.general}>
            <NotesIcon color="blue" style={{ marginRight: '1rem' }} />
            <p>{field.labelInput}</p>
          </div>
          <div className={styles.required}>
            <div className={styles.input}>
              <TextField
                label={field.label}
                value={field.value}
                name={field.name}
                onChange={(event) =>
                  handleChange(event, field.parameterOnChange)
                }
                size={field.size}
                style={{ width: field.width, color: field.color }}
                error={field.error}
                helperText={field.helperText}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
