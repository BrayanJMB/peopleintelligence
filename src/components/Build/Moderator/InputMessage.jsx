import { useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import styles from "./ChatBox.module.css";

export const InputMessage = (props) => {
  const ownerInput = useRef(null);
  const ownerAvatarInput = useRef(null);
  const messageInput = useRef(null);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (messageInput.current.value.length > 0) {
      props.sendMessageLoading(
        ownerInput.current.value,
        ownerAvatarInput.current.value,
        messageInput.current.value
      );
      messageInput.current.value = "";
    }
  };

  const handleTyping = () => {
    if (messageInput.current.value.length > 0) {
      props.typing(ownerInput.current.value);
    } else {
      props.resetTyping(ownerInput.current.value);
    }
  };

  let loadingClass = props.isLoading ? "chatApp__convButton--loading" : "";

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
