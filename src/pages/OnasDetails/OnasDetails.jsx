import { useEffect, useMemo,useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import * as uuid from 'uuid';

import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import { getOnasDetailsAPI } from '../../services/getOnasDetails.service';

import styles from './OnasDetails.module.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function OnasDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [rows, setRows] = useState([]);
  const [pageSize, setpageSize] = useState(5);

  const onasColumn = [
    {
      field: 'persona',
      flex: 1,
      headerName: 'Nombre Empleado',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fechaLimite',
      flex: 1,
      headerName: 'Fecha máxima de respuesta',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'respondio',
      flex: 1,
      headerName: 'Respondió?',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Link Encuesta',
      width: 250,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton
            onClick={() => navigator.clipboard.writeText(params.row.linkAnswer)}
          >
            <ContentCopyIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const columns = useMemo(() => onasColumn, []);

  const getTableData = () => {
    getOnasDetailsAPI(state)
      .then((res) => {
        let data = [];
        res.data.personResponse.forEach((val) => {
          let id = uuid.v4();
          if (!data.includes(val)) {
            val.respondio = val.respondio ? <CheckCircleOutlineIcon/> : <HighlightOffIcon/>;
            let holder = val;
            holder._id = id;
            data.push(val);
          }
        });
        setRows(res.data.personResponse);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === 'Onas') < 0 &&
      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
    ) {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }

    getTableData();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <IconSidebar />
      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.content}>
          <div className={styles.crud}>
            <div className={styles.buttom}>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
                getRowSpacing={(params) => ({
                  top: params.isFirstVisible ? 0 : 5,
                  bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                  [`& .${gridClasses.row}`]: {
                    bgcolor: grey[200],
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
