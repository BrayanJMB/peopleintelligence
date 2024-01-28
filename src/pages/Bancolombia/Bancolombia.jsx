import { useEffect, useRef,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { Divider } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';

import logo from './img/Bancolombia.jpeg';
import InsertQuestion from './InsertQuestion';
import { QuestionsBancolombia } from './QuestionsBancolombia';
import { SelectQuestions } from './SelectQuestions';
import { WelcomeBancolombia } from './WelcomeBancolombia';
import { WelcomeMovementB } from './WelcomeMovementB ';

import styles from './Bancolombia.module.css';
export default function Bancolombia() {
  const dataDump = {
    atributos: [
      {
        istext: true,
        titulo: 'Los cambios en el entorno ',
        descripcion:
          'Los cambios en el entorno global y local exigen hacer ajustes en la estrategia y, en consecuencia, actualizar nuestro modelo de Cultura MovimientoB y de Liderazgo LíderB.\n\nTe enviamos esta encuesta para escuchar tus puntos de vista, teniendo en cuenta lo siguiente:\n\nLos 6 rasgos de MovimientoB se mantienen, la actualización se hace en los comportamientos.\nLas 6 grandes responsabilidades de LíderB se mantienen, los cambios se hacen en las 4 responsabilidades que hacen parte de cada una.\nVamos a mantener la simetría en términos del número de comportamientos o responsabilidades.\nTen presente los retos actuales y futuros para el banco y las tendencias en el mundo de los negocios.\nSiendo la intención hacer una actualización, te pedimos que mantengas foco en los cambios o adiciones que realmente sean necesarios o pertinentes.\nSi quieres reunirte con un equipo para diligenciar la encuesta puedes hacerlo.\n\nDe antemano gracias por tu tiempo y valiosos aportes\n',
        color: '',
        preguntas: null,
        preguntasRadio: null,
      },
      {
        istext: true,
        titulo: '¡Empecemos con Movimiento B!',
        descripcion:
          'Como sabes, el modelo tiene 6 rasgos culturales (Integridad, Clientes, Desempeño Extraordinario, Crecimiento Sostenible, Ser Humano, Dinamismo) y cada uno de ellos tiene 3 comportamientos que se quieren observar y 3 comportamientos que no vamos a tolerar.\n\nPara cada uno de los comportamientos vamos a solicitar tu opinión: ¿se debe mantener? ¿ se debe modificar? ¿ se debe eliminar? Si escoges la opción de que se debe modificar, el sistema te solicitará una propuesta de ajuste.\n\nAdicionalmente, al final de cada atributo cultural el sistema te solicitará, de manera opcional, si tienes alguna propuesta de algún comportamiento nuevo (a observar o a no tolerar) que quieras sugerir.\n\n¡Manos a la obra!\n',
        color: '',
        preguntas: null,
        preguntasRadio: null,
      },
      {
        istext: false,
        titulo: 'Integridad',
        descripcion: null,
        color: '#FCD928',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Actúo siempre basado en principios  éticos y hago lo correcto aunque nadie  me esté viendo.',
              },
              {
                option:
                  'Soy un ejemplo de la Cultura de la organización en todos los  aspectos  de mi vida.',
              },
              {
                option:
                  'Soy transparente y prudente en mis acciones  para generar relaciones de confianza',
              },
            ],
            tituloPregunta: 'Qué comportamientos voy a tener',
          },
          {
            opciones: [
              {
                option: 'Actuar creyendo que el fin  justifica los medios.',
              },
              {
                option:
                  'Hacer o decir algo que ponga en riesgo  a las personas, la reputación o el buen  nombre de la organización.',
              },
              {
                option:
                  'Tolerar y no hacer nada cuando  veo faltas de integridad y ética a mi alrededor.',
              },
            ],
            tituloPregunta: 'Qué comportamientos no vamos a tolerar',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que vamos a tolerar?',
          },
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que no vamos a tolerar?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Clientes',
        descripcion: null,
        color: '#9F62D2',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Me aseguro de entender con profundidad  las necesidades de nuestros clientes con  el fin de asegurar una relación responsable y cercana.',
              },
              {
                option:
                  'Atiendo y respondo oportunamente  a todos nuestros clientes.',
              },
              {
                option:
                  'Implemento soluciones fáciles y confiables para nuestros clientes buscando su preferencia y lealtad.',
              },
            ],
            tituloPregunta: 'Qué comportamientos voy a tener',
          },
          {
            opciones: [
              {
                option:
                  'Prestar un mal servicio o mostrar  desinterés por nuestros clientes.',
              },
              {
                option: 'Incumplir las promesas a  nuestros clientes.',
              },
              {
                option:
                  'Desconocer el impacto de mi  rol en nuestros clientes.',
              },
            ],
            tituloPregunta: 'Qué comportamientos no vamos a tolerar',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que vamos a tolerar?',
          },
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que no vamos a tolerar?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Desempeño extraordinario',
        descripcion: null,
        color: '#FF803A',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Asumo mis responsabilidades y me reto  continuamente para alcanzar  resultados superiores.',
              },
              {
                option:
                  'Trabajo colaborativamente y con autonomía para lograr objetivos comunes. ',
              },
              {
                option:
                  'Ejecuto con pasión, disciplina y altos niveles de excelencia.',
              },
            ],
            tituloPregunta: 'Qué comportamientos voy a tener',
          },
          {
            opciones: [
              {
                option: 'Aceptar o ser complaciente  con el bajo desempeño.',
              },
              {
                option: 'Ser mediocre e incumplir mis compromisos.',
              },
              {
                option: 'Buscar el resultado por encima de las personas.',
              },
            ],
            tituloPregunta: 'Qué comportamientos no vamos a tolerar',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que vamos a tolerar?',
          },
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que no vamos a tolerar?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Crecimiento sostenible',
        descripcion: null,
        color: '#FFB8D2',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Comprendo el propósito y la estrategia  del Grupo Bancolombia y los aplico en todas mis decisiones y acciones.',
              },
              {
                option:
                  'Tengo en cuenta el impacto de mis  decisiones en el desarrollo sostenible  de la organización y de los países.',
              },
              {
                option: 'Soy responsable en todos los aspectos  de mi vida.',
              },
            ],
            tituloPregunta: 'Qué comportamientos voy a tener',
          },
          {
            opciones: [
              {
                option:
                  'Desconocer el impacto de las  decisiones y acciones en el medio ambiente y la sociedad.',
              },
              {
                option:
                  'Actuar desconociendo la diversidad  cultural, social y económica de nuestro entorno.',
              },
              {
                option:
                  'Ser ineficiente y desperdiciar los  recursos de la organización.',
              },
            ],
            tituloPregunta: 'Qué comportamientos no vamos a tolerar',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que vamos a tolerar?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Ser humano',
        descripcion: '',
        color: '#00C587',
        preguntas: [],
        preguntasRadio: [
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que no vamos a tolerar?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Dinamismo',
        descripcion: null,
        color: '#01CDEB',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Exploro, experimento y estoy dispuesto  a mejorar continuamente e innovar.',
              },
              {
                option:
                  'Trabajo con agilidad, flexibilidad y  eficiencia para asegurar el logro de  los objetivos.',
              },
              {
                option:
                  'Me comprometo con la transformación  de la organización y la implementación de los proyectos definidos.',
              },
            ],
            tituloPregunta: 'Qué comportamientos voy a tener',
          },
          {
            opciones: [
              {
                option:
                  'Aferrarse al pasado y crear  resistencia al cambio sin proponer alternativas.',
              },
              {
                option:
                  'No aprender continuamente de los aciertos y desaciertos.',
              },
              {
                option: 'Permanecer estático cuando se requiere actuar.',
              },
            ],
            tituloPregunta: 'Qué comportamientos no vamos a tolerar',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que vamos a tolerar?',
          },
          {
            tituloPregunta:
              '¿Quisieras agregar un comportamiento adicional en las conductas que no vamos a tolerar?',
          },
        ],
      },
      {
        istext: true,
        titulo: '¡Sigamos con Líder B!',
        descripcion:
          'El proceso general es el mismo aplicado para Movimiento B. Para cada una de las 6 grandes responsabilidades del líder debes escoger una opción (mantener, modificar, eliminar) y al final de cada sección podrás sugerir nuevas responsabilidades.\n',
        color: '',
        preguntas: null,
        preguntasRadio: null,
      },
      {
        istext: false,
        titulo: 'Me comprometo con el propósito y la estrategia',
        descripcion: null,
        color: '#575756',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Comprendo y hago propio el Propósito y la estrategia del Grupo y aseguro que todos en mi equipo lo hagan.',
              },
              {
                option:
                  'Oriento mi acción y tomo decisiones que contribuyan con el logro del Propósito y la estrategia del Grupo.',
              },
              {
                option:
                  'Alineo los objetivos, estrategias y acciones de mi equipo con la estrategia del Grupo.',
              },
              {
                option:
                  'Estudio el entorno y tendencias que pueden impactar la gestión y los resultados del Grupo.',
              },
            ],
            tituloPregunta: 'Responsabilidades del líder:',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta: '¿Quisieras agregar una responsabilidad adicional?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Logro resultados extraordinarios',
        descripcion: null,
        color: '#FCD928',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Defino con mi equipo objetivos retadores y hago seguimiento periódico para asegurar su cumplimiento.',
              },
              {
                option:
                  'Emprendo acciones e implemento los cambios necesarios para que mi equipo alcance resultados extraordinarios actuando con agilidad, flexibilidad y eficiencia.',
              },
              {
                option:
                  'Uso todos los datos disponibles y soy efectivo a la hora de tomar decisiones y actuar en entornos complejos, ambiguos e inciertos.',
              },
              {
                option:
                  'Aseguro que las personas y equipos tengan los recursos y capacidades requeridas para el logro de los objetivos.',
              },
            ],
            tituloPregunta: 'Responsabilidades del líder:',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta: '¿Quisieras agregar una responsabilidad adicional?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Lidero la cultura y el bienestar',
        descripcion: null,
        color: '#C5C5C5',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Soy coherente entre lo que pienso, siento, digo y hago, doy siempre ejemplo de los comportamientos definidos en la Cultura y me aseguro que mi equipo lo haga.',
              },
              {
                option:
                  'Trabajo para lograr el bienestar y la mejor experiencia de las personas de mi equipo, entendiendo las nuevas tendencias en el mundo del trabajo.',
              },
              {
                option:
                  'Lidero la vivencia de la Cultura reconociendo los buenos comportamientos y retroalimentando a quienes no están alineados.',
              },
              {
                option:
                  'Actúo con contundencia cuando alguien desconoce o contraviene la Cultura del Grupo Bancolombia o afecta el ambiente de trabajo.',
              },
            ],
            tituloPregunta: 'Responsabilidades del líder:',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta: '¿Quisieras agregar una responsabilidad adicional?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Facilito el desarrollo de las personas',
        descripcion: null,
        color: '#575756',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Desarrollo equipos de alto desempeño, promuevo la autonomía y empodero a los equipos para que tomen decisiones y se apropien de su propia evolución.',
              },
              {
                option:
                  'Pido y doy retroalimentación equilibrada y oportuna, a la vez que promuevo el crecimiento integral de las personas.',
              },
              {
                option:
                  'Me gusta investigar y documentarme sobre temas de interés en todos los campos propios de mi rol y del Grupo Bancolombia.',
              },
              {
                option:
                  'Conozco a mi equipo y su potencial, construyo con ellos un plan de desarrollo y le hago seguimiento en los tiempos establecidos.',
              },
            ],
            tituloPregunta: 'Responsabilidades del líder:',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta: '¿Quisieras agregar una responsabilidad adicional?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Soy creador de futuro',
        descripcion: null,
        color: '#FCD928',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Entiendo el cambio y la mejora continua como algo permanente, propongo nuevas o mejores formas de hacer las cosas y estimulo la curiosidad en mi equipo.',
              },
              {
                option:
                  'Acompaño con determinación las iniciativas de cambio de la Organización y desarrollo con mi equipo las habilidades y rutinas para ser exitosos en un entorno ágil y digital.',
              },
              {
                option:
                  'Aprendo de nuestros aciertos y desaciertos adaptándome positivamente a las situaciones adversas.',
              },
              {
                option:
                  'Reto la forma de hacer las cosas, soy capaz de reconocer el potencial de una idea o propuesta y aseguro la entrega temprana de soluciones simples.',
              },
            ],
            tituloPregunta: 'Responsabilidades del líder:',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta: '¿Quisieras agregar una responsabilidad adicional?',
          },
        ],
      },
      {
        istext: false,
        titulo: 'Promuevo la colaboración',
        descripcion: null,
        color: '#C5C5C5',
        preguntas: [
          {
            opciones: [
              {
                option:
                  'Trabajo en sincronía con otros equipos y personas para lograr objetivos comunes, aprovechando al máximo las herramientas de trabajo colaborativo disponibles.',
              },
              {
                option:
                  'Comparto información, conocimiento y experiencia, animando las conversaciones francas, la indagación inteligente y la confrontación sana y valiente.',
              },
              {
                option:
                  'Construyo equipos diversos, y aliento la cooperación espontánea para alcanzar los objetivos de la organización.',
              },
              {
                option:
                  'Gestiono mis emociones y las de mi equipo para construir relaciones de confianza.',
              },
            ],
            tituloPregunta: 'Responsabilidades del líder:',
          },
        ],
        preguntasRadio: [
          {
            tituloPregunta: '¿Quisieras agregar una responsabilidad adicional?',
          },
        ],
      },
    ],
  };
  const [errors, setErrors] = useState({});
  const firstEmptyRef = useRef({});
  const [inputValuesByAttribute, setInputValuesByAttribute] = useState({});
  const [radioValuesByAttribute, setRadioValuesByAttribute] = useState({});
  const [textValuesByAttribute, setTextValuesByAttribute] = useState({});
  const [currentAttributeIndex, setCurrentAttributeIndex] = useState(0);

  const handleNext = () => {
    if (validateFields()) {
      const nextIndex = currentAttributeIndex + 1;
      if (nextIndex < dataDump.atributos.length) {
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
      }
    }
  };

  const handlePrevious = () => {
    if (currentAttributeIndex > 0) {
      setCurrentAttributeIndex(currentAttributeIndex - 1);
      setErrors({});
    }
  };

  // Función para validar los campos
  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    const currentQuestions =
      dataDump.atributos[currentAttributeIndex]?.preguntas;
    const currentRadioQuestions =
      dataDump.atributos[currentAttributeIndex]?.preguntasRadio;

    // Validación para los Select y sus TextField asociados
    if (currentQuestions && Array.isArray(currentQuestions)) {
      currentQuestions.forEach((pregunta, indexPregunta) => {
        pregunta.opciones.forEach((opcion, indexOpcion) => {
          const actionIndexKey = `${indexPregunta}-${indexOpcion}`;
          const detailIndexKey = `detail-${indexPregunta}-${indexOpcion}`;
          const actionValue =
            inputValuesByAttribute[currentAttributeIndex]?.[actionIndexKey] ||
            '';
          const detailValue =
            inputValuesByAttribute[currentAttributeIndex]?.[detailIndexKey] ||
            '';

          if (!actionValue) {
            newErrors[actionIndexKey] = true;
            isValid = false;
            if (
              firstEmptyRef.current &&
              firstEmptyRef.current[actionIndexKey]
            ) {
              firstEmptyRef.current[actionIndexKey].focus();
            }
          }

          if (actionValue === 'Modificar' && !detailValue.trim()) {
            newErrors[detailIndexKey] = true;
            isValid = false;
            if (
              firstEmptyRef.current &&
              firstEmptyRef.current[detailIndexKey]
            ) {
              firstEmptyRef.current[detailIndexKey].focus();
            }
          }
        });
      });
    }

    // Validación para los botones de radio y sus TextField asociados
    if (currentRadioQuestions && Array.isArray(currentRadioQuestions)) {
      currentRadioQuestions.forEach((preguntaRadio, indexPreguntaRadio) => {
        // Asegúrate de acceder al estado anidado para el atributo y la pregunta actual
        const radioValue =
          radioValuesByAttribute[currentAttributeIndex]?.[indexPreguntaRadio];
        const textValue =
          textValuesByAttribute[currentAttributeIndex]?.[indexPreguntaRadio] ||
          '';

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
            ].focus();
          }
        }

        if (radioValue === 'Si' && !textValue.trim()) {
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
            ].focus();
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
        />
      );
    } else {
      return (
        <QuestionsBancolombia
          color={atributo.color}
          title={atributo.titulo}
          dataDump={atributo}
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
        />
      );
    }
  };
  return (
    <div className={styles.Bancolombia}>
      <div className={styles.Bancolombia__Content}>
        {renderAttribute(dataDump.atributos[currentAttributeIndex])}

        {currentAttributeIndex > 0 && (
          <button onClick={handlePrevious}>Anterior</button>
        )}
        {currentAttributeIndex < dataDump.atributos.length - 1 && (
          <button onClick={handleNext}>Siguiente</button>
        )}

        {currentAttributeIndex === dataDump.atributos.length && (
          <button onClick={handleNext}>Enviar</button>
        )}
      </div>
    </div>
  );
}
