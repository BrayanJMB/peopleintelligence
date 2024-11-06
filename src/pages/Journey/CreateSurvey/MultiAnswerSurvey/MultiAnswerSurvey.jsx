import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import styles from './MultiAnswerSurvey.module.css';

export const MultiAnswerSurvey = (props) => {
  return (
    <div className={styles.intimidad}>
      <div className={styles.top}>
        <h3 className={styles.title}>
          ¿Quieres que esta se pueda responder varias veces?
        </h3>
        <p className={styles.subtitle}>
          Las encuestas que que se configuren con multiples respuestas podrán ser 
          respondidas varias vece según la concurrencia establecida
        </p>
      </div>
      <div className={styles.bottom}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={props.isAMultiAnswerSurvey}
            onChange={props.handleMultiAnswerSurvey}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Si. Acepta varias respuestas"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="No. Acepta sólo 1 respuesta por persona"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
