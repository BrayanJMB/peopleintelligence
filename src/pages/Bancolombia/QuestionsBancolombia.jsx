import { useRef,useState } from 'react';

import InsertQuestion from './InsertQuestion';
import { Layout } from './Layout';
import { LayoutQuestions } from './LayoutQuestions';
import { SelectQuestions } from './SelectQuestions';

import styles from './Bancolombia.module.css';
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
        />
        <InsertQuestion
          dataDump={dataDump}
          errors={errors}
          radioValuesByAttribute={radioValuesByAttribute}
          textValuesByAttribute={textValuesByAttribute}
          currentAttributeIndex={currentAttributeIndex}
          setTextValuesByAttribute={setTextValuesByAttribute}
          setRadioValuesByAttribute={setRadioValuesByAttribute}
        />
      </div>
    </Layout>
  );
};
