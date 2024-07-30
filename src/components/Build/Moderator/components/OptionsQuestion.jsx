import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import List from "@mui/material/List";
const OptionsQuestion = ({ option }) => {
  return (
    <Accordion
      style={{
        boxShadow: 'none',
        border: 'none',
        marginTop: '1rem',
      }}
    >
      <AccordionSummary>
        <Typography>Mostrar opciones</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {option.options.map((opt, idx) => (
            <Typography
              key={idx}
              variant="body2"
              style={{ padding: '0.5rem 0' }}
            >
              {opt.value}
            </Typography>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default OptionsQuestion;
