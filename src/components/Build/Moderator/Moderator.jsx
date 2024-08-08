import { createContext, useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { Button, Card, CardContent, Grid, Paper } from '@mui/material';
import { Divider, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import axios from 'axios';

import ComplexQuestionButton from './components/ComplexQuestionButton';
import OptionsQuestion from './components/OptionsQuestion';
import { ChatBox } from './ChatBox';
import { ConnectDisconnectUser } from './ConnectDisconnectUser';
import CountdownTimer from './CountdownTimer';

import styles from './ChatBox.module.css';

export const singleQuestionContext = createContext();
export const answerSingleQuestionContext = createContext();
export const opinionQuestionContext = createContext();
export const answerOpinionQuestionContext = createContext();
export const answerExperienceQuestionContext = createContext();
export const nextQuestionTimerContext = createContext();
export const connectionContext = createContext();
export const moderatorAvatarContext = createContext();

export const Moderator = ({ id, questions, setQuestions2 }) => {
  const [connection, setConnection] = useState(null);
  const [survey, setSurvey] = useState([]);
  const [moderatorAvatar, setModeratorAvatar] = useState();
  const [question, setQuestions] = useState([]);
  const [responseDemographic, setResponseDemographic] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const connectedUsersRef = useRef(0);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [questionTimer, setQuestionTimer] = useState({});
  const [opinionQuestion, setOpinionQuestion] = useState(null);
  const [answersOpinion, setAnswersOpinion] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState(null);
  const [answerSingleQuestion, answerSetSingleQuestion] = useState(null);
  const [experienceQuestion, setExperienceQuestion] = useState(null);
  const [answerExperienceQuestion, setAnswerExperienceQuestion] =
    useState(null);
  const indexCurrentQuestion = useRef(null);
  const [complexQuestion, setComplexQuestion] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState({});
  const [hasRunSingleSelect, setHasRunSingleSelect] = useState(true);
  const [hasRunExperience, setHasRunExperience] = useState(true);
  const [hasRunOpinion, setHasRunOpinion] = useState(true);
  function detectURL(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (urlMatch) {
      return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
    });
  }

  function limpiarTexto(texto) {
    let textoSinEspacios = texto.replace(/\s+/g, '');
    let textoSinTildes = textoSinEspacios
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return textoSinTildes;
  }

  const users = {
    0: { name: 'Shun', avatar: '' },
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

  const fetchModerator = async () => {
    try {
      const response = await axios.get(
        `https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/GetModerator/${id}`
      );
      setModeratorAvatar(response.data);
    } catch (error) {}
  };

  const initializeConnectionAndFetchData = async () => {
    try {
      await fetchSurvey();
      await fetchModerator();
      const signalRConnection = new HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl(
          'https://chatapppeopleintelligence.azurewebsites.net/discusion'
        )
        .withAutomaticReconnect()
        .build();

      setConnection(signalRConnection);
    } catch (err) {
      console.error(err);
    }
  };

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
    setQuestionTimer((prevTimers) => ({
      ...prevTimers,
      [indexCurrentQuestion.current]: timeLimit,
    }));
  };

  const SendQuestionByType = (type, question, index) => {
    let currentQuestion = question.orderNumber;
    switch (limpiarTexto(type.toLowerCase())) {
      case 'texto':
        connection
          .invoke('SendText', question.name)
          .then(() => {
            let newMessageItem = {
              id: messages.length + 1,
              sender: 'Shun',
              senderAvatar: moderatorAvatar.avatarUrl,
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
      case 'imagen':
        connection
          .invoke('SendImage', question.urlMedia)
          .then(() => {
            let newMessageItem = {
              id: messages.length + 1,
              sender: 'Shun',
              senderAvatar: moderatorAvatar.avatarUrl,
              messageType: 'question',
              content: question,
            };
            setMessages((prevMessages) => [...prevMessages, newMessageItem]);
            indexCurrentQuestion.current = currentQuestion;
          })
          .catch(function (err) {
            return console.error(err.toString());
          });
        indexCurrentQuestion.current = currentQuestion;
        setNextQuestion(currentQuestion);
        break;
      case 'video':
        connection
        .invoke('SendVideo', question.urlMedia)
        .then(() => {
          let newMessageItem = {
            id: messages.length + 1,
            sender: 'Shun',
            senderAvatar: moderatorAvatar.avatarUrl,
            messageType: 'question',
            content: question,
          };
          setMessages((prevMessages) => [...prevMessages, newMessageItem]);
          indexCurrentQuestion.current = currentQuestion;
        })
        .catch(function (err) {
          return console.error(err.toString());
        });
      indexCurrentQuestion.current = currentQuestion;
      setNextQuestion(currentQuestion);
      break;        
      case 'seleccionsimple':
        connection.invoke('SendSingleOption', question).catch(function (err) {
          return console.error(err.toString());
        });
        let newMessageItem = {
          id: messages.length + 1,
          sender: 'Shun',
          senderAvatar: moderatorAvatar.avatarUrl,
          messageType: 'question',
          content: question,
        };
        indexCurrentQuestion.current = currentQuestion;
        setMessages((prevMessages) => [...prevMessages, newMessageItem]);
        nextQuestionTimer(question.timeLimit, currentQuestion);
        setComplexQuestion(false);
        break;
      case 'preguntacondicional':
        connection.invoke('SendExperiencia', question).catch(function (err) {
          return console.error(err.toString());
        });
        let newMessageItemExperiencia = {
          id: messages.length + 1,
          sender: 'Shun',
          senderAvatar: moderatorAvatar.avatarUrl,
          messageType: 'question',
          content: question,
        };
        indexCurrentQuestion.current = currentQuestion;
        setMessages((prevMessages) => [
          ...prevMessages,
          newMessageItemExperiencia,
        ]);
        nextQuestionTimer(question.timeLimit, currentQuestion);
        setComplexQuestion(false);
        break;
      case 'opinion':
        connection.invoke('SendOpinion', question).catch(function (err) {
          return console.error(err.toString());
        });
        let newMessageItemOpinion = {
          id: messages.length + 1,
          sender: 'Shun',
          senderAvatar: moderatorAvatar.avatarUrl,
          messageType: 'question',
          content: question,
        };
        indexCurrentQuestion.current = currentQuestion;
        setMessages((prevMessages) => [...prevMessages, newMessageItemOpinion]);
        nextQuestionTimer(question.timeLimit, currentQuestion);
        setComplexQuestion(false);
        break;
      default:
        break;
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
            )
            .catch(function (err) {
              return console.error(err.toString());
            });

          connection.on('clientConnected', (count) => {
            connectedUsersRef.current = count;
            setConnectedUsers(count);
          });

          //Pregunta selección simple
          connection.on('QuestionSingleOptions', (question) => {
            setSingleQuestion(question);
          });

          //Respuesta selección simple
          connection.on('RecibirRespuestaSingle', (answer, counter) => {
            answerSetSingleQuestion({
              answer: answer,
              counter: counter,
            });
            if (counter >= connectedUsersRef.current) {
              setComplexQuestion(true);
              setNextQuestion(indexCurrentQuestion.current);
            }
          });

          //Pregunta Experiencia
          connection.on('experiencia', (pregunta) => {
            setExperienceQuestion(pregunta);
          });
          // Respuesta experiencia
          connection.on(
            'recibirrespuestaesxperiencia',
            (answer, option, answertext, counter) => {
              setAnswerExperienceQuestion({
                answer: answer,
                option: option,
                answertext: answertext,
                counter: counter,
              });
            }
          );

          //Pregunta opinión
          connection.on('opinion', (question) => {
            setOpinionQuestion(question);
          });

          // Respuesta pregunta Opinión
          connection.on('SendRespuestasDos', (tablarespuestas) => {
            setAnswersOpinion(tablarespuestas);
          });

          connection.on('top10opinionanswer', (response) => {
            if (
              response.every(
                (item) => item.contadorRespuesta === connectedUsersRef.current
              )
            ) {
              setComplexQuestion(true);
              setNextQuestion(indexCurrentQuestion.current);
            }
          });

          // Actualiza la interfaz de usuario con el tiempo actual
          connection.on('UpdateTime', (time) => {
            setQuestionTimer((prevTimers) => ({
              ...prevTimers,
              [indexCurrentQuestion.current]: time,
            }));
            if (time === 0) {
              setComplexQuestion(true);
              console.log(indexCurrentQuestion.current);
              setNextQuestion(indexCurrentQuestion.current);
            }
          });
        })
        .catch((error) =>
          console.error('Error al conectar con SignalR:', error)
        );

      connection.on('clientDisconnected', setConnectedUsers);
      connection.on('DemographicCount', (idDemo, count) => {
        setResponseDemographic((prevCounts) => ({
          ...prevCounts,
          [idDemo]: count,
        }));
      });
    }
  }, [connection]);

  useEffect(() => {
    if (
      moderatorAvatar &&
      survey.demographicList &&
      survey.demographicList.length > 0
    ) {
      let newMessageItem = {
        id: messages.length + 1,
        sender: 'Shun',
        senderAvatar: moderatorAvatar.avatarUrl,
        messageType: 'demographic',
      };
      setMessages((prevMessages) => [...prevMessages, newMessageItem]);
    }
  }, [moderatorAvatar]);

  useEffect(() => {
    // Verificar que singleQuestion tiene datos para proceder
    if (answerSingleQuestion && hasRunSingleSelect) {
      let newMessageItemSender = {
        id: messages.length + 1,
        sender: 'Cliente',
        senderAvatar: 'https://i.pravatar.cc/150?img=32',
        messageType: 'question',
        content: singleQuestion,
        isAnswer: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageItemSender]);
      setHasRunSingleSelect(false);
    }
  }, [answerSingleQuestion]);

  useEffect(() => {
    // Verificar que singleQuestion tiene datos para proceder
    if (answersOpinion.length > 0 && hasRunOpinion) {
      let newMessageItemSender = {
        id: messages.length + 1,
        sender: 'Cliente',
        senderAvatar: 'https://i.pravatar.cc/150?img=32',
        messageType: 'question',
        content: opinionQuestion,
        isAnswer: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageItemSender]);
      setHasRunOpinion(false);
    }
  }, [answersOpinion]);

  useEffect(() => {
    if (answerExperienceQuestion && hasRunExperience) {
      let newMessageItemSender = {
        id: messages.length + 1,
        sender: 'Cliente',
        senderAvatar: 'https://i.pravatar.cc/150?img=32',
        messageType: 'question',
        content: experienceQuestion,
        isAnswer: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageItemSender]);
      setHasRunExperience(false);
    }
  }, [answerExperienceQuestion]);

  useEffect(() => {
    initializeConnectionAndFetchData();
  }, []);

  useEffect(() => {
    fetchSurvey();
  }, [question]);

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
              <CardContent sx={{}}>
                <Typography variant="h6" component="div" gutterBottom>
                  Preguntas
                </Typography>
                <List
                  style={{
                    maxHeight: '400px', // Ajusta esta altura según necesites
                    overflowY: 'auto', // Habilita el desplazamiento vertical
                  }}
                >
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
                              padding: '1rem',
                              marginBottom: '1rem',
                              borderRadius: '8px',
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Typography
                                variant="h6"
                                style={{ fontWeight: 'bold' }}
                              >
                                {option.orderNumber}
                              </Typography>
                              <div style={{ marginLeft: '2rem', flex: 1 }}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                  }}
                                >
                                  <Typography style={{ color: 'blue' }}>
                                    {iconToDisplay}
                                  </Typography>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      flex: 1,
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      color="textSecondary"
                                    >
                                      Tipo Pregunta:
                                      <span
                                        style={{ marginLeft: '0.5rem' }}
                                      ></span>
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        fontStyle: 'italic',
                                      }}
                                    >
                                      {option.type}
                                    </Typography>
                                  </div>
                                  {option.timeLimit && (
                                    <Typography
                                      variant="subtitle2"
                                      color="textSecondary"
                                    >
                                      Duración: {option.timeLimit} segundos
                                    </Typography>
                                  )}
                                </div>
                                <Typography
                                  variant="body1"
                                  style={{ marginTop: '0.5rem' }}
                                >
                                  {option.name}
                                </Typography>
                                {option.urlMedia &&
                                  (option.type === 'video' ? (
                                    <>
                                    <video
                                      src={option.urlMedia}
                                      controls
                                      style={{
                                        width: '100px',
                                        height: 'auto',
                                        marginTop: '1rem',
                                        borderRadius: '8px',
                                      }}
                                    
                                    
                                    /></>
                                  ) : (
                                    <img
                                      src={option.urlMedia}
                                      alt="imagenPregunta"
                                      style={{
                                        width: '100px',
                                        height: 'auto',
                                        marginTop: '1rem',
                                        borderRadius: '8px',
                                      }}
                                    />
                                  ))}
                              </div>
                              {nextQuestion === index && (
                                <ComplexQuestionButton
                                  complexQuestion={complexQuestion}
                                  option={option}
                                  index={index}
                                  SendQuestionByType={SendQuestionByType}
                                />
                              )}
                            </div>

                            {option.options && option.options.length > 0 && (
                              <OptionsQuestion option={option} />
                            )}
                            <Divider style={{ marginTop: '1rem' }} />
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
                  <connectionContext.Provider value={connection}>
                    <moderatorAvatarContext.Provider value={moderatorAvatar}>
                      <opinionQuestionContext.Provider value={opinionQuestion}>
                        <answerOpinionQuestionContext.Provider
                          value={answersOpinion}
                        >
                          <answerSingleQuestionContext.Provider
                            value={answerSingleQuestion}
                          >
                            <singleQuestionContext.Provider
                              value={singleQuestion}
                            >
                              <nextQuestionTimerContext.Provider
                                value={questionTimer}
                              >
                                <answerExperienceQuestionContext.Provider
                                  value={answerExperienceQuestion}
                                >
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
                                    questions={questions}
                                    setQuestions2={setQuestions2}
                                    setQuestions={setQuestions}
                                    indexCurrentQuestion={
                                      indexCurrentQuestion.current
                                    }
                                  />
                                </answerExperienceQuestionContext.Provider>
                              </nextQuestionTimerContext.Provider>
                            </singleQuestionContext.Provider>
                          </answerSingleQuestionContext.Provider>
                        </answerOpinionQuestionContext.Provider>
                      </opinionQuestionContext.Provider>
                    </moderatorAvatarContext.Provider>
                  </connectionContext.Provider>
                );
              })}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
