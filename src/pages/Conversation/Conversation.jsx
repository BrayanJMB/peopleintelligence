import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Build from '../../components/Build/Build';
import { Moderator } from '../../components/Build/Moderator/Moderator';
import { SurveyChat } from '../../components/Build/SurveysChats/SurveyChat';
import ConSidebar from '../../Layout/ConSidebar/ConSidebar';
import IconSidebarNavBar from '../../Layout/IconSideBarNavBar/IconSideBarNavBar';

export default function Conversation() {
  const { type } = useParams();
  const [stage, setStage] = useState('basic');
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

  const handleMove = (path, val) => {
    navigate(path);
    setStage(val);
  };
  console.log(type);
  const renderSwitch = () => {
    switch (type) {
      case 'Build':
        return <Build stage={stage} handleMove={handleMove} />;
      case 'Live':
        return <SurveyChat handleMove={handleMove}/>;
      case 'moderator':
        return <Moderator />;
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
        <IconSidebarNavBar>
          <ConSidebar handleMove={handleMove} type={type} />
          {renderSwitch(type)}
        </IconSidebarNavBar>
      </Box>
    </ThemeProvider>
  );
}
