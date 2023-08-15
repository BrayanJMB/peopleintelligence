import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Typography, Toolbar, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { selectCompanyById } from "../../features/companies/companiesSlice";
import styles from "./ConSidebar.module.css";
import { useEffect } from "react";

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

export default function ConSidebar(props) {
  const navigate = useNavigate();
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const company = useSelector((state) =>
    currentCompany ? selectCompanyById(state, currentCompany.id) : null
  );
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const options = [
    {
      key: "panel1",
      title: "Crea tu sala",
      icon: <RateReviewOutlinedIcon />,
      path:"/conversation/Build",
      subOptions: [
        {
          key: "datos_encuesta",
          label: "Información encuesta",
          pathRedirect: "basic",
        }
      ],
    },
    {
      key: "panel2",
      title: "Discussion",
      path:"/conversation/Live",
      icon: <ForumOutlinedIcon />,
      subOptions: [
        {
          key: "lista_encuestas",
          label: "Lista encuestas",
          pathRedirect: "basic",
        }
      ],
    },
  ];

  return (
    <Box sx={{ backgroundColor: "white" }} aria-label="mailbox folders">
      <Toolbar style={{ padding: 0 }}>
        <img
          src={company?.Logotipo ?? null}
          alt="profile"
          className={styles.photo}
        />
      </Toolbar>
      <Divider variant="middle" />
      <List sx={{ height: "100%", backgroundColor: "#cce7ff" }}>
        {options.map((option) => (
          <Accordion
            key={option.key}
            expanded={expanded === option.key}
            onChange={handleChange(option.key)}
          >
            <AccordionSummary expandIcon={option.icon}>
              <Typography
                sx={{
                  color: option.subOptions.some(
                    (sub) => sub.key === selectedOption
                  )
                    ? "#0000ff" // color azul cuando está seleccionado
                    : "inherit", // color por defecto
                }}
              >
                {option.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {option.subOptions.map((subOption) => (
                  <ListItem key={subOption.key}>
                    <ListItemButton
                      onClick={() => {
                        setSelectedOption(subOption.key);
                        props.handleMove(option.path, subOption.pathRedirect);
                      }}
                      sx={{
                        backgroundColor:
                          selectedOption === subOption.key
                            ? "#b3d4fc"
                            : "transparent",
                      }}
                    >
                      {subOption.label}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );
}


