import { Box, Typography, List, ListItem, ListItemText  } from "@mui/material";
import { FooterCMI } from "./FooterCMI";
import { HeaderCMI } from "./HeaderCMI";
import logo from "./img/logo.jpg";
import { Chart } from "./charts/Chart";
export const CMI = () => {
  return (
    <div style={{ width: "800px", backgroundColor: "white" }}>
      <div>
        <HeaderCMI />
        <Typography
          style={{ fontFamily: "Segoe UI", fontSize: "16px" }} // Especifica la fuente aquí
        >
          Como organización reconocemos que nuestros líderes son una pieza
          fundamental de SOMOS CMI y es por esta razón que hemos preparado para
          ti este reporte del pulso de Liderazgo 2023, el cual recopila los
          resultados, de manera agregada, de la evaluación de las personas de tu
          equipo que te reportan de manera directa y/o matricial y el cual
          refleja la percepción que tu equipo tiene de tu liderazgo, con la
          intención de que te sirva de brújula, para identificar tu impacto en
          el equipo, con las fortalezas y las oportunidades de tu liderazgo, el
          cual, esperamos cada vez esté más apegado al modelo de Liderazgo CMI,
          que reúne 3 grandes responsabilidades: Crear Futuro, Maximizar el
          talento e Impulsar el Negocio.
          <br />       <br /> 
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontFamily: "Segoe UI",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Qué puedes esperar de este reporte:
        </Typography>
        <Typography
          variant="body1"
          style={{ fontFamily: "Segoe UI", fontSize: "16px", marginTop: "8px" }}
        >
          LNPS: el cual servirá para entender la visión general de tu liderazgo,
          por parte de tu equipo
          <br />
          Encontrar calificaciones anónimas de tipo cuantitativo y cualitativo
          de cada uno de los aspectos consultados
        </Typography>

        <Typography
          variant="h6"
          style={{
            fontFamily: "Segoe UI",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "16px",
          }}
        >
          Qué esperamos que hagas con este reporte:
        </Typography>
        <Typography
          variant="body1"
          style={{ fontFamily: "Segoe UI", fontSize: "16px", marginTop: "8px" }}
        >
          El propósito de este reporte es dar a los líderes retroalimentación, a
          fin de construir planes de desarrollo que les permita seguir su
          evolución como líder y crecer integralmente. Los alcances de la
          valoración Líder CMI son los siguientes:
        </Typography>

        <List dense style={{ paddingLeft: "16px", marginTop: "8px" }}>
          <ListItem>
            <ListItemText primary="• Lee de manera completa el reporte. Esto contribuirá a elevar la consciencia con respecto a tu liderazgo." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Identificar las fortalezas para reforzarlas, así como las oportunidades para transformarlas en acciones de desarrollo." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Propiciar conversaciones y espacios de retroalimentación con tu jefe, RH y colaboradores." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Definir planes de desarrollo con acciones concretas." />
          </ListItem>
        </List>

        <Typography
          variant="body1"
          style={{
            fontFamily: "Segoe UI",
            fontSize: "16px",
            marginTop: "16px",
          }}
        >
          El ánimo de esta medición y reporte es el de seguir formando líderes
          que impulsen a CMI por 100 años más, cuidando el corazón de CMI, su
          gente, apegados a los valores REIR y siendo modelos de liderazgo CMI.
          <br />
        </Typography>
        <Box component="img" src={logo} alt="CMI Logo" />
        <FooterCMI />
        <div style={{ pageBreakBefore: "always" }}> </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <HeaderCMI title={"Aldo Enrique Vallejo"} />
        <div
          style={{
            flex: "1 0 auto", // Esto asegura que este contenedor tome el espacio disponible
          }}
        >
          <Chart />
        </div>
        <FooterCMI
          style={{
            flexShrink: 0, // Esto asegura que el footer no se encoja
          }}
        />
        <div style={{ pageBreakBefore: "always" }}></div>
      </div>
      <div>
        <HeaderCMI />
        <FooterCMI />
        <div style={{ pageBreakBefore: "always" }}> </div>
      </div>
      <div>
        <HeaderCMI />
        <FooterCMI />
        <div style={{ pageBreakBefore: "always" }}> </div>
      </div>
      <div>
        <HeaderCMI />

        <FooterCMI />
      </div>
    </div>
  );
};
