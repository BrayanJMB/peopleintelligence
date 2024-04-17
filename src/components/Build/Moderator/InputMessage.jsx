import { useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { storeSurveyImageQuestionSingle } from "../Discussion/services/service";
import Options from "../Discussion/Options/Options";

import { connectionContext, moderatorAvatarContext } from "./Moderator";

import styles from "./ChatBox.module.css";
export const InputMessage = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState("");
  const ownerInput = useRef(null);
  const ownerAvatarInput = useRef(null);
  const messageInput = useRef(null);
  const connection = useContext(connectionContext);
  const moderatorAvatar = useContext(moderatorAvatarContext);
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (messageInput.current.value.length > 0) {
      connection
        .invoke("SendText", messageInput.current.value)
        .then(() => {
          let newMessageItem = {
            id: props.messages.length + 1,
            sender: "Shun",
            senderAvatar: moderatorAvatar.avatarUrl,
            messageType: "question",
            content: {
              orderNumber: 1,
              name: messageInput.current.value,
              timeLimit: null,
              type: "Texto",
              urlMedia: "",
              prentQuestionId: null,
              options: [],
            },
          };
          props.setMessages((prevMessages) => [
            ...prevMessages,
            newMessageItem,
          ]);
          messageInput.current.value = "";
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

  let loadingClass = props.isLoading ? "chatApp__convButton--loading" : "";
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    setItem(event.target.value);
    handleAddConversation(event.target.value);
  };

  const handleAddConversation = (valor) => {
    props.setQuestions2((prevState) => [
      ...prevState,
      {
        orderNumber: null,
        name: "",
        timeLimit: null,
        type: valor,
        urlMedia: "",
        options: [],
      },
    ]);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const questionTypes = [
    "Selección simple",
    "imagen",
    "video" /*'Opinión', 'experiencia', 'imagen', 'video'*/,
  ];

  const handleRemoveConversation = (index) => {};

  const handleNewQuestionConversation = async () => {
    let orderNumber = props.indexCurrentQuestion + 2; // Asignar número de orden adecuado
  
    // Usamos Promise.all para esperar todas las promesas resultantes de la función map
    try {
      const responses = await Promise.all(
        props.questions.map(async (question, index) => { // Convierte la función dentro de map en una función asíncrona
          const data = await storeSurveyImageQuestionSingle(question.urlMedia, orderNumber + index, "e93b7bc3-db95-4c77-b342-c2b6683ab7df");
          let payload = {
            surveyId: "e93b7bc3-db95-4c77-b342-c2b6683ab7df",
            question: {
              orderNumber: orderNumber + index,
              name: question.name, // Asume que quieres usar el nombre actual de la pregunta
              timeLimit: question.timeLimit,
              type: question.type,
              urlMedia: data.urlMedia,
              options: question.options,
            },
          };
  
          // Llama a axios.patch y devuelve la promesa resultante
          return axios.patch(
            "https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/CreateQuestionLive",
            payload
          );
        })
      );
  
      // Actualiza el estado con los datos obtenidos de todas las promesas resueltas
      props.setQuestions(responses.map(response => response.data));
      props.setQuestions2([]); // Asumiendo que deseas limpiar otro estado
      setIsModalOpen(false); // Cierra el modal después de las operaciones
    } catch (error) {
      console.error("Error al subir la pregunta:", error);
    }
  };

  useEffect(() => {
    props.setQuestions2([]);
  }, []);

  return (
    <form onSubmit={handleSendMessage}>
      <input type="hidden" ref={ownerInput} value={props.owner} />
      <input type="hidden" ref={ownerAvatarInput} value={props.ownerAvatar} />
      <Button onClick={handleOpenModal}>Mas</Button>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Inserta tu pregunta acá</h2>

          <Grid container spacing={2} alignItems="center">
            {props.questions.map((question, index) => (
              <Grid item xs={8}>
                <Options
                  key={index}
                  isConversation={true}
                  currentIndex={index}
                  item={question.type}
                  question={question}
                  setQuestion={props.setQuestions2}
                  handleRemoveConversation={() =>
                    handleRemoveConversation(index)
                  }
                  errors={""}
                />
              </Grid>
            ))}
            <FormControl
              sx={{ marginBottom: 5, minWidth: 300 }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Seleccione el tipo pregunta
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={item}
                onChange={handleChange}
                label="Seleccione el tipo pregunta"
                fullWidth
              >
                {questionTypes.map((value, index) => (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Button onClick={handleCloseModal}>Cerrar</Button>
          <Button onClick={handleNewQuestionConversation}>
            Insertar pregunta
          </Button>
        </Box>
      </Modal>
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
