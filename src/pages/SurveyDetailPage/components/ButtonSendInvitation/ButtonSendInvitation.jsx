import { Button } from '@mui/material';

export const ButtonSendInvitation = ({sendIcon, handleClickOpen, visibility, hasWhatsApp}) => {
  return (
    <Button
      startIcon={sendIcon}
      variant="outlined"
      onClick={handleClickOpen}
      disabled={hasWhatsApp ? hasWhatsApp : !visibility}
    >
      Enviar invitación
    </Button>
  );
};
