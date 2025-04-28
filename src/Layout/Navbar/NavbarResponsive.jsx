import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Aletter from '../../assets/icons/Aletter.png';
import Dletter from '../../assets/icons/Dletter.png';
import Iletter from '../../assets/icons/Iletter.png';
import Jletter from '../../assets/icons/Jletter.png';
import Oletter from '../../assets/icons/Oletter.png';
import Sletter from '../../assets/icons/Sletter.png';
import multicompani from '../../assets/multicompani.jpeg';
import {
  companiesAdded,
  currentCompanySelected,
  fetchCompanies,
} from '../../features/companies/companiesSlice';
import { fetchActiveCompany, setDrop } from '../../features/employe/employe';
import axios from '../../utils/axiosInstance';

import styles from './Navbar.module.css';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const drawerWidth = 240;

const optionsMenuMobile = [
  {
    optionName: 'Inicio',
    letterImage: <HomeIcon />,
    optionsAccordions: [],
  },
  {
    optionName: 'Information Management',
    letterImage: Iletter,
    optionsAccordions: [
      'Empresas',
      'Empleados',
      'Departamentos',
      'Otros campos',
    ],
  },
  {
    optionName: 'Advanced Analytics & Dashboards',
    letterImage: Aletter,
    optionsAccordions: ['powerbi'],
  },
  {
    optionName: 'Organizational Network Analysis',
    letterImage: Oletter,
    optionsAccordions: ['Crear encuesta', 'Ver encuestas'],
  },
  {
    optionName: 'Dynamic Live Conversations',
    letterImage: Dletter,
    optionsAccordions: [],
  },
  {
    optionName: 'Employee Journey',
    letterImage: Jletter,
    optionsAccordions: ['journey'],
  },
  {
    optionName: 'Configuraciones',
    letterImage: <SettingsIcon />,
    optionsAccordions: [
      'Registrar dashboards',
      'Registrar reportes',
      'Administrar compañias',
      'Administrar usuarios',
    ],
  },
  {
    optionName: 'Logout',
    letterImage: <LogoutIcon />,
    optionsAccordions: [],
  },
];

export default function NavbarResponsive() {
  const isMdUp = useMediaQuery('(min-width:600px)'); // 'sm' breakpoint (600px)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeCompanies = useSelector(
    (state) => state.activeCompanies.activeCompanies
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  //const [drop, setDrop] = useState(null);
  const drop = useSelector((state) => state.activeCompanies.drop);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [data, setData] = useState({
    content: { company: [] },
    ids: { company: [] },
  });
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleHome = () => {
    navigate('/dashboard');
  };
  const handleRegister = (text) => {
    navigate('/register/' + text);
  };
  const handleRoles = () => {
    navigate('/rolescompany');
  };
  const handleUserAdministrator = () => {
    navigate('/UserAministrator');
  };
  const handleLogOut = () => {
    localStorage.removeItem('userInfo');
    window.location.replace(
      `https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2F${process.env.REACT_APP_DOMAIN_B2C}.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login`
    );
  };

  const companyConsume = async (id) => {
    try {
      await axios.get('companias/MultiCompani/' + id).then((response) => {
        let fetch = [];
        let id = [];

        dispatch(companiesAdded(response.data));

        response.data.forEach((val) => {
          if (!fetch.includes(val.nombreCompania)) {
            fetch.push(val.nombreCompania);
            id.push(val);
          }
        });
        let holder = data;
        holder.content.company = fetch;
        holder.ids.company = id;
        setData(holder);
      });
    } catch (error) {}
  };

  const handleSelect = (value) => {
    if (!value) {
      dispatch(setDrop(null));
      return;
    }
    let holder = JSON.parse(localStorage.getItem('userInfo'));
    localStorage.removeItem('userInfo');
    //let company = search(value, data.ids.company);
    /*
    dispatch(
      setCredentials({
        user: holder.user,
        Company: value.id,
        accessToken: holder.token,
        role: holder.role,
      })
    );*/
    dispatch(currentCompanySelected(value.id));

    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        user: holder.user,
        Company: value.id,
        username: holder.username,
        accessToken: holder.accessToken,
        role: holder.role,
      })
    );
    dispatch(setDrop(value));
  };

  useEffect(() => {
    if (userInfo?.role.findIndex((p) => p === 'MultiCompania') > -1) {
      //companyConsume(userInfo.user);
      dispatch(fetchCompanies({ idUser: userInfo.user }));
      dispatch(fetchActiveCompany({ idUser: userInfo.user }));
    } else {
      dispatch(fetchCompanies({ idUser: userInfo.user }));
      dispatch(fetchActiveCompany({ idUser: userInfo.user }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!drop && activeCompanies && activeCompanies.length > 0) {
      dispatch(setDrop(activeCompanies[0]));
      let holder = JSON.parse(localStorage.getItem('userInfo'));
      localStorage.removeItem('userInfo');
      dispatch(currentCompanySelected(activeCompanies[0].id));

      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          user: holder.user,
          username: holder.username,
          Company: activeCompanies[0].id,
          accessToken: holder.accessToken,
          role: holder.role,
        })
      );
    }
  }, [activeCompanies, drop, dispatch]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          {optionsMenuMobile.map((value, index) => (
            <ListItem key={Math.random()}>
              {value.optionsAccordions.length > 0 ? (
                <Accordion sx={{ boxShadow: 'none' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {typeof value.letterImage === 'string' ? (
                      <img
                        src={value.letterImage}
                        alt={value}
                        style={{
                          height: '30px',
                          width: '30px',
                          marginRight: '5px',
                        }}
                      />
                    ) : (
                      value.letterImage
                    )}
                    <ListItemText
                      primary={value.optionName}
                      primaryTypographyProps={{
                        style: {
                          wordWrap: 'break-word',
                        },
                      }}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <List component="div" disablePadding>
                      {value.optionsAccordions.map((value, index1) => (
                        <ListItem key={`${index1}`}>
                          <ListItemText primary={value} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <>
                  {typeof value.letterImage === 'string' ? (
                    <img
                      src={value.letterImage}
                      alt={value}
                      style={{ height: '30px', width: '30px' }}
                    />
                  ) : (
                    value.letterImage
                  )}
                  <ListItemText
                    primary={value.optionName}
                    primaryTypographyProps={{
                      style: {
                        wordWrap: 'break-word',
                      },
                    }}
                  />
                </>
              )}
            </ListItem>
          ))}

          {/* Añade más ListItem aquí para más opciones principales */}
        </List>
      </Drawer>
      <AppBar
        position="static"
        style={{ backgroundColor: 'white' }}
        elevation={0}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {userInfo.role.findIndex((p) => p === 'MultiCompania') > -1 ? (
              <>
                {isSmallScreen && (
                  <img
                    src={
                      userInfo?.role.findIndex((p) => p === 'MultiCompania') < 0
                        ? currentCompany && currentCompany.Logotipo
                        : multicompani
                    }
                    alt="profile"
                    onClick={handleDrawerOpen}
                    className={styles.photo}
                  />
                )}
                <Autocomplete
                  id="combo-box-demo"
                  options={activeCompanies}
                  clearOnEscape
                  disableClearable={true}
                  value={drop}
                  onChange={(e, value) => handleSelect(value)}
                  getOptionLabel={(option) => option.nombreCompañia || null}
                  noOptionsText={'No Options'}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Compañias"
                      variant="standard"
                      sx={{
                        width: {
                          sm: 300,
                          xs: 200,
                        },
                      }}
                    />
                  )}
                />
              </>
            ) : (
              <>
                {isSmallScreen && <MenuIcon onClick={handleDrawerOpen} />}
                <Typography
                  color="textPrimary"
                  variant="h6"
                  style={{ fontStyle: 'italic' }}
                >
                  {currentCompany && currentCompany.nombreCompania}
                </Typography>
              </>
            )}
            {isMdUp && (
              <Box>
                <IconButton onClick={handleHome}>
                  <HomeOutlinedIcon sx={{ fontSize: '40px' }} />
                </IconButton>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  style={{ marginRight: '1rem' }}
                  onClick={handleClick2}
                >
                  <SettingsOutlinedIcon sx={{ fontSize: '30px' }} />
                </IconButton>

                <IconButton
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar {...stringAvatar('Testing User')} />
                </IconButton>

                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <KeyboardArrowDownIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleLogOut()}>
                    <IconButton>
                      <Logout />
                    </IconButton>
                    Logout
                  </MenuItem>
                </Menu>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl2}
                  open={open2}
                  onClose={handleClose2}
                >
                  <MenuItem
                    disabled={
                      userInfo?.role.findIndex(
                        (p) => p === 'PowerBiAdministrator'
                      ) < 0
                    }
                    onClick={() => handleRegister('dashboard')}
                  >
                    Registrar dashboards
                  </MenuItem>
                  <MenuItem
                    disabled={
                      userInfo?.role.findIndex(
                        (p) => p === 'PowerBiAdministrator'
                      ) < 0
                    }
                    onClick={() => handleRegister('report')}
                  >
                    Registrar reportes
                  </MenuItem>
                  <MenuItem
                    disabled={
                      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
                    }
                    onClick={() => handleRoles()}
                  >
                    Administrar compañías
                  </MenuItem>
                  <MenuItem
                    disabled={
                      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
                    }
                    onClick={() => handleUserAdministrator()}
                  >
                    Administrar usuarios
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
