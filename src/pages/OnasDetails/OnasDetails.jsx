import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import moment from 'moment';

import 'moment/locale/es';

import MyLoader from '../../components/MyLoader/MyLoader';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import { getOnasDetailsAPI } from '../../services/getOnasDetails.service';
import DataAdministration from '../InfoAdmin/components/DataAdministration';

import styles from './OnasDetails.module.css';
export default function OnasDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [onasDetail, setOnasDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const onasDetailColumns = [
    {
      id: 'employeename',
      label: 'Nombre empleado',
      numeric: false,
    },
    {
      id: 'limitDate',
      label: 'Fecha máxima repuesta',
      numeric: false,
    },
    {
      id: 'isAnswer',
      label: 'Respondió?',
      numeric: false,
    },
    {
      id: 'linkAnswer',
      label: 'Link Encuesta',
      numeric: false,
    },
  ];
  const mapOnasDetail = (onasDetail) =>
    onasDetail.map((detail) => [
      {
        column: 'name',
        value: detail.persona,
      },
      {
        column: 'limitDate',
        value: moment(detail.fechaLimite).format('MMMM DD, YYYY, h:mm a'),
      },
      {
        column: 'alreadyAnswer',
        value: detail.respondio ? (
          <CheckCircleOutlineIcon style={{ color: 'green' }} />
        ) : (
          <HighlightOffIcon style={{ color: 'red' }} />
        ),
      },
      {
        column: 'answerLinK',
        value: (
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(detail.linkAnswer);
              setLinkCopied(true);
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        ),
      },
    ]);

  const handleCloseSnackbar = () => {
    setLinkCopied(false);
  };
  const fetchOnas = async () => {
    setLoading(true);
    const { data } = await getOnasDetailsAPI(state);
    console.log(data);
    setOnasDetail(data.personResponse);
    setLoading(false);
  };
  useEffect(() => {
    fetchOnas();
  }, []);

  const some = [
    {
      nameAdministration: 'Detalle Onas',
      tableInformation: {
        title: 'Detalle encuesta Onas',
        buttonCreateName: null,
        eventButton: '',
        columns: onasDetailColumns,
        rows: mapOnasDetail(onasDetail),
      },
      tabsInformation: [],
    },
  ];

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === 'Onas') < 0 &&
      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
    ) {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Snackbar
        open={linkCopied}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Enlace copiado"
      />
      <Navbar />
      <IconSidebar />
      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.content}>
          <div className={styles.crud}>
            <Box sx={{ display: 'flex' }}>
              <div style={{ backgroundColor: 'white' }}>
                <div className={styles.DataTable}>
                  {loading && <MyLoader />}
                  <div className={styles.DataTable2}>
                    <DataAdministration
                      dataAdministration={some}
                      type="Detalle Onas"
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Box>
  );
}
