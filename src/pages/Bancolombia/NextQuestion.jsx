import logo2 from "./img/Logotipo.png";
import Footer from "./img/FooterBancolombia.png";
import { Button, Grid } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
export const NextQuestion = ({
  handleNext,
  handlePrevious,
  currentAttributeIndex,
  dataDump,
  isText,
  color,
}) => {
  return (
    <Grid container sx={{
        height:"100%"
    }}>
      <Grid item sm={8}>
        {isText ? (
          <img src={logo2} alt="some" style={{ padding: "1rem" }} />
        ) : (
          <img
            src={Footer}
            alt="some"
            style={{ padding: "1rem", width: "100%", height:"70%" }}
          />
        )}
      </Grid>
      <Grid item sm={4} style={{ display: "flex-inline", justifyContent: "flex-end" }}>
        {currentAttributeIndex > 0 && (
          <Button onClick={handlePrevious}>
            <ArrowCircleLeftIcon
              style={{ fontSize: "40px", color: `${color ? color : "black"}` }}
            />
          </Button>
        )}
        {currentAttributeIndex < dataDump.atributos.length - 1 && (
          <Button onClick={handleNext}>
            <ArrowCircleRightIcon
              style={{ fontSize: "40px", color: `${color ? color : "black"}` }}
            />
          </Button>
        )}

        {currentAttributeIndex === dataDump.atributos.length - 1 && (
          <button onClick={handleNext}>Enviar</button>
        )}
      </Grid>
    </Grid>
  );
};
