import React, { useState, useRef } from "react";
import styles from "./Onas.module.css";
import Navbar from "../../components/Navbar/Navbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Iletter from "../../assets/icons/Iletter.png";
import Aletter from "../../assets/icons/Aletter.png";
import Oletter from "../../assets/icons/Oletter.png";
import Dletter from "../../assets/icons/Dletter.png";
import Jletter from "../../assets/icons/Jletter.png";
import Sletter from "../../assets/icons/Sletter.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CSVLink } from "react-csv";
import axios from "axios";
import Notification from "../../components/Notification";

const config = {
  headers: { "Content-type": "application/csv" },
};
const config2 = {
  headers: { "Content-type": "multipart/form-data" },
};

const drawerWidth = 240;

const names = [
  "Information Management",
  "Advanced Analytics & Dashboards",
  "Organizational Network Analysis",
  "Dynamic Live Conversations",
  "Employee Journey",
  "Sentiment Analysis",
];

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

const root = [
  "infoadmin",
  "powerbi",
  "onas",
  "dynamiclive",
  "journey",
  "analysis",
];

const drop = [
  [
    "Information Management",
    "Empresas",
    "Empleados",
    "Oficinas",
    "Departamentos",
    "Otros campos",
  ],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  [
    "Organizational Network Analysis",
    "Cargar Información audiencia",
    "Envío de correo electrónico",
    "Monitor de avance ",
    "Analítica",
  ],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
];

const list = [Iletter, Aletter, Oletter, Dletter, Jletter, Sletter];

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("_") +
    "&" +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join("_")
  );
}

const companyId = "1";
const versionId = "5f244111-b80a-421a-b11d-ea59e8156fde";

export default function Onas() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(Array(6).fill(null));
  const [transactionData, setTransactionData] = useState("");
  const [datetime, setDatetime] = useState(formatDate(new Date()));
  const csvLink = useRef();
  const [values, setValues] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });

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

  const handleDownload = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net//api/OnasSurvey/",
        })
        .get("/home/officiel/Downloads/mails.csv", config)
        .then((res) => {
          setDatetime(formatDate(new Date()));
          setTransactionData(res.data);
          csvLink.current.link.click();
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleImport = async (file) => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/OnasSurvey/",
        })
        .post("" + companyId + "/" + versionId, { data: file }, config2)
        .then((res) => {
          setValues({
            ...values,
            message: res.data,
            isOpen: true,
            severity: "success",
          });
        });
    } catch (error) {
      setValues({
        ...values,
        message: "Hubo un error al momento de cargar los empleados",
        isOpen: true,
        severity: "error",
      });
      console.log(error);
    }
  };

  const handleCloseNotification = () => {
    setValues({ ...values, isOpen: false });
  };

  const handleFile = async (event) => {
    await handleImport(event.target.files[0]);
  };

  const handleLink = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/OnasSurvey/EnvioMAilOnas/",
        })
        .get(versionId, config)
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      setValues({
        ...values,
        message: "Error",
        isOpen: true,
        severity: "error",
      });
      console.log(error);
    }
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
                  <MenuItem key={key} disabled={key === 0}>
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
    <ThemeProvider theme={theme}>
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
            <div className={styles.onas}>
              <div className={styles.heading}>
                <strong>
                  Dar de altos audiencia para ONAS y envío de correo de
                  invitación
                </strong>
              </div>
              <div className={styles.books}>
                <div className={styles.book}>
                  <ImportContactsIcon style={{ marginRight: "0.5rem" }} /> Como
                  dar alta nuevos empleados?
                </div>
                <div className={styles.book}>
                  <ImportContactsIcon style={{ marginRight: "0.5rem" }} />
                  Como corregir errores de registro?
                </div>
              </div>
              <div className={styles.operations}>
                <div className={styles.inside}>
                  <div className={styles.crud}>
                    <div className={styles.holder}>
                      <div className={styles.sticker}>POR PRIMERA VEZ</div>
                      <div className={styles.text}>
                        <div className={styles.info}>
                          <strong className={styles.space}>
                            Es la primera vez{" "}
                          </strong>{" "}
                          que subo usuarios a la plataforma.
                        </div>
                        <div
                          className={styles.info}
                          style={{ marginTop: "1rem" }}
                        >
                          Es importante que te descargues la planilla base, ya
                          que cuenta con las columnas necesarias para la
                          importación y asi evitar posibles errores.
                        </div>
                      </div>
                      <div className={styles.button}>
                        <Button
                          variant="contained"
                          startIcon={<CloudDownloadOutlinedIcon />}
                          style={{
                            whiteSpace: "nowrap",
                            padding: "0.5rem 1rem",
                            color: "white",
                          }}
                          color="blue"
                          onClick={handleDownload}
                        >
                          Descargar planilla
                        </Button>
                        <CSVLink
                          data={transactionData}
                          filename={"ResultadoOnas" + datetime + ".csv"}
                          style={{ display: "none" }}
                          ref={csvLink}
                          target="_blank"
                        />
                      </div>
                    </div>
                    <div className={styles.holder}>
                      <div
                        className={styles.sticker}
                        style={{ textAlign: "center" }}
                      >
                        PASO 2
                      </div>
                      <div className={styles.text}>
                        <div className={styles.info}>
                          <strong className={styles.space}>
                            Ya tengo una plantilla completa{" "}
                          </strong>
                          ista para subir
                        </div>
                        <div
                          className={styles.info}
                          style={{ marginTop: "1rem" }}
                        >
                          Ahora si, ya puedes subirla para que podamos procesar
                          los datos y luego confirmar la importación.
                        </div>
                      </div>
                      <div className={styles.button}>
                        <Button
                          variant="contained"
                          startIcon={<CloudUploadOutlinedIcon />}
                          style={{
                            whiteSpace: "nowrap",
                            padding: "0.5rem 1rem",
                            color: "white",
                          }}
                          component="label"
                          color="blue"
                        >
                          <input
                            type="file"
                            onChange={handleFile}
                            accept=".csv"
                            name="file"
                            hidden
                          />
                          Importar empleados
                        </Button>
                      </div>
                    </div>
                    <div className={styles.holder}>
                      <div
                        className={styles.sticker}
                        style={{ textAlign: "center" }}
                      >
                        PASO 3
                      </div>
                      <div className={styles.text}>
                        <div className={styles.info}>
                          <strong className={styles.space}>Compartir </strong>{" "}
                          Por correo electrónico
                        </div>
                      </div>

                      <div className={styles.button}>
                        <Button
                          variant="contained"
                          startIcon={<ContentCopyIcon />}
                          style={{
                            whiteSpace: "nowrap",
                            padding: "0.5rem 1rem",
                            color: "white",
                            width: "100%",
                          }}
                          color="blue"
                          onClick={handleLink}
                        >
                          Enviar correo
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div>
                      Tienes dudas?{" "}
                      <strong style={{ color: "#03aae4" }}>
                        {" "}
                        Mira este video tutorial
                      </strong>
                    </div>
                    <div style={{ display: "flex" }}>
                      <TipsAndUpdatesOutlinedIcon
                        style={{ marginRight: "1rem", fontWeight: "bold" }}
                      />
                      <p style={{ fontWeight: "bold", alignContent: "center" }}>
                        TIPS
                      </p>
                    </div>
                    <div style={{ lineHeight: "1.5rem" }}>
                      Recuerda que cuanto mas completos sean los datos de los
                      empleados , mejores reportes de encuestas obtendras cuando
                      quieras filtrar por departamentos , oficinas , genero ,
                      edad , etc.
                    </div>
                    <div style={{ lineHeight: "1.5rem" }}>
                      Podras actualizarlos cuando quieras , pero recuerda que
                      los combios entraran en vigencia para las encuestas
                      posteriores
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Notification
          severity={values.severity}
          message={values.message}
          isOpen={values.isOpen}
          onClose={handleCloseNotification}
        />
      </Box>
    </ThemeProvider>
  );
}
