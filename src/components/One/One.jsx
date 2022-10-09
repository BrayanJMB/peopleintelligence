import React, { useState, useEffect } from "react";
import styles from "./One.module.css";
import Box from "@mui/material/Box";
import Logo from "../../assets/Logo.svg";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function One() {
  const [value, setValue] = useState(0);
  const [image, setImage] = useState(0);
  const [checked, setChecked] = useState(true);
  const [info, setInfo] = useState({
    nombreEmpresa: "",
    sector: "",
    pais: "",
    sede: "",
    direccion: "",
    tamanoEmpresa: "",
    tipoDocumento: "",
    documento: "",
    nombreCompleto: "",
    cargo: "",
    correo: "",
    numero: "",
    image: "",
  });

  const handletab = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }

  const handlephoto = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
        className={styles.tab}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  useEffect(() => {}, []);

  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <Box
          component="img"
          sx={{
            backgroundColor: "white",
          }}
          alt="Your logo."
          src={Logo}
        />
      </div>
      <div style={{ width: "100%", marginTop: "1.5rem" }}>
        <div sx={{ border: "none" }}>
          <Tabs
            value={value}
            onChange={handletab}
            aria-label="basic tabs example"
            centered
          >
            <Tab
              label="INFORMACIÓN DE LA EMPRESA"
              style={{ width: "100%" }}
              {...a11yProps(0)}
            />
            <Tab
              label="DATOS DEL ADMINISTRADOR"
              style={{ width: "100%" }}
              disabled={checked}
              {...a11yProps(1)}
            />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <img src="" alt="profile" className={styles.photo} />
          <input type="file" onChange={handlephoto} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </div>
    </div>
  );
}
