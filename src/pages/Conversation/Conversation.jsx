import Box from "@mui/material/Box";
import ConSidebar from "../../Layout/ConSidebar/ConSidebar";
import Build from "../../components/Build/Build";
import Live from "../../components/Live/Live";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Conversation() {
  const { type } = useParams();
  const theme = createTheme({
    palette: {
      blue: {
        main: "#00b0f0",
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <ConSidebar type={type} />
        {renderSwitch(type)}
      </Box>
    </ThemeProvider>
  );
}
