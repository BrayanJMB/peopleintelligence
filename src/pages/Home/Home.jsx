import React, { useState, useCallback, useEffect } from "react";
import styles from "./Home.module.css";
import Box from "@mui/material/Box";
import Logo from "../../assets/Logo.svg";
import Building from "../../assets/Building.svg";
import Button from "@mui/material/Button";
import One from "../../components/One/One";
import Multiple from "../../components/Multiple/Multiple";
import Register from "../../components/Register/Register";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const config = {
  headers: { "Content-type": "application/json" },
};

export default function Home() {
  const [begin, setBegin] = useState(true);
  const [one, setOne] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [register, setRegister] = useState(false);
  const [data, setData] = useState({
    documentType: [],
    country: [],
    sizeCompany: [],
    sector: [],
  });
  const [sector, setSector] = useState([]);
  const [country, setCountry] = useState([]);
  const [sizeCompany, setSizeCompany] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [info, setInfo] = useState({
    Usuario: {
      IdTipoDocumento: "",
      numeroDocumento: "",
      NombreCompleto: "",
      Cargo: "",
      correoElectronico: "",
      phoneNumber: "",
    },
    Compania: {
      nombreCompania: "",
      Logotipo:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      IdPais: "",
      Sede: "",
      direccion: "",
      IdTamanoCompania: "",
      SectorId: "",
    },
  });

  const theme = createTheme({
    palette: {
      blue: {
        main: "#03aae4",
      },
    },
  });

  const sectorConsume = async () => {
    try {
      await axios
        .create({
          baseURL: "https://dynamicliveconversationapi.azurewebsites.net/api/",
        })
        .get("Sector/", config)
        .then((res) => {
          let filter = [];
          let holder = [];
          res.data.forEach((val) => {
            if (!filter.includes(val.Sector)) {
              filter.push(val.Sector);
              holder.push(val);
            }
          });
          setSector(filter);
          setData({ ...data, sector: holder });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sizeCompanyConsume = async () => {
    try {
      await axios
        .create({
          baseURL: "https://dynamicliveconversationapi.azurewebsites.net/api/",
        })
        .get("TamanoCompania/", config)
        .then((res) => {
          let filter = [];
          let holder = [];
          res.data.forEach((val) => {
            if (!filter.includes(val.nameSizeOfCompany)) {
              filter.push(val.nameSizeOfCompany);
              holder.push(val);
            }
          });
          setSizeCompany(filter);
          setData({ ...data, sizeCompany: holder });
        });
    } catch (error) {
      console.log(error);
      console.log("eror");
    }
  };

  const countryConsume = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/paises/",
        })
        .get("", config)
        .then((res) => {
          let filter = [];
          let holder = [];
          res.data.forEach((val) => {
            if (!filter.includes(val.pais)) {
              filter.push(val.pais);
              holder.push(val);
            }
          });
          setCountry(filter);
          setData({ ...data, country: holder });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const documentTypeConsume = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/tipo-documentos/",
        })
        .get("", config)
        .then((res) => {
          let filter = [];
          let holder = [];
          res.data.forEach((val) => {
            if (!filter.includes(val.tipoDocumento)) {
              filter.push(val.tipoDocumento);
              holder.push(val);
            }
          });
          setDocumentType(filter);
          setData({ ...data, documentType: holder });
        });
    } catch (error) {
      console.log(error);
    }
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

  const handlephoto = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        let companie = info.Compania;
        companie.Logotipo = reader.result;
        setInfo({ ...info, Compania: companie });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleoneCompany = () => {
    setOne(true);
    setBegin(false);
  };
  const handlemultipleCompany = () => {
    setMultiple(true);
    setBegin(false);
  };
  const handleCancel = () => {
    setOne(false);
    setMultiple(false);
    setBegin(true);
  };
  const handleRegister = () => {
    setRegister(true);
    setOne(false);
    setMultiple(false);
  };

  useEffect(() => {
    if (country.length === 0) {
      countryConsume();
    }
    if (sizeCompany.length === 0) {
      sizeCompanyConsume();
    }
    if (sector.length === 0) {
      sectorConsume();
    }
    if (documentType.length === 0) {
      documentTypeConsume();
    }
  }, [country.length, sizeCompany.length, sector.length, documentType.length]);
  return (
    <div className={styles.screen}>
      <ThemeProvider theme={theme}>
        {begin ? (
          <div className={styles.inner_box}>
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
              <div className={styles.option}>
                <p>
                  Selecciona la opción que mejor se adapte a tus necesidades
                </p>
              </div>
              <div className={styles.cuenta}>
                <div className={styles.box}>
                  <Box component="img" alt="Your logo." src={Building} />
                  <h4 style={{ margin: 0, textAlign: "center" }}>
                    CUENTA ÚNICA EMPRESA
                  </h4>
                  <p className={styles.description}>
                    Selecciona esta opción si vas a administrar y gestionar una
                    cuenta empresarial.
                  </p>
                  <Button
                    variant="contained"
                    onClick={handleoneCompany}
                    color="blue"
                    sx={{
                      color: "white",
                    }}
                  >
                    Seleccionar
                  </Button>
                </div>
                <div className={styles.box}>
                  <Box component="img" alt="Your logo." src={Building} />
                  <h4 style={{ margin: 0, textAlign: "center" }}>
                    CUENTA MULTI EMPRESAS
                  </h4>
                  <p className={styles.description}>
                    Selecciona esta opción eres un grupo empresarial o un
                    consultor que administra y gestiona varias empresas
                  </p>
                  <Button
                    variant="contained"
                    onClick={handlemultipleCompany}
                    color="blue"
                    sx={{
                      color: "white",
                    }}
                  >
                    Seleccionar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {one ? (
              <div className={styles.inner_box}>
                <One
                  handleAutocomplete={handleautocomplete}
                  handleChange={handlechange}
                  handlePhoto={handlephoto}
                  info={info}
                  country={country}
                  sector={sector}
                  documentType={documentType}
                  sizeCompany={sizeCompany}
                  handleCancel={handleCancel}
                  handleRegister={handleRegister}
                  data={data}
                />
              </div>
            ) : (
              <></>
            )}
            {multiple ? (
              <div className={styles.inner_box}>
                <Multiple
                  handleAutocomplete={handleautocomplete}
                  handleChange={handlechange}
                  info={info}
                  documentType={documentType}
                  handleCancel={handleCancel}
                  handleRegister={handleRegister}
                  data={data}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {register ? (
          <div className={styles.inner_box}>
            <Register />
          </div>
        ) : (
          <></>
        )}
      </ThemeProvider>
    </div>
  );
}
