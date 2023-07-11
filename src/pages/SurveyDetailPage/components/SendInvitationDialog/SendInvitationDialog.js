import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import LinkIcon from '@mui/icons-material/Link';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import client from '../../../../utils/axiosInstance';

import styles from './SendInvitationDialog.module.css';

const defaultMessage = 'Hola, te invito a participar en la encuesta: @enlace';

/**
 * Send invitation dialog component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const SendInvitationDialog = ({ isPersonal, copyUrl, isOpen, emailMessage }) => {
  const [open, setOpen] = useState(false);
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const { id: surveyId } = useParams();
  const [groups, setGroups] = useState([]);
  const [emails, setEmails] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [isValidEmailSubject, setIsValidEmailSubject] = useState('');
  const [isValidEmails, setIsValidEmails] = useState('');
  const [message, setMessage] = useState(defaultMessage);
  const [isValidMessage, setIsValidMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle click open.
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * Handle close.
   */
  const handleClose = () => {
    setOpen(false);
    setEmails('');
    setEmailSubject('');
    setIsValidEmails('');
    setIsValidEmailSubject('');
    setIsValidMessage('')
  };

  /**
   * Handle input change.
   */
  const handleChange = (event, index) => {
    const groupsCopy = [...groups];
    groupsCopy[index].value = event.target.value;

    setGroups(groupsCopy);
  }; 

  const validateEmail = (email) => {
    if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setIsValidEmails('Por favor ingrese un correo válido');
      return;
    }
    return true;
  }

  function validateEmailsStructure(emails) {
    const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4},)*([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/;
    return regex.test(emails);
  }

  /**
   * Handle emails change.
   *
   * @param event
   */
  const handleEmailsChange = (event) => {
    setEmails(event.target.value);
    setIsValidEmails('');
    // validate emails
    const emailsArray = event.target.value.split(',');
    let error = false;
    emailsArray.forEach((email) => {
      // if is empty don't validate
      if (!email) {
        return;
      }
      // trim and validate email
      const trimmedEmail = email.trim();
      // don't allow spaces
      if (trimmedEmail.includes(' ')) {
        setIsValidEmails('Los correos no debe contener espacios');
        error = true;
        return;
      }
      validateEmail(trimmedEmail);
    });
    setIsLoading(false);
  };

  /**
   * Handle message change.
   *
   * @param event
   */
  const handleMessageChange = (event) => {
    setIsLoading(true);
    setIsValidMessage('');
    setMessage(event.target.value);
    // validate message
    if (!event.target.value) {
      setIsValidMessage('El mensaje es requerido.');
    }else{
      if (!event.target.value.includes('@enlace')) {
        setIsValidMessage('El mensaje debe contener "@enlace".');
      }
    }
    setIsLoading(false);
  };


    /**
   * Handle Email Subject change.
   *
   * @param event
   */
    const handleEmailSubjectChange = (event) => {
      setIsLoading(true);
      setIsValidEmailSubject(''); 
      setEmailSubject(event.target.value);
      //validate email subject
      if(!event.target.value){
        setIsValidEmailSubject('El asunto de correo es requerido');
      }else{
        if (event.target.value.length < 5) {
          setIsValidEmailSubject('El asunto de correo debe tener al menos 10 carácteres');
        }
      }
      setIsLoading(false);
    };
  

  /**
   * Get helper text.
   *
   * @param errorMessage
   * @param defaultText
   * @returns {*}
   */
  const getHelperText = (errorMessage, defaultText) => {
    if (errorMessage) {
      return errorMessage;
    }

    return defaultText;
  };

  /**
   * Fetch groups.
   *
   * @returns {Promise<void>}
   */
  const fetchGroups = async () => {
    if (!currentCompany) {
      return;
    }

    const { id: companyId } = currentCompany;
    const { data } = await client.get(`GetItemsMails/${companyId}/${surveyId}`);
    const groupsCopy = data.map((item) => ({
      ...item,
      value: '',
      options: [],
    }));

    for (let i = 0; i < groupsCopy.length; i++) {
      if (groupsCopy[i].url && !groupsCopy[i].url.match(/[{ }]/g)) {

        const { data } = await client.get(groupsCopy[i].url);

        groupsCopy[i].options = data.map((item) => ({
          value: item.value ?? item.ciudad,
          id: item.id,
        }));

      }
    }

    setGroups(groupsCopy);
  };

  /**
   * Fetch api options by param.
   *
   *
   * @param paramName
   * @param paramId
   * @returns {Promise<void>}
   */
  const fetchApiOptionsByParam = async (paramName, paramId) => {
    const groupsCopy = [...groups];

    for (let i = 0; i < groupsCopy.length; i++) {
      const regex = new RegExp(`{${paramName}}`, 'g');

      if (groupsCopy[i].url && groupsCopy[i].url.match(regex)) {
        const url = groupsCopy[i].url.replace(regex, paramId);
        const { data } = await client.get(url);

        groupsCopy[i].options = data.map((item) => ({
          value: item.value ?? item.ciudad,
          id: item.id,
        }));

        setGroups(groupsCopy);
      }
    }
  };

  /**
   * Send invitation.
   *
   * @returns {Promise<void>}
   */
  const sendInvitation = async () => {
    setIsLoading(true);
    setIsValidEmails('');
    setIsValidMessage('');
    setIsValidEmailSubject('');

    // validate emails
    const emailsArray = emails.split(',');
    let error = false;
    if(!emails){
      setIsValidEmails('Debe colocar al menos 1 correo');
      error = true;
    }else{
      emailsArray.forEach((email) => {
        // if is empty don't validate
        if (!email) {
          return;
        }
        // trim and validate email
        const trimmedEmail = email.trim();

        // don't allow spaces
        if (trimmedEmail.includes(' ')) {
          setIsValidEmails('Los correos no debe contener espacios');
          error = true;
        }else{
          validateEmail(trimmedEmail);
        }

      });
    }
    //validate email subject
    if(!emailSubject){
      setIsValidEmailSubject('El asunto de correo es requerido');
      error = true;
    }else{
      if (emailSubject.length < 10) {
        setIsValidEmailSubject('El asunto de correo debe tener al menos 10 carácteres');
        error = true;
      }
    }

    // validate message
    if (!message) {
      setIsValidMessage('El mensaje es requerido.');
      error = true;
    }else{
      if (!message.includes('@enlace')) {
        setIsValidMessage('El mensaje debe contener "@enlace".');
        error = true;
      }
    }

    // if emails or message are invalid
    if (error) {
      setIsLoading(false);

      return;
    }

    const groupsCopy = groups.map((item) => ({
      ...item,
    }));

    // remove options
    for (let i = 0; i < groupsCopy.length; i++) {
      groupsCopy[i].options = [];
    }

    const { id: companyId } = currentCompany;
    try{
      await client.post('sendMailJourney', {
        surveyId: parseInt(surveyId),
        companyId,
        message,
        emails,
        emailSubject,
        groups,
      });
      enqueueSnackbar('Invitación enviada', {
        variant: 'success',
      });
  
    }catch(Exception){
      enqueueSnackbar('Error al enviar la invitación', {
        variant: 'error',
      });
    }
    setIsLoading(false);
    handleClose();
  };

  // watch open prop
  useEffect(() => {
    if (isOpen === null) {
      return;
    }

    setOpen(isOpen);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // watch email message
  useEffect(() => {
    if (!message) {
      return;
    }

    setMessage(emailMessage);
  }, [emailMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  // component did mount
  useEffect(() => {
    fetchGroups();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.SendInvitationDialog}>
      <Button
        startIcon={<SendIcon />}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Enviar invitación
      </Button>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
      >
        <DialogTitle>Enviar invitación</DialogTitle>
        <DialogContent>

          <TextField
            id="emails"
            label="Para:"
            fullWidth
            variant="outlined"
            multiline
            rows={6}
            style={{
              marginTop: '1.3em',
            }}
            helperText={getHelperText(
              isValidEmails,
              'Coloque los correos de esta forma: correo1@example.com, correo2@example.com, correo3@example.com ...',
            )}
            value={emails}
            error={isValidEmails !== ''}
            onChange={handleEmailsChange}
          />
          <TextField
            id="emailSubject"
            label="Asunto del correo:"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            style={{
              marginTop: '1.3em',
            }}
            helperText={getHelperText(
              isValidEmailSubject,
              'Ingresa el asunto que deseas utilizar para tu correo electrónico. Recuerda que este asunto se aplicará a todos los destinatarios a los que envíes el correo.',
            )}
            value={emailSubject}
            error={isValidEmailSubject !== ''}
            onChange={handleEmailSubjectChange}
          />
          <TextField
            id="message"
            label="Mensaje:"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            style={{
              marginTop: '1.3em',
            }}
            helperText={getHelperText(
              isValidMessage,
              'Cada usuario recibirá un mensaje personalizado y @enlace será reemplazado por el enlace de la encuesta.',
            )}
            value={message}
            error={isValidMessage !== ''}
            onChange={handleMessageChange}
          />

          {isPersonal === false && (
            <Button
              onClick={copyUrl}
              startIcon={<LinkIcon />}
              style={{
                marginTop: '1.3em',
              }}
            >
              Copiar enlace
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            startIcon={<CancelIcon />}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={sendInvitation}
            startIcon={<SendIcon />}
            disabled={isLoading}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SendInvitationDialog.propTypes = {
  isPersonal: PropTypes.bool.isRequired,
  copyUrl: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  emailMessage: PropTypes.string,
};

SendInvitationDialog.defaultProps = {
  isOpen: null,
  emailMessage: '',
};

export default SendInvitationDialog;
