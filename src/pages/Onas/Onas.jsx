import { useEffect,useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Notification from '../../components/Notification';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import axios from '../../utils/axiosInstance';

import styles from './Onas.module.css';
const config = {
  headers: { 'Content-type': 'application/csv' },
};
const config2 = {
  headers: { 'Content-type': 'multipart/form-data' },
};

const theme = createTheme({
  palette: {
    blue: {
      main: '#03aae4',
    },
  },
});

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('_') +
    '&' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join('_')
  );
}

export default function Onas() {
  let { company, version } = useParams();
  if (version === undefined) {
    version = '';
  }
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const companyId = company;
  const versionId = version;
  const [versionget, setVersionget] = useState('');
  const [transactionData, setTransactionData] = useState('');
  const [datetime, setDatetime] = useState(formatDate(new Date()));
  const csvLink = useRef();

  const [values, setValues] = useState({
    isOpen: false,
    message: '',
    severity: '',
  });

  const handleDownload = async () => {
    try {
      await axios.get('OnasSurvey/OnasDownloadBase', config).then((res) => {
        setDatetime(formatDate(new Date()));
        setTransactionData(res.data);
      });
    } catch (error) {
    }
  };
  const handleImport = async (file) => {
    let version = versionId === undefined ? '' : versionId;
    try {
      await axios
        .create({
          baseURL:
            `${process.env.REACT_APP_API_URL}OnasSurvey/`,
        })
        .post('' + userInfo.Company + '/' + version, { data: file }, config2)
        .then((res) => {
          setVersionget(res.data.versionId);
          setValues({
            ...values,
            message: res.data.message,
            isOpen: true,
            severity: 'success',
          });
        });
    } catch (error) {
      setValues({
        ...values,
        message: 'Hubo un error al momento de cargar los empleados',
        isOpen: true,
        severity: 'error',
      });
    }
  };

  const handleCloseNotification = () => {
    setValues({ ...values, isOpen: false });
  };

  const handleFile = async (event) => {
    await handleImport(event.target.files[0]);
  };

  const handleLink = async () => {
    if (!versionget){
      setValues({
        ...values,
        message: 'Recuerda importar la plantilla con los correos para hacer el envío',
        isOpen: true,
        severity: 'warning',
      });
      return;
    }

    try {
      await axios
        .create({
          baseURL:
            `${process.env.REACT_APP_API_URL}OnasSurvey/EnvioMAilOnas/`,
        })
        .get(versionget, config)
        .then((res) => {
          setValues({
            ...values,
            message: 'Los correos se han enviado satisfactoriamente',
            isOpen: true,
            severity: 'success',
          });
        });
    } catch (error) {
      setValues({
        ...values,
        message: 'Hubo un error al momento de enviar los correos',
        isOpen: true,
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === 'Onas') < 0 &&
      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
    ) {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
    if (transactionData) {
      csvLink.current.link.click();
    }
  }, [transactionData]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <IconSidebar />
        <div style={{ backgroundColor: 'white' }}>
          <div className={styles.content}>
            <div className={styles.onas}>
              <div className={styles.heading}>
                <strong>
                  Dar de alta audiencia para ONAS y envío de correo de
                  invitación
                </strong>
              </div>
              <div className={styles.books}>
                <div className={styles.book}>
                  <ImportContactsIcon style={{ marginRight: '0.5rem' }} /> Como
                  dar alta nuevos empleados?
                </div>
                <div className={styles.book}>
                  <ImportContactsIcon style={{ marginRight: '0.5rem' }} />
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
                            Es la primera vez{' '}
                          </strong>{' '}
                          que subo usuarios a la plataforma.
                        </div>
                        <div
                          className={styles.info}
                          style={{ marginTop: '1rem' }}
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
                            whiteSpace: 'nowrap',
                            padding: '0.5rem 1rem',
                            color: 'white',
                          }}
                          color="blue"
                          onClick={handleDownload}
                          className={styles.buttonresize}
                        >
                          Descargar planilla
                        </Button>
                        <CSVLink
                          data={transactionData}
                          filename={'ResultadoOnas' + datetime + '.csv'}
                          style={{ display: 'none' }}
                          ref={csvLink}
                          target="_blank"
                        />
                      </div>
                    </div>
                    <div className={styles.holder}>
                      <div
                        className={styles.sticker}
                        style={{ textAlign: 'center' }}
                      >
                        PASO 2
                      </div>
                      <div className={styles.text}>
                        <div className={styles.info}>
                          <strong className={styles.space}>
                            Ya tengo una plantilla completa{' '}
                          </strong>
                          lista para subir
                        </div>
                        <div
                          className={styles.info}
                          style={{ marginTop: '1rem' }}
                        >
                          Ahora sí, ya puedes subirla para que podamos procesar
                          los datos y luego confirmar la importación.
                        </div>
                      </div>
                      <div className={styles.button}>
                        <Button
                          variant="contained"
                          startIcon={<CloudUploadOutlinedIcon />}
                          style={{
                            whiteSpace: 'nowrap',
                            padding: '0.5rem 1rem',
                            color: 'white',
                          }}
                          component="label"
                          color="blue"
                          className={styles.buttonresize}
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
                        style={{ textAlign: 'center' }}
                      >
                        PASO 3
                      </div>
                      <div className={styles.text}>
                        <div className={styles.info}>
                          <strong className={styles.space}>Compartir </strong>{' '}
                          por correo electrónico
                        </div>
                      </div>

                      <div className={styles.button}>
                        <Button
                          variant="contained"
                          startIcon={<ForwardToInboxIcon />}
                          style={{
                            whiteSpace: 'nowrap',
                            padding: '0.5rem 1rem',
                            color: 'white',
                            width: '100%',
                          }}
                          color="blue"
                          onClick={handleLink}
                          className={styles.buttonresize}
                        >
                          Enviar correo
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div>
                      Tienes dudas?
                      <strong style={{ color: '#03aae4' }}>
                        Mira este vídeo tutorial
                      </strong>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <TipsAndUpdatesOutlinedIcon
                        style={{ marginRight: '1rem', fontWeight: 'bold' }}
                      />
                      <p style={{ fontWeight: 'bold', alignContent: 'center' }}>
                        TIPS
                      </p>
                    </div>
                    <div style={{ lineHeight: '1.5rem' }}>
                      Recuerda que cuánto mas completos sean los datos de los
                      empleados , mejores reportes de encuestas obtendras cuando
                      quieras filtrar por departamentos , oficinas , género ,
                      edad , etc.
                    </div>
                    <div style={{ lineHeight: '1.5rem' }}>
                      Podras actualizarlos cuando quieras , pero recuerda que
                      los cambios entrarán en vigencia para las encuestas
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
