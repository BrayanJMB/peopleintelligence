import { Box, Button, Typography } from "@mui/material";

export default function NoAccess() {
  const handledash = () => {
    window.location.replace(
      "https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login"
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        minHeight: "100vh",
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
