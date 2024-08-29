import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const ConfirmDialog = ({ open, onClose, onConfirm, idSurvey }) => {
  const [confirming, setConfirming] = useState(false);
  const [timer, setTimer] = useState(5); // Temporizador de 5 segundos

  useEffect(() => {
    let timeout;
    if (confirming && timer > 0) {
      timeout = setTimeout(() => setTimer(timer - 1), 1000); // Decrementa el temporizador cada segundo
    } else if (timer === 0) {
      handleConfirm();
    }

    return () => clearTimeout(timeout);
  }, [confirming, timer]);

  const handleStartConfirming = () => {
    setConfirming(true);
  };

  const handleConfirm = () => {
    onConfirm(idSurvey);
    setConfirming(false);
    setTimer(5); // Restablece el temporizador a 5 segundos
  };

  const handleCancel = () => {
    setConfirming(false);
    setTimer(5); // Restablece el temporizador a 5 segundos
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{'Confirmar Acción'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Al ejecutar esta acción se borrarán todas las respuestas de la
          encuesta.
        </DialogContentText>
        <DialogContentText>
          ¿Estás seguro de que deseas ejecutar esta acción?
        </DialogContentText>

        {confirming && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
              flexDirection:'column',
            }}
          >
            <CircularProgress />
            <p>{`Confirmando en ${timer} segundos...`}</p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        {confirming ? (
          <Button onClick={handleCancel} color="primary">
            Cancelar confirmación
          </Button>
        ) : (
          <>
            <Button onClick={handleCancel} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleStartConfirming} color="primary" autoFocus>
              Confirmar
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
