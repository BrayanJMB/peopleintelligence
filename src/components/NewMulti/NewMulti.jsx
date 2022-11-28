import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./NewMulti.module.css";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

const search = (value, inputArray, field, proprety) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === value) {
      if (inputArray[i][field]) {
        return inputArray[i][field];
      } else {
        return "";
      }
    }
  }
};

export default function NewMutli(props) {
  const [checked, setChecked] = useState(false);
  const handlechange = () => {
    setChecked(!checked);
  };
  return (
    <div className={styles.form}>
      <div className={styles.input}>
        <Autocomplete
          id="combo-box-demo"
          style={{ width: "50%" }}
          options={props.content.companyroles}
          clearOnEscape
          value={search(
            props.info.companyId,
            props.ids.companyroles,
            "businessName",
            "id"
          )}
          onChange={(e, value) => {
            props.handleAutocomplete("companyId", value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={"No se ha encontrado ningún País"}
          renderInput={(params) => (
            <TextField {...params} label="company Name" />
          )}
          size="small"
          disabled={!checked}
        />

        <Autocomplete
          id="combo-box-demo"
          style={{ width: "50%" }}
          options={props.content.usuariorole}
          clearOnEscape
          value={search(props.info.userId, props.ids.usuariorole, "name", "id")}
          onChange={(e, value) => {
            props.handleAutocomplete("userId", value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={"No roles"}
          renderInput={(params) => <TextField {...params} label="Users" />}
          size="small"
        />
        <Autocomplete
          id="combo-box-demo"
          style={{ width: "50%" }}
          options={props.content.roleroles}
          clearOnEscape
          value={search(
            props.info.roleId,
            props.ids.roleroles,
            "userName",
            "id"
          )}
          onChange={(e, value) => {
            props.handleAutocomplete("roleId", value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={"No roles"}
          renderInput={(params) => <TextField {...params} label="Roles" />}
          size="small"
        />
      </div>

      <div className={styles.impexp}>
        <Checkbox onChange={handlechange} />
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
