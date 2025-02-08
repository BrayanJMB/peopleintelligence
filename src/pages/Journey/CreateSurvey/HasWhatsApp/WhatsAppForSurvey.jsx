import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import styles from '../Intimidad/Intimidad.module.css';

export const WhatsAppForSurvey = ({hasWhatsApp, handleHasWhatsApp}) => {
    return (
        <div className={styles.intimidad}>
          <div className={styles.top}>
            <h3 className={styles.title}>
              Envío de encuestas por medio de WhatsApp.
            </h3>
            <p className={styles.subtitle}>
              Desea que las encuesta se peude enviar por Whatsapp.
            </p>
          </div>
          <div className={styles.bottom}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={hasWhatsApp}
                onChange={handleHasWhatsApp}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Sí, quiero enviar la encuesta por WhatsApp."
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No, no quiero enviar la encuesta por WhatsApp."
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      );
};
