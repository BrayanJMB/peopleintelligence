import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  idSurvey,
  skipConfirmation,
  message,
  dialogPosition,
  confirmationInput,
  reminderDays,
  setReminderDays,
  switchChecked,
  setSwitchChecked,
  errorReminderDay,
}) => {
  const [confirming, setConfirming] = useState(false);
  const [timer, setTimer] = useState(skipConfirmation ? 5 : 0); // Temporizador de 5 segundos
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
    setTimer(skipConfirmation ? 5 : 0); // Restablece el temporizador a 5 segundos
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setConfirming(false);
    setTimer(skipConfirmation ? 5 : 0); // Restablece el temporizador a 5 segundos
    onClose();
  };

  const handleReminderDay = (event) => {
    const value = event.target.value;
    setReminderDays(value);
  };

  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };

  useEffect(() => {
    if (errorReminderDay === false) {
      onClose();
    }
  }, [errorReminderDay]);

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{"Confirmar Acción"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <div style={{ marginTop: "15px" }}>
          {confirmationInput && (
            <>
              <TextField
                error={errorReminderDay}
                id="outlined-error-helper-text"
                label="Ingrese los días"
                value={reminderDays}
                helperText="Este campo no puede estar vacío, ni puede contener el valor de 0"
                onChange={handleReminderDay}
                disabled={switchChecked} // Desactiva el TextField si el Switch está desactivado
              />

              <div style={{ marginTop: "15px" }}>
                <Switch
                  checked={switchChecked}
                  onChange={handleSwitchChange} // Maneja el cambio de estado
                />
                <span>
                  {
                    "Activa esta opción para enviar recordatorios sin importar la cantidad de días."
                  }
                </span>
              </div>
            </>
          )}
        </div>

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
