import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const handledash = () => {
    navigate("/dashboard");
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
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" onClick={handledash}>
        Back Home
      </Button>
    </Box>
  );
}
