import { useCallback, useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import styles from "./ChatBox.module.css";
export const Questions = ({ question, nextQuestionTimer, answersOpinion }) => {
  console.log(question);
  const isText = (item) => {
    switch (item.toLowerCase()) {
      case "texto":
        return true;
      default:
        return false;
    }
  };
  const isOpinion = (item) => {
    switch (item.toLowerCase()) {
      case "opinión":
        return true;
      default:
        return false;
    }
  };
  const isExperience = () => {
    return "experiencia";
  };
  const isImage = () => {
    return "imagen";
  };
  const isVideo = () => {
    return "video";
  };
  const isSelecionSimple = (item) => {
    switch (item.toLowerCase()) {
      case "seleccionsimple":
        return true;
      default:
        return false;
    }
  };
  return (
    <>
      {question.map((question, index) => (
        <div key={index} className={styles.chatApp__convMessageValue}>
          {isText(question.type) && <p>{question.name}</p>}
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
          {isSelecionSimple(question.type) && <p>{question.name}</p>}
        </div>
      ))}
    </>
  );
};
