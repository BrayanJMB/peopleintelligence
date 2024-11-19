import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import styles from './NotFoundMessage.module.css';

/**
 * SuccessMessage component for AnswerSurvey page.
 *
 * @returns {JSX.Element}
 * @constructor
 */



const NotFoundMessage = ({infoMessage}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return(
  <div className={styles.ErrorMessage}>
    <HighlightOffIcon style={{ fontSize: 200, color: 'red' }} />
    <Typography
      variant="h2"
      gutterBottom
    >
      404
    </Typography>

    <Typography
      variant={isMobile ? 'h5' : 'h2'}
      gutterBottom
    >
      {infoMessage}
    </Typography>
  </div>
);};

NotFoundMessage.propTypes = {};

NotFoundMessage.defaultProps = {};

export default NotFoundMessage;
