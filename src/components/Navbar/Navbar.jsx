import React from "react";
import styles from "./Navbar.module.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

export default function Navbar() {
  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}></Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </Container>
  );
}
