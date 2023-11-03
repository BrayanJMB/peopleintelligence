import { useEffect,useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MuiPhoneNumber from 'material-ui-phone-number-2';

import defaultImage from '../../assets/default.png';
import Logo from '../../assets/Logo.svg';
import Notification from '../../components/Notification';

import styles from './One.module.css';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

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
      {value === index && <>{children}</>}
    </div>
  );
}

const validEmail = new RegExp(
  '^[a-zA-Z0-9.!#$%&\'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$'
);
const validBusinessEmail = new RegExp(
  '^[a-zA-Z0-9.!#$%&\'+/=?^_`{|}~-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$'
);
const validphone = new RegExp('^[+][0-9]{12,15}$');

const config = {
  headers: { 'Content-type': 'application/json' },
};

export default function One(props) {
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(true);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [checktext1, setChecktext1] = useState(false);
  const [checktext2, setChecktext2] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [values, setValues] = useState({
    isOpen: false,
    message: '',
    severity: '',
  });
  const [scroll, setScroll] = useState('paper');
  const [open, setOpen] = useState(false);
  const handlemodalOpen = () => setOpen(true);

  const handlecheck1 = () => {
    setCheck1(!check1);
  };
  const handlecheck2 = () => {
    setCheck2(!check2);
  };
  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const checkcompany = () => {
    const helperText = {};
    const error = {};
    let bad = false;
    for (const [key, value] of Object.entries({
      nombreCompania: props.info.Compania.nombreCompania,
      IdPais: props.info.Compania.IdPais,
      Sede: props.info.Compania.Sede,
      direccion: props.info.Compania.direccion,
      IdTamanoCompania: props.info.Compania.IdTamanoCompania,
      SectorId: props.info.Compania.SectorId,
    })) {
      if (props.info.Compania[key] === '') {
        helperText[key] = 'El campo no puede ir vacio';
        error[key] = true;
        bad = true;
      } else {
        helperText[key] = '';
        error[key] = false;
      }
    }
    if (bad) {
      setErrorMessage(error);
      setHelperText(helperText);
    } else {
      setChecked(false);
      setValue(1);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let helperText = {};
    let error = {};
    let bad = false;

    let logoTipo = null;

    if (props.info.Compania.Logotipo !== null) {
      let bodyFormData = new FormData();
      bodyFormData.append('logoTipo', props.info.Compania.Logotipo);

      await fetch(
        `${process.env.REACT_APP_API_URL}Autenticacion/LogoCompany?BussinesName=${props.info.Compania.nombreCompania}`,
        {
          method: 'POST',
          body: bodyFormData,
        }
      )
        .then((response) => response.json())
        .then((res) => {
          logoTipo = res.urlLogo;
        })
        .catch((err) => console.log(err));
    }

    for (const [key, value] of Object.entries({
      IdTipoDocumento: props.info.Usuario.IdTipoDocumento,
      numeroDocumento: props.info.Usuario.numeroDocumento,
      NombreCompleto: props.info.Usuario.NombreCompleto,
      Cargo: props.info.Usuario.Cargo,
      correoElectronico: props.info.Usuario.correoElectronico,
      phoneNumber: props.info.Usuario.phoneNumber,
    })) {
      if (props.info.Usuario[key] === '') {
        helperText[key] = 'El campo no puede ir vacio';
        error[key] = true;
        bad = true;
      } else {
        helperText[key] = '';
        error[key] = false;
      }
    }

    if (!validEmail.test(props.info.Usuario.correoElectronico)) {
      helperText.correoElectronico = 'El correo ingresado no es válido';
      error.correoElectronico = true;
      bad = true;
    } else if (!validBusinessEmail.test(props.info.Usuario.correoElectronico)) {
      helperText.correoElectronico = 'El correo ingresado debe ser corporativo';
      error.correoElectronico = true;
      bad = true;
    }

    if (props.info.Usuario.numeroDocumento < 10000000) {
      helperText['numeroDocumento'] = 'El tamaño minimo del campo es 8 digitos';
      error['numeroDocumento'] = true;
      bad = true;
    }

    if (!validphone.test(props.info.Usuario.phoneNumber)) {
      helperText['phoneNumber'] = 'Escriba un numero telefonico válido';
      error['phoneNumber'] = true;
      bad = true;
    }

    if (bad) {
      setErrorMessage(error);
      setHelperText(helperText);
    } else if (check1 && check2 && captcha) {
      let test = false;
      for (const [key, value] of Object.entries(props.info)) {
        for (const [index, content] of Object.entries(value)) {
          if (index === 'Logotipo') {
            continue;
          }
          if (content === '' || content === null) {
            test = true;
          }
        }
      }
      if (!test) {
        let matchsector = search(
          props.info.Compania.SectorId,
          props.ids.sector,
          'Sector'
        );
        let matchcountry = search(
          props.info.Compania.IdPais,
          props.ids.country,
          'pais'
        );
        let matchsize = search(
          props.info.Compania.IdTamanoCompania,
          props.ids.sizeCompany,
          'quantityOfEmployees'
        );
        let matchdocument = search(
          props.info.Usuario.IdTipoDocumento,
          props.ids.documentType,
          'tipoDocumento'
        );
        let sectorid = matchsector.id;
        let countryid = matchcountry.id;
        let sizeid = matchsize.id;
        let documentid = matchdocument.documentTypeId;
        try {
          const response = await axios
            .create({
              baseURL: 'https://peopleintelligenceapi.azurewebsites.net/api',
            })
            .post(
              '/Autenticacion',
              {
                Compania: {
                  nombreCompania: props.info.Compania.nombreCompania,
                  Logotipo: logoTipo,
                  IdPais: countryid,
                  Sede: props.info.Compania.Sede,
                  direccion: props.info.Compania.direccion,
                  IdTamanoCompania: sizeid,
                  SectorId: sectorid,
                },
                Usuario: {
                  IdTipoDocumento: documentid,
                  numeroDocumento: props.info.Usuario.numeroDocumento,
                  NombreCompleto: props.info.Usuario.NombreCompleto,
                  Cargo: props.info.Usuario.Cargo,
                  correoElectronico: props.info.Usuario.correoElectronico,
                  phoneNumber: props.info.Usuario.phoneNumber,
                },
              },
              config
            );
          props.handleRegister(response.data.message);
        } catch (error) {
          if (typeof error.response.data === 'string') {
            setValues({
              ...values,
              message: error.response.data,
              isOpen: true,
              severity: 'error',
            });
          }
          console.log(error);
        }
      }
    }
  };
  const search = (key, inputArray, index) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i][index] === key) {
        return inputArray[i];
      }
    }
  };

  const handleCaptcha = () => {
    setCaptcha(!captcha);
  };

  const handletab = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrevious = () => {
    setValue(0);
  };

  return (
    <form onSubmit={submitHandler}>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Políticas de proteccion de datos
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                INTRODUCCIÓN
              </Typography>
              Estas Políticas de Privacidad (en adelante, las “Políticas de
              Privacidad”) rigen el tratamiento de la información recopilada de
              los Usuarios en el Sitio: peopleontelligence.app (en adelante, el
              “Sitio”) y la aplicación móvil “People Intelligence” (en adelante,
              la “La Aplicación”), conjuntamente, la “Plataforma”, propiedad de
              People Intelligence (en adelante, “People Intelligence” o la
              “Compañía”) y forman parte de los Términos y Condiciones del
              Sitio, por lo que resultan aplicables las definiciones allí
              contenidas. El propósito de estas Políticas de Privacidad es
              describir qué tipos de datos e información personal de los
              Usuarios (en adelante, “Información Personal”) reúne People
              Intelligence, los propósitos para los que la misma es utilizada,
              bajo qué circunstancias People Intelligence puede llegar a revelar
              tal Información Personal y qué derechos tienen los Usuarios con
              respecto a su protección.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                ACEPTACIÓN
              </Typography>
              El acceso a la Plataforma, así como la utilización del Servicio
              ofrecido a través de la misma se encuentran sujetos a su
              aceptación de estas Políticas de Privacidad y de los Términos y
              Condiciones. SI USTED NO ESTÁ DE ACUERDO CON LOS MISMOS, NO DEBE
              ACCEDER A LA PLATAFORMA NI UTILIZAR EL SERVICIO. SU INGRESO A LA
              PLATAFORMA Y/O UTILIZACIÓN DEL SERVICIO IMPLICA SU ACEPTACIÓN DE
              ESTAS POLÍTICAS DE PRIVACIDAD Y DE LOS TÉRMINOS Y CONDICIONES.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                ACTUALIZACIONES
              </Typography>
              People Intelligence se reserva el derecho de, a su exclusivo
              criterio, cambiar o modificar estas Políticas de Privacidad, o
              eliminar partes de las mismas en cualquier momento. Si
              implementamos cambios, lo notificaremos de la manera que
              consideremos más oportuna. Si no desea seguir usando el Servicio
              de conformidad con los nuevos cambios puede cancelar y dejar de
              usar nuestros Servicios.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                INFORMACIÓN RECOLECTADA
              </Typography>
              La Información recolectada puede incluir:<br></br>
              3.1.1Información Personal. People Intelligence recopila la
              siguiente información personal de sus Usuarios (en adelante,
              “Información Personal”): información relativa a la identidad de
              sus Usuarios que brindan al momento de registrarse en la
              Plataforma. Dicha información incluye: nombre/s-apellido, fecha de
              nacimiento, fecha de contratación, nivel de estudios, locación de
              oficina, división/área a la que pertenece, género y otros datos
              demográficos que proporcionen los usuarios. Los Usuarios pueden
              optar en cualquier momento por retirar el consentimiento brindado
              a People Intelligence para utilizar su información personal.
              <br></br>
              3.1.2Información General. People Intelligence puede recopilar
              información general acerca de los Usuarios (“Información
              General”). Tal información puede incluir: Datos Técnicos, que
              pueden ser: su dirección de protocolo de Internet (IP),
              información de la URL, datos de cookies del sitio web específico
              que usted solicitó, su información de inicio de sesión, tipo y
              versión de navegador, dirección del servidor, nombre de dominio,
              configuración de zona horaria, idioma, sistema operativo y
              plataforma. Datos de navegación: Al acceder a la Plataforma y/o
              acceder al Servicio, People Intelligence también puede recolectar
              datos del uso y navegación de Usuarios (dirección del servidor,
              nombre de dominio, etc.). Tales datos de navegación pueden ser
              combinados con otra información proporcionada a People
              Intelligence, y puede ser utilizada para analizar y personalizar
              el Servicio. People Intelligence puede utilizar tales datos para
              realizar análisis de tráfico o análisis comerciales y para
              determinar qué aspectos de la Plataforma y/o el Servicio son de
              mayor o menor utilidad para los Usuarios.<br></br>
              3.2Calidad de datos.<br></br>
              3.2.1El Usuario al ingresar datos personales en la Plataforma, se
              compromete a que estos sean exactos, actuales y completos. People
              Intelligence se compromete a mantenerlos y almacenarlos con la
              misma calidad.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                COOKIES Y OTRAS TECNOLOGÍAS
              </Typography>
              4.1 People Intelligence puede utilizar Cookies y tecnologías
              similares como pixeles e identificadores de dispositivos móviles
              para realizar un seguimiento de su actividad en la Plataforma. Las
              cookies son archivos de datos que quedan almacenados en el equipo
              de los Usuarios después de acceder a ciertos sitios web. La
              información proporcionada por las cookies ayuda a entender las
              preferencias de los Usuarios y mejorar la experiencia en la
              Plataforma.<br></br>
              4.1.1Cookie operativa o esencial: Estas cookies son utilizadas por
              People Intelligence para poder brindarle a Usted el servicio de la
              Plataforma. Por ejemplo, cookies que permiten identificar al
              Usuario e iniciar sesión en la Plataforma.<br></br>
              4.1.2Cookie analítica: Estas cookies nos permiten analizar el
              acceso, es uso y el rendimiento de la Plataforma para ofrecerle a
              los Usuarios un mejor servicio.<br></br>
              4.1.3Cookie de publicidad: Usamos estas cookies para mostrarle
              publicidad de productos y/o servicios que puedan interesar a los
              Usuarios.<br></br>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                SEGURIDAD DE LA INFORMACIÓN Y DE LOS DATOS PERSONALES
              </Typography>
              5.1.Con el fin de proteger la Información del Usuario, People
              Intelligence implementa diversas medidas de seguridad, siguiendo
              los estándares generalmente aceptados por la industria para
              proteger la Información Personal tanto durante el tratamiento de
              la Información personal.<br></br>
              5.2.A pesar de las medidas de seguridad implementadas, People
              Intelligence no puede garantizar la seguridad de la información
              que el Usuario divulgue. Al utilizar la Plataforma, el Usuario
              reconoce y acepta expresamente que People Intelligence no
              garantiza la seguridad de los datos proporcionados o recibidos.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                USO, ACCESO, RETENCIÓN Y DESTRUCCIÓN DE DATOS E INFORMACIÓN
                PERSONAL
              </Typography>
              6.1. People Intelligence utiliza su información para ofrecer los
              servicios de la Plataforma. People Intelligence no vende ni
              redistribuye la Información Personal de los Usuarios, ni utiliza
              tal Información Personal para fines ajenos al propio
              funcionamiento interno de la Plataforma. La recolección y el
              tratamiento de la Información Personal tiene como fin:<br></br>
              6.1.1.La prestación, administración, gestión, mejora y
              actualización de la Plataforma y/o el Servicio por parte de People
              Intelligence.<br></br>
              6.1.2.Resolver disputas, responder inquietudes, consultas, u otros
              requerimientos de los Usuarios.<br></br>
              6.1.3.Brindar soporte técnico al Usuario.<br></br>
              6.1.4.Personalizar, controlar y medir el desempeño de la
              Plataforma y/o el Servicio.<br></br>
              6.2. People Intelligence solamente conservará la Información del
              Usuario en la medida en que: (a) Le sea requerido por Ley y/o
              Autoridad judicial competente; o (b) resulte necesario abordar
              cualquier problema que el Usuario pueda tener. Cuando la
              información del Usuario ya no sea requerida, People Intelligence
              borrará o destruirá dicha información.<br></br>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                DERECHOS DE ACCESO, SUPRIMIR, Y RECTIFICACIÓN DE LA INFORMACIÓN
              </Typography>
              Los titulares de la Información Personal podrán ejercitar los
              derechos de acceder, suprimir y actualizar su Información
              Personal, así como a oponerse al tratamiento de la misma y a ser
              informados de las cesiones llevadas a cabo, en forma gratuita. En
              caso que los Usuarios deseen ejercer los derechos de acceso,
              rectificación o supresión de su Información Personal, puede
              hacerlo mediante nota en forma personal y acreditando su
              identidad, al siguiente correo consultas@peopleintelligence.app.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                EDAD MÍNIMA REQUERIDA
              </Typography>
              Los Usuarios manifiestan y garantizan que tienen al menos
              dieciocho (18) años de edad. Las personas menores de 18 años no
              están autorizadas por People Intelligence para utilizar el la
              Plataforma y/o el Servicio, a menos que cuenten con el
              consentimiento expreso de sus padres o tutores. Si ustes advierte
              que su hijo menor de dieciocho (18) años nos ha facilitado datos
              personales sin su consentimiento, por favor póngase en contacto
              con nosotros en la dirección de correo electrónico que figura al
              final de este documento. ALOJAMIENTO DEL SITIO Y TRANSFERENCIA
              INTERNACIONAL DE DATOS La Plataforma y las bases de datos que
              contienen Información Personal de los Usuarios se encuentran
              alojados en los Servidores de Azure. People Intelligence
              conservará los datos personales y demás información relacionada
              con el uso de la Plataforma y/o el Servicio durante todo el tiempo
              que el usuario utilice los Servicios, mientras no sea solicitada
              su supresión por el interesado y serán conservados conforme a los
              plazos legales, tomando como referencia la última comunicación.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                SITIOS DE TERCEROS
              </Typography>
              Con el fin de mejorar su uso de la Plataforma y el Servicio,
              People Intelligence puede insertar enlaces a sitios web de
              terceros. Ni estas Políticas de Privacidad ni los Términos y
              Condiciones se aplican a tales sitios. Estos enlaces llevan a los
              Usuarios fuera del Sitio y están más allá del control de People
              Intelligence, pudiendo tales sitios tener sus propias políticas de
              privacidad. People Intelligence no es responsable de los
              contenidos y actividades de tales sitios de terceros. Su acceso a
              dichos sitios web son bajo su propio riesgo y responsabilidad.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                TRANSFERENCIAS DEL NEGOCIO
              </Typography>
              People Intelligence podría decidir transferir su negocio. En tal
              caso, la Información Personal de los Usuarios podría ser uno de
              los activos de la empresa que se transfieren o son adquiridos por
              el adquirente. Los Usuarios reconocen y aceptan que dicha
              transferencia puede ocurrir, y que cualquier adquirente de People
              Intelligence puede seguir utilizando su Información Personal de
              conformidad con estas Políticas de Privacidad.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                MODIFICACIONES
              </Typography>
              People Intelligence se reserva el derecho de, a su exclusivo
              criterio, cambiar o modificar estas Políticas de Privacidad, o
              eliminar partes de las mismas en cualquier momento, por lo que los
              Usuarios deben revisarlas periódicamente. Tales cambios tendrán
              efecto inmediatamente luego de su publicación en la Plataforma. Si
              luego de la publicación de los cambios o de su notificación, el
              Usuario continuase utilizando el Servicio, tal uso implicará su
              aceptación de los mismos.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                NOTIFICACIONES Y PREGUNTAS O COMENTARIOS
              </Typography>
              People Intelligence puede enviarle a los Usuarios, avisos,
              incluyendo aquellos relativos a cambios en estas Políticas de
              Privacidad, ya sea por correo electrónico, o por publicaciones en
              la Plataforma. Ante cualquier inquietud o comentario con relación
              a estas políticas de Privacidad, los Usuarios pueden contactarse
              con People Intelligence escribiendo a
              consultas@peopleintelligence.app.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCloseDialog}>Aceptar</Button>
        </DialogActions>
      </Dialog>
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
        <div style={{ width: '100%', marginTop: '0.5rem' }}>
          <div style={{ border: 'none' }}>
            <Tabs
              value={value}
              onChange={handletab}
              aria-label="basic tabs example"
              centered
            >
              <Tab
                label="INFORMACIÓN DE LA EMPRESA"
                style={{
                  width: '100%',
                  color: '#03aae4',
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="DATOS DEL ADMINISTRADOR"
                style={{ width: '100%', color: '#03aae4' }}
                disabled={checked}
                {...a11yProps(1)}
              />
            </Tabs>
          </div>
          <TabPanel value={value} index={0}>
            <div className={styles.profile}>
              <img
                src={
                  props.info.Compania.Logotipo !== null
                    ? URL.createObjectURL(props.info.Compania.Logotipo)
                    : defaultImage
                }
                alt="profile"
                className={styles.photo}
              />
              <Button variant="text" component="label" color="blue">
                Cargar logo de la compañía
                <input
                  type="file"
                  onChange={props.handlePhoto}
                  accept="image/*"
                  name="profile_image"
                  hidden
                />
              </Button>
            </div>
            <div className={styles.form}>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  label="Nombre de la empresa"
                  value={props.info.Compania.nombreCompania}
                  name="nombreCompania"
                  onChange={props.handleChange('Compania')}
                  style={{ flexBasis: '40%' }}
                  error={errorMessage.nombreCompania}
                  helperText={helperText.nombreCompania}
                  size="small"
                />
                <Autocomplete
                  id="combo-box-demo"
                  style={{ flexBasis: '40%' }}
                  options={props.content.sector}
                  clearOnEscape
                  value={props.info.Compania.SectorId}
                  onChange={(e, value) => {
                    props.handleAutocomplete('Compania', 'SectorId', value);
                  }}
                  noOptionsText={'No se ha encontrado ningún Sector'}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sector"
                      error={errorMessage.SectorId}
                      helperText={helperText.SectorId}
                    />
                  )}
                  size="small"
                />
              </div>
              <div className={styles.input}>
                <Autocomplete
                  style={{ flexBasis: '40%' }}
                  id="combo-box-demo"
                  options={props.content.country}
                  clearOnEscape
                  value={props.info.Compania.IdPais}
                  onChange={(e, value) => {
                    props.handleAutocomplete('Compania', 'IdPais', value);
                  }}
                  noOptionsText={'No se ha encontrado ningún Sector'}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="País"
                      error={errorMessage.IdPais}
                      helperText={helperText.IdPais}
                    />
                  )}
                  size="small"
                />
                <TextField
                  style={{ flexBasis: '40%' }}
                  id="outlined-name"
                  label="Sede"
                  value={props.info.Compania.Sede}
                  name="Sede"
                  onChange={props.handleChange('Compania')}
                  error={errorMessage.Sede}
                  helperText={helperText.Sede}
                  size="small"
                />
              </div>
              <div className={styles.input}>
                <TextField
                  style={{ flexBasis: '40%' }}
                  id="outlined-name"
                  label="Dirección"
                  value={props.info.Compania.direccion}
                  name="direccion"
                  onChange={props.handleChange('Compania')}
                  error={errorMessage.direccion}
                  helperText={helperText.direccion}
                  size="small"
                />
                <Autocomplete
                  style={{ flexBasis: '40%' }}
                  id="combo-box-demo"
                  options={props.content.sizeCompany}
                  clearOnEscape
                  value={props.info.Compania.IdTamanoCompania}
                  onChange={(e, value) => {
                    props.handleAutocomplete(
                      'Compania',
                      'IdTamanoCompania',
                      value
                    );
                  }}
                  getOptionLabel={(option) => option}
                  size="small"
                  noOptionsText={'No se ha encontrado ningún Sector'}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tamaño de la empresa"
                      error={errorMessage.IdTamanoCompania}
                      helperText={helperText.IdTamanoCompania}
                    />
                  )}
                />
              </div>
            </div>
            <div className={styles.navigation}>
              <Button
                variant="text"
                style={{ marginRight: '1.5rem' }}
                onClick={props.handleCancel}
                color="blue"
              >
                CANCELAR
              </Button>
              <Button
                variant="contained"
                onClick={checkcompany}
                color="blue"
                sx={{
                  color: 'white',
                }}
              >
                SIGUIENTE
              </Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className={styles.form}>
              <div className={styles.input}>
                <Autocomplete
                  id="combo-box-demo"
                  style={{ flexBasis: '40%' }}
                  options={props.content.documentType}
                  clearOnEscape
                  value={props.info.Usuario.IdTipoDocumento}
                  onChange={(e, value) => {
                    props.handleAutocomplete(
                      'Usuario',
                      'IdTipoDocumento',
                      value
                    );
                  }}
                  noOptionsText={'No se ha encontrado ningún IdTipoDocumento'}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de documento de identidad"
                      error={errorMessage.IdTipoDocumento}
                      helperText={helperText.IdTipoDocumento}
                    />
                  )}
                  size="small"
                />
                <TextField
                  id="outlined-name"
                  label="Documento de identidad"
                  value={props.info.Usuario.numeroDocumento}
                  name="numeroDocumento"
                  onChange={props.handleChange('Usuario')}
                  style={{ flexBasis: '40%' }}
                  error={errorMessage.numeroDocumento}
                  helperText={helperText.numeroDocumento}
                  size="small"
                />
              </div>
              <div className={styles.input}>
                <TextField
                  style={{ flexBasis: '40%' }}
                  id="outlined-name"
                  label="Nombre Completo"
                  value={props.info.Usuario.NombreCompleto}
                  name="NombreCompleto"
                  onChange={props.handleChange('Usuario')}
                  error={errorMessage.NombreCompleto}
                  helperText={helperText.NombreCompleto}
                  size="small"
                />
                <TextField
                  style={{ flexBasis: '40%' }}
                  id="outlined-name"
                  label="Cargo"
                  value={props.info.Usuario.Cargo}
                  name="Cargo"
                  onChange={props.handleChange('Usuario')}
                  error={errorMessage.Cargo}
                  helperText={helperText.Cargo}
                  size="small"
                />
              </div>
              <div className={styles.input}>
                <TextField
                  style={{ flexBasis: '40%' }}
                  id="outlined-name"
                  label="Correo electrónico"
                  value={props.info.Usuario.correoElectronico}
                  name="correoElectronico"
                  onChange={props.handleChange('Usuario')}
                  error={errorMessage.correoElectronico}
                  helperText={helperText.correoElectronico}
                  size="small"
                  disabled={props.disable}
                />
                <MuiPhoneNumber
                  defaultCountry={'co'}
                  onChange={props.handlePhone}
                  regions={['north-america', 'south-america', 'european-union']}
                  style={{ flexBasis: '40%' }}
                />
              </div>
            </div>
            <div className={styles.check}>
              <Checkbox onChange={handlecheck1} />
              <p style={{ color: checktext1 ? 'red' : 'grey' }}>
                Acepto los{' '}
                <span
                  className={styles.spanhover}
                  style={{ color: 'blue' }}
                  onClick={handlemodalOpen}
                >
                  términos y condiciones
                </span>
              </p>
            </div>
            <div className={styles.check}>
              <Checkbox onChange={handlecheck2} />
              <p style={{ color: checktext2 ? 'red' : 'grey' }}>
                Acepto las{' '}
                <span
                  className={styles.spanhover}
                  style={{ color: 'blue' }}
                  onClick={handlemodalOpen}
                >
                  políticas de protección de datos
                </span>
              </p>
            </div>
            <div className={styles.captcha}>
              <ReCAPTCHA
                sitekey="6LcRRGsiAAAAAA8SOkyGQoKbGXASXitY2gfKKUup"
                onChange={handleCaptcha}
              />
            </div>
            <div className={styles.navigation}>
              <Button
                variant="text"
                style={{ marginRight: '1.5rem' }}
                onClick={handlePrevious}
                color="blue"
              >
                REGRESAR
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="blue"
                style={{ color: 'white' }}
              >
                SIGUIENTE
              </Button>
            </div>
          </TabPanel>
        </div>
      </div>
      <Notification
        severity={values.severity}
        message={values.message}
        isOpen={values.isOpen}
        onClose={handleClose}
      />
    </form>
  );
}
