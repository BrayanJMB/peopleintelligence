import { useContext, useEffect,useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import Options from '../Discussion/Options/Options';

import { connectionContext, moderatorAvatarContext } from './Moderator';

import styles from './ChatBox.module.css';
export const InputMessage = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState('');
  const ownerInput = useRef(null);
  const ownerAvatarInput = useRef(null);
  const messageInput = useRef(null);
  const connection = useContext(connectionContext);
  const moderatorAvatar = useContext(moderatorAvatarContext);
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (messageInput.current.value.length > 0) {
      connection
        .invoke('SendText', messageInput.current.value)
        .then(() => {
          let newMessageItem = {
            id: props.messages.length + 1,
            sender: 'Shun',
            senderAvatar: moderatorAvatar.avatarUrl,
            messageType: 'question',
            content: {
              orderNumber: 1,
              name: messageInput.current.value,
              timeLimit: null,
              type: 'Texto',
              urlMedia: '',
              prentQuestionId: null,
              options: [],
            },
          };
          props.setMessages((prevMessages) => [
            ...prevMessages,
            newMessageItem,
          ]);
          messageInput.current.value = '';
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
        name: '',
        timeLimit: null,
        type: valor,
        urlMedia: '',
        options: [],
      },
    ]);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const questionTypes = [
    'Selección simple',
    'imagen',
    'video' /*'Opinión', 'experiencia', 'imagen', 'video'*/,
  ];

  const handleRemoveConversation = (index) =>{

  };

  useEffect(() => {
    console.log(props.questions);
  }, [props.questions]);
  
  const handleNewQuestionConversation = async() =>{
    let payload = {
      surveyId: '52244fe4-f135-43b9-a445-5d080ad6d678',
      question: {
        orderNumber: 2,
        name: '',
        timeLimit: null,
        type: 'imagen',
        urlMedia: '',
        options: [],
      },
    };
    console.log(payload);
      try {
        const response = await axios.patch(
          'https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/CreateQuestionLive',
          payload,
        );
        props.setQuestions('');
        return response.data; // Retorna los datos de respuesta para su uso posterior
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error; // Lanza el error para manejar rechazos en Promise.all
    }
  };
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
                  errors={''}
                />
              </Grid>
            ))}
          </Grid>
          <Button onClick={handleCloseModal}>Cerrar</Button>
          <Button onClick={handleNewQuestionConversation}>Insertar pregunta</Button>
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
