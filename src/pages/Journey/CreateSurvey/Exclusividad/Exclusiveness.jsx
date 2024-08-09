import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import styles from '../Intimidad/Intimidad.module.css';

export const Exclusiveness = ({exclusiviness, handleExclusiviness}) => {
  return (
    <div className={styles.intimidad}>
      <div className={styles.top}>
        <h3 className={styles.title}>
          Encuestas de Acceso Restringido
        </h3>
        <p className={styles.subtitle}>
        Solo las personas con su correo electrónico o número de identificación registrados en la plataforma podrán responder.
        </p>
      </div>
      <div className={styles.bottom}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={exclusiviness}
            onChange={handleExclusiviness}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Si. Hacer encuesta restringida"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="No. Cualquier usuario puede responder"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
