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

const defaultMessage = 'Hola @usuario, te invito a participar en la encuesta: @enlace';

/**
 * Send invitation dialog component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const SendInvitationDialog = ({ isPersonal, copyUrl, isOpen }) => {
  const [open, setOpen] = useState(false);
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const { id: surveyId } = useParams();
  const [groups, setGroups] = useState([]);
  const [emails, setEmails] = useState('');
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
  };

  /**
   * Handle input change.
   */
  const handleChange = (event, index) => {
    const groupsCopy = [...groups];
    groupsCopy[index].value = event.target.value;

    setGroups(groupsCopy);
  };

  /**
   * Handle emails change.
   *
   * @param event
   */
  const handleEmailsChange = (event) => {
    setEmails(event.target.value);
  };

  /**
   * Handle message change.
   *
   * @param event
   */
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
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

    // validate emails
    const emailsArray = emails.split(',');
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
        setIsValidEmails('El usuario no debe contener espacios');
        error = true;
      }
    });
    // validate message
    if (!message) {
      setIsValidMessage('El mensaje es requerido.');
      error = true;
    }
    // should contain @usuario and @enlace
    if (!message.includes('@usuario')) {
      setIsValidMessage('El mensaje debe contener "@usuario".');
      error = true;
    }
    if (!message.includes('@enlace')) {
      setIsValidMessage('El mensaje debe contener "@enlace".');
      error = true;
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
    await client.post('sendMailJourney', {
      surveyId: parseInt(surveyId),
      companyId,
      message,
      emails,
      groups,
    });

    enqueueSnackbar('Invitación enviada', {
      variant: 'success',
    });

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
              'Coloque los usuarios de esta forma: @usuario1, @usuario2, @usuario3 ...',
            )}
            value={emails}
            error={isValidEmails !== ''}
            onChange={handleEmailsChange}
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
              'Cada usuario representado por @usuario recibirá un mensaje personalizado y @enlace será reemplazado por el enlace de la encuesta.',
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
};

SendInvitationDialog.defaultProps = {
  isOpen: null,
};

export default SendInvitationDialog;
