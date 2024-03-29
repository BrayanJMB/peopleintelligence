import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import styles from './SuccessMessage.module.css';

/**
 * SuccessMessage component for AnswerSurvey page.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const SuccessMessage = ({isAlreadyResponse}) => {

  return (
    <div className={styles.SuccessMessage}>
      <div className={styles.SuccessIcon}>
        <div className={styles.SuccessIcon__Tip}></div>
        <div className={styles.SuccessIcon__Long}></div>
      </div>
      {isAlreadyResponse === true ? (
        <>
          <Typography variant="h3" gutterBottom>
            ¡Upps!
          </Typography>
          <Typography variant="body1" gutterBottom>
            El link de la encuesta no esta disponible para este usuario, debido
            a que ya fue respondida.
          </Typography>
          <Typography variant="h5" gutterBottom style={{ fontStyle: 'italic' }}>
            Recuerda que este link es personal e intransferible.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h3" gutterBottom>
            ¡Gracias!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Has respondido la encuesta correctamente.
          </Typography>
        </>
      )}
    </div>
  );
};

SuccessMessage.propTypes = {};

SuccessMessage.defaultProps = {};

export default SuccessMessage;
