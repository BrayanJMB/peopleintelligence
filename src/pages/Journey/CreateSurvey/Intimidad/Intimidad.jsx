import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import styles from './Intimidad.module.css';

export default function Intimidad(props) {
  return (
    <div className={styles.intimidad}>
      <div className={styles.top}>
        <h3 className={styles.title}>
          ¿Quieres que esta encuesta permanezca anónima?
        </h3>
        <p className={styles.subtitle}>
          Las encuestas anónimas permiten a los usuarios ser abiertos y honestos
          sin temor a represalias o vergüenza.
        </p>
      </div>
      <div className={styles.bottom}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={props.anonyme}
            onChange={props.handleAnonyme}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Si. Mantener esta encuesta anónima"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="No. Recopilar información del usuario"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}
