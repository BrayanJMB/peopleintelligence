import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import * as uuid from 'uuid';

import DemographicDataForm from '../../../components/DemographicDataForm/DemographicDataForm';
import EditForm from '../../../components/EditForm/EditForm';
import Form from '../../../components/Form/Form';
import MyPageHeader from '../../../components/MyPageHeader/MyPageHeader';
import IconSidebar from '../../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../../Layout/Navbar/Navbar';
import { fetchCategoriesAPI } from '../../../services/getCategories.service';
import { showTemplateAPI } from '../../../services/templates.service';
import client from '../../../utils/axiosInstance';

import Cuestionario from './Cuestionario/Cuestionario';
import Intimidad from './Intimidad/Intimidad.jsx';
import Introduction from './Introduction/Introduction';

import styles from './CreateSurvey.module.css';


const steps = [
  'Introducción',
  'Cuestionario',
  'Privacidad',
];
const questionTypes = [
  'Texto corto',
  'Escala Likert',
  'Opción múltiple',
  'Opción única',
  'Calificaciones',
];

export default function CreateSurvey() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [target, setTarget] = useState('');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(null);
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [type, setType] = useState('');
  const [starmsg, setStarmsg] = useState('');
  const [information, setInformation] = useState({
    name: '',
    description: '',
    options: [
      'Muy en desacuerdo',
      'Discrepar',
      'Neutral',
      'Estar de acuerdo',
      'Totalmente de acuerdo',
    ],
    customOptions: Array(2).fill(''),
    stars: Array(3).fill(''),
  });
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryError, setCategoryError] = useState('');
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [question, setQuestion] = useState();
  const [anonymous, setAnonymous] = useState(true);
  const [checkForm, setCheckForm] = useState(false);
  const [newDemographics, setNewDemographics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [templateDemographics, setTemplateDemographics] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const isTemplate = searchParams.get('isTemplate') === 'true';
  const templateId = searchParams.get('templateId');
  
  /**
   * Handle introduction change.
   *
   * @param updatedData
   */
  const handleIntroductionChange = (updatedData) => {
    setData(updatedData);
  };

  /**
   * Get demographics for create survey or template.
   * 
   * @returns 
   */
  const getDemographics = () => {
    const demographics = [];

    data.demographics.forEach((demographic) => {
      const index = newDemographics.findIndex(
        (item) => item.name === demographic,
      );

      if (index !== -1) {
        demographics.push({
          name: newDemographics[index].name,
          options: newDemographics[index].options.map((option) => ({
            value: option,
            text: option,
          })),
        });
      } else {
        demographics.push({
          name: demographic,
          options: [],
        });
      }
    });

    return demographics;
  };

  /**
   * Create survey.
   */
  const createSurvey = async () => {
    setLoading(true);

    const newSurvey = {
      survey: {
        nameSurvey: data.title,
        descriptionSurvey: data.description,
        ispersonal: !anonymous,
        jorneyMapId: data.map.id,
        companyId: currentCompany.id,
      },
      questions: questions.map((question) => ({
        question: {
          categoryId: question.categoryId,
          nameQuestion: question.name,
          typeQuestionId: question.type,
          questionId: 0,
          score: question.stars?.length,
        },
        options: question.customOptions?.map((option, index) => ({
          optionsName: option,
          numberOption: index + 1,
        })),
      })),
      demographics: getDemographics(),
    };

    try {
      await client.post(`/createJourney/${currentCompany.id}`, newSurvey);
    } catch (e) {}

    setLoading(false);
    navigate('/journey/survey-template');
    enqueueSnackbar('Cuestionario creado con éxito', {
      variant: 'success',
    });
  };

  /**
   * Create survey template.
   */
  const createTemplate = async () => {
    setLoading(true);

    // Create survey
    const newTemplate = {
      templateSurvey: {
        nameSurvey: data.title,
        descriptionSurvey: data.description,
        messagemail: data.mailingMessage,
        isObligatory: data.surveyOrMap === 'survey',
        demograficos: getDemographics(),
      },
      seccionQuestion: questions.map((question) => ({
        templateCategoryId: question.categoryId,
        templateQuestion: {
          nameQuestion: question.name,
          typeQuestionId: question.type,
          questionId: 0,
          score: question.stars?.length,
        },
        templateOption: question.customOptions?.map((option, index) => ({
          templateOptionsName: option,
          numberOption: index + 1,
        })),
      })),
    };

    try {
      await client.post('Administrator/createTemplate', newTemplate);
    } catch (e) {}

    setLoading(false);
    navigate('/journey/survey-template');
    enqueueSnackbar('Plantilla creada con éxito', {
      variant: 'success',
    });
  };

  /**
   * Handle next step.
   */
  const handleNextStep = () => {
    switch (activeStep) {
      case 0:
        setCheckForm(true);
        if (data.isValid) {
          setActiveStep((val) => val + 1);
          setCheckForm(false);
        }
        break;
      case 1:
        setActiveStep((val) => val + 1);
        break;
      case 2:
        isTemplate ? createTemplate() : createSurvey();
        break;
      default:
        setActiveStep(0);
    }
  };

  const handleCerrar = () => {
    if (activeStep === 0) {
      navigate('/journey');
    } else {
      setActiveStep((val) => val - 1);
    }
  };

  /**
   * Handle change for current question.
   * 
   * @param {object} event 
   */
  const handleInformation = (event) => {
    setInformation({
      ...information,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Handle change for category id.
   * 
   * @param {number} categoryId The category id.
   */
  const handleCategoryIdChange = (categoryId) => {
    setCategoryId(categoryId);
  };

  const handleQuestion = (event) => {
    setQuestion({ ...question, [event.target.name]: event.target.value });
  };
  const handleinformationoptions = (key) => (event) => {
    let holder = information.customOptions.map((val, index) => {
      if (index === key) {
        return event.target.value;
      } else return val;
    });
    setInformation({ ...information, customOptions: holder });
  };
  const handleeditoption = (key) => (event) => {
    let holder;
    holder = question.customOptions.map((val, i) => {
      if (i === key) {
        return event.target.value;
      } else {
        return val;
      }
    });
    setQuestion({ ...question, customOptions: holder });
  };
  const handleaddstars = () => {
    if (information.stars.length === 10) {
      setStarmsg('Elija un valor entre 3 y 10');
    } else {
      setStarmsg('');
      let holder = [...information.stars];
      holder.push('');
      setInformation({ ...information, stars: holder });
    }
  };
  const handleeditstars = () => {
    let holder = [...question.stars];
    if (holder.length === 10) {
      setStarmsg('Elija un valor entre 3 y 10');
    } else {
      setStarmsg('');
      holder.push('');
      setQuestion({ ...question, stars: holder });
    }
  };
  const handledeletestars = () => {
    if (information.stars.length === 3) {
      setStarmsg('Elija un valor entre 3 y 10');
    } else {
      setStarmsg('');
      let holder = [...information.stars];
      holder.splice(1, 1);
      setInformation({ ...information, stars: holder });
    }
  };
  const handleeditdeletestars = () => {
    let holder = [...question.stars];
    if (holder.length === 3) {
      setStarmsg('Elija un valor entre 3 y 10');
    } else {
      setStarmsg('');
      holder.splice(1, 1);
      setQuestion({ ...question, stars: holder });
    }
  };
  const handleaddoption = () => {
    let holder = [...information.customOptions];
    holder.push('');
    setInformation({ ...information, customOptions: holder });
  };
  const handleeditaddoption = () => {
    let holder = [...question.customOptions];
    holder.push('');
    setQuestion({ ...question, customOptions: holder });
  };
  const handleAdd = () => {
    setOpen(true);
  };

  /**
   * Handle edit question.
   * 
   * @param index
   */
  const handleEdit = (index) => {
    setTarget(index);
    setQuestion(questions[index]);
    setEdit(true);
  };

  const handleActualizar = () => {
    let holder = questions.map((val, index) => {
      if (index === target) {
        return {
          ...question,
          categoryId,
        };
      } else {
        return val;
      }
    });
    setQuestions(holder);
  };

  /**
   * Handle checked demographic.
   * 
   * @param {string[]} demographics Can be ID or unique name.
   */
  const handleCheckedDemographic = (demographics) => {
    setData({ ...data, demographics });
  };

  /**
   * Handle new demographic change.
   *
   * @param {Object[]} demographics 
   */
  const handleNewDemographicChange = (demographics) => {
    setNewDemographics(demographics);
  };

  const renderSwitch = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          <Introduction
            onUpdated={handleIntroductionChange}
            checkForm={checkForm}
            previousData={data}
          />
        );
      case 1:
        return (
          <Box
            width="100%"
          >
            <DemographicDataForm
              onChange={handleCheckedDemographic}
              onChangeNewDemographics={handleNewDemographicChange}
              templateDemographicData={templateDemographics}
            />
            <Divider />
            <Cuestionario
              questions={questions}
              onEnd={onEnd}
              handleAdd={handleAdd}
              handleDelete={handledelete}
              handleEdit={handleEdit}
            />
          </Box>
        );
      case 2:
        return <Intimidad anonyme={anonymous} handleAnonyme={handleanonyme} />;
      default:
        return null;
    }
  };
  const handleCloseModal = () => {
    setOpen(false);
    setEdit(false);
  };
  const handleCloseEditModal = () => setEdit(false);
  const handleanonyme = (event) => {
    setAnonymous(event.target.value);
  };

  const reorder = (list, start, end) => {
    const result = Array.from(list);
    const [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);
    return result;
  };
  const onEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      questions,
      result.source.index,
      result.destination.index
    );
    setQuestions(reorderedItems);
  };
  const handleAutocomplete = (val) => {
    setType(val);
  };


  const handleAgregar = () => {
    setCategoryError('');

    if (edit) {
      handleActualizar();
      handleCloseModal();

      return;
    }

    // validate question name
    if (information.name.length < 5) {
      setErrorMessage({
        ...errorMessage,
        name: true,
      });
      setHelperText({
        ...helperText,
        name: 'Se requiere un mínimo de 5 caracteres.',
      });
      
      return;
    }
    
    // validate category id
    if (categoryId === '' || categoryId === null) {
      setCategoryError('Seleccione una categoría');

      return;
    } 

    setErrorMessage({});
    setHelperText({});

    // validate questions
    if (type === 'Texto corto') {
      handleAddQuestion({
        type: 'Texto corto',
        name: information.name,
        description: information.description,
      });
    } else if (type === 'Escala Likert') {
      handleAddQuestion({
        type: 'Escala Likert',
        name: information.name,
        description: information.description,
        options: information.options,
      });
    } else if (type === 'Opción múltiple') {
      handleAddQuestion({
        type: 'Opción múltiple',
        name: information.name,
        description: information.description,
        customOptions: information.customOptions,
      });
    } else if (type === 'Opción única') {
      handleAddQuestion({
        type: 'Opción única',
        name: information.name,
        description: information.description,
        customOptions: information.customOptions,
      });
    } else if (type === 'Calificaciones') {
      handleAddQuestion({
        type: 'Calificaciones',
        name: information.name,
        description: information.description,
        stars: information.stars,
      });
    }

    setInformation({
      name: '',
      description: '',
      options: [
        'Muy en desacuerdo',
        'Discrepar',
        'Neutral',
        'Estar de acuerdo',
        'Totalmente de acuerdo',
      ],
      customOptions: Array(2).fill(''),
      stars: Array(3).fill(''),
    });
    setQuestion('');
    setType('');
    setCategoryId(null);
    handleCloseModal();
  };

  /**
   * Add new question.
   * 
   * @param {object} question 
   */
  const handleAddQuestion = (question) => {
    setQuestions((previousQuestions) => [
      ...previousQuestions,
      {
        id: uuid.v4(),
        categoryId,
        ...question,
      },
    ]);
  };

  const handledelete = (key) => {
    let tmp = [...questions];
    tmp.splice(key, 1);
    setQuestions(tmp);
  };

  /**
   * Return header title.
   *
   * @returns {string}
   */
  const getHeaderTitle = () => {
    if (isTemplate) {
      return 'Crear plantilla';
    }

    return 'Crear encuesta';
  };

  /**
   * Fetch categories.
   * 
   * @returns {Promise<void>}
   */
  const fetchCategories = async () => {
    const { data } = await fetchCategoriesAPI();

    setCategories(data);
  };

  /**
   * Fetch template and fill form data.
   * 
   * @param {number} templateId 
   */
  const fetchTemplate = async (templateId) => {
    const { data: template } = await showTemplateAPI(templateId);

    if (!template) {
      return;
    }

    let dataCopy = {
      ...data,
    };
    
    // fill journey map
    if (template.template?.journeyMap) {
      dataCopy = {
        ...dataCopy,
        map: template.template.journeyMap,
      };
    }
    // fill name
    if (template.template?.nameSurvey) {
      dataCopy = {
        ...dataCopy,
        title: template.template.nameSurvey,
      };
    }
    // fill description
    if (template.template?.descriptionSurvey) {
      dataCopy = {
        ...dataCopy,
        description: template.template.descriptionSurvey,
      };
    }

    setData(dataCopy);

    let questionsCopy = [
      ...questions,
    ];

    // fill questions
    template.templatesQuestions.map((question) => questionsCopy.push({
      id: uuid.v4(),
      categoryId: question.categoryId,
      type: question.type, // falta
      name: question.question.nameQuestion,
      description: question.description, // falta
      customOptions: question.options.map((option) => option.templateOptionsName),
      stars: question.question.score,
    }));

    setQuestions(questionsCopy);
    setTemplateDemographics(template.templateDemographics.map((demographic) => demographic.name));
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === 'Journey') < 0 &&
      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
    ) {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
    setQuestions(questions);
  }, [questions]); // eslint-disable-line react-hooks/exhaustive-deps


  // watch for changes in template id
  useEffect(() => {
    if (!templateId) {
      return;
    }

    fetchTemplate(templateId);
  }, [templateId]); // eslint-disable-line react-hooks/exhaustive-deps

  // component did mount
  useEffect(() => {
    fetchCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ display: 'flex' }}>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleCloseModal}
      >
        <DialogTitle>
          Agregar pregunta
        </DialogTitle>
        <DialogContent>
          <Box className={styles.modal}>
            <div className={styles.modalbuttom}>
              <div className={styles.form}>
                <div className={styles.input}>
                  <Autocomplete
                    id="combo-box-demo"
                    style={{ flexBasis: '40%' }}
                    options={questionTypes}
                    value={type}
                    onChange={(e, value) => {
                      handleAutocomplete(value);
                    }}
                    getOptionLabel={(option) => option}
                    noOptionsText={'No se ha encontrado ningún IdTipoDocumento'}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errorMessage.IdTipoDocumento}
                        helperText={helperText.IdTipoDocumento}
                        label="Seleccionar tipo de pregunta"
                      />
                    )}
                    size="small"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                </div>
                <Form
                  type={type}
                  information={information}
                  handleInformation={handleInformation}
                  errorMessage={errorMessage}
                  helperText={helperText}
                  handleinformationoptions={handleinformationoptions}
                  handleaddoption={handleaddoption}
                  handleaddstars={handleaddstars}
                  handledeletestars={handledeletestars}
                  starmsg={starmsg}
                  handleCategoryIdChange={handleCategoryIdChange}
                  categories={categories}
                  categoryError={categoryError}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAgregar}
            variant="contained"
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        maxWidth="md"
        onClose={handleCloseEditModal}
        open={edit}
      >
        <DialogTitle>
          Editar pregunta
        </DialogTitle>
        <DialogContent>
          <Box className={styles.modal}>
            <div className={styles.modalbuttom}>
              <div className={styles.form}>
                <EditForm
                  question={question}
                  handleInformation={handleQuestion}
                  errorMessage={errorMessage}
                  helperText={helperText}
                  handleInformationOptions={handleeditoption}
                  handleAddOption={handleeditaddoption}
                  handleAddStars={handleeditstars}
                  handleDeleteStars={handleeditdeletestars}
                  starMessage={starmsg}
                  questionNumber={Number(target + 1)}
                  handleCategoryIdChange={handleCategoryIdChange}
                  categories={categories}
                  categoryError={categoryError}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEditModal}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAgregar}
            variant="contained"
          >
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
      <Navbar />
      <IconSidebar />
      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.content}>
          <div className={styles.survey_template}>
            <div className={styles.data}>
              <MyPageHeader
                title={getHeaderTitle()}
                Icon={<DesignServicesIcon />}
              />

              <div className={styles.display}>
                <Stepper
                  activeStep={activeStep}
                  className={styles.stepper}
                >
                  {steps.map((label, index) => {
                    return (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </div>
              <div className={styles.display}>{renderSwitch(activeStep)}</div>
              <div
                className={styles.display}
                style={{ position: 'sticky', bottom: 0 }}
              >
                <div className={styles.impexp}>
                  <Button variant="text" onClick={handleCerrar}>
                    {activeStep === 0 ? 'Cerrar' : 'atrás'}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNextStep}
                    disabled={(activeStep !== 0 && questions.length === 0) || loading === true}
                  >
                    {activeStep === 2
                      ? 'Seleccionar encuestados'
                      : 'Continuar'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
