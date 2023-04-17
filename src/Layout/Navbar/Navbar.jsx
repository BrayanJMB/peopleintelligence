import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
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

import { setCredentials } from '../../features/authSlice';
import { companiesAdded, currentCompanySelected } from '../../features/companies/companiesSlice';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [drop, setDrop] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
      'https://peopleintelligenceb2c.b2clogin.com/peopleintelligenceb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sisu&client_id=a6ae19dc-57c8-44ce-b8b9-c096366ba4a2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fsuite.peopleintelligence.app&scope=https%3A%2F%2Fpeopleintelligenceb2c.onmicrosoft.com%2Fa6ae19dc-57c8-44ce-b8b9-c096366ba4a2%2FFiles.Read&response_type=token&prompt=login'
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
      console.log(error);
    }
  };

  const search = (key, inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].nombreCompania === key) {
        return inputArray[i].id;
      }
    }
  };

  const handleSelect = (value) => {
    let holder = JSON.parse(localStorage.getItem('userInfo'));
    localStorage.removeItem('userInfo');
    let company = search(value, data.ids.company);

    dispatch(
      setCredentials({
        user: holder.user,
        Company: company,
        accessToken: holder.token,
        role: holder.role,
      })
    );
    dispatch(currentCompanySelected(company));


    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        user: holder.user,
        Company: company,
        accessToken: holder.accessToken,
        role: holder.role,
      })
    );
    setDrop(value);
  };

  useEffect(() => {
    if (userInfo?.role.findIndex((p) => p === 'MultiCompania') > -1) {
      companyConsume(userInfo.user);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                id="combo-box-demo"
                style={{ flexBasis: '180px' }}
                options={data.content.company}
                clearOnEscape
                value={drop}
                onChange={(e, value) => handleSelect(value)}
                getOptionLabel={(option) => {
                  //console.log(option, 'option')
                  return option;
                }}
                noOptionsText={'No Options'}
                renderInput={(params) => (
                  <TextField {...params} label="Compañias" />
                )}
                isOptionEqualToValue={(option, value) => {
                  //console.log(option, value)
                  return option === value;
                }}
              />
            ) : null}

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
