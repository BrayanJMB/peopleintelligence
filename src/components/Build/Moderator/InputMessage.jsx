import { useContext, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';

import styles from './ChatBox.module.css';
import { connectionContext, moderatorAvatarContext } from './Moderator';
export const InputMessage = (props) => {
  const ownerInput = useRef(null);
  const ownerAvatarInput = useRef(null);
  const messageInput = useRef(null);
  const connection = useContext(connectionContext);
  const moderatorAvatar = useContext(moderatorAvatarContext)
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (messageInput.current.value.length > 0) {
      connection
      .invoke('SendText', messageInput.current.value)
      .then(() => {
        let newMessageItem = {
          id:  props.messages.length + 1,
          sender: 'Shun',
          senderAvatar: moderatorAvatar.avatarUrl ,
          messageType: 'question',
          content: {
            orderNumber: 1,
            name: messageInput.current.value,
            timeLimit: null,
            type: "Texto",
            urlMedia: "",
            prentQuestionId: null,
            options: []
          }
        };
        props.setMessages((prevMessages) => [...prevMessages, newMessageItem]);
        messageInput.current.value=""
      })
      .catch(function (err) {
        return console.error(err.toString());
      });
    }
  };

  const handleTyping = () => {
    if (messageInput.current.value.length > 0) {
      props.typing(ownerInput.current.value);
    } else {
      props.resetTyping(ownerInput.current.value);
    }
  };

  let loadingClass = props.isLoading ? 'chatApp__convButton--loading' : '';

  return (
    <form onSubmit={handleSendMessage}>
      <input type="hidden" ref={ownerInput} value={props.owner} />
      <input type="hidden" ref={ownerAvatarInput} value={props.ownerAvatar} />
      <textarea
        rows="50" 
        cols="50"
        ref={messageInput}
        className={styles.chatApp__convInput}
        placeholder="Acá puedes escribir más preguntas"
        onKeyDown={handleTyping}
        onKeyUp={handleTyping}
        tabIndex="0"
      />
      <div
        className={`${styles.chatApp__convButton} ${loadingClass}`}
        onClick={handleSendMessage}
      >
        <SendIcon />
      </div>
    </form>
  );
};
