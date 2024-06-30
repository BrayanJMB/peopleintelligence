import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';

export const RelationalOptions = ({ index, removePreguntaOpcionInput }) => {
  return (
    <>
      <TextField
        label={`Opción ${index + 1}`}
        variant="outlined"
        style={{ marginTop: 8, marginBottom: 8 }}
        fullWidth
      />
      {index >= 2 && (
        <IconButton
          color="error"
          onClick={() => removePreguntaOpcionInput(index)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      )}
    </>
  );
};
