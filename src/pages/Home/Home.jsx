import React, { useState, useCallback, useEffect } from "react";
import styles from "./Home.module.css";
import Box from "@mui/material/Box";
import Logo from "../../assets/Logo.svg";
import Building from "../../assets/Building.svg";
import Button from "@mui/material/Button";
import One from "../../components/One/One";
import Multiple from "../../components/Multiple/Multiple";
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
    content: { documentType: [], country: [], sizeCompany: [], sector: [] },
    ids: { documentType: [], country: [], sizeCompany: [], sector: [] },
  });
  const [response, setResponse] = useState("");
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
      Logotipo: null,
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
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.Sector)) {
              fetch.push(val.Sector);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.sector = fetch;
          holder.ids.sector = id;
          setData(holder);
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
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.nameSizeOfCompany)) {
              fetch.push(val.quantityOfEmployees);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.sizeCompany = fetch;
          holder.ids.sizeCompany = id;
          setData(holder);
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
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.pais)) {
              fetch.push(val.pais);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.country = fetch;
          holder.ids.country = id;
          setData(holder);
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
  const handleRegister = (message) => {
    setResponse(message);
    setRegister(true);
    setOne(false);
    setMultiple(false);
  };

  useEffect(() => {
    if (data.content.country.length === 0) {
      countryConsume();
    }
    if (data.content.sizeCompany.length === 0) {
      sizeCompanyConsume();
    }
    if (data.content.sector.length === 0) {
      sectorConsume();
    }
    if (data.content.documentType.length === 0) {
      documentTypeConsume();
    }
  }, []);
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
                  handleCancel={handleCancel}
                  handleRegister={handleRegister}
                  info={info}
                  content={data.content}
                  ids={data.ids}
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
                  handleCancel={handleCancel}
                  handleRegister={handleRegister}
                  info={info}
                  content={data.content}
                  ids={data.ids}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {register ? (
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
              <div className={styles.register}>
                <h2
                  className={styles.succesfully}
                  style={{ color: "#03aae4", marginBottom: "3.5rem" }}
                >
                  ¡Tu registro ha sido exitoso!
                </h2>
                <p>{response}</p>
              </div>
              <div className={styles.end}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#03aae4" }}
                  onClick={() => {
                    window.location.replace(
                      "https://pruebaapib2c.b2clogin.com/PruebaAPib2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignInSingUp&client_id=08cfdf65-11e3-45b6-a745-3c0bd35777ae&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjwt.ms%2F&scope=openid&response_type=id_token&prompt=login"
                    );
                  }}
                >
                  Volver al inicio de sesión
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </ThemeProvider>
    </div>
  );
}
