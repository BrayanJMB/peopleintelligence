import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MyLoader from "../../components/MyLoader/MyLoader";
import client from "../../utils/axiosInstance";
import { ErrorsSurvey } from "./ErrorsSurvey";
import { QuestionsBancolombia } from "./QuestionsBancolombia";
import { WelcomeBancolombia } from "./WelcomeBancolombia";
import styles from "./Bancolombia.module.css";
import { Thanks } from "./Thanks";
export default function Bancolombia() {
  const { surveyId, answerId, companyId } = useParams();
  const [surveyData, setSurveyData] = useState({
    surveyId: surveyId,
    answerId: answerId,
    answers: [],
    radioAnswers: [],
  });

  const topElementRef = useRef(null);
  const [errors, setErrors] = useState({});
  const firstEmptyRef = useRef({});
  const [inputValuesByAttribute, setInputValuesByAttribute] = useState({});
  const [radioValuesByAttribute, setRadioValuesByAttribute] = useState({});
  const [textValuesByAttribute, setTextValuesByAttribute] = useState({});
  const [currentAttributeIndex, setCurrentAttributeIndex] = useState(0);
  const [errorSurvey, setErrorSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataDump, setDataDump] = useState(true);
  const [isSurveySubmitted, setIsSurveySubmitted] = useState(false);
  const [isSurveyError, setIsSurveyError] = useState(false);
  const handleNext = () => {
    //if (validateFields()){
      const nextIndex = currentAttributeIndex + 1;
      if (nextIndex < dataDump.length) {
        setCurrentAttributeIndex(nextIndex);
        // Inicializa los valores para los radio y text fields de la nueva sección
        setRadioValuesByAttribute((prev) => ({
          ...prev,
          [nextIndex]: { ...(prev[nextIndex] || {}) },
        }));
        setTextValuesByAttribute((prev) => ({
          ...prev,
          [nextIndex]: { ...(prev[nextIndex] || {}) },
        }));
        setErrors({});
        // Desplazamiento automático hacia arriba
        topElementRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    //}
  };

  const fetchSurveyForAnswerPersonal = async ({
    surveyId,
    companyId,
    answerId,
  }) => {
    setIsLoading(true); // Comenzar la carga
    client
      .get(`ShowQuestionAnswer/${surveyId}/${companyId}/${answerId}`)
      .then((response) => {
        // Manejo de la respuesta exitosa
        setIsLoading(false); // Finalizar la carga
        if (response.status === 200) {
          setDataDump(response.data);
        }
      })
      .catch((error) => {
        setIsLoading(false); // Finalizar la carga incluso en caso de error
        setErrorSurvey(error.response.data);
      });
  };
  const storeSurvey = async () => {
    try {
       await client.post(
        `AnswerSurvey/SendAnswwersBancolombia`,
        surveyData
      );
    } catch (error) {
      setIsSurveyError(true)
      console.error('Error al enviar la encuesta: ', error);
      // Manejar el error adecuadamente
    }finally{
      setIsSurveySubmitted(true);
    }
  };
  
  useEffect(() => {
    fetchSurveyForAnswerPersonal({ surveyId, companyId, answerId });
  }, []);

  const handlePrevious = () => {
    if (currentAttributeIndex > 0) {
      setCurrentAttributeIndex(currentAttributeIndex - 1);
      setErrors({});
      topElementRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Función para validar los campos
  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    const currentQuestions =
      dataDump[currentAttributeIndex]?.preguntas;
    const currentRadioQuestions =
      dataDump[currentAttributeIndex]?.preguntasRadio;

    let scrollToFirstError = true; // Bandera para controlar el desplazamiento
    // Validación para los Select y sus TextField asociados
    if (currentQuestions && Array.isArray(currentQuestions)) {
      for (
        let indexPregunta = 0;
        indexPregunta < currentQuestions.length;
        indexPregunta++
      ) {
        const pregunta = currentQuestions[indexPregunta];

        for (
          let indexOpcion = 0;
          indexOpcion < pregunta.opciones.length;
          indexOpcion++
        ) {
          const actionIndexKey = `${indexPregunta}-${indexOpcion}`;
          const detailIndexKey = `detail-${indexPregunta}-${indexOpcion}`;
          const actionValue =
            inputValuesByAttribute[currentAttributeIndex]?.[actionIndexKey] ||
            "";
          const detailValue =
            inputValuesByAttribute[currentAttributeIndex]?.[detailIndexKey] ||
            "";

          if (!actionValue) {
            newErrors[actionIndexKey] = true;
            isValid = false;
            // Verificar y enfocar el primer elemento con error
            if (
              scrollToFirstError &&
              firstEmptyRef.current &&
              firstEmptyRef.current[actionIndexKey]
            ) {
              firstEmptyRef.current[actionIndexKey].scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              scrollToFirstError = false; // Cambiar la bandera después del primer desplazamiento
            }
          }

          if (actionValue === "Modificar" && !detailValue.trim()) {
            newErrors[detailIndexKey] = true;
            isValid = false;
            if (
              scrollToFirstError &&
              firstEmptyRef.current &&
              firstEmptyRef.current[detailIndexKey]
            ) {
              firstEmptyRef.current[detailIndexKey].scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              scrollToFirstError = false; // Cambiar la bandera después del primer desplazamiento
            }
          }
        }
      }
    }

    // Validación para los botones de radio y sus TextField asociados
    if (currentRadioQuestions && Array.isArray(currentRadioQuestions)) {
      currentRadioQuestions.forEach((preguntaRadio, indexPreguntaRadio) => {
        // Asegúrate de acceder al estado anidado para el atributo y la pregunta actual
        const radioValue =
          radioValuesByAttribute[currentAttributeIndex]?.[indexPreguntaRadio];
        const textValue =
          textValuesByAttribute[currentAttributeIndex]?.[indexPreguntaRadio] ||
          "";

        if (!radioValue) {
          newErrors[
            `radio-${currentAttributeIndex}-${indexPreguntaRadio}`
          ] = true;
          isValid = false;
          // Verifica si debes enfocar el elemento RadioGroup
          if (
            firstEmptyRef.current &&
            firstEmptyRef.current[
              `radio-${currentAttributeIndex}-${indexPreguntaRadio}`
            ]
          ) {
            firstEmptyRef.current[
              `radio-${currentAttributeIndex}-${indexPreguntaRadio}`
            ].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }

        if (radioValue === "Si" && !textValue.trim()) {
          newErrors[
            `text-${currentAttributeIndex}-${indexPreguntaRadio}`
          ] = true;
          isValid = false;
          // Verifica si debes enfocar el TextField asociado
          if (
            firstEmptyRef.current &&
            firstEmptyRef.current[
              `text-${currentAttributeIndex}-${indexPreguntaRadio}`
            ]
          ) {
            firstEmptyRef.current[
              `text-${currentAttributeIndex}-${indexPreguntaRadio}`
            ].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  const renderAttribute = (atributo) => {
    const inputValues = inputValuesByAttribute[currentAttributeIndex] || {};

    if (atributo.istext === true) {
      return (
        <WelcomeBancolombia
          titulo={atributo.titulo}
          descripcion={atributo.descripcion}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentAttributeIndex={currentAttributeIndex}
          dataDump={dataDump}
          isText={atributo.istext}
        />
      );
    } else {
      return (
        <QuestionsBancolombia
          color={atributo.color}
          title={atributo.titulo}
          dataDump={atributo}
          dataQuestion={dataDump}
          inputValues={inputValues}
          setInputValues={(newValues) =>
            setInputValuesByAttribute({
              ...inputValuesByAttribute,
              [currentAttributeIndex]: newValues,
            })
          }
          errors={errors}
          setErrors={setErrors}
          firstEmptyRef={firstEmptyRef}
          radioValuesByAttribute={radioValuesByAttribute}
          textValuesByAttribute={textValuesByAttribute}
          currentAttributeIndex={currentAttributeIndex}
          setTextValuesByAttribute={setTextValuesByAttribute}
          setRadioValuesByAttribute={setRadioValuesByAttribute}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          isText={atributo.istext}
          setSurveyData={setSurveyData}
          storeSurvey={storeSurvey}
        />
      );
    }
  };
  useEffect(() => {
    console.log(surveyData);
  }, [surveyData]);
  console.log(dataDump);
  return (
    <div className={styles.Bancolombia}>
      <div className={styles.Bancolombia__Content} ref={topElementRef}>
        {isLoading ? (
          <MyLoader />
        ) : errorSurvey ? (
          <ErrorsSurvey errorDescription={errorSurvey} />
        ) : isSurveySubmitted ? (
          <Thanks isSurveyError={isSurveyError}/> // Mensaje de agradecimiento
        ) : (
          renderAttribute(dataDump[currentAttributeIndex])
        )}
      </div>
    </div>
  );
}
