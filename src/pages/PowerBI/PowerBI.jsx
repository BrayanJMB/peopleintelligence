import React, { useState } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import styles from "./PowerBI.module.css";
import Navbar from "../../components/Navbar/Navbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Iletter from "../../assets/icons/Iletter.png";
import Aletter from "../../assets/icons/Aletter.png";
import Oletter from "../../assets/icons/Oletter.png";
import Dletter from "../../assets/icons/Dletter.png";
import Jletter from "../../assets/icons/Jletter.png";
import Sletter from "../../assets/icons/Sletter.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const names = [
  "Information Management",
  "Advanced Analytics & Dashboards",
  "Organizational Network Analysis",
  "Dynamic Live Conversations",
  "Employee Journey",
  "Sentiment Analysis",
];

const root = [
  "infoadmin",
  "powerbi",
  "onas",
  "dynamiclive",
  "journey",
  "analysis",
];

const drop = [
  [
    "Information Management",
    "Empresas",
    "Empleados",
    "Oficinas",
    "Departamentos",
    "Otros campos",
  ],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  [
    "Organizational Network Analysis",
    "Cargar Información audiencia",
    "Envío de correo electrónico",
    "Monitor de avance ",
    "Analítica",
  ],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
  ["Empresas", "Empleados", "Oficinas", "Departamentos", "Otros campos"],
];

const list = [Iletter, Aletter, Oletter, Dletter, Jletter, Sletter];

export default function PowerBI() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(Array(6).fill(null));

  const handleItemClick = (index) => (event) => {
    let tmp = anchorEl.map((val, key) => {
      if (index === key) {
        return event.currentTarget;
      } else {
        return val;
      }
    });
    setAnchorEl(tmp);
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
    navigate("/" + root[index] + "/" + drop[index][key]);
  };

  const drawer = (
    <>
      <Toolbar>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profile"
          className={styles.photo}
        />
      </Toolbar>
      <List style={{ marginTop: "0.5rem" }}>
        {names.map((text, index) => (
          <ListItem key={index} disablePadding style={{ margin: "1rem 0" }}>
            <ListItemButton
              onClick={handleItemClick(index)}
              id={"demo-positioned-button" + index}
              aria-controls={
                Boolean(anchorEl[index]) ? "demo-positioned-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl[index]) ? "true" : undefined}
            >
              <ListItemIcon style={{ position: "relative" }}>
                <img src={list[index]} alt="oletter" className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary={text} style={{ color: "grey" }} />
            </ListItemButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl[index]}
              open={Boolean(anchorEl[index])}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={() => handleClose(index)}
            >
              {drop[index].map((val, key) => {
                return (
                  <MenuItem key={key} disabled={key === 0}>
                    <div onClick={() => handleRedirect(index, key)}>{val}</div>
                  </MenuItem>
                );
              })}
            </Menu>
          </ListItem>
        ))}
      </List>
    </>
  );
  return (
    <div className="App">
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: "fe404000-c09b-4576-9d98-37c5cbc3db49",
          embedUrl:"https://app.powerbi.com/reportEmbed?reportId=fe404000-c09b-4576-9d98-37c5cbc3db49&groupId=9e74cc56-feaf-4719-887b-40b66e4828fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBRdWVyeURhdGFTYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFQYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFFeHBvcnRUbyI6dHJ1ZX19",
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2Y0NDc5MWItNTU0YS00MmI0LWFjOTMtNTdjZTQ1ZWFhZDAxLyIsImlhdCI6MTY2NTYzMTgwMywibmJmIjoxNjY1NjMxODAzLCJleHAiOjE2NjU2Mzc0OTIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFxK09aUXVoMUdObVZaUDNPS2Y2ZDVRdXllYXJZQTRadE5xUzJUbVFGLzh2QVBEdFRYek1CUEMxYmlHN2dvd3hEWkJFVzFHRmVja3ZzV3k0bjF4TExZSVI3TmhOT2Z1WmFBZEt2MHF1WHVCdz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJCYXJjbyBHb21leiIsImdpdmVuX25hbWUiOiJTYW50aWFnbyIsImlwYWRkciI6IjE4MS41OC41My4yNTMiLCJuYW1lIjoiU2FudGlhZ28gQmFyY28gR29tZXoiLCJvaWQiOiJkY2I4M2Y1Mi02YTJmLTRhYWMtYmRlZC1iODhkMDUwZTUzYjkiLCJwdWlkIjoiMTAwMzIwMDIxQ0I5ODI4OSIsInJoIjoiMC5BWDBBRzNsRXowcFZ0RUtzazFmT1JlcXRBUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ2NBRGsuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidzJBWUJRcW4xVDc3Wnp4Rmo0NUZLQkEzRWRIVmhLM09zYUFkTzVFSEctRSIsInRpZCI6ImNmNDQ3OTFiLTU1NGEtNDJiNC1hYzkzLTU3Y2U0NWVhYWQwMSIsInVuaXF1ZV9uYW1lIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXBuIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXRpIjoiX2FiN1gycUJKa2F3XzVORHpZMHZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.IC5nQZqfWKcDBIPVG_sFFAv8kIHRu75f8eTZhqGXEJCUKJmCLQpVv4HoCi_Prmszsm3oI0lLVWuVytb4c81LhaLWbB184u6z8bfg5oQsXadGwt7O1Q8tnVGOB6Ow77xdAy9IIutNMhXq6XF49_sg7pfyDAaA4ZNU1bmZlEmyhtSE-gto5V1xTej-YKMjKhukC4YU8wkz3FTHLjA2t9sqY0yOwDDPB2hHIaWUPzkrK1W8EtM1CTJ75jA-sykzTTXeIi8mHZzXtP84CJmUQNjUJ-xKe-GBHSN7x8qWkdBAZjdByDGlIkpLrn5EVz-i9LDMejIEwfvL4w1OCjIv1mHEGQ",
          tokenType: models.TokenType.Add,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            background: models.BackgroundType.Transparent,
          },
        }}
        elevation={0}
        style={{ backgroundColor: "white" }}
      >
        <Navbar />
      </AppBar>
      <Box
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              overflow: "hidden",
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <PowerBIEmbed
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual and qna
              id: "fe404000-c09b-4576-9d98-37c5cbc3db49",
              embedUrl:
                "https://app.powerbi.com/reportEmbed?reportId=fe404000-c09b-4576-9d98-37c5cbc3db49&groupId=9e74cc56-feaf-4719-887b-40b66e4828fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBRdWVyeURhdGFTYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFQYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFFeHBvcnRUbyI6dHJ1ZX19",
              accessToken:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2Y0NDc5MWItNTU0YS00MmI0LWFjOTMtNTdjZTQ1ZWFhZDAxLyIsImlhdCI6MTY2NTY4ODIzMSwibmJmIjoxNjY1Njg4MjMxLCJleHAiOjE2NjU2OTI2NzEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFVZ2pzNUhuM0lKOG5BTitXZzdNalgxQnpDVkpYamFzRGpDb3ZCdkdmUHUxcTFibDdHUlRoblkxZ0JHZk5YanVxNnlsSVJWL3dqeVJ5M2pjRkszZUhkV0Z0M2swZDIwelZ4WWk3NzdSdW9wST0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJCYXJjbyBHb21leiIsImdpdmVuX25hbWUiOiJTYW50aWFnbyIsImlwYWRkciI6IjE4MS41OC41My4yNTMiLCJuYW1lIjoiU2FudGlhZ28gQmFyY28gR29tZXoiLCJvaWQiOiJkY2I4M2Y1Mi02YTJmLTRhYWMtYmRlZC1iODhkMDUwZTUzYjkiLCJwdWlkIjoiMTAwMzIwMDIxQ0I5ODI4OSIsInJoIjoiMC5BWDBBRzNsRXowcFZ0RUtzazFmT1JlcXRBUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ2NBRGsuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidzJBWUJRcW4xVDc3Wnp4Rmo0NUZLQkEzRWRIVmhLM09zYUFkTzVFSEctRSIsInRpZCI6ImNmNDQ3OTFiLTU1NGEtNDJiNC1hYzkzLTU3Y2U0NWVhYWQwMSIsInVuaXF1ZV9uYW1lIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXBuIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXRpIjoic0dRMzlBbzl5RS1tZWZydlNCMENBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.HQ6aQXCxkDBp87WxlAp2ue3vNa8R8HB0k66W0YpVIKc4jM93alcRrYlFeuvXeh9NLduG-NeTQWNbv_P4GRjoKIrpw2Z5hqlWZLgpHuQRo2NL_8uu52VM1LM8Vkl1vLdTFF60Gxx9SwTDbPZjUdXixzZrEcPFRrkOw-jmY2LPZrD5i1cOK5vD-kcGRW7HmghpELI0eenkyFT6IsEgtdPW1QJ2c7P-VmdfX_WTFEW-CWoWCgohsrSOWlPG_KFoiPFW3S-L_3C7QLJSQ4bEAwDmGQHgsuCkKk55_RMGOR1k3rEvF-qpeOVKQrWM3hts35M1nBOpS5-Ec1bPQ7BIrULj1g",
              tokenType: models.TokenType.Add,
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
                background: models.BackgroundType.Transparent,
              },
            }}
            eventHandlers={
              new Map([
                [
                  "loaded",
                  function () {
                    console.log("Report loaded");
                  },
                ],
                [
                  "rendered",
                  function () {
                    console.log("Report rendered");
                  },
                ],
                [
                  "error",
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
