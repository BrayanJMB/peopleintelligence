import { useCallback, useContext, useEffect, useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LinearProgress from '@mui/material/LinearProgress';

import CircularWithValueLabel from './CircularWithValueLabel';
import {
  answerSingleQuestionContext,
  nextQuestionTimerContext,
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
  const questionTimer = useContext(nextQuestionTimerContext);

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
      case 'opinión':
        return true;
      default:
        return false;
    }
  };
  const isExperience = () => {
    return 'experiencia';
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
  const isVideo = () => {
    return 'video';
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
        {isImage(question.type) && (
          <img
            src={question.urlMedia}
            alt="imagenPregunta"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        {isOpinion(question.type) && (
          <>
            <p>{nextQuestionTimer}lol</p>
            <p>{question.name}</p>
            {answersOpinion.map((option) => (
              <p>
                {option.respuesta}--{option.porcentaje}
              </p>
            ))}
          </>
        )}

      </div>
    </>
  );
};
