
import logo2 from "./img/Logotipo.png";
import backgroundWelcome from "./img/backgroundWelcome.png";
import styles from "./Bancolombia.module.css";
import { Layout } from "./Layout";
export const WelcomeBancolombia = ({titulo, descripcion, nextComponent}) => {
    const mobileStyle = {
        backgroundImage: 'none',
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
            '@media (maxWidth: 768px)': mobileStyle,
          }}
        >
          <div style={{ maxWidth: "calc(100% - 100px)" }}> {/* Ajusta el valor como sea necesario */}
            <h3 className={styles.mb}>
              {titulo}
            </h3>   
              {descripcion.split('\n').map((linea, index) => (
                <p className={styles.mb}>
                {linea}
                </p>
              ))}
          </div>
          <div style={{display:'flex', justifyContent:"space-between", alignItems:"center"}}>
          <img src={logo2} alt="some" style={{ padding: "1rem" }} />
          </div>
        </div>
      </Layout>
    );
  };
  
