import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
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
import * as uuid from 'uuid';

import DemographicDataForm from '../../../components/DemographicDataForm/DemographicDataForm';
import EditForm from '../../../components/EditForm/EditForm';
import Form from '../../../components/Form/Form';
import MyPageHeader from '../../../components/MyPageHeader/MyPageHeader';
import { fetchSurveyByIdAndCompanyId } from '../../../features/surveys/surveysSlice';
import IconSidebar from '../../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../../Layout/Navbar/Navbar';
import {
  fetchCategoriesAPI,
  fetchCategoriesByCompanyAPI,
} from '../../../services/getCategories.service';
import { fetchQuestionTypesAPI } from '../../../services/questionTypes.service';
import {
  deleteTemplateQuestionAPI,
  showTemplateAPI,
  updateTemplateAPI,
  updateTemplateOptionAPI,
  updateTemplateQuestionAPI,
} from '../../../services/templates.service';
import client from '../../../utils/axiosInstance';

import Cuestionario from './Cuestionario/Cuestionario';
import Intimidad from './Intimidad/Intimidad.jsx';
import Introduction from './Introduction/Introduction';

import styles from './CreateSurvey.module.css';

export default function CreateSurvey() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [target, setTarget] = useState('');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(null);
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [type, setType] = useState(null);
  const [starmsg, setStarmsg] = useState('');
  const [information, setInformation] = useState({
    name: '',
    description: '',
    options: [
      'Totalmente en Desacuerdo',
      'En Desacuerdo',
      'Ni de Acuerdo  Ni en Desacuerdo',
      'De Acuerdo',
      'Totalmente de Acuerdo',
    ],
    customOptions: Array(2).fill(''),
    stars: Array(3).fill(''),
    rangeOptions:[
      'Rango 0-6',
      'Rango 7-8',
      'Rango 9-10',
    ],
  });
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryError, setCategoryError] = useState('');
  const [customOptionError, setCustomOptionError] = useState([]);
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [question, setQuestion] = useState();
  const [anonymous, setAnonymous] = useState(true);
  const [checkForm, setCheckForm] = useState(false);
  const [newDemographics, setNewDemographics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [templateDemographics, setTemplateDemographics] = useState([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isMap = searchParams.get('isMap') === 'true';
  const isTemplate =
    searchParams.get('isTemplate') === 'true' ||
    location.pathname.indexOf('journey/update-template') !== -1;
  const isUpdate = location.pathname.indexOf('journey/update-template') !== -1;
  const templateId =
    searchParams.get('templateId') || location.pathname.split('/')[3];
  const steps = [
    'Introducción',
    'Cuestionario',
    ...(!isTemplate ? ['Privacidad'] : []),
  ];
  const { surveyId } = useParams();
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
    if (!data.demographics) return [];
      data.demographics.forEach((demographic) => {
        const index = newDemographics.findIndex(
          (item) => item.name === demographic
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
        messageMail: data.mailingMessage,
        emailSubject: data.emailSubject,
        emailMask: data.emailMask,
        isPersonal: !anonymous,
        mapId: data.map.id,
        companyId: currentCompany.id,
      },
      questions: questions.map((question) => ({
        question: {
          nameQuestion: question.name,
          description:question.description,
          typeQuestionId: question.typeId,
          score: question.stars?.length,
        },
        options: question.customOptions?.map((option, index) => ({
          optionsName: option,
          numberOption: index + 1,
        })),
        categoryId: question.categoryId,
      })),
      demographics: getDemographics(),
    };

    const { data: createdJourney } = await client.post(
      `/createJourney/${currentCompany.id}`,
      newSurvey
    );

    setLoading(false);
    navigate(`/journey/survey/${createdJourney.id}/detail?sendMail=true`);
    enqueueSnackbar('Cuestionario creado con éxito', {
      variant: 'success',
    });
  };

  /**
   * Create survey template.
   */
  const createTemplate = async () => {
    setLoading(true);
    // Create survey, encuesta de mapa
    const newTemplate = {
      mapId: data.map.id,
      nameSurvey: data.title,
      descriptionSurvey: data.description,
      messageMail: data.mailingMessage,
      emailSubject: data.emailSubject,
      emailMask: data.emailMask,
      isObligatory: !(data.surveyOrMap === 'survey'),
      questionSection: questions.map((question, index) => ({
        templateCategoryId: question.categoryId,
        templateQuestion: {
          nameQuestion: question.name,
          numberQuestion: index + 1,
          score: question.stars?.length,
          typeQuestionId: question.typeId,
          description: question.description,
        },
        templateOption: question.customOptions?.map((option, index) => ({
          templateOptionsName: option,
          numberOption: index + 1,
        })),
      })),
      demographics: getDemographics().map((demographic) => ({
        name: demographic.value || demographic.name,
        options: demographic.options.map((option) => ({
          value: option.value,
          text: option.text,
        })),
      })),
    };
    const resourceName =
      data.surveyOrMap === 'survey' ? 'Plantilla' : 'Ruta de mapa';
    await client.post(
      `Administrator/createTemplate/${currentCompany.id}`,
      newTemplate
    );

    setLoading(false);
    navigate(`/journeysettings?tab=${data.surveyOrMap}`);
    enqueueSnackbar(`${resourceName} creada con éxito`, {
      variant: 'success',
    });
  };

  /**
   * Update template.
   */
  const updateTemplate = async () => {
    setLoading(true);

    const body = {
      id: templateId,
      nameSurvey: data.title,
      descriptionSurvey: data.description,
      messagemail: data.mailingMessage,
      isObligatory: false,
      journeyMapId: data.map.id,
    };

    try {
      await updateTemplateAPI(templateId, body);
    } catch (e) {}

    setLoading(false);
  };

  /**
   * Handle next step.
   */
  const handleNextStep = async () => {
    switch (activeStep) {
      case 0:
        setCheckForm(true);
        if (data.isValid && isTemplate && isUpdate) {
          //await updateTemplate();
          setActiveStep((val) => val + 1);
          setCheckForm(false);
          return;
        }

        if (data.isValid) {
          setActiveStep((val) => val + 1);
          setCheckForm(false);
        }
        break;
      case 1:
        if (isUpdate && isTemplate) {
          await updateTemplate();
          navigate('/journey/survey-template');
          enqueueSnackbar('Plantilla actualizada con éxito', {
            variant: 'success',
            autoHideDuration:3000,
          });

          return;
        }

        if (isTemplate) {
          createTemplate();

          return;
        }

        setActiveStep((val) => val + 1);
        break;
      case 2:
        createSurvey();
        break;
      default:
        setActiveStep(0);
    }
  };

  const handleCerrar = () => {
    if (activeStep === 0) {
      navigate('/journey');
    } else {
      setMapsLoaded(true);
      setActiveStep((val) => val - 1);
    }
  };
  
  /**
   * Handle change for current question.
   *
   * @param {object} event
   */
  const handleInformation = (event) => {
    //handleAgregar();
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

  /**
   * Handle change for options.
   *
   * @param {ChangeEvent<HTMLInputElement>} event
   * @param {number} index The index of the option.
   * @param {boolean} isEdit If is edit.
   */
  const handleChangeOptions = (event, index, isEdit = false) => {
    if (isEdit) {
      setQuestion({
        ...question,
        options: question.options.map((option, i) => {
          if (i === index) {
            return event.target.value;
          }

          return option;
        }),
        customOptions: question.options.map((option, i) => {
          if (i === index) {
            return event.target.value;
          }

          return option;
        }),
      });

      return;
    }

    setInformation({
      ...information,
      options: information.options.map((option, i) => {
        if (i === index) {
          return event.target.value;
        }

        return option;
      }),
      customOptions: information.options.map((option, i) => {
        if (i === index) {
          return event.target.value;
        }

        return option;
      }),
    });
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

  const handleRemoveOption = (index) => {
    let holder = [...information.customOptions];
    holder.splice(index, 1);
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

  const handleActualizar = async () => {
    let holder = questions.map((val, index) => {
      if (index === target) {
        return {
          ...question,
          categoryId: question.categoryId || categoryId,
        };
      } else {
        return val;
      }
    });

    if (isTemplate && isUpdate) {
      updateTemplateQuestion();
    }

    setQuestions(holder);
  };

  /**
   * Update template question.
   */
  const updateTemplateQuestion = async (newQuestion) => {
    const questionCopy = newQuestion || question;
    const questionId = Number(questionCopy.questionId) || 0;
    const questionBody = {
      id: questionId,
      templateId: Number(templateId),
      nameQuestion: questionCopy.name,
      numberQuestion: Number(target + 1),
      score: Number(questionCopy.stars) || null,
      typeQuestionId: questionCopy.typeId,
      description: questionCopy.description,
      categoryId: questionCopy.categoryId,
    };
    const { data: updatedQuestion } = await updateTemplateQuestionAPI(
      questionId,
      questionBody
    );
    const questionOptions = [];

    if (questionCopy.customOptions || questionCopy.options) {
      const options = questionCopy.customOptions || questionCopy.options;

      options.forEach(async (option, index) => {
        const optionId = Number(questionCopy.questionOptions[index]?.id) || 0;

        const optionBody = {
          id: optionId,
          templateOptionsName: option,
          numberOption: index + 1,
          questionId: updatedQuestion.id,
        };
        const { data: updatedOption } = await updateTemplateOptionAPI(
          optionId,
          optionBody
        );

        questionOptions.push(updatedOption);
      });
    }

    return {
      questionId: updatedQuestion.id,
      questionOptions: questionOptions,
    };
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
            isUpdate={isUpdate}
            mapsLoaded={mapsLoaded}
            setMapsLoaded={setMapsLoaded}
          />
        );
      case 1:
        return (
          <Box width="100%">
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
              handleDelete={handleDelete}
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
    setAnonymous(event.target.value === 'true');
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
    setErrorMessage({});
    setHelperText({});

    if (edit) {
      if (question.name.length < 5) {
        setErrorMessage({
          ...errorMessage,
          name: true,
        });
        setHelperText({
          ...helperText,
          name: 'Se requiere un mínimo de 5 caracteres.',
        });

        return;
      }else if((information.name.length > 150)){
        setErrorMessage({
          ...errorMessage,
          name: true,
        });
        setHelperText({
          ...helperText,
          name: 'El número máximo de carácteres de 150.',
        });
        return;
      }
  
      if((information.description.length > 400)){
        setErrorMessage({
          ...errorMessage,
          name: true,
        });
        setHelperText({
          ...helperText,
          name: 'El número máximo de carácteres de 400.',
        });
  
      }

      if (
        question.customOptions !== null &&
        question.typeId === 3 &&
        question.customOptions.some((option) => option === '')
      ) {
        setCustomOptionError(
          question.customOptions.map((option) => option === '')
        );
        return;
      }
      setErrorMessage({});
      setHelperText({});
      setCustomOptionError([]);

      handleActualizar();
      handleCloseModal();
      return;
    }

    if (information.name.length < 5) {
      setErrorMessage({
        ...errorMessage,
        name: true,
      });
      setHelperText({
        ...helperText,
        name: 'Se requiere un mínimo de 5 carácteres.',
      });

      return;
    }else if((information.name.length > 150)){
      setErrorMessage({
        ...errorMessage,
        name: true,
      });
      setHelperText({
        ...helperText,
        name: 'El número máximo de carácteres de 150.',
      });
      return;
    }

    if((information.description.length > 400)){
      setErrorMessage({
        ...errorMessage,
        name: true,
      });
      setHelperText({
        ...helperText,
        name: 'El número máximo de carácteres de 400.',
      });

    }
    if (
      !information.customOptions.every((elemento) => elemento !== '') &&
      type.id === 3
    ) {
      let checkCustomOptions = information.customOptions.map(
        (elemento) => elemento === ''
      );
      setCustomOptionError(checkCustomOptions);
      return;
    }

    // validate category id
    if (categoryId === '' || categoryId === null) {
      setCategoryError('Seleccione una categoría');

      return;
    }

    setErrorMessage({});
    setHelperText({});
    setCustomOptionError([]);

    // validate questions
    if (type.id === 1) {
      handleAddQuestion({
        type: 'Texto corto',
        name: information.name,
        description: information.description,
      });
    } else if (type.id === 2) {
      handleAddQuestion({
        type: 'Escala Likert',
        name: information.name,
        description: information.description,
        options: information.options,
      });
    } else if (type.id === 3) {
      handleAddQuestion({
        type: 'Opción múltiple',
        name: information.name,
        description: information.description,
        customOptions: information.customOptions,
      });
    } else if (type.id === 8) {
      handleAddQuestion({
        type: 'Opción única',
        name: information.name,
        description: information.description,
        customOptions: information.customOptions,
      });
    } else if (type.id === 5) {
      handleAddQuestion({
        type: 'Calificaciones',
        name: information.name,
        description: information.description,
        stars: information.stars,
      });
      
    }else if (type.id === 10) {
      handleAddQuestion({
        type: 'E-NPS',
        name: information.name,
        description: information.description,
      });
      
    }

    setInformation({
      name: '',
      description: '',
      options: [
        'Totalmente en Desacuerdo',
        'En Desacuerdo',
        'Ni de Acuerdo  Ni en Desacuerdo',
        'De Acuerdo',
        'Totalmente de Acuerdo',
      ],
      customOptions: Array(2).fill(''),
      stars: Array(3).fill(''),
    });
    setQuestion(null);
    setType(null);
    setCategoryId(null);
    handleCloseModal();
  };

  /**
   * Add new question.
   *
   * @param {object} question
   */
  const handleAddQuestion = async (question) => {
    const newQuestion = {
      id: uuid.v4(),
      categoryId,
      typeId: type.id,
      questionId: null,
      questionOptions: [],
      ...question,
    };

    if (isTemplate && isUpdate) {
      const { questionId, questionOptions } = await updateTemplateQuestion(
        newQuestion
      );

      newQuestion.questionId = questionId;
      newQuestion.questionOptions = questionOptions;
    }

    if (!newQuestion.customOptions || newQuestion.customOptions.length === 0) {
      newQuestion.customOptions = newQuestion.options;
    }

    setQuestions((previousQuestions) => [...previousQuestions, newQuestion]);
  };

  /**
   * Handle delete question.
   *
   * @param {number} id The id of the question to be deleted.
   */
  const handleDelete = async (id) => {
    const question = questions.find((question) => question.id === id);
    setQuestions((previousQuestions) =>
      previousQuestions.filter((question) => question.id !== id)
    );

    await deleteTemplateQuestionAPI(question.id);
    enqueueSnackbar('Pregunta eliminada', { variant: 'success' });
  };

  /**
   * Return header title.
   *
   * @returns {string}
   */
  const getHeaderTitle = () => {
    if (isTemplate && isMap) {
      return 'Crear encuesta de mapa';
    }else if (isTemplate) {
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
    if(!currentCompany)
      return;
    const { data } = await fetchCategoriesByCompanyAPI(currentCompany.id);

    setCategories(data);
  };

  /**
   * Fetch question types.
   *
   * @returns {Promise<void>}
   */
  const fetchQuestionTypes = async () => {
    const { data } = await fetchQuestionTypesAPI();

    setQuestionTypes(data);
  };


    /**
   * Fetch survey and fill form data.
   *
   * @param {number} templateId
   */
    const fetchSurvey = async (templateId) => {
      if(!currentCompany){
        return;
      }
      const {data:survey} = await client.get(`ShowQuestion/${surveyId}/${currentCompany.id}`);

      let dataCopy = {
        ...data,
      };

      // fill journey map
      if (survey.response) {
        dataCopy = {
          ...dataCopy,
          map: survey.response,
        };
      }
      // fill name
      if (survey.response?.surveyName) {
        dataCopy = {
          ...dataCopy,
          title: survey.response.surveyName,
        };
      }
      // fill description
      if (survey.response?.description) {
        dataCopy = {
          ...dataCopy,
          description: survey.response.description,
        };
      }
      if (survey.response?.emailMAsk) {
        dataCopy = {
          ...dataCopy,
          emailMask: survey.response.emailMAsk,
        };
      }
      if (survey.response?.emailSubject) {
        dataCopy = {
          ...dataCopy,
          emailSubject: survey.response.emailSubject,
        };
      }
      if (survey.response?.emailMessage) {
        dataCopy = {
          ...dataCopy,
          mailingMessage: survey.response.emailMessage,
        };
      }
      setData(dataCopy);

      let questionsCopy = [...questions];

      // fill questions
      
      survey.response.preguntas.map((question) =>
        questionsCopy.push({
          id: uuid.v4(),
          questionId: question.questionId,
          typeId: question.question.typeQuestionId,
          categoryId: question.categoryId,
          type: question.typeQuestionId,
          name: question.questionName,
          description: question.question.description,
          customOptions: question.options.map(
            (option) => option.templateOptionsName
          ),
          options: question.options.map((option) => option.templateOptionsName),
          questionOptions: question.options,
          stars: question.question.score,
        })
      );
      setQuestions(questionsCopy);
      /*
      setTemplateDemographics(
        template.templateDemographics.map((demographic) => demographic.name)
      );*/

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
    if (template.template?.messageMail) {
      dataCopy = {
        ...dataCopy,
        mailingMessage: template.template.messageMail,
      };
    }
    setData(dataCopy);

    let questionsCopy = [...questions];

    // fill questions
    template.templatesQuestions.map((question) =>
      questionsCopy.push({
        id: uuid.v4(),
        questionId: question.question.id,
        typeId: question.question.typeQuestionId,
        categoryId: question.categoryId,
        type: question.typeQuestionId,
        name: question.question.nameQuestion,
        description: question.question.description,
        customOptions: question.options.map(
          (option) => option.templateOptionsName
        ),
        options: question.options.map((option) => option.templateOptionsName),
        questionOptions: question.options,
        stars: question.question.score,
      })
    );
    setQuestions(questionsCopy);
    setTemplateDemographics(
      template.templateDemographics.map((demographic) => demographic.name)
    );
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

  useEffect(() => {
    if (!surveyId) {
      return;
    }
    fetchSurvey(templateId);
  }, [surveyId, currentCompany]); // eslint-disable-line react-hooks/exhaustive-deps

  // component did mount
  useEffect(() => {
    fetchCategories();
    fetchQuestionTypes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchCategories();
  }, [currentCompany]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ display: 'flex' }}>
      <Dialog maxWidth="lg" open={open} onClose={handleCloseModal}>
        <DialogTitle>Agregar pregunta</DialogTitle>
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
                    getOptionLabel={(option) => option.typeQuestionName}
                    noOptionsText={'No se encontraron tipos de pregunta'}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errorMessage.IdTipoDocumento}
                        helperText={helperText.IdTipoDocumento}
                        label="Seleccionar tipo de pregunta"
                      />
                    )}
                    size="small"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                </div>
                <Form
                  type={type}
                  information={information}
                  handleInformation={handleInformation}
                  errorMessage={errorMessage}
                  helperText={helperText}
                  handleinformationoptions={handleinformationoptions}
                  handleChangeOptions={handleChangeOptions}
                  handleaddoption={handleaddoption}
                  handleRemoveOption={handleRemoveOption}
                  handleaddstars={handleaddstars}
                  handledeletestars={handledeletestars}
                  starmsg={starmsg}
                  handleCategoryIdChange={handleCategoryIdChange}
                  categories={categories}
                  categoryError={categoryError}
                  questions={questions.length + 1}
                  customOptionError={customOptionError}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} variant="outlined">
              Cancelar
            </Button>
            <Button onClick={handleAgregar} variant="contained">
              Agregar
            </Button>
          </DialogActions>
      </Dialog>
      <Dialog maxWidth="lg" onClose={handleCloseEditModal} open={edit}>
        <DialogTitle>Editar pregunta</DialogTitle>
        <DialogContent>
          <Box className={styles.modal}>
            <div className={styles.modalbuttom}>
              <div className={styles.form}>
                {question && (
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
                    handleChangeOptions={handleChangeOptions}
                    customOptionError={customOptionError}
                  />
                )}
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleAgregar} variant="contained">
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
                <Stepper activeStep={activeStep} className={styles.stepper}>
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
                    disabled={
                      (activeStep !== 0 && questions.length === 0) ||
                      loading === true
                    }
                  >
                    {activeStep === 2 || (activeStep === 1 && isTemplate)
                      ? 'Finalizar'
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
