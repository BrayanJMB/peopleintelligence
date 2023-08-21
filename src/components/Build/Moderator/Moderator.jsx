import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { Paper, Card, CardContent, Grid } from "@mui/material";
import { Divider, Icon, Toolbar, Typography } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { ChatBox } from "./ChatBox";
import styles from "./ChatBox.module.css";

export const Moderator = ({ id }) => {
  function detectURL(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (urlMatch) {
      return '<a href="' + urlMatch + '">' + urlMatch + "</a>";
    });
  }

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

  const questionIcons = [
    {
      tipoPregunta: "texto",
      icono: <ChatOutlinedIcon />,
    },
    {
      tipoPregunta: "seleccionsimple",
      icono: <ListOutlinedIcon />,
    },
  ];

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState({});

  const sendMessage = (sender, senderAvatar, message) => {
    setTimeout(() => {
      let messageFormat = detectURL(message);
      let newMessageItem = {
        id: messages.length + 1,
        sender: sender,
        senderAvatar: senderAvatar,
        message: messageFormat,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageItem]);
      resetTyping(sender);
    }, 400);
  };

  const typing = (writer) => {
    if (!isTyping[writer]) {
      setIsTyping((prevIsTyping) => ({ ...prevIsTyping, [writer]: true }));
    }
  };

  const resetTyping = (writer) => {
    setIsTyping((prevIsTyping) => ({ ...prevIsTyping, [writer]: false }));
  };

  const users = {
    0: { name: "Shun", avatar: "https://i.pravatar.cc/150?img=32" },
  };
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        flex: "1",
      }}
      aria-label="mailbox folders"
    >
      <Grid container>
        <Grid item xs={4}>
          <div
            style={{
              padding: "2rem",
              backgroundColor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Card
              variant="outlined"
              style={{ width: "100%", marginBottom: "1rem" }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {currentSurvey.Title}
                </Typography>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              style={{
                width: "100%",
                marginBottom: "1rem",
                backgroundColor: "#cce7ff",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Datos demográficos
                </Typography>
                <List>
                  {currentSurvey.Demographic.map((demographic) => (
                    <Accordion key={demographic.Name}>
                      <AccordionSummary>
                        <Typography>{demographic.Name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {demographic.DemographicDetails.map((detail) => (
                          <p>{detail.Value}</p>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              style={{ width: "100%", backgroundColor: "#cce7ff" }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Preguntas
                </Typography>
                <List>
                  {currentSurvey.Questions.map((option) => {
                    const iconObject = questionIcons.find(
                      (d) => d.tipoPregunta === option.Type
                    );
                    const iconToDisplay = iconObject ? iconObject.icono : null;
                    console.log(option.Options);
                    return (
                      <>
                        <div
                          style={{
                            backgroundColor: "white",
                            heightMin: "100px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              padding: "1rem",
                            }}
                          >
                            <Typography>{option.OrderNumber}</Typography>
                            <div style={{ marginLeft: "2rem" }}>
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography style={{ color: "blue" }}>
                                  {iconToDisplay}
                                </Typography>
                                <Typography>{option.Type}</Typography>

                                <Typography>
                                  {option.TimeLimit
                                    ? ` | ${option.TimeLimit}`
                                    : null}
                                </Typography>
                              </span>

                              <Typography>{option.Name}</Typography>
                            </div>
                          </div>

                          {option.Options && option.Options.length > 0 && (
                            <>
                              <Accordion
                                key={option.id}
                                style={{ boxShadow: "none", border: "none" }}
                              >
                                <AccordionSummary>
                                  <Typography>Mostar opciones</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                  <List>
                                    <p>dsa</p>
                                    <p>dsa</p>
                                    <p>dsa</p>
                                    <p>dsa</p>
                                    <p>dsa</p>
                                    <p>dsa</p>
                                  </List>
                                </AccordionDetails>
                              </Accordion>
                            </>
                          )}
                        </div>
                        <Divider />
                      </>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <p>Hola soy uan prueba</p>
            <div className={styles.chatApp__room}>
              {Object.keys(users).map((key) => {
                const user = users[key];
                return (
                  <ChatBox
                    key={key}
                    owner={user.name}
                    ownerAvatar={user.avatar}
                    sendMessage={sendMessage}
                    typing={typing}
                    resetTyping={resetTyping}
                    messages={messages}
                    isTyping={isTyping}
                  />
                );
              })}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
