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
    <Box sx={{ display: "flex" }}>
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
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
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2Y0NDc5MWItNTU0YS00MmI0LWFjOTMtNTdjZTQ1ZWFhZDAxLyIsImlhdCI6MTY2NTcxMDU4NywibmJmIjoxNjY1NzEwNTg3LCJleHAiOjE2NjU3MTQ5NTgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFOMm5wOUpFZUtnbitaOHRIRXFPZ0dRdnErc21VSm8zVnl1NmNhcUMwRHVsVm1aem43TWRNb2o1SWJDV1l1WG5KdTl2QU9vUDRBbWJZV2tNc2Z6V3RuMUhvMTF5YVlmRXg4c3Y4OWNPbk1wND0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJCYXJjbyBHb21leiIsImdpdmVuX25hbWUiOiJTYW50aWFnbyIsImlwYWRkciI6IjE4MS41OC41My4yNTMiLCJuYW1lIjoiU2FudGlhZ28gQmFyY28gR29tZXoiLCJvaWQiOiJkY2I4M2Y1Mi02YTJmLTRhYWMtYmRlZC1iODhkMDUwZTUzYjkiLCJwdWlkIjoiMTAwMzIwMDIxQ0I5ODI4OSIsInJoIjoiMC5BWDBBRzNsRXowcFZ0RUtzazFmT1JlcXRBUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ2NBRGsuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidzJBWUJRcW4xVDc3Wnp4Rmo0NUZLQkEzRWRIVmhLM09zYUFkTzVFSEctRSIsInRpZCI6ImNmNDQ3OTFiLTU1NGEtNDJiNC1hYzkzLTU3Y2U0NWVhYWQwMSIsInVuaXF1ZV9uYW1lIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXBuIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXRpIjoiU2NpMFlnSjFEVUtEbzNPbjRzVUdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.WEH9pEK0ccUCg-6avYFKSoWasEf1-PtI2gSo_UG1Uq8rnrBZFjbVP2l691K1jvPCJTPcDScbl53Sen7havcRdNw-71NSQry0wKMBUyO8Jv2VAyoWjdYVBhNqp7GDWT248AovgpYrCSvfxMvwWJTJNY--Ymfph7DSZNJCz8sucm3CfaBxrgiz6-1M2K1osF6M71oy2u9wqUYmVQl6ErNQDEMkh_pmuaFYHFWdivHfGREuGsssap0-5NAnvF5JUOym__QVAewEmCaIYPFfCV-OboX9U4CSnGFs_Ym2FW9rD-8_4dAMU59h3j3OtZxVizNbuvW1Ee1zG9iBbYAkVm61mA",
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
