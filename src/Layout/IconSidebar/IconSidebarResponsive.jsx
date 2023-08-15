import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';

import Aletter from '../../assets/icons/Aletter.png';
import Dletter from '../../assets/icons/Dletter.png';
import Iletter from '../../assets/icons/Iletter.png';
import Jletter from '../../assets/icons/Jletter.png';
import Oletter from '../../assets/icons/Oletter.png';
import Sletter from '../../assets/icons/Sletter.png';
import multicompani from '../../assets/multicompani.jpeg';

import styles from './IconSidebar.module.css';

const names = [
  'Information Management',
  'Advanced Analytics & Dashboards',
  'Organizational Network Analysis',
  'Dynamic Live Conversations',
  'Employee Journey',
];

const list = [Iletter, Aletter, Oletter, Dletter, Jletter, Sletter];

const drop = [
  ['Empresas', 'Empleados', /*'Oficinas',*/ 'Departamentos', 'Otros campos'],
  ['powerbi'],
  ['Crear encuesta', 'Ver encuestas'],
  ['Build', 'Live', 'Analysis'],
  ['journey'],
  ['Empresas', 'Empleados', /*'Oficinas',*/ 'Departamentos'],
];
const project = [
  'infoadmin',
  'powerbi',
  'onas',
  'conversation',
  'journey',
  'analysis',
];

const drawerWidth = 150;

export default function IconSidebarResponsive() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(Array(6).fill(null));
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const currentCompany = useSelector((state) => state.companies.currentCompany);

  const handleItemClick = (index) => (event) => {
    if (
      index === 0 &&
      userInfo?.role.findIndex((p) => p === 'Administrador') < 0 &&
      userInfo?.role.findIndex((p) => p === 'Management') < 0 &&
      userInfo?.role.findIndex((p) => p === 'MultiCompania') < 0
    ) {
      event.preventDefault();
    } else if (
      index === 1 &&
      userInfo?.role.findIndex((p) => p === 'PowerBiDashboard') < 0
    ) {
      event.preventDefault();
    } else if (
      index === 2 &&
      userInfo?.role.findIndex((p) => p === 'Onas') < 0
    ) {
      event.preventDefault();
    } else if (
      index === 3 &&
      userInfo?.role.findIndex((p) => p === 'Dinamyc') < 0
    ) {
      event.preventDefault();
    } else if (
      index === 4 &&
      userInfo?.role.findIndex((p) => p === 'Journey') < 0
    ) {
      event.preventDefault();
    } else if (
      index === 5 &&
      userInfo?.role.findIndex((p) => p === 'Sentimental') < 0
    ) {
      event.preventDefault();
    } else {
      let tmp = anchorEl.map((val, key) => {
        if (index === key) {
          return event.currentTarget;
        } else {
          return val;
        }
      });
      setAnchorEl(tmp);
    }
  };
  const handleClose = (index) => {
    let tmp = anchorEl.map((val, key) => {
      if (index === key) {
        return null;
      } else {
        return val;
      }
    });
    setAnchorEl(tmp);
  };

  const handleRedirect = (index, key) => {
    if (index === 1) {
      navigate('/' + project[index]);
    } else if (index === 2) {
      if (key === 1) {
        navigate('/onas/ver-encuestas');
      } else {
        navigate('/onas');
      }
    } else if (index === 4) {
      navigate('/journey');
    } else {
      navigate('/' + project[index] + '/' + drop[index][key]);
    }

    handleClose(index);
  };

  return (
    <Box
      sx={{
        backgroundColor:'white',
        height: '100vh' ,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        scrollbarWidth: 'none',
        display: { xs: 'none', sm: 'block' },
      }}
      aria-label="mailbox folders"
    > 
        <Toolbar>
        <img
          src={
            userInfo?.role.findIndex((p) => p === 'MultiCompania') < 0
              ? (currentCompany && currentCompany.Logotipo)  // Verifica si currentCompany no es null antes de intentar acceder a Logotipo
              : multicompani
          }
          alt="profile"
          className={styles.photo}
        />
        </Toolbar>
        <List
          style={{
            marginTop: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            gap: '1em',
          }}
        >
          {names.map((text, index) => (
            <ListItem key={index}>
              <ListItemButton
                onMouseEnter={handleItemClick(index)}
                onClick={handleItemClick(index)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                id={'demo-positioned-button' + index}
                aria-controls={
                  Boolean(anchorEl[index]) ? 'demo-positioned-menu' : undefined
                }
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl[index]) ? 'true' : undefined}
              >
                <ListItemIcon>
                  <img
                    src={list[index]}
                    alt="oletter"
                    className={styles.icon}
                  />
                </ListItemIcon>
              </ListItemButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl[index]}
                open={Boolean(anchorEl[index])}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => handleClose(index)}
                MenuListProps={{ onMouseLeave: () => handleClose(index) }}
              >
                {drop[index].map((val, key) => {
                  if (
                    val === 'Empresas' &&
                    userInfo?.role.findIndex((p) => p === 'MultiCompania') < 0
                  ) {
                    return null;
                  } else {
                    return (
                      <div key={key}>
                        <MenuItem onClick={() => handleRedirect(index, key)}>
                          <div>{val}</div>
                        </MenuItem>
                      </div>
                    );
                  }
                })}
              </Menu>
            </ListItem>
          ))}
        </List>
    </Box>
  );
}