import { Box, Button, Typography } from '@mui/material';

export default function NoAccess() {
  const handledash = () => {
    window.location.replace(
      `${process.env.REACT_APP_DOMAIN_INSTANCE}.b2clogin.com/${process.env.REACT_APP_DOMAIN_TENANT}/oauth2/v2.0/authorize?p=${process.env.REACT_APP_USER_FLOW}&client_id=${process.env.REACT_APP_CLIENT_ID}&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app%2F&scope=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_TENANT}%2Fapi%2FFiles.Read&response_type=token&prompt=login`
    );
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
      <Typography variant="h1">403</Typography>
      <Typography variant="h6">
        Tu solicitud de acceso esta en revisión, cualquier consulta escribir a
        consultas@peopleintelligence.app.
      </Typography>
      <Button variant="contained" onClick={handledash}>
        regresar al login
      </Button>
    </Box>
  );
}
