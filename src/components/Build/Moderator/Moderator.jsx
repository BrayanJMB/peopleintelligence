import { createContext, useEffect, useRef,useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Button, Card, CardContent, Grid, Paper } from '@mui/material';
import { Divider, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import axios from 'axios';

import { ChatBox } from './ChatBox';
import { ConnectDisconnectUser } from './ConnectDisconnectUser';
import CountdownTimer from './CountdownTimer';

import styles from './ChatBox.module.css';
export const singleQuestionContext = createContext();
export const answerSingleQuestionContext = createContext();
export const nextQuestionTimerContext = createContext();

export const Moderator = ({ id }) => {
  const [connection, setConnection] = useState(null);
  const [survey, setSurvey] = useState([]);
  const [demographic, setDemographics] = useState([]);
  const [question, setQuestions] = useState([]);
  const [responseDemographic, setResponseDemographic] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(null);
  const [answersOpinion, setAnswersOpinion] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState(null);
  const [answerSingleQuestion, answerSetSingleQuestion] = useState(null);
  const indexCurrentQuestion = useRef(null);
  const [complexQuestion, setComplexQuestion] = useState(true);

  function detectURL(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (urlMatch) {
      return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
    });
  }

  const users = {
    0: { name: 'Shun', avatar: 'https://i.pravatar.cc/150?img=32' },
  };
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
    } catch (error) {}
  };

  const initializeConnectionAndFetchData = async () => {
    try {
      await fetchSurvey();

      const signalRConnection = new HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl('https://chatapppeopleintelligence.azurewebsites.net/discusion')
        .withAutomaticReconnect()
        .build();

      setConnection(signalRConnection);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    initializeConnectionAndFetchData();
  }, []);

  useEffect(() => {
    if (connection && survey) {
      connection
        .start()
        .then(() => {
          connection
            .invoke(
              'ChargeDemographics', //Carga de Demográficos apeans carga el chat, si existen.
              survey.demographicList,
              survey.timeDemographics,
              survey.description
            ).then(() => console.log("envío data"))
            .catch(function (err) {
              return console.error(err.toString());
            });
          connection.on('RecibirRespuestaSingle', (answer, counter) => {
            answerSetSingleQuestion({
              answer: answer,
              counter: counter,
            });
            if  (counter >= connectedUsers){
              setComplexQuestion(true);
              setNextQuestion(indexCurrentQuestion.current);
            }
          });
          connection.on('SendRespuestasDos', (tablarespuestas) => {
            setAnswersOpinion(tablarespuestas);
          });
          connection.on('clientConnected', setConnectedUsers);
          connection.on('clientDisconnected', setConnectedUsers);
          connection.on('DemographicCount', (idDemo, count) => {
            setResponseDemographic((prevCounts) => ({
              ...prevCounts,
              [idDemo]: count,
            }));
          });

          connection.on('QuestionSingleOptions', (question) => {
            setSingleQuestion(question);
          });

          // Actualiza la interfaz de usuario con el tiempo actual
          connection.on('UpdateTime', (time) => {
            setQuestionTimer(time);
            if (time === 0) {
              setComplexQuestion(true);
              setNextQuestion(indexCurrentQuestion.current);
            }
          });
        })
        .catch((error) =>
          console.error('Error al conectar con SignalR:', error)
        );

      // Limpieza al desmontar
      return () => {
        connection.off('ReceiveDemographics');
        connection.off('clientConnected', setConnectedUsers);
        connection.off('clientDisconnected', setConnectedUsers);
      };
    }
  }, [connection]);

  useEffect(() => {
    let newMessageItem = {
      id: messages.length + 1,
      sender: 'Shun',
      senderAvatar: 'https://i.pravatar.cc/150?img=32',
      messageType: 'demographic',
    };
    setMessages((prevMessages) => [...prevMessages, newMessageItem]);
  }, []);

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

  const nextQuestionTimer = (timeLimit) => {
    let timeInt = parseInt(timeLimit);
    connection.invoke('StartTimer', timeInt).catch(function (err) {
      return console.error(err.toString());
    });
    setQuestionTimer(timeLimit);
  };

  const SendQuestionByType = (type, question, index) => {
    let currentQuestion = question.orderNumber;
    switch (type.toLowerCase()) {
      case 'texto':
        connection
          .invoke('SendText', question.name)
          .then(() => {
            let newMessageItem = {
              id: messages.length + 1,
              sender: 'Shun',
              senderAvatar: 'https://i.pravatar.cc/150?img=32',
              messageType: 'question',
              content: question,
            };
            setMessages((prevMessages) => [...prevMessages, newMessageItem]);
            indexCurrentQuestion.current = currentQuestion;
          })
          .catch(function (err) {
            return console.error(err.toString());
          });
        setNextQuestion(currentQuestion);
        break;
      /*case 'imagen':
          setNextQuestion(index + 1);    
          break;
      case 'video':
            console.log('soy video');
            break;*/
      case 'seleccionsimple':
        connection.invoke('SendSingleOption', question).catch(function (err) {
          return console.error(err.toString());
        });
        let newMessageItem = {
          id: messages.length + 1,
          sender: 'Shun',
          senderAvatar: 'https://i.pravatar.cc/150?img=32',
          messageType: 'question',
          content: question,
        };
        setMessages((prevMessages) => [...prevMessages, newMessageItem]);
        console.log(currentQuestion);
        indexCurrentQuestion.current = currentQuestion;
        nextQuestionTimer(question.timeLimit);
        setComplexQuestion(false);
        //setNextQuestion(currentQuestion);
        break;
      case 'experiencia':
        connection.invoke('SendExperiencia', question).catch(function (err) {
          return console.error(err.toString());
        });
        break;
      /*case 'opinión':
        connection.invoke('SendOpinion', question).catch(function (err) {
            return console.error(err.toString());
        });
          setQuestions(prevQuestions => {   
            const newQuestion = question;
            return [...prevQuestions, newQuestion];
          });
          nextQuestionTimer(question.timeLimit);
          setIndexCurrentQuestion(currentQuestion);
          setNextQuestion(currentQuestion);
        break;*/
      default:
        break;
    }
  };

  useEffect(() => {
    // Verificar que singleQuestion tiene datos para proceder
    if (singleQuestion) {
      let newMessageItemSender = {
        id: messages.length + 1,
        sender: 'Cliente',
        senderAvatar: 'https://i.pravatar.cc/150?img=32',
        messageType: 'question',
        content: singleQuestion,
        isAnswer: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageItemSender]);
    }
  }, [singleQuestion]);

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
              paddingLeft: '2rem',
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
                backgroundColor: '#00B0F0',
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Datos demográficos
                </Typography>
                <List>
                  {survey.demographicList &&
                    survey.demographicList.map((demographic, index) => (
                      <Accordion key={index}>
                        <AccordionSummary>
                          <Typography>{demographic.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {demographic.demographicDetails.map(
                            (detail, index2) => (
                              <p key={index2}>{detail.value}</p>
                            )
                          )}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                </List>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              style={{ width: '100%', backgroundColor: '#00B0F0' }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Preguntas
                </Typography>
                <List>
                  {survey.preguntas &&
                    survey.preguntas.map((option, index) => {
                      const iconObject = questionIcons.find(
                        (d) => d.tipoPregunta === option.type
                      );
                      const iconToDisplay = iconObject
                        ? iconObject.icono
                        : null;
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
                                      ? ` Duración: ${option.timeLimit} segundos`
                                      : null}
                                  </Typography>
                                </span>

                                <Typography>{option.name}</Typography>
                              </div>
                              {nextQuestion === index && (
                                <Button>
                                  {complexQuestion && (
                                    <SendIcon
                                      sx={{ color: '#00B0F0' }}
                                      onClick={() =>
                                        SendQuestionByType(
                                          option.type,
                                          option,
                                          index
                                        )
                                      }
                                    />
                                  )}
                                </Button>
                              )}
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
                                      {option.options.map((option, index) => (
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
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <CountdownTimer
              countdownTime={survey.timeDemographics}
              startTime={Date.now()}
            />
            {connection && (
              <ConnectDisconnectUser connectedUsers={connectedUsers} />
            )}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div className={styles.chatApp__room}>
              {Object.keys(users).map((key) => {
                const user = users[key];
                return (
                  <answerSingleQuestionContext.Provider
                    value={answerSingleQuestion}
                  >
                    <singleQuestionContext.Provider value={singleQuestion}>
                      <nextQuestionTimerContext.Provider value={questionTimer}>
                        <ChatBox
                          key={key}
                          owner={user.name}
                          ownerAvatar={user.avatar}
                          sendMessage={sendMessage}
                          typing={typing}
                          resetTyping={resetTyping}
                          messages={messages}
                          setMessages={setMessages}
                          isTyping={isTyping}
                          responseDemographic={responseDemographic}
                          demographics={survey.demographicList}
                          question={question}
                          nextQuestionTimer={questionTimer}
                          answersOpinion={answersOpinion}
                        />
                      </nextQuestionTimerContext.Provider>
                    </singleQuestionContext.Provider>
                  </answerSingleQuestionContext.Provider>
                );
              })}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

