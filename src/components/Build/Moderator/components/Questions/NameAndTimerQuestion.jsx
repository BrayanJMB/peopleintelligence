export const NameAndTimerQuestion = ({question, indexCurrentQuestion, questionTimer}) => {
  return (
    <>
      <p>{question.name}</p>
      {indexCurrentQuestion === question.orderNumber && questionTimer > 0 && (
        <p>{questionTimer}</p>
      )}
    </>
  );
};
