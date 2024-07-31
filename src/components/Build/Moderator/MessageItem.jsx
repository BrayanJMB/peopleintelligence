import { useSelector } from 'react-redux';

import Logo from '../../../assets/multicompani.jpeg';

import { Demographics } from './Demographics';
import { Questions } from './Questions';

import styles from './ChatBox.module.css';
export const MessageItem = ({
  owner,
  sender,
  senderAvatar,
  message,
  messageType,
  isAnswer,
  responseDemographic,
  demographics,
  question,
  nextQuestionTimer,
  answersOpinion,
  indexCurrentQuestion,
}) => {
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  let messagePosition =
    owner === sender
      ? styles.chatApp__convMessageItemRight
      : styles.chatApp__convMessageItemLeft;
  return (
    <div
      className={`${styles.chatApp__convMessageItem} ${messagePosition} ${styles.clearfix}`}
    >  
      {messageType === 'demographic' && (
        <>
          <img
            src={(senderAvatar || currentCompany.Logotipo) || Logo}
            alt={'ImagenModerador'}
            className={styles.chatApp__convMessageAvatar}
          />

          <Demographics
            responseDemographic={responseDemographic}
            demographics={demographics}
          />
        </>
      )}
      {messageType === 'question' && (
        <>
          <img
            src={(senderAvatar || currentCompany.Logotipo) || Logo}
            alt={'ImagenModerador'}
            className={styles.chatApp__convMessageAvatar}
          />
          {question  && (
            <Questions
              question={question}
              nextQuestionTimer={nextQuestionTimer}
              answersOpinion={answersOpinion}
              isAnswer={isAnswer}
              indexCurrentQuestion={indexCurrentQuestion}
            />
          )}
        </>
      )}
      {!messageType && (
        <>
          <img
            src={senderAvatar}
            alt={sender}
            className={styles.chatApp__convMessageAvatar}
          />
          <div
            className={styles.chatApp__convMessageValue}
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        </>
      )}
    </div>
  );
};
