import { useCallback, useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
export const ConnectDisconnectUser = ({connectedUsers}) => {
  return (
    <>
        <div style={{ display: 'flex', alignItems:'center' }}>
            <div style={{ marginRight:'5px'}} id="connectedUsers">Usuarios Conectados: {connectedUsers}</div>
            <PersonIcon />
        </div>
    </>
  ); 
};
