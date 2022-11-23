import { useState, useCallback, useEffect } from "react";
import styles from "./Home.module.css";
import Box from "@mui/material/Box";
import Logo from "../../assets/Logo.svg";
import Building from "../../assets/Building.svg";
import Button from "@mui/material/Button";
import One from "../../components/One/One";
import Multiple from "../../components/Multiple/Multiple";
import axios from "../../utils/axiosInstance";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.hash);
  const result = {};
  for (const entry of urlParams.entries()) {
    result[entry[0]] = entry[1];
  }
  const access_token = result["#access_token"];
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
      await axios.get("Sector/", config).then((res) => {
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
      await axios.get("TamanoCompania/", config).then((res) => {
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
      await axios.get("paises/", config).then((res) => {
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
      await axios.get("tipo-documentos/", config).then((res) => {
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

  const decodeToken = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(base64);
  };

  const tokenConsume = async () => {
    const config = {
      headers: { "Content-type": "application/json" },
    };
    try {
      await axios
        .post("Aut/", { bearer: `Bearer ${access_token}` }, config)
        .then((res) => {
          let token = res.data.token;
          let decodedToken = decodeToken(token);
          if (!Array.isArray(decodedToken.role)) {
            let tmp = [];
            tmp.push(decodedToken.role);
            decodedToken.role = [...tmp];
          }
          dispatch(
            setCredentials({
              user: decodedToken.user,
              Company: decodedToken.Company,
              accessToken: token,
              role: decodedToken.role,
            })
          );
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              user: decodedToken.user,
              Company: decodedToken.Company,
              accessToken: token,
              role: decodedToken.role,
            })
          );

          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          if (userInfo.role.findIndex((p) => p === "Registrado") > -1) {
            navigate("/noaccess");
          } else if (userInfo.role.length > 0) {
            navigate("/dashboard");
          }
          countryConsume();
          sizeCompanyConsume();
          sectorConsume();
          documentTypeConsume();
        });
    } catch (error) {
      if (error.response.status === 401) {
        window.location.replace(
          "https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login"
        );
      }
      if (error.response.status === 400) {
        alert("El correo ingresado no es un correo corporativo");
        window.location.replace(
          "https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login"
        );
      }
      countryConsume();
      sizeCompanyConsume();
      sectorConsume();
      documentTypeConsume();
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
    if (!access_token) {
      window.location.replace(
        "https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login"
      );
    } else {
      tokenConsume();
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
            ) : null}
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
            ) : null}
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
                      "https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login"
                    );
                  }}
                >
                  Volver al inicio de sesión
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </ThemeProvider>
    </div>
  );
}
