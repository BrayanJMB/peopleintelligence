import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import NotesIcon from '@mui/icons-material/Notes';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { selectCompanyById } from '../../../features/companies/companiesSlice';
import MyLoader from '../../MyLoader/MyLoader';

import UploadImage from './UploadImage';

import styles from './Basic.module.css';



export default function Basic(props) {
  const [error, setError] = useState({});
  const [helperText, setHelperText] = useState({});
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const company = useSelector((state) =>
    currentCompany ? selectCompanyById(state, currentCompany.id) : null
  );
  const handleNext = () => {
    if (fieldsValidation()) {
      props.handleNextStepper();
      props.handleMove('', 'discussion');
    }

    else return;
  };

  const fieldsValidation = () => {
    let hasNotErrors = true;

    setHelperText({});
    setError({});

    if (props.survey.title === '') {
      setHelperText((prevHelperText) => ({
        ...prevHelperText,
        title: 'Este campo es requerido',
      }));
      setError((prevError) => ({ ...prevError, title: true }));
      hasNotErrors = false;
    }

    if (props.moderator.name === '') {
      setHelperText((prevHelperText) => ({
        ...prevHelperText,
        name: 'Este campo es requerido',
      }));
      setError((prevError) => ({ ...prevError, name: true }));
      hasNotErrors = false;
    }

    if (props.survey.description === '') {
      setHelperText((prevHelperText) => ({
        ...prevHelperText,
        description: 'Este campo es requerido',
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
          marginLeft: '2rem',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        Detalles básicos
      </span>
      <div className={styles.info}>
        <div className={styles.left}>
          <div>
            {props.loading && <MyLoader/>}
            <div className={styles.general}>
              <NotesIcon color="blue" style={{ marginRight: '1rem' }} />
              <p>Título Conversación (Requerido)</p>
            </div>
            <div className={styles.required}>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  label="Título encuesta"
                  value={props.survey.title}
                  name="title"
                  onChange={(event) => props.handleChange(event, 'survey')}
                  size="small"
                  style={{ width: '100%' }}
                  error={error.title}
                  helperText={helperText.title}
                />
              </div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  label="Nombre moderador"
                  value={props.moderator.name} 
                  name="name"
                  onChange={(event) => props.handleChange(event, 'moderator')}
                  size="small"
                  style={{ width: '100%' }}
                  error={error.name}
                  helperText={helperText.name}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.optional}>
              <InterestsOutlinedIcon
                color="blue"
                style={{ marginRight: '1rem' }}
              />

              <p>Personalizar (Opcional)</p>
            </div>
            <div className={styles.images}>
              <div className={styles.cover}>
                <UploadImage
                  informationConversation={props.survey.imageUrl}
                  text="Conversación"
                  nameInput="imageUrl"
                  handlePhoto={props.handlePhoto}
                  handleReset={props.handleReset}
                  sizeImage={styles.avatarleft}
                />
              </div>
              <div className={styles.avatar}>
                <UploadImage
                  informationConversation={props.moderator.avatarUrl}
                  text="Avatar"
                  nameInput="avatarUrl"
                  handlePhoto={props.handlePhoto}
                  handleReset={props.handleReset}
                  sizeImage={styles.avatarleft}
                />
              </div>

              <div>
                <span>Introducción</span>
                <div style={{ marginTop: '0.2rem' }}>
                  <span
                    style={{
                      color: 'grey',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      resize: 'none',
                    }}
                  >
                    Los participantes verán esto antes de los onboarding polls
                  </span>
                  <TextField
                    error={error.description}
                    helperText={helperText.description}
                    aria-label="empty textarea"
                    placeholder="Type your welcome message..."
                    multiline 
                    minRows={6}
                    maxRows={8}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                    }}
                    name="description"
                    value={props.survey.description}
                    onChange={(event) => props.handleChange(event, 'survey')}
                    
                  />
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleNext}
                    style={{ color: 'white' }}
                    color="blue"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.phone}>
            <div className={styles.preview}>
              <div className={styles.inside}>
                <div
                  style={{
                    backgroundColor: 'grey',
                    width: '24%',
                    height: '4px',
                    borderRadius: '1rem',
                    marginTop: '0.5rem',
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: 'grey',
                    width: '90%',
                    height: '2px',
                    borderRadius: '1rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                  }}
                ></div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}
                >
                  <div style={{ marginBottom: '0.2rem', marginLeft: '0.5rem' }}>
                    <img
                      src={company?.Logotipo ?? null}
                      alt="logotipo"
                      className={styles.photo}
                    />
                    <span
                      style={{
                        color: 'grey',
                        fontSize: '0.7rem',
                        marginLeft: '0.8rem',
                      }}
                    >
                      {company?.nombreCompania}
                    </span>
                  </div>
                  <div className={styles.covers}>
                    <img
                      src={
                        props.survey.imageUrl
                          ? props.survey.imageUrl
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlNXd9tJhoyJMieolHXk9y6MmWuT7Y2bBv7ftTIS0U7Q&s'
                      }
                      alt="profildde"
                      className={styles.coverright}
                    />
                  </div>
                  <h2 style={{ marginLeft: '0.8rem' }}>{props.survey.title}</h2>
                  <div className={styles.bottom}>
                    <div className={styles.avatarright}>
                      <div>
                        {props.moderator.avatarUrl ? (
                          <img
                            src={props.moderator.avatarUrl}
                            alt="profile"
                            className={styles.little}
                          />
                        ) : (
                          <IconButton>
                            <TagFacesIcon color="warning" />
                          </IconButton>
                        )}
                      </div>
                      <div>
                        {props.moderator.name
                          ? props.moderator.name
                          : 'Moderator'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
