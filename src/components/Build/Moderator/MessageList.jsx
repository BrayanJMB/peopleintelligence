import React from 'react';

import { MessageItem } from './MessageItem';

import styles from './ChatBox.module.css';

export const MessageList = ({
  owner,
  messages,
  responseDemographic,
  demographics,
  nextQuestionTimer,
  answersOpinion,
  indexCurrentQuestion,
}) => {
  return (
    <div className={styles.chatApp__convTimeline}>
      <div className={styles.chatApp__scroll}>
      {messages
        .slice(0)
        .map((messageItem) => (
          <MessageItem
            key={messageItem.id}
            owner={owner}
            sender={messageItem.sender}
            senderAvatar={messageItem.senderAvatar}
            message={messageItem.message}
            messageType={messageItem.messageType}
            isAnswer={messageItem.isAnswer}
            responseDemographic={responseDemographic}
            demographics={demographics}
            question={messageItem.content && messageItem.content}
            nextQuestionTimer={nextQuestionTimer}
            answersOpinion={answersOpinion}
            indexCurrentQuestion={indexCurrentQuestion}
          />
        ))}
      </div>
      
    </div>
  );
};
