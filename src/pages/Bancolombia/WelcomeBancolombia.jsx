import backgroundWelcome from "./img/backgroundWelcome.png";
import logo2 from "./img/Logotipo.png";
import { Layout } from "./Layout";
import { Button } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { NextQuestion } from "./NextQuestion";

import styles from "./Bancolombia.module.css";
export const WelcomeBancolombia = ({
  titulo,
  descripcion,
  handleNext,
  handlePrevious,
  currentAttributeIndex,
  dataDump,
  isText
}) => {
  const mobileStyle = {
    backgroundImage: "none",
  };
  return (
    <Layout>
      <div
        className={styles.Bancolombia__BoxWelcome}
        style={{
          backgroundImage: `url(${backgroundWelcome})`,
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain", // Asegúrate de que la imagen se contenga dentro del div
          padding: "1rem", // Añade un padding para evitar que el texto toque los bordes del div
          "@media (maxWidth: 768px)": mobileStyle,
        }}
      >
        <div style={{ maxWidth: "calc(100% - 100px)" }}>
          {" "}
          {/* Ajusta el valor como sea necesario */}
          <h3 className={styles.mb}>{titulo}</h3>
          {descripcion.split("\n").map((linea, index) => (
            <p className={styles.mb}>{linea}</p>
          ))}
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
