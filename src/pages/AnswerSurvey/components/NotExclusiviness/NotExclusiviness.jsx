import React from "react";
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "./NotFoundMessage.module.css";

/**
 * SuccessMessage component for AnswerSurvey page.
 *
 * @returns {JSX.Element}
 * @constructor
 */

const NotExclusiviness = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className={styles.ErrorMessage}>
      <WarningIcon style={{ fontSize: 200, color: "orange" }} />

      <Typography variant="h5" gutterBottom style={{ fontStyle: 'italic' }}>
        Lo sentimos, pero no estás inscrito para acceder a
        este contenido.
        </Typography>
        <Typography variant="h5" gutterBottom style={{ fontStyle: 'italic' }}>
        Solo las personas previamente registradas en la
        plataforma tienen permiso.
        <Typography variant="h5" gutterBottom style={{ fontStyle: 'italic' }}>
        Si crees que esto es un error, por favor
        contacta al administrador.
        </Typography>
      </Typography>
    </div>
  );
};

NotExclusiviness.propTypes = {};

NotExclusiviness.defaultProps = {};

export default NotExclusiviness;
