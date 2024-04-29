import { useCallback, useContext, useEffect, useState } from 'react';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import CircularWithValueLabel from './CircularWithValueLabel';
import {
  answerExperienceQuestionContext,
  answerOpinionQuestionContext,
  answerSingleQuestionContext,
  nextQuestionTimerContext,
  opinionQuestionContext,
  singleQuestionContext,
} from './Moderator';

import styles from './ChatBox.module.css';

export const Questions = ({
  question,
  nextQuestionTimer,
  answersOpinion,
  isAnswer,
}) => {
  const singleQuestion = useContext(singleQuestionContext);
  const answerSingleQuestion = useContext(answerSingleQuestionContext);
  const answerOpinionQuestion = useContext(answerOpinionQuestionContext);
  const questionTimer = useContext(nextQuestionTimerContext);
  const answerExperienceQuestion = useContext(answerExperienceQuestionContext);
  
  const isText = (item) => {
    switch (item.toLowerCase()) {
      case 'texto':
        return true;
      default:
        return false;
    }
  };

  const isOpinion = (item) => {
    switch (item.toLowerCase()) {
      case 'opinion':
        return true;
      default:
        return false;
    }
  };

  const isExperience = (item) => {
    switch (item.toLowerCase()) {
      case 'experiencia':
        return true;
      default:
        return false;
    }
  };

  const isImage = (item) => {
    switch (item.toLowerCase()) {
      case 'imagen':
        return true;
      default:
        return false;
    }
  };

  function limpiarTexto(texto) {
    let textoSinEspacios = texto.replace(/\s+/g, '');
    let textoSinTildes = textoSinEspacios
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return textoSinTildes;
  }
  const isVideo = (item) => {
    switch (item.toLowerCase()) {
      case 'video':
        return true;
      default:
        return false;
    }
  };
  const isSelecionSimple = (item) => {
    switch (item.toLowerCase()) {
      case 'seleccionsimple':
        return true;
      default:
        return false;
    }
  };

  function getColorForPercentage(percentage) {
    if (percentage <= 33) {
      return '#ff0000'; // Rojo
    } else if (percentage <= 66) {
      return '#ffff00'; // Amarillo
    } else {
      return '#008000'; // Verde
    }
  }
  console.log(question);
  console.log(answerExperienceQuestion);
  return (
    <>
      <div className={styles.chatApp__convMessageValue}>
        {isText(question.type) && <p>{question.name}</p>}
        {isSelecionSimple(limpiarTexto(question.type)) && (
          <>
            {!isAnswer ? (
              <>
                <p>{question.name}</p>
                <p>{questionTimer}</p>
              </>
            ) : (
              <>
                {singleQuestion &&
                  singleQuestion.options.map((option, index) => (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <p>{option.value}</p>
                        <div style={{ width: '100%' }}>
                          <LinearProgress
                            sx={{
                              backgroundColor: 'white',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: 'green',
                              },
                            }}
                          />
                        </div>
                        <div>
                          <p>
                            <CircularWithValueLabel
                              data={
                                answerSingleQuestion && answerSingleQuestion
                                  ? (answerSingleQuestion.answer[index]
                                      .contador *
                                      100) /
                                    answerSingleQuestion.counter
                                  : 0
                              }
                              color={getColorForPercentage(
                                answerSingleQuestion
                                  ? (answerSingleQuestion.answer[index]
                                      .contador *
                                      100) /
                                      answerSingleQuestion.counter
                                  : 0
                              )}
                            />
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
              </>
            )}
          </>
        )}
        {isExperience(limpiarTexto(question.type)) && (
          <>
            {!isAnswer ? (
              <>
                <p>{question.name}</p>
                <p>{questionTimer}</p>
              </>
            ) : (
              <Box>
                {question &&
                  question.options.map((pregunta, index) => (
                    <Accordion /*key={pregunta.numeroOpcion}*/>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}a-content`}
                        id={`panel${index}a-header`}
                      >
                        <Typography>{`${pregunta.value}`}</Typography>
                        <Typography variant="body2" color="text.primary">
                          {`${
                            answerExperienceQuestion && answerExperienceQuestion
                              ? (answerExperienceQuestion.answer[index]
                                  .contador *
                                  100) /
                                answerExperienceQuestion.counter
                              : 0
                          }%`}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* Inserta aquí el LinearProgress con el valor correspondiente */}
                        {answerExperienceQuestion &&
                          answerExperienceQuestion.option ===
                          answerExperienceQuestion.answer[index].numeroOpcion.toString() && (                          
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              style={{ marginTop: '8px' }}
                            >
                              {answerExperienceQuestion.answertext}
                            </Typography>
                          )}
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </Box>
            )}
          </>
        )}
        {isOpinion(limpiarTexto(question && question.type)) && (
          <>
            {!isAnswer ? (
              <>
                <p>{question.name}</p>
                <p>{questionTimer}</p>
              </>
            ) : (
              <>
                {answerOpinionQuestion.map((result) => (
                  <div
                    key={result.idres}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '10px',
                    }}
                  >
                    <p>{result.respuesta}</p>
                    <div style={{ width: '100%' }}>
                      <LinearProgress
                        variant="determinate"
                        value={result.porcentaje}
                        sx={{
                          backgroundColor: 'white',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getColorForPercentage(
                              result.porcentaje
                            ),
                          },
                        }}
                      />
                    </div>
                    <div>
                      <p>
                        <CircularWithValueLabel
                          data={result.porcentaje}
                          color={getColorForPercentage(result.porcentaje)}
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
        {isImage(question.type) && (
          <img
            src={question.urlMedia}
            alt="imagenPregunta"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        {isVideo(question.type) && (
          <img
            src={question.urlMedia}
            alt="imagenPregunta"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </>
  );
};
