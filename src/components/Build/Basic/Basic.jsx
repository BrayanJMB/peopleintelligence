import { useState } from "react";
import { useSelector } from "react-redux";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { selectCompanyById } from "../../../features/companies/companiesSlice";
import MyLoader from "../../MyLoader/MyLoader";

import { InputsFields } from "./InputsFields";
import { PreviewSurvey } from "./PreviewSurvey";
import UploadImage from "./UploadImage";

import styles from "./Basic.module.css";

export default function Basic({
  moderator,
  survey,
  handleChange,
  handlePhoto,
  handleReset,
  handleMove,
  handleNextStepper,
  loading,
}) {
  const [error, setError] = useState({});
  const [helperText, setHelperText] = useState({});
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const company = useSelector((state) =>
    currentCompany ? selectCompanyById(state, currentCompany.id) : null
  );

  const handleNext = () => {
    if (fieldsValidation()) {
      handleNextStepper();
      handleMove("", "discussion");
    } else return;
  };

  const fieldsValidation = () => {
    let hasNotErrors = true;

    setHelperText({});
    setError({});

    if (survey.title === "") {
      setHelperText((prevHelperText) => ({
        ...prevHelperText,
        title: "Este campo es requerido",
      }));
      setError((prevError) => ({ ...prevError, title: true }));
      hasNotErrors = false;
    }
    if (moderator.name === "") {
      setHelperText((prevHelperText) => ({
        ...prevHelperText,
        moderatorName: "Este campo es requerido",
      }));
      setError((prevError) => ({ ...prevError, moderatorName: true }));
      hasNotErrors = false;
    }
    if (survey.description === "") {
      setHelperText((prevHelperText) => ({
        ...prevHelperText,
        description: "Este campo es requerido",
      }));
      setError((prevError) => ({ ...prevError, description: true }));
      hasNotErrors = false;
    }

    return hasNotErrors;
  };

  return (
    <div className={styles.basic}>
      <span
        style={{
          marginLeft: "2rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Detalles básicos
      </span>
      <div className={styles.info}>
        <div className={styles.left}>
          <div>
            {loading && <MyLoader />}
            <InputsFields
              survey={survey}
              moderator={moderator}
              error={error}
              helperText={helperText}
              handleChange={handleChange}
            />
          </div>
          <div>
            <div className={styles.optional}>
              <InterestsOutlinedIcon
                color="blue"
                style={{ marginRight: "1rem" }}
              />
              <p>Personalizar (Opcional)</p>
            </div>
            <div className={styles.images}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div className={styles.cover}>
                  <UploadImage
                    informationConversation={survey.imageUrl}
                    text="Conversación"
                    nameInput="imageUrl"
                    handlePhoto={handlePhoto}
                    handleReset={handleReset}
                    sizeImage={styles.avatarleft}
                  />
                </div>
                <div className={styles.avatar}>
                  <UploadImage
                    informationConversation={moderator.avatarUrl}
                    text="Avatar"
                    nameInput="avatarUrl"
                    handlePhoto={handlePhoto}
                    handleReset={handleReset}
                    sizeImage={styles.avatarleft}
                  />
                </div>
              </div>

              <div>
                <span>Introducción</span>
                <div
                  style={{
                    marginTop: "0.2rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      color: "grey",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      resize: "none",
                    }}
                  >
                    Los participantes verán esto antes de los onboarding polls
                  </span>
                  <TextField
                    error={error.description}
                    helperText={helperText.description}
                    aria-label="empty textarea"
                    placeholder="Escribe tú mensaje de bienvenida :)"
                    multiline
                    minRows={3}
                    maxRows={4}
                    name="description"
                    value={survey.description}
                    onChange={(event) => handleChange(event, "survey")}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleNext}
                    style={{ color: "white" }}
                    color="blue"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PreviewSurvey
          survey={survey}
          moderator={moderator}
          company={company}
        />
      </div>
    </div>
  );
}
