import { useState } from "react";
import { MessageList } from "./MessageList";
import { InputMessage } from "./InputMessage";
import styles from "./ChatBox.module.css";

export const ChatBox = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageLoading = (sender, senderAvatar, message) => {
    setIsLoading(true);
    props.sendMessage(sender, senderAvatar, message);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className={styles.chatApp__conv}>
      <MessageList owner={props.owner} messages={props.messages} />
      <div className={`${styles.chatApp__convSendMessage} ${styles.clearfix}`}>
        <InputMessage
          isLoading={isLoading}
          owner={props.owner}
          ownerAvatar={props.ownerAvatar}
          sendMessage={props.sendMessage}
          sendMessageLoading={sendMessageLoading}
          typing={props.typing}
          resetTyping={props.resetTyping}
        />
      </div>
    </div>
  );
};
