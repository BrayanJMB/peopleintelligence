import React from "react";
import styles from "./Onas.module.css";
import Navbar from "../../components/Navbar/Navbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

const drawerWidth = 180;

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

export default function Onas() {
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
        <div style={{ backgroundColor: "white" }}>
          <div className={styles.content}>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="profile"
              className={styles.photo}
            />
            <div className={styles.onas}>
              <div className={styles.heading}>
                Importar emploados <strong> desde un archivo</strong>
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
                        >
                          Descargar planilla
                        </Button>
                      </div>
                    </div>
                    <div className={styles.holder}>
                      <div className={styles.sticker}>PASO 2</div>
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
                          color="blue"
                        >
                          Importar empleados
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
      </Box>
    </ThemeProvider>
  );
}
