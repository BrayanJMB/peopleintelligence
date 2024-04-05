import TagFacesIcon from '@mui/icons-material/TagFaces';
import IconButton from '@mui/material/IconButton';

import Logo from '../../../assets/multicompani.jpeg';

import styles from './Basic.module.css';
export const PreviewSurvey = ({survey, moderator, company}) => {
  return (
    <div className={styles.right}>
      <div className={styles.phone}>
        <div className={styles.preview}>
          <div className={styles.inside}>
            <div
              style={{
                backgroundColor: '#00B0F0',
                width: '24%',
                height: '4px',
                borderRadius: '1rem',
                marginTop: '0.5rem',
              }}
            ></div>
            <div
              style={{
                backgroundColor: '#00B0F0',
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
                  src={company?.Logotipo ?? Logo}
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
                    survey.imageUrl
                      ? survey.imageUrl
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlNXd9tJhoyJMieolHXk9y6MmWuT7Y2bBv7ftTIS0U7Q&s'
                  }
                  alt="baseImagen"
                  className={styles.coverright}
                />
              </div>
              <h2 style={{ marginLeft: '0.8rem' }}>{survey.title}</h2>
              <div className={styles.bottom}>
                <div className={styles.avatarright}>
                  <div>
                    {moderator.avatarUrl ? (
                      <img
                        src={moderator.avatarUrl}
                        alt="profile"
                        className={styles.little}
                      />
                    ) : (
                      <IconButton>
                        <TagFacesIcon style={{ color: '#00B0F0' }} />
                      </IconButton>
                    )}
                  </div>
                  <div>{moderator.name ? moderator.name : 'Moderador'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
