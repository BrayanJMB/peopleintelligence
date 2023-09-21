import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import axios from '../../utils/axiosInstance';

import styles from './PowerBI.module.css';

// Lifetime is 3600 sec/ 1 hour

export default function PowerBi() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [response, setResponse] = useState('');
  const navigate = useNavigate();
  const { idDashboard } = useParams();
  const [userEmail, setUserEmail] = useState('');
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

  const accessToken = async () => {
    try {
      await axios.get('PowerBy/' + idDashboard).then((res) => {
        if (
          res.data.powerBiEmbedToken === null ||
          res.data.powerBiReport === null
        ) {
          alert('El reporte no existe o esta desahabilitado');
          navigate('/powerbi');
        }
        setResponse({
          token: res.data.powerBiEmbedToken?.token,
          id: res.data.powerBiReport?.id,
          embedUrl: res.data.powerBiReport?.embedUrl,
        });
      });
    } catch (e) {
      if (e.response.status === 400) {
        alert('Este dashborad no esta habilitado');
        navigate('/powerbi');
      }
    }
  };


  useEffect(() => {
    if (userInfo.role.findIndex((p) => p === 'PowerBiDashboard') > -1) {
      if (response) {
        let timer1 = setInterval(() => accessToken(), 1000 * 60 * 60);
        return () => {
          clearInterval(timer1);
        };
      } else {
        accessToken();
      }
    } else {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
    setUserEmail(decodeToken(userInfo.accessToken));
  }, [response]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <IconSidebar />
      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.content}>
          <PowerBIEmbed
            embedConfig={{
              type: 'report', // Supported types: report, dashboard, tile, visual and qna
              id: response?.id,
              embedUrl: response?.embedUrl,
              accessToken: response?.token,
              tokenType: models.TokenType.Embed,
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
              },
              filters: [
                {
                  $schema: 'http://powerbi.com/product/schema#basicFilter',
                  target: {
                    table: 'z_RLS', // Nombre de la tabla en la que deseas aplicar el filtro
                    column: 'user_name', // Nombre de la columna en la que deseas aplicar el filtro
                  },
                  operator: 'In', // Puedes cambiar el operador según tu necesidad (por ejemplo, 'In', 'Equals', etc.)
                  values: [userEmail], // Valor o valores que deseas filtrar
                },
              ],
            }}
            eventHandlers={
              new Map([
                [
                  'loaded',
                  function () {
                    console.log('Report loaded');
                  },
                ],
                [
                  'rendered',
                  function () {
                    console.log('Report rendered');
                  },
                ],
                [
                  'error',
                  function (event) {
                    console.log(event.detail);
                  },
                ],
              ])
            }
            cssClassName={styles.Embed_container}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </div>
      </div>
    </Box>
  );
}
