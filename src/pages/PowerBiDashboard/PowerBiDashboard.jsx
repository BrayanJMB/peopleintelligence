import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { storeDash } from '../../features/powerBiSlice';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import { getCompanyDashboardsAPI } from '../../services/getCompanyDashboard.service';

import styles from './PowerBiDashboard.module.css';


export default function PowerBiDashboard() {
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const navigate = useNavigate();   
  const dispatch = useDispatch();
  const powerBi = useSelector((state) => state.powerBi);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleReport = (id) => {
    navigate('/powerbi/' + id);
  };

  useEffect(() => {
    if (!currentCompany)
      return;
    if (userInfo.role.findIndex((p) => p === 'PowerBiDashboard') > -1) {
      getCompanyDashboardsAPI(currentCompany.id).then((res) => {
        console.log(res.data);
        let data = [];
        res.data.forEach((val) => {
          if (!data.includes(val)) {
            data.push(val);
          }
        });
        dispatch(storeDash(data));
      });
    } else {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
  }, [currentCompany]);
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <IconSidebar />
      <div style={{ backgroundColor: 'white' }}>
        <Stack spacing={2}>
          <div className={styles.content}>
            <div className={styles.dashboards}>
              {powerBi.companyDashboards.map((val, index) => {
                return (
                  <div className={styles.dashboard} key={index}>
                    <p style={{ textAlign: 'center' }}>{val.reportName}</p>
                    <p
                      style={{
                        marginTop: '0.2em',
                        fontWeight: 300,
                        textAlign: 'center',
                      }}
                    >
                      {val.descriptionReport}
                    </p>
                    <Button
                      variant="text"
                      style={{
                        whiteSpace: 'nowrap',
                        padding: '0 0.8em',
                        color: '#00b0f0',
                        alignSelf: 'flex-start',
                      }}
                      size="small"
                      onClick={() => handleReport(val.id)}
                    >
                      ver reporte
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className={styles.pagination}>
              <Pagination count={10} page={page} onChange={handleChange} />
            </div>
          </div>
        </Stack>
      </div>
    </Box>
  );
}
