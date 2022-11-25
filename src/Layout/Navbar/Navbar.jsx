import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "../../utils/axiosInstance";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

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
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const drawerWidth = 240;

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [drop, setDrop] = useState("");
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
    navigate("/dashboard");
  };
  const handleRegister = (text) => {
    navigate("/register/" + text);
  };
  const handleRoles = () => {
    navigate("/rolescompany");
  };
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    window.location.replace(
      "https://pruebaapib2c.b2clogin.com/PruebaAPib2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignInSingUp&client_id=08cfdf65-11e3-45b6-a745-3c0bd35777ae&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fhappy-island-0e573c910.2.azurestaticapps.net%2F&scope=https%3A%2F%2FPruebaAPib2c.onmicrosoft.com%2FApidinamic%2FApi.ReadWrite&response_type=token&prompt=login"
    );
  };
  const companyConsume = async (id) => {
    try {
      await axios.get("companias/GetCompanias/" + id).then((res) => {
        let fetch = [];
        let id = [];
        res.data.forEach((val) => {
          if (!fetch.includes(val.nombreCompañia)) {
            fetch.push(val.nombreCompañia);
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
      if (inputArray[i].nombreCompañia === key) {
        return inputArray[i].id;
      }
    }
  };

  const handleSelect = (value) => {
    let holder = JSON.parse(localStorage.getItem("userInfo"));
    localStorage.removeItem("userInfo");
    let company = search(value, data.ids);
    localStorage.setItem(
      "userInfo",
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
    if (userInfo?.role.findIndex((p) => p === "MultiCompania") > -1) {
      companyConsume(userInfo.user);
    }
  }, []);

  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
      elevation={0}
      style={{ backgroundColor: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {userInfo.role.findIndex((p) => p === "MultiCompania") > -1 ? (
              <Autocomplete
                id="combo-box-demo"
                style={{ flexBasis: "180px" }}
                options={data.content.company}
                clearOnEscape
                value={drop}
                onChange={(e, value) => handleSelect(value)}
                getOptionLabel={(option) => option}
                noOptionsText={"No Options"}
                renderInput={(params) => (
                  <TextField {...params} label="company Name" />
                )}
              />
            ) : null}

            <IconButton onClick={handleHome}>
              <HomeOutlinedIcon sx={{ fontSize: "40px" }} />
            </IconButton>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              style={{ marginRight: "1rem" }}
              onClick={handleClick2}
            >
              <SettingsOutlinedIcon sx={{ fontSize: "30px" }} />
            </IconButton>

            <IconButton
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar {...stringAvatar("Testing User")} />
            </IconButton>

            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
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
              <MenuItem>
                <IconButton onClick={handleLogOut}>
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
                    (p) => p === "PowerBiAdministrator"
                  ) < 0
                }
                onClick={() => handleRegister("dashboard")}
              >
                Registrar dashboards
              </MenuItem>
              <MenuItem
                disabled={
                  userInfo?.role.findIndex(
                    (p) => p === "PowerBiAdministrator"
                  ) < 0
                }
                onClick={() => handleRegister("report")}
              >
                Registrar reportes
              </MenuItem>
              <MenuItem
                disabled={
                  userInfo?.role.findIndex((p) => p === "Administrador") < 0
                }
                onClick={() => handleRoles()}
              >
                Administrar compañías
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
