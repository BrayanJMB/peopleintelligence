import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Button } from '@mui/material';

import backgroundWelcome from './img/backgroundWelcome.png';
import logo2 from './img/Logotipo.png';
import { Layout } from './Layout';
import { NextQuestion } from './NextQuestion';

import styles from './Bancolombia.module.css';
export const WelcomeBancolombia = ({
  titulo,
  descripcion,
  handleNext,
  handlePrevious,
  currentAttributeIndex,
  dataDump,
  isText,
}) => {
  const mobileStyle = {
    backgroundImage: 'none',
  };
  const convertirLineas = (texto) => {
    // Dividir el texto en líneas y luego procesar cada línea
    return texto.split('\n').map((linea, index) => {
      // Reemplazar las etiquetas <br> por elementos JSX en negrita
      const partes = linea.split(/<br>|<\/br>/).map((parte, idx) => {
        if (idx % 2 === 1) {
          // Las partes que estaban entre las etiquetas <br>
          return <strong key={idx}>{parte}</strong>;
        } else {
          // Las demás partes
          return parte;
        }
      });

      // Devolver la línea como un párrafo con las partes procesadas
      return <p key={index} className={styles.mb}>{partes}</p>;
    });
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
        <div style={{ maxWidth: 'calc(100% - 100px)' }}>
          {' '}
          {/* Ajusta el valor como sea necesario */}
          <h3 className={styles.mb}>{titulo}</h3>
            <p className={styles.mb}>{convertirLineas(descripcion)}</p>
        </div>
        <NextQuestion
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentAttributeIndex={currentAttributeIndex}
          dataDump={dataDump}
          isText={isText}
        />
      </div>
    </Layout>
  );
};
