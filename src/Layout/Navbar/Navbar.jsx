import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { companiesAdded, currentCompanySelected, fetchCompanies } from '../../features/companies/companiesSlice';
import { fetchActiveCompany, setDrop } from '../../features/employe/employe';
import axios from '../../utils/axiosInstance';

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

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeCompanies = useSelector((state) => state.activeCompanies.activeCompanies);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
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
    } catch (error) {
    }
  };



  const handleSelect = (value) => {
    if (!value) {
      dispatch(setDrop(null));
      return;
    }
    const holder = JSON.parse(localStorage.getItem('userInfo')) || {};

    dispatch(currentCompanySelected(value.id));
    dispatch(setDrop(value));

    localStorage.setItem('userInfo', JSON.stringify({
      ...holder,
      Company: value.id,
    }));
  };

  useEffect(() => {
    if (userInfo?.role.findIndex((p) => p === 'MultiCompania') > -1) {
      //companyConsume(userInfo.user);
      dispatch(fetchCompanies({ idUser: userInfo.user }));
      dispatch(fetchActiveCompany({ idUser: userInfo.user }));
    }else{
      dispatch(fetchCompanies({ idUser: userInfo.user }));
      dispatch(fetchActiveCompany({ idUser: userInfo.user }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
  
    if (activeCompanies && activeCompanies.length > 0) {
      if (storedUserInfo && storedUserInfo.Company) {
        // Si hay una compañía almacenada en el localStorage, úsala
        const storedCompany = activeCompanies.find(company => company.id === storedUserInfo.Company);
        if (storedCompany) {
          dispatch(setDrop(storedCompany));
          dispatch(currentCompanySelected(storedCompany.id));
        } else {
          // Si la compañía almacenada no se encuentra, selecciona la primera por defecto
          const firstCompany = activeCompanies[0];
          dispatch(setDrop(firstCompany));
          dispatch(currentCompanySelected(firstCompany.id));
          
          const holder = JSON.parse(localStorage.getItem('userInfo')) || {};
          localStorage.setItem('userInfo', JSON.stringify({
            ...holder,
            Company: firstCompany.id,
          }));
        }
      } else {
        // Si no hay compañía almacenada, selecciona la primera por defecto
        const firstCompany = activeCompanies[0];
        dispatch(setDrop(firstCompany));
        dispatch(currentCompanySelected(firstCompany.id));
  
        // Actualiza el localStorage
        const holder = JSON.parse(localStorage.getItem('userInfo')) || {};
        localStorage.setItem('userInfo', JSON.stringify({
          ...holder,
          Company: firstCompany.id,
        }));
      }
    }
  }, [activeCompanies, drop, dispatch]);



  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
      elevation={0}
      style={{ backgroundColor: 'white' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {userInfo.role.findIndex((p) => p === 'MultiCompania') > -1 ? (
              <Autocomplete
              sx={{ width: '100%' }}
              id="combo-box-demo"
              style={{ flexBasis: '180px' }}
              options={activeCompanies}
              clearOnEscape
              disableClearable={true}
              value={drop}
              onChange={(e, value) => handleSelect(value)}
              getOptionLabel={(option) => option.nombreCompañia || null}
              noOptionsText={'No Options'}
              renderInput={(params) => (
                <TextField {...params} label="Compañias" variant="standard"  
                sx={{ width: 300 }}     
                />
              )}

            />
            ) : (<Typography color="textPrimary" variant="h6" style={{ fontStyle: 'italic' }}>
            {currentCompany && currentCompany.nombreCompania}
          </Typography>)}

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
        </Toolbar>
      </Container>
    </AppBar>
  );
}