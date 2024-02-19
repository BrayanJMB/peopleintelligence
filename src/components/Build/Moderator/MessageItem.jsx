import { Demographics } from './Demographics';
import { Questions } from './Questions';

import styles from './ChatBox.module.css';
export const MessageItem = ({
  owner,
  sender,
  senderAvatar,
  message,
  messageType,
  responseDemographic,
  demographics,
  question,
  nextQuestionTimer,
  answersOpinion,
}) => {
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
            src={senderAvatar}
            alt={'prueba'}
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
            src={senderAvatar}
            alt={'prueba'}
            className={styles.chatApp__convMessageAvatar}
          />
          {question  && (
            <Questions
              question={question}
              nextQuestionTimer={nextQuestionTimer}
              answersOpinion={answersOpinion}
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
