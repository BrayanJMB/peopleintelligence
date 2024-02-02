import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';

import { Layout } from './Layout';

import styles from './Bancolombia.module.css';

export const Thanks = ({ isSurveyError }) => {
  return (
    <Layout>
      <div
        className={styles.Bancolombia__BoxWelcome}
        style={{
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '30px',
          textAlign:'center',
        }}
      >
        {isSurveyError ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <h2>
              Hubo un error contestando la encuesta por favor comuniquese con
              soporte
            </h2>
            <ErrorIcon style={{ fontSize: '100px', color: 'red' }}/>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <h2>! Gracias por tus aportes !</h2>
            <CheckCircleOutlineIcon
              style={{ fontSize: '100px', color: 'green' }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};
