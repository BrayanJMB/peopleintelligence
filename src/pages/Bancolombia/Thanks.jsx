export const Thanks = ({ isSurveyError }) => {
  return (
    <>
      {isSurveyError ? (
        <p>
          Hubo un error contestando al encuestas pro favor comuniquese con
          soporte
        </p>
      ) : (
        <p>Gracias por contestar la encuesta</p>
      )}
    </>
  );
};
