import { useCallback, useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Building from '../../assets/Building.svg';
import Logo from '../../assets/Logo.svg';
import Multiple from '../../components/Multiple/Multiple';
import MyLoader from '../../components/MyLoader/MyLoader';
import Notification from '../../components/Notification';
import One from '../../components/One/One';
import { setCredentials } from '../../features/authSlice';
import axios from '../../utils/axiosInstance';

import styles from './Home.module.css';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.hash);
  const result = {};
  for (const entry of urlParams.entries()) {
    result[entry[0]] = entry[1];
  }
  const access_token = result['#access_token'];
  const [begin, setBegin] = useState(true);
  const [one, setOne] = useState(false);
  const [disable, setDisable] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [register, setRegister] = useState(false);
  const [data, setData] = useState({
    content: { documentType: [], country: [], sizeCompany: [], sector: [] },
    ids: { documentType: [], country: [], sizeCompany: [], sector: [] },
  });
  const [response, setResponse] = useState('');
  const [info, setInfo] = useState({
    Usuario: {
      IdTipoDocumento: '',
      numeroDocumento: '',
      NombreCompleto: '',
      Cargo: '',
      correoElectronico: '',
      phoneNumber: '',
    },
    Compania: {
      nombreCompania: '',
      Logotipo: null,
      IdPais: '',
      Sede: '',
      direccion: '',
      IdTamanoCompania: '',
      SectorId: '',
    },
  });
  const [values, setValues] = useState({
    isOpen: false,
    message: '',
    severity: '',
  });

  const theme = createTheme({
    palette: {
      blue: {
        main: '#03aae4',
      },
    },
  });

  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  const sectorConsume = async () => {
    try {
      await axios.get('Sector/', config).then((res) => {
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

    }
  };

  const sizeCompanyConsume = async () => {
    try {
      await axios.get('TamanoCompania/', config).then((res) => {
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
    }
  };

  const countryConsume = async () => {
    try {
      await axios.get('paises/', config).then((res) => {
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
    }
  };

  const documentTypeConsume = async () => {
    try {
      await axios.get('tipo-documentos/', config).then((res) => {
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
    }
  };

  const decodeToken = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(
      atob(base64Url)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(base64);
  };

  const tokenConsume = async () => {
    const config = {
      headers: { 'Content-type': 'application/json' },
    };
    try {
      setLoading(true);
      await axios
        .post('Aut/', { bearer: `Bearer ${access_token}` }, config)
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
              username: decodedToken.name,
              Company: decodedToken.Company,
              accessToken: token,
              role: decodedToken.role,
            })
          );

          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              user: decodedToken.user,
              username: decodedToken.name,
              Company: decodedToken.Company,
              accessToken: token,
              role: decodedToken.role,
            })
          );

          const userInfo = JSON.parse(localStorage.getItem('userInfo'));
          if (userInfo.role.findIndex((p) => p === 'Registrado') > -1) {
            navigate('/noaccess');
          } else if (userInfo.role.length > 0) {
            navigate('/dashboard');
          }
          countryConsume();
          sizeCompanyConsume();
          sectorConsume();
          documentTypeConsume();
          setLoading(false);
        });
    } catch (error) {
      if (error.response.status === 401) {
        window.location.replace(
          //`https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login`
          `${process.env.REACT_APP_DOMAIN_INSTANCE}.b2clogin.com/${process.env.REACT_APP_DOMAIN_TENANT}/oauth2/v2.0/authorize?p=${process.env.REACT_APP_USER_FLOW}&client_id=${process.env.REACT_APP_CLIENT_ID}&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app%2F&scope=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_TENANT}%2Fapi%2FFiles.Read&response_type=token&prompt=login`  
        );
      }
      if (error.response.status === 400) {
        alert('El correo ingresado no es un correo corporativo');
        window.location.replace(
          //`https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login`
          `${process.env.REACT_APP_DOMAIN_INSTANCE}.b2clogin.com/${process.env.REACT_APP_DOMAIN_TENANT}/oauth2/v2.0/authorize?p=${process.env.REACT_APP_USER_FLOW}&client_id=${process.env.REACT_APP_CLIENT_ID}&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app%2F&scope=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_TENANT}%2Fapi%2FFiles.Read&response_type=token&prompt=login`
        );
      }
      if (error.response.status === 403) {
        let holder = info.Usuario;
        holder.correoElectronico = error.response.data;
        setInfo({ ...info, Usuario: holder });
        setDisable(true);
      }
      countryConsume();
      sizeCompanyConsume();
      sectorConsume();
      documentTypeConsume();
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
    if (event.target.files[0].size < 500000) {
      let companie = info.Compania;
      companie.Logotipo = event.target.files[0];
      setInfo({ ...info, Compania: companie });
    } else {
      setValues({
        ...values,
        message:
          'El tamaño de la imagen para el logotipo no puede ser mayor a 500kB',
        isOpen: true,
        severity: 'error',
      });
    }
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

  const handlePhone = (value) => {
    let holder = info.Usuario;
    holder.phoneNumber = value;
    setInfo({ ...info, Usuario: holder });
  };
  
  useEffect(() => {
    if (!access_token) {
      window.location.replace(
        //`https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login`
        `${process.env.REACT_APP_DOMAIN_INSTANCE}.b2clogin.com/${process.env.REACT_APP_DOMAIN_TENANT}/oauth2/v2.0/authorize?p=${process.env.REACT_APP_USER_FLOW}&client_id=${process.env.REACT_APP_CLIENT_ID}&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app%2F&scope=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_TENANT}%2Fapi%2FFiles.Read&response_type=token&prompt=login`
      );
    } else {
      tokenConsume();
    }
  }, [access_token]);
  return (
    <>
    {loading === true && <MyLoader />}
    {loading === false && (
    <div className={styles.screen}>

      <ThemeProvider theme={theme}>
        <Notification
          severity={values.severity}
          message={values.message}
          isOpen={values.isOpen}
          onClose={handleClose}
        />
        {begin ? (
          <div className={styles.inner_box}>
            <div className={styles.content}>
              <div className={styles.image}>
                <Box
                  component="img"
                  sx={{
                    backgroundColor: 'white',
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
                  <h4 style={{ margin: 0, textAlign: 'center' }}>
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
                      color: 'white',
                    }}
                  >
                    Seleccionar
                  </Button>
                </div>
                <div className={styles.box}>
                  <Box component="img" alt="Your logo." src={Building} />
                  <h4 style={{ margin: 0, textAlign: 'center' }}>
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
                      color: 'white',
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
                  disable={disable}
                  handlePhone={handlePhone}
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
                  disable={disable}
                  handlePhone={handlePhone}
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
                    backgroundColor: 'white',
                  }}
                  alt="Your logo."
                  src={Logo}
                />
              </div>
              <div className={styles.register}>
                <h2
                  className={styles.succesfully}
                  style={{ color: '#03aae4', marginBottom: '3.5rem' }}
                >
                  ¡Tu registro ha sido exitoso!
                </h2>
                <p>{response}</p>
              </div>
              <div className={styles.end}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#03aae4' }}
                  onClick={() => {
                    window.location.replace(
                      `https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login`
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
    )}
    </>
  );
}
