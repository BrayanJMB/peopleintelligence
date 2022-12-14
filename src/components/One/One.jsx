import styles from "./One.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Logo from "../../assets/Logo.svg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Notification from "../../components/Notification";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useRef, useEffect } from "react";
import MuiPhoneNumber from "material-ui-phone-number-2";

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
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
  "^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$"
);
const validBusinessEmail = new RegExp(
  "^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$"
);
const validphone = new RegExp("^[+][0-9]{12,15}$");

const config = {
  headers: { "Content-type": "application/json" },
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
    message: "",
    severity: "",
  });
  const [scroll, setScroll] = useState("paper");
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
      if (props.info.Compania[key] === "") {
        helperText[key] = "El campo no puede ir vacio";
        error[key] = true;
        bad = true;
      } else {
        helperText[key] = "";
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

    for (const [key, value] of Object.entries({
      IdTipoDocumento: props.info.Usuario.IdTipoDocumento,
      numeroDocumento: props.info.Usuario.numeroDocumento,
      NombreCompleto: props.info.Usuario.NombreCompleto,
      Cargo: props.info.Usuario.Cargo,
      correoElectronico: props.info.Usuario.correoElectronico,
      phoneNumber: props.info.Usuario.phoneNumber,
    })) {
      if (props.info.Usuario[key] === "") {
        helperText[key] = "El campo no puede ir vacio";
        error[key] = true;
        bad = true;
      } else {
        helperText[key] = "";
        error[key] = false;
      }
    }

    if (!validEmail.test(props.info.Usuario.correoElectronico)) {
      helperText.correoElectronico = "El correo ingresado no es v??lido";
      error.correoElectronico = true;
      bad = true;
    } else if (!validBusinessEmail.test(props.info.Usuario.correoElectronico)) {
      helperText.correoElectronico = "El correo ingresado debe ser corporativo";
      error.correoElectronico = true;
      bad = true;
    }

    if (props.info.Usuario.numeroDocumento < 10000000) {
      helperText["numeroDocumento"] = "El tama??o minimo del campo es 8 digitos";
      error["numeroDocumento"] = true;
      bad = true;
    }

    if (!validphone.test(props.info.Usuario.phoneNumber)) {
      helperText["phoneNumber"] = "Escriba un numero telefonico v??lido";
      error["phoneNumber"] = true;
      bad = true;
    }

    if (bad) {
      setErrorMessage(error);
      setHelperText(helperText);
    } else if (check1 && check2 && captcha) {
      let test = false;
      for (const [key, value] of Object.entries(props.info)) {
        for (const [index, content] of Object.entries(value)) {
          if (index === "Logotipo") {
            continue;
          }
          if (content === "" || content === null) {
            test = true;
          }
        }
      }
      if (!test) {
        let matchsector = search(
          props.info.Compania.SectorId,
          props.ids.sector,
          "Sector"
        );
        let matchcountry = search(
          props.info.Compania.IdPais,
          props.ids.country,
          "pais"
        );
        let matchsize = search(
          props.info.Compania.IdTamanoCompania,
          props.ids.sizeCompany,
          "quantityOfEmployees"
        );
        let matchdocument = search(
          props.info.Usuario.IdTipoDocumento,
          props.ids.documentType,
          "tipoDocumento"
        );
        let sectorid = matchsector.id;
        let countryid = matchcountry.id;
        let sizeid = matchsize.id;
        let documentid = matchdocument.documentTypeId;
        try {
          const response = await axios
            .create({
              baseURL: "https://peopleintelligenceapi.azurewebsites.net/api",
            })
            .post(
              "/Autenticacion",
              {
                Compania: {
                  nombreCompania: props.info.Compania.nombreCompania,
                  Logotipo: props.info.Compania.Logotipo,
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
          if (typeof error.response.data === "string") {
            setValues({
              ...values,
              message: error.response.data,
              isOpen: true,
              severity: "error",
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
          Pol??ticas de proteccion de datos
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
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
                INTRODUCCI??N
              </Typography>
              Estas Pol??ticas de Privacidad (en adelante, las ???Pol??ticas de
              Privacidad???) rigen el tratamiento de la informaci??n recopilada de
              los Usuarios en el Sitio: peopleontelligence.app (en adelante, el
              ???Sitio???) y la aplicaci??n m??vil ???People Intelligence??? (en adelante,
              la ???La Aplicaci??n???), conjuntamente, la ???Plataforma???, propiedad de
              People Intelligence (en adelante, ???People Intelligence??? o la
              ???Compa????a???) y forman parte de los T??rminos y Condiciones del
              Sitio, por lo que resultan aplicables las definiciones all??
              contenidas. El prop??sito de estas Pol??ticas de Privacidad es
              describir qu?? tipos de datos e informaci??n personal de los
              Usuarios (en adelante, ???Informaci??n Personal???) re??ne People
              Intelligence, los prop??sitos para los que la misma es utilizada,
              bajo qu?? circunstancias People Intelligence puede llegar a revelar
              tal Informaci??n Personal y qu?? derechos tienen los Usuarios con
              respecto a su protecci??n.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                ACEPTACI??N
              </Typography>
              El acceso a la Plataforma, as?? como la utilizaci??n del Servicio
              ofrecido a trav??s de la misma se encuentran sujetos a su
              aceptaci??n de estas Pol??ticas de Privacidad y de los T??rminos y
              Condiciones. SI USTED NO EST?? DE ACUERDO CON LOS MISMOS, NO DEBE
              ACCEDER A LA PLATAFORMA NI UTILIZAR EL SERVICIO. SU INGRESO A LA
              PLATAFORMA Y/O UTILIZACI??N DEL SERVICIO IMPLICA SU ACEPTACI??N DE
              ESTAS POL??TICAS DE PRIVACIDAD Y DE LOS T??RMINOS Y CONDICIONES.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                ACTUALIZACIONES
              </Typography>
              People Intelligence se reserva el derecho de, a su exclusivo
              criterio, cambiar o modificar estas Pol??ticas de Privacidad, o
              eliminar partes de las mismas en cualquier momento. Si
              implementamos cambios, lo notificaremos de la manera que
              consideremos m??s oportuna. Si no desea seguir usando el Servicio
              de conformidad con los nuevos cambios puede cancelar y dejar de
              usar nuestros Servicios.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                INFORMACI??N RECOLECTADA
              </Typography>
              La Informaci??n recolectada puede incluir:<br></br>
              3.1.1Informaci??n Personal.??People Intelligence recopila la
              siguiente informaci??n personal de sus Usuarios (en adelante,
              ???Informaci??n Personal???): informaci??n relativa a la identidad de
              sus Usuarios que brindan al momento de registrarse en la
              Plataforma. Dicha informaci??n incluye: nombre/s-apellido, fecha de
              nacimiento, fecha de contrataci??n, nivel de estudios, locaci??n de
              oficina, divisi??n/??rea a la que pertenece, g??nero y otros datos
              demogr??ficos que proporcionen los usuarios. Los Usuarios pueden
              optar en cualquier momento por retirar el consentimiento brindado
              a People Intelligence para utilizar su informaci??n personal.
              <br></br>
              3.1.2Informaci??n General.??People Intelligence puede recopilar
              informaci??n general acerca de los Usuarios (???Informaci??n
              General???). Tal informaci??n puede incluir: Datos T??cnicos, que
              pueden ser: su direcci??n de protocolo de Internet (IP),
              informaci??n de la URL, datos de cookies del sitio web espec??fico
              que usted solicit??, su informaci??n de inicio de sesi??n, tipo y
              versi??n de navegador, direcci??n del servidor, nombre de dominio,
              configuraci??n de zona horaria, idioma, sistema operativo y
              plataforma. Datos de navegaci??n: Al acceder a la Plataforma y/o
              acceder al Servicio, People Intelligence tambi??n puede recolectar
              datos del uso y navegaci??n de Usuarios (direcci??n del servidor,
              nombre de dominio, etc.). Tales datos de navegaci??n pueden ser
              combinados con otra informaci??n proporcionada a People
              Intelligence, y puede ser utilizada para analizar y personalizar
              el Servicio. People Intelligence puede utilizar tales datos para
              realizar an??lisis de tr??fico o an??lisis comerciales y para
              determinar qu?? aspectos de la Plataforma y/o el Servicio son de
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
                COOKIES Y OTRAS TECNOLOG??AS
              </Typography>
              4.1 People Intelligence puede utilizar Cookies y tecnolog??as
              similares como pixeles e identificadores de dispositivos m??viles
              para realizar un seguimiento de su actividad en la Plataforma. Las
              cookies son archivos de datos que quedan almacenados en el equipo
              de los Usuarios despu??s de acceder a ciertos sitios web. La
              informaci??n proporcionada por las cookies ayuda a entender las
              preferencias de los Usuarios y mejorar la experiencia en la
              Plataforma.<br></br>
              4.1.1Cookie operativa o esencial: Estas cookies son utilizadas por
              People Intelligence para poder brindarle a Usted el servicio de la
              Plataforma. Por ejemplo, cookies que permiten identificar al
              Usuario e iniciar sesi??n en la Plataforma.<br></br>
              4.1.2Cookie anal??tica: Estas cookies nos permiten analizar el
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
                SEGURIDAD DE LA INFORMACI??N Y DE LOS DATOS PERSONALES
              </Typography>
              5.1.Con el fin de proteger la Informaci??n del Usuario, People
              Intelligence implementa diversas medidas de seguridad, siguiendo
              los est??ndares generalmente aceptados por la industria para
              proteger la Informaci??n Personal tanto durante el tratamiento de
              la Informaci??n personal.<br></br>
              5.2.A pesar de las medidas de seguridad implementadas, People
              Intelligence no puede garantizar la seguridad de la informaci??n
              que el Usuario divulgue. Al utilizar la Plataforma, el Usuario
              reconoce y acepta expresamente que People Intelligence no
              garantiza la seguridad de los datos proporcionados o recibidos.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                USO, ACCESO, RETENCI??N Y DESTRUCCI??N DE DATOS E INFORMACI??N
                PERSONAL
              </Typography>
              6.1. People Intelligence utiliza su informaci??n para ofrecer los
              servicios de la Plataforma. People Intelligence no vende ni
              redistribuye la Informaci??n Personal de los Usuarios, ni utiliza
              tal Informaci??n Personal para fines ajenos al propio
              funcionamiento interno de la Plataforma. La recolecci??n y el
              tratamiento de la Informaci??n Personal tiene como fin:<br></br>
              6.1.1.La prestaci??n, administraci??n, gesti??n, mejora y
              actualizaci??n de la Plataforma y/o el Servicio por parte de People
              Intelligence.<br></br>
              6.1.2.Resolver disputas, responder inquietudes, consultas, u otros
              requerimientos de los Usuarios.<br></br>
              6.1.3.Brindar soporte t??cnico al Usuario.<br></br>
              6.1.4.Personalizar, controlar y medir el desempe??o de la
              Plataforma y/o el Servicio.<br></br>
              6.2. People Intelligence solamente conservar?? la Informaci??n del
              Usuario en la medida en que: (a) Le sea requerido por Ley y/o
              Autoridad judicial competente; o (b) resulte necesario abordar
              cualquier problema que el Usuario pueda tener. Cuando la
              informaci??n del Usuario ya no sea requerida, People Intelligence
              borrar?? o destruir?? dicha informaci??n.<br></br>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                DERECHOS DE ACCESO, SUPRIMIR, Y RECTIFICACI??N DE LA INFORMACI??N
              </Typography>
              Los titulares de la Informaci??n Personal podr??n ejercitar los
              derechos de acceder, suprimir y actualizar su Informaci??n
              Personal, as?? como a oponerse al tratamiento de la misma y a ser
              informados de las cesiones llevadas a cabo, en forma gratuita. En
              caso que los Usuarios deseen ejercer los derechos de acceso,
              rectificaci??n o supresi??n de su Informaci??n Personal, puede
              hacerlo mediante nota en forma personal y acreditando su
              identidad, al siguiente correo consultas@peopleintelligence.app.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                EDAD M??NIMA REQUERIDA
              </Typography>
              Los Usuarios manifiestan y garantizan que tienen al menos
              dieciocho (18) a??os de edad. Las personas menores de 18 a??os no
              est??n autorizadas por People Intelligence para utilizar el la
              Plataforma y/o el Servicio, a menos que cuenten con el
              consentimiento expreso de sus padres o tutores. Si ustes advierte
              que su hijo menor de dieciocho (18) a??os nos ha facilitado datos
              personales sin su consentimiento, por favor p??ngase en contacto
              con nosotros en la direcci??n de correo electr??nico que figura al
              final de este documento. ALOJAMIENTO DEL SITIO Y TRANSFERENCIA
              INTERNACIONAL DE DATOS La Plataforma y las bases de datos que
              contienen Informaci??n Personal de los Usuarios se encuentran
              alojados en los Servidores de Azure. People Intelligence
              conservar?? los datos personales y dem??s informaci??n relacionada
              con el uso de la Plataforma y/o el Servicio durante todo el tiempo
              que el usuario utilice los Servicios, mientras no sea solicitada
              su supresi??n por el interesado y ser??n conservados conforme a los
              plazos legales, tomando como referencia la ??ltima comunicaci??n.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                SITIOS DE TERCEROS
              </Typography>
              Con el fin de mejorar su uso de la Plataforma y el Servicio,
              People Intelligence puede insertar enlaces a sitios web de
              terceros. Ni estas Pol??ticas de Privacidad ni los T??rminos y
              Condiciones se aplican a tales sitios. Estos enlaces llevan a los
              Usuarios fuera del Sitio y est??n m??s all?? del control de People
              Intelligence, pudiendo tales sitios tener sus propias pol??ticas de
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
              People Intelligence podr??a decidir transferir su negocio. En tal
              caso, la Informaci??n Personal de los Usuarios podr??a ser uno de
              los activos de la empresa que se transfieren o son adquiridos por
              el adquirente. Los Usuarios reconocen y aceptan que dicha
              transferencia puede ocurrir, y que cualquier adquirente de People
              Intelligence puede seguir utilizando su Informaci??n Personal de
              conformidad con estas Pol??ticas de Privacidad.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                MODIFICACIONES
              </Typography>
              People Intelligence se reserva el derecho de, a su exclusivo
              criterio, cambiar o modificar estas Pol??ticas de Privacidad, o
              eliminar partes de las mismas en cualquier momento, por lo que los
              Usuarios deben revisarlas peri??dicamente. Tales cambios tendr??n
              efecto inmediatamente luego de su publicaci??n en la Plataforma. Si
              luego de la publicaci??n de los cambios o de su notificaci??n, el
              Usuario continuase utilizando el Servicio, tal uso implicar?? su
              aceptaci??n de los mismos.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                NOTIFICACIONES Y PREGUNTAS O COMENTARIOS
              </Typography>
              People Intelligence puede enviarle a los Usuarios, avisos,
              incluyendo aquellos relativos a cambios en estas Pol??ticas de
              Privacidad, ya sea por correo electr??nico, o por publicaciones en
              la Plataforma. Ante cualquier inquietud o comentario con relaci??n
              a estas pol??ticas de Privacidad, los Usuarios pueden contactarse
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
              backgroundColor: "white",
            }}
            alt="Your logo."
            src={Logo}
          />
        </div>
        <div style={{ width: "100%", marginTop: "0.5rem" }}>
          <div style={{ border: "none" }}>
            <Tabs
              value={value}
              onChange={handletab}
              aria-label="basic tabs example"
              centered
            >
              <Tab
                label="INFORMACI??N DE LA EMPRESA"
                style={{
                  width: "100%",
                  color: "#03aae4",
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="DATOS DEL ADMINISTRADOR"
                style={{ width: "100%", color: "#03aae4" }}
                disabled={checked}
                {...a11yProps(1)}
              />
            </Tabs>
          </div>
          <TabPanel value={value} index={0}>
            <div className={styles.profile}>
              <img
                src={props.info.Compania.Logotipo}
                alt="profile"
                className={styles.photo}
              />
              <Button variant="text" component="label" color="blue">
                Cargar logo de la compa????a
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
                  onChange={props.handleChange("Compania")}
                  style={{ flexBasis: "40%" }}
                  error={errorMessage.nombreCompania}
                  helperText={helperText.nombreCompania}
                  size="small"
                />
                <Autocomplete
                  id="combo-box-demo"
                  style={{ flexBasis: "40%" }}
                  options={props.content.sector}
                  clearOnEscape
                  value={props.info.Compania.SectorId}
                  onChange={(e, value) => {
                    props.handleAutocomplete("Compania", "SectorId", value);
                  }}
                  noOptionsText={"No se ha encontrado ning??n Sector"}
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
                  style={{ flexBasis: "40%" }}
                  id="combo-box-demo"
                  options={props.content.country}
                  clearOnEscape
                  value={props.info.Compania.IdPais}
                  onChange={(e, value) => {
                    props.handleAutocomplete("Compania", "IdPais", value);
                  }}
                  noOptionsText={"No se ha encontrado ning??n Sector"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pa??s"
                      error={errorMessage.IdPais}
                      helperText={helperText.IdPais}
                    />
                  )}
                  size="small"
                />
                <TextField
                  style={{ flexBasis: "40%" }}
                  id="outlined-name"
                  label="Sede"
                  value={props.info.Compania.Sede}
                  name="Sede"
                  onChange={props.handleChange("Compania")}
                  error={errorMessage.Sede}
                  helperText={helperText.Sede}
                  size="small"
                />
              </div>
              <div className={styles.input}>
                <TextField
                  style={{ flexBasis: "40%" }}
                  id="outlined-name"
                  label="Direcci??n"
                  value={props.info.Compania.direccion}
                  name="direccion"
                  onChange={props.handleChange("Compania")}
                  error={errorMessage.direccion}
                  helperText={helperText.direccion}
                  size="small"
                />
                <Autocomplete
                  style={{ flexBasis: "40%" }}
                  id="combo-box-demo"
                  options={props.content.sizeCompany}
                  clearOnEscape
                  value={props.info.Compania.IdTamanoCompania}
                  onChange={(e, value) => {
                    props.handleAutocomplete(
                      "Compania",
                      "IdTamanoCompania",
                      value
                    );
                  }}
                  getOptionLabel={(option) => option}
                  size="small"
                  noOptionsText={"No se ha encontrado ning??n Sector"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tama??o de la empresa"
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
                style={{ marginRight: "1.5rem" }}
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
                  color: "white",
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
                  style={{ flexBasis: "40%" }}
                  options={props.content.documentType}
                  clearOnEscape
                  value={props.info.Usuario.IdTipoDocumento}
                  onChange={(e, value) => {
                    props.handleAutocomplete(
                      "Usuario",
                      "IdTipoDocumento",
                      value
                    );
                  }}
                  noOptionsText={"No se ha encontrado ning??n IdTipoDocumento"}
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
                  onChange={props.handleChange("Usuario")}
                  style={{ flexBasis: "40%" }}
                  error={errorMessage.numeroDocumento}
                  helperText={helperText.numeroDocumento}
                  size="small"
                />
              </div>
              <div className={styles.input}>
                <TextField
                  style={{ flexBasis: "40%" }}
                  id="outlined-name"
                  label="Nombre Completo"
                  value={props.info.Usuario.NombreCompleto}
                  name="NombreCompleto"
                  onChange={props.handleChange("Usuario")}
                  error={errorMessage.NombreCompleto}
                  helperText={helperText.NombreCompleto}
                  size="small"
                />
                <TextField
                  style={{ flexBasis: "40%" }}
                  id="outlined-name"
                  label="Cargo"
                  value={props.info.Usuario.Cargo}
                  name="Cargo"
                  onChange={props.handleChange("Usuario")}
                  error={errorMessage.Cargo}
                  helperText={helperText.Cargo}
                  size="small"
                />
              </div>
              <div className={styles.input}>
                <TextField
                  style={{ flexBasis: "40%" }}
                  id="outlined-name"
                  label="Correo electr??nico"
                  value={props.info.Usuario.correoElectronico}
                  name="correoElectronico"
                  onChange={props.handleChange("Usuario")}
                  error={errorMessage.correoElectronico}
                  helperText={helperText.correoElectronico}
                  size="small"
                  disabled={props.disable}
                />
                <MuiPhoneNumber
                  defaultCountry={"co"}
                  onChange={props.handlePhone}
                  regions={["north-america", "south-america", "european-union"]}
                  style={{ flexBasis: "40%" }}
                />
              </div>
            </div>
            <div className={styles.check}>
              <Checkbox onChange={handlecheck1} />
              <p style={{ color: checktext1 ? "red" : "grey" }}>
                Acepto los{" "}
                <span
                  className={styles.spanhover}
                  style={{ color: "blue" }}
                  onClick={handlemodalOpen}
                >
                  t??rminos y condiciones
                </span>
              </p>
            </div>
            <div className={styles.check}>
              <Checkbox onChange={handlecheck2} />
              <p style={{ color: checktext2 ? "red" : "grey" }}>
                Acepto las{" "}
                <span
                  className={styles.spanhover}
                  style={{ color: "blue" }}
                  onClick={handlemodalOpen}
                >
                  pol??ticas de protecci??n de datos
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
                style={{ marginRight: "1.5rem" }}
                onClick={handlePrevious}
                color="blue"
              >
                REGRESAR
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="blue"
                style={{ color: "white" }}
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
