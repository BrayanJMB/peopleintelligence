import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

import MyLoader from '../../components/MyLoader/MyLoader';
import { setCredentials } from '../../features/authSlice';
import axios from '../../utils/axiosInstance';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.hash.substring(1)); // Eliminar el '#' inicial para correcto parsing
  const access_token = urlParams.get('access_token');

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOpen = (msg) => {
    setMessage(msg);
    setOpen(true);
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
          navigate('/dashboard');
          setLoading(false);
        });
    } catch (error) {
      if (error.response.status === 401) {
        if (process.env.REACT_APP_DOMAIN_B2C === 'suite') {
          window.location.replace(
            `https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login`
          );
        } else {
          window.location.replace(
            `${process.env.REACT_APP_DOMAIN_INSTANCE}.b2clogin.com/${process.env.REACT_APP_DOMAIN_TENANT}/oauth2/v2.0/authorize?p=${process.env.REACT_APP_USER_FLOW}&client_id=${process.env.REACT_APP_CLIENT_ID}&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app%2F&scope=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_TENANT}%2Fapi%2FFiles.Read&response_type=token&prompt=login`
          );
        }
      }
      if (error.response.status === 400) {
        alert('El correo ingresado no es un correo corporativo');
        if (process.env.REACT_APP_DOMAIN_B2C === 'suite') {
          window.location.replace(
            `https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login`
          );
        } else {
          window.location.replace(
            `${process.env.REACT_APP_DOMAIN_INSTANCE}.b2clogin.com/${process.env.REACT_APP_DOMAIN_TENANT}/oauth2/v2.0/authorize?p=${process.env.REACT_APP_USER_FLOW}&client_id=${process.env.REACT_APP_CLIENT_ID}&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app%2F&scope=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_TENANT}%2Fapi%2FFiles.Read&response_type=token&prompt=login`
          );
        }
      }
    }
  };

  useEffect(() => {
    if (!access_token) {
      if (process.env.REACT_APP_DOMAIN_B2C === 'suite') {
        window.location.replace(
          `https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login`
        );
      } else {
        window.location.replace(
          `${process.env.REACT_APP_DOMAIN_INSTANCE}.b2clogin.com/${process.env.REACT_APP_DOMAIN_TENANT}/oauth2/v2.0/authorize?p=${process.env.REACT_APP_USER_FLOW}&client_id=${process.env.REACT_APP_CLIENT_ID}&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app%2F&scope=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_TENANT}%2Fapi%2FFiles.Read&response_type=token&prompt=login`
        );
      }
    } else {
      tokenConsume();
    }
  }, [access_token]);
  return (
    <>
      {loading === true && <MyLoader />}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}
