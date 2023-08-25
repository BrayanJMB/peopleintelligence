import { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import moment from 'moment';
import 'moment/locale/es';
import MyLoader from '../../components/MyLoader/MyLoader';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import { downloadOnasAPI } from '../../services/downloadonas.service';
import { getOnasAPI } from '../../services/getOnas.service';
import DataAdministration from '../InfoAdmin/components/DataAdministration';
import styles from './OnasTable.module.css';  
moment.locale('es');

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

export default function OnasTable() {
  const navigate = useNavigate();
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [transactionData, setTransactionData] = useState('');
  const [datetime, setDatetime] = useState(formatDate(new Date()));
  const csvLink = useRef();
  const [onas, setOnas] = useState([]);
  const [loading, setLoading] = useState(false);

  const onasColumns = [
    {
      id: 'name',
      label: 'Nombre encuesta',
      numeric: false,
    },
    {
      id: 'name',
      label: 'Fecha creación',
      numeric: false,
    },
    {
      id: 'name',
      label: 'Fecha Límite',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];

  const mapOnas = (onas) =>
    onas.map((onas) => [
      {
        column: 'name',
        value: onas.onasName,
      },
      {
        column: 'moderator',
        isEditable: true,
        value: moment(onas.creatinDate).format('MMMM DD, YYYY, h:mm a'),
      },
      {
        column: 'moderator',
        isEditable: true,
        value: moment(onas.limitDate).format('MMMM DD, YYYY, h:mm a'),
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleView: handleOnasDetails,
          handleDownload: handleDownload,
          handleRedirect: handleRedirect,
          id: onas.id,
          companyId: currentCompany.id,
        },
      },
    ]);

  const fetchOnas = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);
    const { data } = await getOnasAPI(currentCompany.id);
    setOnas(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOnas();
  }, [currentCompany]);



  const handleDownload = (company, id) => {
    downloadOnasAPI(company, id).then((res) => {
      setDatetime(formatDate(new Date()));
      setTransactionData(res.data);
    });
  };

  const handleOnasDetails = (id) => {
    navigate('/onas/details', { state: id });
  };

  const handleRedirect = (company, id) => {
    navigate('/onas/' + company + '/' + id);
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
  }, [transactionData, currentCompany]);

  const some = [
    {
      nameAdministration: 'Onas',
      tableInformation: {
        title: 'Listado de Onas',
        buttonCreateName: null,
        eventButton: '',
        columns: onasColumns,
        rows: mapOnas(onas),
      },
      tabsInformation: [],
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <IconSidebar />
      <CSVLink
        data={transactionData}
        filename={'ResultadoOnas' + datetime + '.csv'}
        style={{ display: 'none' }}
        ref={csvLink}
        target="_blank"
      />
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
                      type="Onas"
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
