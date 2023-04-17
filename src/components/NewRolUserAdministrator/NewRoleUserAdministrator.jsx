import {useState } from 'react';
//import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from './NewRoleUserAdministrator.module.css';

export default function NewRoleUserAdministrator(props) {
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  
  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <div className={styles.form}>
      <div className={styles.input}>
        <TextField label="Usuarios" style={{ flexBasis: '40%' }} value={user} onChange={handleUserChange} />
        <TextField label="Roles" style={{ flexBasis: '40%' }} value={role} onChange={handleRoleChange} />
      </div>
      <div className={styles.impexp}>
        <Button variant="text" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={() => props.handleAddUserAdministrator({user, role})}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
