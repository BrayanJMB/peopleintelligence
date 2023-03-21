import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Build from '../../components/Build/Build';
import Live from '../../components/Live/Live';
import ConSidebar from '../../Layout/ConSidebar/ConSidebar';

export default function Conversation() {
  const { type } = useParams();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const theme = createTheme({
    palette: {
      blue: {
        main: '#00b0f0',
      },
      grey: {
        main: '#808080',
      },
    },
  });

  const renderSwitch = () => {
    switch (type) {
      case 'Build':
        return <Build />;
      case 'Live':
        return <Live />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === 'Dinamyc') < 0 &&
      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
    ) {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <ConSidebar type={type} />
        {renderSwitch(type)}
      </Box>
    </ThemeProvider>
  );
}
