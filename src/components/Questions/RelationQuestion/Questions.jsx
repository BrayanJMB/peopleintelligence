import { TextField } from '@mui/material';

export const Questions = (props) => {
  return (
    <>
      <TextField
        id={`outlined-option-${props.key}`}
        variant="outlined"
        placeholder="Añadir pregunta..."
        style={{ marginTop: 8, marginBottom: 8 }}
        value={props.information.customOptions[props.key]}
        onChange={props.handleinformationoptions(props.key)}
        error={props.customOptionError[props.key]}
        helperText={
          props.customOptionError[props.key] ? 'La opción no puede estar vacía' : ''
        }
        fullWidth
        multiline // Esto convierte el TextField en un área de texto
        minRows={3}
        maxRows={3} // Establece el límite máximo de filas // Ajusta el número mínimo de filas según sea necesario
        onKeyDown={props.handleKeyPress} // Evitar Enter
      />
    </>
  );
};
