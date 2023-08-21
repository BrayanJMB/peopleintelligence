import { useState } from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { getCompaniesAPI } from '../services/getCompanies.service';

export default function PrivateRoutes() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    window.location.replace(
      'https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.DOMAINB2C}.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login'
      );

  }
  getCompaniesAPI(userInfo?.user).then((res) => {
    const hasActiveCompany = res.data.some((company) => company.isActive);
    if (res.data.length === 0 && location.pathname !== '/infoadmin/Empresas') {
      //alert('No tienes una compañía registrada, por favor registra una.');
      setSnackbarMessage('No tienes una compañía registrada, por favor registra una.');
      setOpenSnackbar(true);
      navigate('/infoadmin/Empresas');
    }
    else if (!hasActiveCompany && location.pathname !== '/infoadmin/Empresas') {
      setSnackbarMessage('No tienes ninguna compañía activa por favor, comunícate con soporte técnico.');
      //alert('No tienes ninguna compañía activa por favor, comunicate con soporte');
      setOpenSnackbar(true);
      navigate('/infoadmin/Empresas');
    }
  });

  return userInfo && userInfo.role.findIndex((p) => p === 'Registrado') < 0 ? (
    <>
    <Outlet />
      <Snackbar
    open={openSnackbar}
    autoHideDuration={30000} // Cierra el Snackbar automáticamente después de 6 segundos
    onClose={() => setOpenSnackbar(false)} // Función para cerrar el Snackbar
  >
    <Alert onClose={() => setOpenSnackbar(false)} severity="warning">
      {snackbarMessage}
    </Alert>
  </Snackbar>
  </>
  ) : (
    <Navigate to="/noaccess" />
  );
}
