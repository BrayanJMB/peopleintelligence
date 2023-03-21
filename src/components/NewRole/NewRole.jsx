import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from './NewRole.module.css';

const search = (value, inputArray, field, proprety) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === value) {
      if (inputArray[i][field]) {
        return inputArray[i][field];
      } else {
        return '';
      }
    }
  }
};

export default function NewRole(props) {
  return (
    <div className={styles.form}>
      <div className={styles.input}>
        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: '40%' }}
          options={props.content.company}
          clearOnEscape
          value={search(
            props.info.companyId,
            props.ids.company,
            'nombreCompania',
            'id'
          )}
          onChange={(e, value) => {
            props.handleAutocomplete('companyId', value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={'No se ha encontrado ningún País'}
          renderInput={(params) => (
            <TextField {...params} label="company Name" />
          )}
          size="small"
        />
        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: '40%' }}
          options={props.content.roles}
          clearOnEscape
          value={search(props.info.roleId, props.ids.roles, 'name', 'id')}
          onChange={(e, value) => {
            props.handleAutocomplete('roleId', value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={'No roles'}
          renderInput={(params) => <TextField {...params} label="Roles" />}
          size="small"
        />
      </div>

      <div className={styles.impexp}>
        <Button variant="text" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={props.handleAddRole}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
