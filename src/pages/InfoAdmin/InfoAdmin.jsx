import React, { useState, useCallback, useEffect } from "react";
import styles from "./InfoAdmin.module.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
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
import Building from "../../assets/Building.svg";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import NewCompany from "../../components/NewCompany/NewCompany";
import axios from "axios";

const config = {
  headers: { "Content-type": "application/json" },
};

const drawerWidth = 240;

const drop = [
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
];

const names = [
  "Information Managment",
  "Advanced Analytics & Dashboards ",
  "Organizational Network Analysis",
  "Dynamic Live Conversation",
  "Journey Employee",
  "Sentimental Analysis",
];

const list = [Aletter, Rletter, Oletter, Dletter, Jletter, Tletter];

export default function InfoAdmin() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [anchorEl, setAnchorEl] = useState(Array(6).fill(null));
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [info, setInfo] = useState({
    Usuario: {
      IdTipoDocumento: "",
      numeroDocumento: "",
      NombreCompleto: "",
      Cargo: "",
      correoElectronico: "",
      phoneNumber: "",
    },
  });
  const [data, setData] = useState({
    content: { documentType: [] },
    ids: { documentType: [] },
  });

  const documentTypeConsume = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/tipo-documentos/",
        })
        .get("", config)
        .then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.tipoDocumento)) {
              fetch.push(val.tipoDocumento);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.documentType = fetch;
          holder.ids.documentType = id;
          setData(holder);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
    navigate("/infoadmin/" + drop[index][key]);
  };

  const handleautocomplete = useCallback(
    (part, name, value) => {
      let holder = info[part];
      holder[name] = value;
      setInfo({ ...info, [part]: holder });
    },
    [info]
  );

  const handlechange = useCallback(
    (part) => (event) => {
      let holder = info[part];
      holder[event.target.name] = event.target.value;
      setInfo({ ...info, [part]: holder });
    },
    [info]
  );

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

  const renderSwitch = () => {
    switch (type) {
      case "Empresas":
        return (
          <NewCompany
            info={info}
            content={data.content}
            handleAutocomplete={handleautocomplete}
            handleChange={handlechange}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    switch (type) {
      case "Empresas":
        if (data.content.documentType.length === 0) {
          documentTypeConsume();
        }
        break;

      default:
        break;
    }
  }, []);

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
          <div className={styles.crud}>
            <div className={styles.top}>
              <div className={styles.type}>
                <Box
                  component="img"
                  alt="Your logo."
                  src={Building}
                  className={styles.icontype}
                />
                <h1>{type}</h1>
              </div>
              <div className={styles.new}>
                <Button
                  variant="contained"
                  style={{
                    whiteSpace: "nowrap",
                    padding: "1rem 1rem",
                    color: "white",
                  }}
                  color="primary"
                  onClick={handleOpenModal}
                >
                  nueva {type}
                </Button>
                <Modal
                  open={open}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={styles.modal}>
                    <div className={styles.modaltop}>
                      <h2>Nueva {type}</h2>
                      <div>
                        <IconButton onClick={handleCloseModal}>
                          <ClearIcon sx={{ fontSize: "40px" }} />
                        </IconButton>
                      </div>
                    </div>
                    <div className={styles.modalbuttom}>{renderSwitch()}</div>
                  </Box>
                </Modal>
              </div>
            </div>
            <div className={styles.buttom}></div>
          </div>
        </div>
      </div>
    </Box>
  );
}
