import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import MyCard from "../MyCard/MyCard";

import { patchVisilibitySurvey } from "./services";

import styles from "./MyPageHeader.module.css";
/**
 * Page header component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MyPageHeader = ({ surveyId, title, Icon, visibility, setVisibility }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  /**
   * Handle click back page.
   *
   * @param event
   */
  const handleClickBackPage = (event) => {
    event.preventDefault();

    navigate(-1);
  };

  const handleSurveyVisibilityChange = async (event) => {
    setVisibility(event.target.checked);
    try {
      const isSurveyEnabled = event.target.checked;

      // Llamar a la función para cambiar la visibilidad de la encuesta
      await patchVisilibitySurvey(surveyId, isSurveyEnabled);

      // Mostrar un mensaje según el estado de la encuesta
      if (isSurveyEnabled) {
        enqueueSnackbar("Encuesta habilitada exitosamente", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Encuesta deshabilitada exitosamente", {
          variant: "success",
        });
      }
    } catch (error) {
      // Manejar el error y mostrar un mensaje de error
      enqueueSnackbar(
        "Ocurrió un error al cambiar la visibilidad de la encuesta",
        { variant: "error" }
      );
    }
  };

  return (
    <MyCard>
      <div className={styles.MyPageHeader}>
        {/* back button */}
        <div className={styles.MyPageHeader__backIcon}>
          <IconButton onClick={handleClickBackPage} aria-label="Atrás">
            <ArrowBackIcon />
          </IconButton>
        </div>

        {/* title */}
        <Typography variant="h4" className={styles.MyPageHeader__title}>
          <span className={styles.MyPageHeader__icon}>{Icon}</span>

          {title}
        </Typography>
        {(surveyId || visibility) && (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={visibility}
                  onChange={handleSurveyVisibilityChange}
                />
              }
              label="Habilitar/Deshabilitar encuesta"
            />
          </FormGroup>
        )}
      </div>
    </MyCard>
  );
};

MyPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.element,
};

MyPageHeader.defaultProps = {};

export default MyPageHeader;
