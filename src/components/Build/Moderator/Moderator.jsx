import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import {HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import { Card, CardContent, Grid, Paper } from '@mui/material';
import { Divider, Icon, Toolbar, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import axios from 'axios';
import { Demographics } from './Demographics';

import { ChatBox } from './ChatBox';

import styles from './ChatBox.module.css';
import ConSidebar from '../../../Layout/ConSidebar/ConSidebar';
import CountdownTimer from './CountdownTimer';
import { ConnectDisconnectUser } from './ConnectDisconnectUser';

export const Moderator = ({ id }) => {
  const [connection, setConnection] = useState(null);
  const [survey, setSurvey] = useState([]);
  const [demographic, setDemographics] = useState([]);
  const [responseDemographic, setResponseDemographic] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState(0);
  function detectURL(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (urlMatch) {
      return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
    });
  }

  const questionIcons = [
    {
      tipoPregunta: 'texto',
      icono: <ChatOutlinedIcon />,
    },
    {
      tipoPregunta: 'seleccionsimple',
      icono: <ListOutlinedIcon />,
    },
  ];

  const fetchSurvey = async () => {

    try {
      const response = await axios.get(
        `https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/GetSurvey/getSurvey/${id}`
      );
      setSurvey(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    try {
      const signalRConnection = new HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl(
          'https://localhost:7005/discusion',
          //'https://chatapppeopleintelligence.azurewebsites.net/discusion',
          {}
        )
        .withAutomaticReconnect()
        .build();
  
      setConnection(signalRConnection);
      fetchSurvey();

     
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (connection && survey) {
      connection.start().then(() => {
        const demographicList = [
          {
            "name": "GENERO",
            "demographicDetails": [
              {
                "id": "1692135097221",
                "demographicId": "5bdf1b43-4547-4a4f-8f70-860c3b0f43b3",
                "value": "MASCULINO",
                "demograpicCount": 0
              },
              {
                "id": "1692135118083",
                "demographicId": "5bdf1b43-4547-4a4f-8f70-860c3b0f43b3",
                "value": "FEMENINO",
                "demograpicCount": 0
              }
            ]
          }
        ]
        connection.invoke("ChargeDemographics", demographicList, 300, "Buenas Noches esta es una prueba de DinamicLiveConversation").catch(function (err) {
          return console.error(err.toString());
      });
        connection.on("ReceiveDemograpics", (newDemographics, newDescription) => {
          setDemographics(newDemographics);
        });
        connection.on("clientConnected", setConnectedUsers);
        connection.on("clientDisconnected", setConnectedUsers);
        connection.on("DemographicCount", (idDemo, count) => {
          setResponseDemographic(prevCounts => ({ ...prevCounts, [idDemo]: count }));
        })
      })
      .catch(error => console.error('Error al conectar con SignalR:', error));

      // Limpieza al desmontar
      return () => {
        connection.off("ReceiveDemographics");
        connection.off("clientConnected", setConnectedUsers);
        connection.off("clientDisconnected", setConnectedUsers);
      };
    }
  }, [connection])

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
    0: { name: 'Shun', avatar: 'https://i.pravatar.cc/150?img=32' },
  };
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flex: '1',
      }}
      aria-label="mailbox folders"
    >
      <Grid container>
        <Grid item xs={4}>
          <div
            style={{
              padding: '2rem',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Card
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {survey.encuesta}
                </Typography>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              style={{
                width: '100%',
                marginBottom: '1rem',
                backgroundColor: '#cce7ff',
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Datos demográficos
                </Typography>
                <List>
                  {survey.demographicList && survey.demographicList.map((demographic, index) => (

                    <Accordion key={index}>
                      
                      <AccordionSummary>
                        <Typography>{demographic.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {demographic.demographicDetails.map((detail, index2) => (
                          <p key={index2}>{detail.value}</p>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              style={{ width: '100%', backgroundColor: '#cce7ff' }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Preguntas 
                </Typography>
                <List>
                  {survey.preguntas && survey.preguntas.map((option) => {
                    const iconObject = questionIcons.find(
                      (d) => d.tipoPregunta === option.type
                    );
                    const iconToDisplay = iconObject ? iconObject.icono : null;
                    return (
                      <>
                        <div
                          style={{
                            backgroundColor: 'white',
                            heightMin: '100px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              padding: '1rem',
                            }}
                          >
                            <Typography>{option.orderNumber}</Typography>
                            <div style={{ marginLeft: '2rem' }}>
                              <span
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Typography style={{ color: 'blue' }}>
                                  {iconToDisplay}
                                </Typography>
                                <Typography>{option.type}</Typography>

                                <Typography>
                                  {option.timeLimit
                                    ? ` | ${option.timeLimit}`
                                    : null}
                                </Typography>
                              </span>

                              <Typography>{option.name}</Typography>
                            </div>
                          </div>

                          {option.options && option.options.length > 0 && (
                            <>
                            
                              <Accordion
                              key={option.id}
                              style={{ boxShadow: 'none', border: 'none' }}
                            >
                              <AccordionSummary>
                                <Typography>Mostar opciones</Typography>
                              </AccordionSummary>

                              <AccordionDetails>
                                <List>
                                {option.options.map((option, index)=>(
                                  <>
                                    <p>{option.value}</p>
                                  </>
                                ))}
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
          <div style={{ display: 'flex', justifyContent:'space-around' }}>
          <CountdownTimer countdownTime={survey.timeDemographics} startTime={Date.now()}/>
          {  connection && <ConnectDisconnectUser connectedUsers={connectedUsers} />}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div className={styles.chatApp__room}>
            <Demographics responseDemographic={responseDemographic} demographics={demographic}/>
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
