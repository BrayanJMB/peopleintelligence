import React from "react";
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
import Rletter from "../../assets/icons/Dletter.png";
import Oletter from "../../assets/icons/Jletter.png";
import Dletter from "../../assets/icons/Oletter.png";
import Jletter from "../../assets/icons/Rletter.png";
import Tletter from "../../assets/icons/Tletter.png";
import { Button } from "@mui/material";

const drawerWidth = 240;

const list = [Aletter, Rletter, Oletter, Dletter, Jletter, Tletter];
const names = [
  "Administración de Información",
  "Reporting Module",
  "Análisis de Redes Organizacionales",
  "Dynamic Live Conversation",
  "Journey Employee",
  "Sentimental Analysis",
];
export default function Dashboard() {
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
            <ListItemButton>
              <ListItemIcon>
                <img src={list[index]} alt="oletter" className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary={text} style={{ color: "grey" }} />
            </ListItemButton>
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
              <div
                className={styles.project}
                onClick={() => {
                  console.log("test");
                }}
              >
                <div>
                  <img src={Aletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>
                  Administración de Información
                </div>
              </div>
              <div className={styles.project}>
                <div>
                  <img src={Rletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Reporting Module</div>
              </div>
              <div className={styles.project}>
                <div>
                  <img src={Oletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>
                  Análisis de Redes Organizacionales
                </div>
              </div>
            </div>
            <div className={styles.case}>
              <div className={styles.project}>
                <div>
                  <img src={Dletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Dynamic Live Conversation</div>
              </div>
              <div className={styles.project}>
                <div>
                  <img src={Jletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Journey Employee</div>
              </div>
              <div className={styles.project}>
                <div>
                  <img src={Tletter} alt="oletter" className={styles.image} />
                </div>
                <div className={styles.title}>Sentimental Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
