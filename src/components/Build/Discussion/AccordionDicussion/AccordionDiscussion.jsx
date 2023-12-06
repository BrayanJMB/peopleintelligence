import { useEffect, useRef,useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import Options from '../Options/Options';

const questionTypes = ['texto', 'seleccionsimple', 'Opinión', 'experiencia', 'imagen', 'video'];
export default function AccordionDiscussion({
  isConversation,
  demographics,
  setDemographics,
  questions,
  setQuestions,
  errors,
  setErrors,
  isAccordionOpen,
  setIsAccordionOpen,
  demographicRefs,
  accordionTitle
}) {
  console.log(questions);
  console.log(demographics);
  const [item, setItem] = useState('');

  const handleAddDemographic = () => {
    setDemographics((prevState) => [
      ...prevState,
      {
        name: '',
        description: '',
        demographicDetails: [],
      },
    ]);
  };

  const handleRemoveDemographic = (index) => {
    const newDemographics = [...demographics];
    newDemographics.splice(index, 1);
    setDemographics(newDemographics);
    const newErrors = [...errors.questions]; // Asumiendo que errors tiene la estructura que mencionaste anteriormente
    newErrors.splice(index, 1);
    setErrors((prev) => ({
      ...prev,
      questions: newErrors,
    }));
  };

  const handleAddConversation = (valor) => {
    setQuestions((prevState) => [
      ...prevState,
      {
        orderNumber: null,
        name: '',
        timeLimit: null,
        type: valor,
        urlMedia: '',
        options: [],
      },
    ]);
  };

  const handleRemoveConversation = (index) => {
    const newConversation = [...questions];
    newConversation.splice(index, 1);
    setQuestions(newConversation);
    const newErrors = [...errors.questions]; // Asumiendo que errors tiene la estructura que mencionaste anteriormente
    newErrors.splice(index, 1);
    setErrors((prev) => ({
      ...prev,
      questions: newErrors,
    }));
  };

  const handleChange = (event) => {
    setItem(event.target.value);
    handleAddConversation(event.target.value);
  };

  

  return (
    <div style={{width:"90%", margin:"0 auto"}}>
      <Accordion
        sx={{ color:"white", fontWeight:"900"}}
        expanded={isAccordionOpen}
        onChange={(e, expanded) => setIsAccordionOpen(expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor:"#00B0F0"}}
        >
          <Typography>{accordionTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ overflow: 'auto', maxHeight: '400px' }}>
          {isConversation ? (
            <>
              <FormControl sx={{ marginBottom: 5, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Seleccione el tipo pregunta
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={item}
                  label="Añadir nuevo ítem"
                  onChange={handleChange}
                  fullWidth
                >
                  {questionTypes.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid container spacing={2} alignItems="center">
                {questions.map((question, index) => (
                  <Grid item xs={8}>
                    <Options
                      key={index}
                      isConversation={isConversation}
                      currentIndex={index}
                      item={question.type}
                      question={question}
                      setQuestion={setQuestions}
                      handleRemoveConversation={() =>
                        handleRemoveConversation(index)
                      }
                      errors={errors}
                      ref={demographicRefs.current[index]}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Button onClick={handleAddDemographic} sx={{
                color:'#00B0F0'
              }}>
                Añadir nuevo dato demográfico
              </Button>
              <Grid container spacing={2} alignItems="center">
                {demographics.map((demographic, index) => (
                  <Grid item xs={8}>
                    <Options
                      key={index}
                      currentIndex={index}
                      demographic={demographic}
                      setDemographics={setDemographics}
                      remove={() => handleRemoveDemographic(index)}
                      isConversation={isConversation}
                      errors={errors}
                      ref={demographicRefs.current[index]}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
