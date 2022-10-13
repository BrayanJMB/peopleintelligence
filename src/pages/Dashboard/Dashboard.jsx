import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Aletter from "../../assets/icons/Aletter.png";
import Rletter from "../../assets/icons/Rletter.png";
import Oletter from "../../assets/icons/Oletter.png";
import Dletter from "../../assets/icons/Dletter.png";
import Jletter from "../../assets/icons/Jletter.png";
import Tletter from "../../assets/icons/Tletter.png";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = 240;

const list = [Aletter, Rletter, Oletter, Dletter, Jletter, Tletter];

const names = [
  "Information Managment",
  "Advanced Analytics & Dashboards ",
  "Organizational Network Analysis",
  "Dynamic Live Conversation",
  "Journey Employee",
  "Sentimental Analysis",
];

const drop = [
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
];

const root = [
  "infoadmin",
  "powerbi",
  "onas",
  "dynamiclive",
  "journey",
  "analysis",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(Array(6).fill(null));

  const handleItemClick = (index) => (event) => {
    let tmp = anchorEl.map((val, key) => {
      if (index === key) {
        return event.currentTarget;
      } else {
        return val;
      }
    });
    setAnchorEl(tmp);
  };

  const handleClose = (index) => {
    let tmp = anchorEl.map((val, key) => {
      if (index === key) {
        return null;
      } else {
        return val;
      }
    });
    setAnchorEl(tmp);
  };

  const handleRedirect = (index, key) => {
    navigate("/" + root[index] + "/" + drop[index][key]);
  };

  const handleOnas = () => {
    navigate("/onas");
  };

  const handlePowerBI = () => {
    navigate("/powerbi");
  };

  const drawer = (
    <>
      <Toolbar>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profile"
          className={styles.photo}
        />
      </Toolbar>
      <List style={{ marginTop: "0.5rem" }}>
        {names.map((text, index) => (
          <ListItem key={index} disablePadding style={{ margin: "1rem 0" }}>
            <ListItemButton
              onClick={handleItemClick(index)}
              id={"demo-positioned-button" + index}
              aria-controls={
                Boolean(anchorEl[index]) ? "demo-positioned-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl[index]) ? "true" : undefined}
            >
              <ListItemIcon style={{ position: "relative" }}>
                <img src={list[index]} alt="oletter" className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary={text} style={{ color: "grey" }} />
            </ListItemButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl[index]}
              open={Boolean(anchorEl[index])}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={() => handleClose(index)}
            >
              {drop[index].map((val, key) => {
                return (
                  <MenuItem key={key}>
                    <div onClick={() => handleRedirect(index, key)}>{val}</div>
                  </MenuItem>
                );
              })}
            </Menu>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        elevation={0}
        style={{ backgroundColor: "white" }}
      >
        <Navbar />
      </AppBar>
      <Box
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              overflow: "hidden",
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <div className={styles.cases}>
            <div className={styles.case}>
              <div className={styles.project}>
                <div>
                  <img src={Aletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Information Management</div>
                <div className={styles.subtitle}>
                  Module de carga y administracion de bases de datos
                </div>
              </div>
              <div className={styles.project} onClick={handlePowerBI}>
                <div>
                  <img src={Rletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Reporting Module</div>
                <div className={styles.subtitle}>
                  Tableros interactivos de informacion corporativa
                </div>
              </div>
              <div className={styles.project}>
                <div>
                  <img src={Oletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title} onClick={handleOnas}>
                  Advanced Analytics & Dashboards
                </div>
                <div className={styles.subtitle}>
                  analisis de Redes Oranizacionaies
                </div>
              </div>
            </div>
            <div className={styles.case}>
              <div className={styles.project}>
                <div>
                  <img src={Dletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>
                  Organizational Network Analysis
                </div>
                <div className={styles.subtitle}>
                  Herramienta de conversaciones virtuales masivas con
                  intelligencia artificial
                </div>
              </div>
              <div className={styles.project}>
                <div>
                  <img src={Jletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Journey Employee</div>
                <div className={styles.subtitle}>
                  Medicion del ciclo de experiencia del colavorador
                </div>
                <div className={styles.sticker}>En Diseño</div>
              </div>
              <div className={styles.project}>
                <div>
                  <img src={Tletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Sentimental Analysis</div>
                <div className={styles.subtitle}>
                  Medicion y analisis de sentimientos de los colaboradores
                </div>
                <div className={styles.sticker}>En Diseño</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
