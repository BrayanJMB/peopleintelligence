import InsertQuestion from "./InsertQuestion";
import { Layout } from "./Layout";
import { LayoutQuestions } from "./LayoutQuestions";
import { NextQuestion } from "./NextQuestion";
import { SelectQuestions } from "./SelectQuestions";
import { OpenQuestions } from "./OpenQuestions";

import styles from "./Bancolombia.module.css";

export const QuestionsBancolombia = ({
  title,
  color,
  dataDump,
  inputValues,
  setInputValues,
  errors,
  setErrors,
  firstEmptyRef,
  setTextValuesByAttribute,
  setRadioValuesByAttribute,
  radioValuesByAttribute,
  textValuesByAttribute,
  currentAttributeIndex,
  handleNext,
  handlePrevious,
  dataQuestion,
  isText,
  setSurveyData,
  storeSurvey,
  textOpenValuesByAttribute,
  setTextOpenValuesByAttribute,
}) => {
  return (
    <Layout>
      <div className={styles.Bancolombia__BoxWelcome}>
        <LayoutQuestions title={title} color={color} />
        <SelectQuestions
          dataDump={dataDump}
          inputValues={inputValues}
          setInputValues={setInputValues}
          errors={errors}
          setErrors={setErrors}
          firstEmptyRef={firstEmptyRef}
          setSurveyData={setSurveyData}
        />
        <InsertQuestion
          dataDump={dataDump}
          errors={errors}
          radioValuesByAttribute={radioValuesByAttribute}
          textValuesByAttribute={textValuesByAttribute}
          currentAttributeIndex={currentAttributeIndex}
          setTextValuesByAttribute={setTextValuesByAttribute}
          setRadioValuesByAttribute={setRadioValuesByAttribute}
          color={color}
          setSurveyData={setSurveyData}
        />
        <OpenQuestions
          dataDump={dataDump}
          textOpenValuesByAttribute={textOpenValuesByAttribute}
          setTextOpenValuesByAttribute={setTextOpenValuesByAttribute}
          currentAttributeIndex={currentAttributeIndex}
          setSurveyData={setSurveyData}
        />
        <NextQuestion
          dataDump={dataQuestion}
          currentAttributeIndex={currentAttributeIndex}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          isText={isText}
          color={color}
          storeSurvey={storeSurvey}
        />
      </div>
    </Layout>
  );
};
