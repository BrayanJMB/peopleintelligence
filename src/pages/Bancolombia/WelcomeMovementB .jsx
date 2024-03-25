import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import  Button  from '@mui/material/Button';

import backgroundWelcome from './img/backgroundWelcome.png';
import logo2 from './img/Logotipo.png';
import { Layout } from './Layout';

import styles from './Bancolombia.module.css';
export const WelcomeMovementB = ({nextComponent, previousComponent}) => {
  const mobileStyle = {
    backgroundImage: 'none',
  };
  return (
    <Layout>
      <div
        className={styles.Bancolombia__BoxWelcome}
        style={{
          backgroundImage: `url(${backgroundWelcome})`,
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain', // Asegúrate de que la imagen se contenga dentro del div
          padding: '1rem', // Añade un padding para evitar que el texto toque los bordes del div
          '@media (maxWidth: 768px)': mobileStyle,
        }}
      >
        <div style={{ maxWidth: 'calc(100% - 150px)', textAlign: 'justify' }}>
          <h2 className={styles.mb}>¡Empecemos con Movimiento B!</h2>
          <p className={styles.mb}>
            Como sabes, el modelo tiene 6 atributos culturales (Integridad,
            Clientes, Desempeño Extraordinario, Crecimiento Sostenible, Ser
            Humano, Dinamismo) y cada uno de ellos tiene 3 comportamientos que
            se quieren observar y 3 comportamientos que no vamos a tolerar.
          </p>
          <p className={styles.mb}>
            Para cada uno de los comportamientos vamos a solicitar tu opinión:
            ¿Se debe mantener? ¿Se debe modificar? ¿Se debe eliminar? Si escoges
            la opción de que se debe modificar, el sistema te solicitará una
            propuesta de ajuste.
          </p>
          <p className={styles.mb}>
            Adicionalmente, al final de cada atributo cultural el sistema te
            solicitará, de manera opcional, si tienes alguna propuesta de algún
            comportamiento nuevo (a observar o a no tolerar) que quieras
            sugerir.
          </p>
          <p className={styles.mb}>¡Manos a la obra!</p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <img src={logo2} alt="some" style={{ padding: '1rem' }} />
          <div>
          <Button onClick={previousComponent}>
            <ArrowCircleLeftIcon
              style={{ color: '#7D62A8', fontSize: '40px' }}
            />
          </Button>
          <Button onClick={nextComponent}>
            <ArrowCircleRightIcon
              style={{ color: '#7D62A8', fontSize: '40px' }}
            />
          </Button>
 
          </div>

        </div>
      </div>
    </Layout>
  );
};
