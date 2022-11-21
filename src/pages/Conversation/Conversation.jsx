import Box from "@mui/material/Box";
import ConSidebar from "../../Layout/ConSidebar/ConSidebar";
import Build from "../../components/Build/Build";
import Live from "../../components/Live/Live";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Conversation() {
  const { type } = useParams();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const theme = createTheme({
    palette: {
      blue: {
        main: "#00b0f0",
      },
      grey: {
        main: "#808080",
      },
    },
  });

  const renderSwitch = () => {
    switch (type) {
      case "Build":
        return <Build />;
      case "Live":
        return <Live />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (userInfo.role !== "Dinamyc") {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <ConSidebar type={type} />
        {renderSwitch(type)}
      </Box>
    </ThemeProvider>
  );
}
