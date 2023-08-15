import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import * as signalR from "@microsoft/signalr";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Typography, Toolbar, Divider, Icon } from "@mui/material";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
export const Moderator = ({ id }) => {
  const currentSurvey = {
    id: "bf4c398f-fb3d-46c1-9df6-b3b2a9c9ecd1",
    Title: "Encuesta 1",
    TimeDemographics: 350,
    ImageUrl: "http://example.com/img1.jpg",
    Description: "Descripción de encuesta 1",
    CompanyId: 1,
    ModeratorId: "123A",
    Questions: [
      {
        id: "92ce935e-937b-47e0-84ca-255ccf02ad8a",
        OrderNumber: 1,
        Name: "¿Cuál es tu color favorito?",
        TimeLimit: null,
        Type: "texto",
        UrlMedia: "http://example.com/question1.jpg",
        PrentQuestionId: null,
        Options: [],
      },
      {
        id: "1e75d05c-1003-44ee-8e56-2163ddeaf0cc",
        OrderNumber: 2,
        Name: "¿Qué fruta prefieres?",
        TimeLimit: 90,
        Type: "seleccionsimple",
        UrlMedia: "",
        PrentQuestionId: null,
        Options: [
          {
            id: "7f55576a-ba9c-4409-a39e-94f59c44bba5",
            Value: "Manzana",
            StatisticValue: 1,
            ExperienceQuestion: null,
          },
          {
            id: "ef07c580-75d0-44a7-b3d0-c901c93ccdb9",
            Value: "Plátano",
            StatisticValue: 2,
            ExperienceQuestion: null,
          },
        ],
      },
    ],
    Demographic: [
      {
        id: "0fa73cbc-b165-4ef9-8487-a494290cfc4a",
        Name: "Rango de edad",
        DemographicDetails: [
          {
            DemographicId: "0fa73cbc-b165-4ef9-8487-a494290cfc4a",
            Value: "20-30 años",
            DemograpicCount: 10,
          },
          {
            DemographicId: "0fa73cbc-b165-4ef9-8487-a494290cfc4a",
            Value: "31-40 años",
            DemograpicCount: 5,
          },
        ],
      },
    ],
  };
  const [startTime, setStartTime] = useState(new Date());
  const [questionActual, setQuestionActual] = useState(0);
  const [connectedUsers, setConnectedUsers] = useState(0);
  console.log(currentSurvey);
  return (
    <Box sx={{ height: "100vh", backgroundColor: "white" }} aria-label="mailbox folders">
      <div>
        <p>{currentSurvey.Title}</p>
      </div>
      <p>Datos demográficos</p>
      <List sx={{  backgroundColor: "#cce7ff" }}>
        {currentSurvey.Demographic.map((demographic) => (
          <Accordion key={demographic.Name}>
            <AccordionSummary>
              <Typography>{demographic.Name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {demographic.DemographicDetails.map((detail)=>(
                <p>{detail.Value}</p>
              ))}
              <List>

              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
      <p>Preguntas</p>
      <List sx={{  backgroundColor: "#cce7ff" }}>
        {currentSurvey.Questions.map((option) => (
          <Accordion key={option.id}>
            <AccordionSummary>
              <Typography>{option.Name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <p>dsa</p>
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );
};
