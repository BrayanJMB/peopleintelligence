import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";

const drawerWidth = 264;

export default function ConNavbar() {
  return (
    <AppBar
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
      }}
      elevation={0}
      style={{ backgroundColor: "white" }}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "1rem",
          }}
        >
          <p style={{ color: "black" }}>title after cick save button</p>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "2rem",
          }}
        >
          <Button variant="text" style={{ marginRight: "1.5rem" }} disabled>
            Share
          </Button>
          <Button variant="contained" disabled>
            Publish
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
