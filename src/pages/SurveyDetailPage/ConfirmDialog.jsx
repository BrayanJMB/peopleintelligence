import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  idSurvey,
  skipConfirmation,
  message,
  dialogPosition,
}) => {
  const [confirming, setConfirming] = useState(false);
  const [timer, setTimer] = useState(skipConfirmation ? 5: 0 ); // Temporizador de 5 segundos
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar si se está procesando
  useEffect(() => {
    let timeout;
    if (confirming && timer > 0) {
      timeout = setTimeout(() => setTimer(timer - 1), 1000); // Decrementa el temporizador cada segundo
    } else if (confirming && timer === 0) {
      handleConfirm();
    }

    return () => clearTimeout(timeout);
  }, [confirming, timer]);

  const handleStartConfirming = () => {
    setConfirming(true);
    setIsSubmitting(true);
  };

  const handleConfirm = async () => {
    await onConfirm(idSurvey, dialogPosition);
    setConfirming(false);
    setTimer(skipConfirmation ? 5: 0 ); // Restablece el temporizador a 5 segundos
    setIsSubmitting(false);
    onClose();
  };

  const handleCancel = () => {
    setConfirming(false);
    setTimer(skipConfirmation ? 5: 0 ); // Restablece el temporizador a 5 segundos
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{"Confirmar Acción"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <DialogContentText>
          ¿Estás seguro de que deseas ejecutar esta acción?
        </DialogContentText>

        {confirming && skipConfirmation && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
              flexDirection: "column",
            }}
          >
            <CircularProgress />
            <p>{`Confirmando en ${timer} segundos...`}</p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        {confirming && skipConfirmation ? (
          <Button onClick={handleCancel} color="primary">
            Cancelar confirmación
          </Button>
        ) : (
          <>
            <Button
              onClick={handleCancel}
              color="primary"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleStartConfirming}
              color="primary"
              autoFocus
              disabled={isSubmitting}
            >
              Confirmar
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
