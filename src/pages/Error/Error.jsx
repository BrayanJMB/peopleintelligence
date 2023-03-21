import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function Error() {
  const navigate = useNavigate();
  const handledash = () => {
    navigate('/dashboard');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">
        La página a la que esta intentando ingresar no existe.
      </Typography>
      <Button variant="contained" onClick={handledash}>
        Regresar
      </Button>
    </Box>
  );
}
