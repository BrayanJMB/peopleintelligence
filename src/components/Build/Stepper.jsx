import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
export const StepperSurvey = ({ activeStep, completed, steps }) => {

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step
          key={label}
          completed={completed[index]}
          sx={{
            "& .MuiStepLabel-iconContainer .Mui-active": {
              color: "#00B0F0",
            },
            "& .MuiStepLabel-iconContainer .Mui-completed": {
              color: "#00B0F0",
            },
          }}
        >
          <StepButton style={{ pointerEvents: "none" }}>{label}</StepButton>
        </Step>
      ))}
    </Stepper>
  );
};
