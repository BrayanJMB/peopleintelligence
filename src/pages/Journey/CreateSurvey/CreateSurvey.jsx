import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { Divider } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import * as uuid from "uuid";

import DemographicDataForm from "../../../components/DemographicDataForm/DemographicDataForm";
import EditForm from "../../../components/EditForm/EditForm";
import Form from "../../../components/Form/Form";
import MyPageHeader from "../../../components/MyPageHeader/MyPageHeader";
import { fetchSurveyByIdAndCompanyId } from "../../../features/surveys/surveysSlice";
import IconSidebar from "../../../Layout/IconSidebar/IconSidebar";
import Navbar from "../../../Layout/Navbar/Navbar";
import {
  fetchCategoriesAPI,
  fetchCategoriesByCompanyAPI,
} from "../../../services/getCategories.service";
import { fetchQuestionTypesAPI } from "../../../services/questionTypes.service";
import {
  deleteTemplateQuestionAPI,
  showTemplateAPI,
  updateTemplateAPI,
  updateTemplateOptionAPI,
  updateTemplateQuestionAPI,
} from "../../../services/templates.service";
import client from "../../../utils/axiosInstance";

import Cuestionario from "./Cuestionario/Cuestionario";
import { Exclusiveness } from "./Exclusividad/Exclusiveness.jsx";
import { WhatsAppForSurvey } from "./HasWhatsApp/WhatsAppForSurvey.jsx";
import Intimidad from "./Intimidad/Intimidad.jsx";
import Introduction from "./Introduction/Introduction";
import { MessagesSurvey } from "./MessagesSurvey/MessagesSurvey.jsx";
import { MultiAnswerSurvey } from "./MultiAnswerSurvey/MultiAnswerSurvey.jsx";
import { NumerationSurvey } from "./NumerationSurvey.jsx";
import { View360 } from "./360Vista/View360.jsx";
import styles from "./CreateSurvey.module.css";

export default function CreateSurvey() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [questionChildNumer, setQuestionChilNumber] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [target, setTarget] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(null);
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [type, setType] = useState(null);
  const [starmsg, setStarmsg] = useState("");
  const [information, setInformation] = useState({
    name: "",
    description: "",
    options: [],
    customOptions: Array(2).fill(""),
    opcionesInputs: Array(2).fill(""),
    stars: Array(3).fill(""),
    rangeOptions: ["Rango 0-6", "Rango 7-8", "Rango 9-10"],
    barBipolarValue: 0,
    textsBipolarBar: {
      leftText: "",
      rightText: "",
      valueRight: "2",
      valueLeft: "0",
    },
    maximunValueOptions: null,
    secondSelectOptions: Array.from({ length: 9 }, (_, i) =>
      (2 + i).toString()
    ),
  });
  const [firstSelect, setFirstSelect] = useState(0);
  const [secondSelect, setSecondSelect] = useState(2);
  const [limitType, setLimitType] = useState("ilimitado");

  const [selections, setSelections] = useState({});
  const dispatch = useDispatch();

  const [childQuestionNumber, setChildQuestionNumber] = useState([]);
  const [conditionalQuestion, setConditionalQuestion] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryError, setCategoryError] = useState("");
  const [customOptionError, setCustomOptionError] = useState([]);
  const [optionRelationalError, setOptionRelationalError] = useState([]);
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [question, setQuestion] = useState();
  const [anonymous, setAnonymous] = useState(true);
  const [view360, setView360] = useState([]);
  const [isView360, setIsView360] = useState(false);
  const [excelFile360, setExcelFile360] = useState(null);
  const [exclusiviness, setExclusiviness] = useState(true);
  const [hasWhatsApp, setHasWhatsApp] = useState(true);
  const [dayConcurrency, setDayConcurrency] = useState(1);
  const [isAMultiAnswerSurvey, setIsAMultiAnswerSurvey] = useState(false);
  const [checkForm, setCheckForm] = useState(false);
  const [newDemographics, setNewDemographics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [templateDemographics, setTemplateDemographics] = useState([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [surveyMessages, setSurveyMessages] = useState({
    welcomeMessage: "Ingrese su correo electrónico o cédula para continuar",
    inputMessage: "Correo electrónico o cédula",
    confidentialityMessage:
      "Tus respuestas serán completamente confidenciales y no podrán ser vinculadas a tu identidad.",
  });
  const [hasNumerationNumber, setHasNumerationNumber] = useState(true);
  const [errorDayConcurrency, setErrorDayConcurrency] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isMap = searchParams.get("isMap") === "true";
  const isEdit = searchParams.get("isEdit") === "true";
  const isTemplate =
    searchParams.get("isTemplate") === "true" ||
    location.pathname.indexOf("journey/update-template") !== -1;
  const isUpdate = location.pathname.indexOf("journey/update-template") !== -1;
  const templateId =
    searchParams.get("templateId") || location.pathname.split("/")[3];
  const steps = [
    "Introducción",
    //'WhatsApp',
    "Vista 360",
    "Cuestionario",
    "Configuración",
    ...(!isTemplate ? ["Privacidad"] : []),
    "Concurrencia",
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

  //ENPS PROMOTE SQAURES
  const handleFirstSelectChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setFirstSelect(value);

    // Cambiar automáticamente el segundo select dependiendo del primer select
    if (value === 0) {
      setSecondSelect(2);
    } else if (value === 1) {
      setSecondSelect(3);
    }
  };

  const handleSecondSelectChange = (event) => {
    setSecondSelect(event.target.value);
  };

  // Crear el rango dinámico basado en el primer select
  const startValue = firstSelect === 0 ? 2 : 3;
  const secondSelectOptions = Array.from(
    { length: 10 - startValue + 1 },
    (_, i) => startValue + i
  );

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
    if (errorDayConcurrency || dayConcurrency === "") return;
    const newSurvey = {
      survey: {
        nameSurvey: data.title,
        descriptionSurvey: data.description,
        messageMail: data.mailingMessage,
        emailSubject: data.emailSubject,
        emailMask: data.emailMask,
        isPersonal: !anonymous,
        exclusive: exclusiviness,
        mapId: data.map.id,
        companyId: currentCompany.id,
        wellcomeMessage: surveyMessages.welcomeMessage,
        inputMessage: surveyMessages.inputMessage,
        confindencialityMessage: surveyMessages.confidentialityMessage,
        duplicateResponses: isAMultiAnswerSurvey,
        daysConcurrency: dayConcurrency,
        hasWhatsApp: hasWhatsApp,
        hasNumerationNumber: hasNumerationNumber,
      },
      questions: questions.map((question) => ({
        question: {
          nameQuestion: question.name,
          description: question.description,
          typeQuestionId: question.typeId,
          score:
            question.typeId === 5 // Estrellas
              ? question.stars?.length || 3
              : question.typeId === 3 // Opción múltiple con límite
              ? Number(question.stars)
              : question.typeId === 19 // Bipolar, tomar el primer valor del array
              ? Number(
                  Array.isArray(question.stars)
                    ? question.stars[0]
                    : question.stars
                )
              : null,
          conditional: question.conditionalQuestion,
          textsBipolarBar: question.textsBipolarBar,
        },
        options: question.customOptions?.map((option, index) => {
          return {
            optionsName: option,
            numberOption: index + 1,
            questionChildren: question.childQuestionIds?.[index] || "", // Corrección aquí usando encadenamiento opcional
          };
        }),
        selectOptions: question.selectOptions?.map((option, index) => {
          return {
            nameSelectOption: option,
          };
        }),
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
    enqueueSnackbar("Cuestionario creado con éxito", {
      variant: "success",
    });
  };
  /**
   * Edit survey.
   */
  const editSurvey = async () => {
    setLoading(true);
    const newSurvey = {
      survey: {
        id: surveyId,
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
          description: question.description,
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

    const { data: createdJourney } = await client.put("/editSurvey", newSurvey);
    setLoading(false);
    navigate(`/journey/survey/${createdJourney.id}/detail`);
    enqueueSnackbar("Cuestionario editado con éxito", {
      variant: "success",
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
      isObligatory: !(data.surveyOrMap === "survey"),
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
      data.surveyOrMap === "survey" ? "Plantilla" : "Ruta de mapa";
    await client.post(
      `Administrator/createTemplate/${currentCompany.id}`,
      newTemplate
    );

    setLoading(false);
    navigate(`/journeysettings?tab=${data.surveyOrMap}`);
    enqueueSnackbar(`${resourceName} creada con éxito`, {
      variant: "success",
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

  const validateLengthQuestion = (questions) => {
    if (questions.length === 0) {
      enqueueSnackbar("La encuesta debe tener al menos una pregunta.", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return true;
    }
  };

  const validateCategoryForQuestions = (questions) => {
    const invalidQuestions = questions
      .map((question, index) => ({
        ...question,
        originalIndex: index + 1, // Guardar índice original (1 basado)
      }))
      .filter(
        (question) =>
          (question.categoryId === null || question.categoryId === undefined) &&
          question.typeId !== 21 // Ignorar tipo informativo
      );
    if (invalidQuestions.length > 0) {
      invalidQuestions.forEach((question, index) => {
        enqueueSnackbar(
          `La pregunta # ${question.originalIndex} no tiene categoría, por favor asignar una categoría`,
          {
            variant: "error",
            autoHideDuration: 3000,
          }
        );
      });
      return true;
    }
  };

  const validateExcelFile360 = () => {
    if (!excelFile360 && isView360) {
      enqueueSnackbar("Debe ingresar el archivo 360.", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return true;
    }
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
        if (validateExcelFile360()) {
          return;
        }
        setActiveStep((val) => val + 1);
        break;
      case 2:
        if (isUpdate && isTemplate) {
          await updateTemplate();
          navigate("/journey/survey-template");
          enqueueSnackbar("Plantilla actualizada con éxito", {
            variant: "success",
            autoHideDuration: 3000,
          });

          return;
        }
        if (isTemplate) {
          createTemplate();
          return;
        }
        if (
          validateLengthQuestion(questions) ||
          validateCategoryForQuestions(questions)
        ) {
          return;
        }
        setActiveStep((val) => val + 1);
        break;
      /*
      case 2:
        if(validateLengthQuestion(questions) || validateCategoryForQuestions(questions)){
          return;
        }
        setActiveStep((val) => val + 1);
        break;*/
      case 3:
        setActiveStep((val) => val + 1);
        break;
      case 4:
        setActiveStep((val) => val + 1);
        break;
      case 5:
        if (isEdit) {
          editSurvey();
        } else {
          createSurvey();
        }
        break;
      default:
        setActiveStep(0);
    }
  };

  const handleCerrar = () => {
    if (activeStep === 0) {
      navigate("/journey");
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
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");

      setInformation((prev) => {
        const updatedInfo = {
          ...prev,
          [parentKey]: {
            ...prev[parentKey],
            [childKey]: value,
          },
        };

        // Si estamos cambiando el valueLeft (el izquierdo)
        if (name === "textsBipolarBar.valueLeft") {
          const start = value == "0" ? 2 : 3;
          updatedInfo.secondSelectOptions = Array.from(
            { length: 10 - start + 1 },
            (_, i) => (start + i).toString() // <- aquí fuerza a string
          );
          // También reseteamos valueRight para que empiece correctamente
          updatedInfo.textsBipolarBar.valueRight = start.toString();
        }

        return updatedInfo;
      });
    } else {
      setInformation((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    const { name, value } = event.target;
    // Soporte para campos anidados tipo "obj.prop"
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setQuestion((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      }));
      return;
    }

    // Campo simple
    setQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleinformationoptions = (key) => (event) => {
    let holder = information.customOptions.map((val, index) => {
      if (index === key) {
        return event.target.value;
      } else return val;
    });
    setInformation({ ...information, customOptions: holder });
  };

  const handleInformationRelationalOptions = (key) => (event) => {
    let holder = information.opcionesInputs.map((val, index) => {
      if (index === key) {
        return event.target.value;
      } else return val;
    });
    setInformation({ ...information, opcionesInputs: holder });
  };

  const handleInformationRelationalOptionsEdit = (key) => (event) => {
    let holder = question.selectOptions.map((val, index) => {
      if (index === key) {
        return event.target.value;
      } else return val;
    });
    setQuestion({ ...question, selectOptions: holder });
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
      setStarmsg("Elija un valor entre 3 y 10");
    } else {
      setStarmsg("");
      let holder = [...information.stars];
      holder.push("");
      setInformation({ ...information, stars: holder });
    }
  };
  const handleeditstars = () => {
    let holder = [...question.stars];
    if (holder.length === 10) {
      setStarmsg("Elija un valor entre 3 y 10");
    } else {
      setStarmsg("");
      holder.push("");
      setQuestion({ ...question, stars: holder });
    }
  };
  const handledeletestars = () => {
    if (information.stars.length === 3) {
      setStarmsg("Elija un valor entre 3 y 10");
    } else {
      setStarmsg("");
      let holder = [...information.stars];
      holder.splice(1, 1);
      setInformation({ ...information, stars: holder });
    }
  };
  const handleeditdeletestars = () => {
    let holder = [...question.stars];
    if (holder.length === 3) {
      setStarmsg("Elija un valor entre 3 y 10");
    } else {
      setStarmsg("");
      holder.splice(1, 1);
      setQuestion({ ...question, stars: holder });
    }
  };

  const handleaddoption = (type) => {
    if (type === 15) {
      let holder = [...information.customOptions];
      holder.push("");
      let holder2 = [...information.opcionesInputs];
      holder2.push("");
      setInformation({
        ...information,
        customOptions: holder,
        opcionesInputs: holder2,
      });
    } else {
      let holder = [...information.customOptions];
      holder.push("");
      setInformation({ ...information, customOptions: holder });
    }
  };

  const handleRemoveOption = (index) => {
    let holder = [...information.customOptions];
    holder.splice(index, 1);
    setInformation({ ...information, customOptions: holder });
  };

  const handleRemoveEditOption = (index) => {
    let holder = [...question.customOptions];
    holder.splice(index, 1);
    setQuestion({ ...question, customOptions: holder });
  };
  const handleeditaddoption = () => {
    let holder = [...question.customOptions];
    holder.push("");
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

  const handleChangeDayConcurrency = (event) => {
    const inputValue = event.target.value;
    // Permitir solo números
    if (/^[1-9]\d*$/.test(inputValue) || inputValue === "") {
      setDayConcurrency(inputValue);
      setErrorDayConcurrency(false);
    } else {
      setErrorDayConcurrency(true);
    }
  };

  const handleIsView360 = (event) => {
    setIsView360(event.target.value === "true");
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
          <View360
            isView360={isView360}
            handleIsView360={handleIsView360}
            excelFile360={excelFile360}
            setExcelFile360={setExcelFile360}
            setView360={setView360}
          />
        );
      /*
      case 1:
        return (
          <Box width="100%">
            <WhatsAppForSurvey
              hasWhatsApp={hasWhatsApp}
              handleHasWhatsApp={handleHasWhatsApp}
            />
          </Box>
        );*/
      case 2:
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
              setQuestions={setQuestions}
              onEnd={onEnd}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              setConditionalQuestion={setConditionalQuestion}
            />
          </Box>
        );
      case 3:
        return (
          <Box width="100%">
            <MessagesSurvey
              surveyMessages={surveyMessages}
              setSurveyMessages={setSurveyMessages}
            />
            <NumerationSurvey
              hasNumerationNumber={hasNumerationNumber}
              setHasNumerationNumber={setHasNumerationNumber}
            />
          </Box>
        );
      case 4:
        return (
          <div style={{ display: "flex", width: "100%" }}>
            <Intimidad anonyme={anonymous} handleAnonyme={handleanonyme} />
            <Exclusiveness
              exclusiviness={exclusiviness}
              handleExclusiviness={handleExclusiviness}
            />
          </div>
        );

      case 5:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <MultiAnswerSurvey
              isAMultiAnswerSurvey={isAMultiAnswerSurvey}
              handleMultiAnswerSurvey={handleMultiAnswerSurvey}
            />

            {isAMultiAnswerSurvey && (
              <>
                <p>
                  Ingrese cada cuántos días se va repetir la encuesta para los
                  usuarios:
                </p>

                <TextField
                  label="Días"
                  value={dayConcurrency}
                  onChange={handleChangeDayConcurrency}
                  type="text"
                  inputProps={{ inputMode: "numeric", pattern: "^[1-9]\\d*$" }} // Solo permite números positivos (sin 0 como valor único)
                  error={errorDayConcurrency} // Activa el estilo de error en el campo
                  helperText={
                    errorDayConcurrency
                      ? "El valor no puede ser 0 ni estar vacío"
                      : ""
                  } // Mensaje de error condicional
                />
              </>
            )}
          </div>
        );

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
    setAnonymous(event.target.value === "true");
  };
  const handleExclusiviness = (event) => {
    setExclusiviness(event.target.value === "true");
  };
  const handleHasWhatsApp = (event) => {
    setHasWhatsApp(event.target.value === "true");
  };

  const handleMultiAnswerSurvey = (event) => {
    setIsAMultiAnswerSurvey(event.target.value === "true");
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

    const updatedQuestions = reorderedItems.map((item, index) => ({
      ...item,
      questionNumber: index + 1, // Actualizar el número de la pregunta
    }));

    setQuestions(updatedQuestions);
  };

  const handleAutocomplete = (val) => {
    setType(val);

    if (!val) {
      // Si el valor es null, probablemente quieras limpiar también las opciones
      setInformation((prevInfo) => ({
        ...prevInfo,
        options: [],
      }));
      return;
    }

    const updatedOptions = getOptions(val.id);

    setInformation((prevInfo) => ({
      ...prevInfo,
      options: updatedOptions,
    }));
  };

  function getOptions(lang) {
    if (lang === 16) {
      // Verifica el valor del idioma
      return [
        "Strongly Agree",
        "Agree",
        "Neither Agree nor Disagree",
        "Disagree",
        "Strongly Disagree",
      ];
    } else {
      return [
        "Totalmente de Acuerdo",
        "De Acuerdo",
        "Ni de Acuerdo Ni en Desacuerdo",
        "En Desacuerdo",
        "Totalmente en Desacuerdo",
      ];
    }
  }
  const handleAgregar = () => {
    setCategoryError("");
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
          name: "Se requiere un mínimo de 5 caracteres.",
        });

        return;
      } else if (information.name.length > 400) {
        setErrorMessage({
          ...errorMessage,
          name: true,
        });
        setHelperText({
          ...helperText,
          name: "El número máximo de carácteres de 400.",
        });
        return;
      }

      if (information.description.length > 400) {
        setErrorMessage({
          ...errorMessage,
          name: true,
        });
        setHelperText({
          ...helperText,
          name: "El número máximo de carácteres de 400.",
        });
      }

      if (
        question.customOptions !== null &&
        (question.typeId === 3 ||
          question.typeId === 8 ||
          question.typeId === 24) &&
        question.customOptions.some((option) => option === "")
      ) {
        setCustomOptionError(
          question.customOptions.map((option) => option === "")
        );
        return;
      }

      if (question.typeId === 8 && question.conditionalQuestion) {
        // Asumiendo que tipo 8 es el que usa Autocomplete
        const autoCompleteErrors = question.customOptions.map(
          (option, index) => {
            const selection = selections[`${question.id}-${index}`];
            return !selection; // Retorna true si la selección es nula o indefinida
          }
        );

        // Verifica si algún Autocomplete está vacío
        if (autoCompleteErrors.some((error) => error)) {
          setErrorMessage({
            ...errorMessage,
            autocomplete: true,
          });
          setHelperText({
            ...helperText,
            autocomplete: "Debe seleccionar una pregunta para cada opción.",
          });
          return; // Detiene la ejecución si hay errores
        }
      }

      if (question.typeId === 19) {
        const value = Number(question.stars);
        if (isNaN(value)) {
          setErrorMessage((prev) => ({
            ...prev,
            bipolar: true,
          }));
          setHelperText((prev) => ({
            ...prev,
            bipolar: "Debe ingresar un número.",
          }));
          return;
        }

        if (!Number.isInteger(value)) {
          setErrorMessage((prev) => ({
            ...prev,
            bipolar: true,
          }));
          setHelperText((prev) => ({
            ...prev,
            bipolar: "Solo se permiten números enteros.",
          }));
          return;
        }

        // Validación: valor vacío o menor o igual a 0
        if (information.stars === "" || value <= 0) {
          setErrorMessage((prev) => ({
            ...prev,
            bipolar: true,
          }));
          setHelperText((prev) => ({
            ...prev,
            bipolar: "El valor debe ser mayor a 0.",
          }));
          return;
        }

        // Validación: valor mayor a 10
        if (value > 10) {
          setErrorMessage((prev) => ({
            ...prev,
            bipolar: true,
          }));
          setHelperText((prev) => ({
            ...prev,
            bipolar: "El valor no puede ser mayor a 10.",
          }));
          return;
        }
      }
      if (question.typeId === 22) {
        // Validación: extremos vacíos
        if (
          question.textsBipolarBar.leftText.trim() === "" ||
          question.textsBipolarBar.rightText.trim() === ""
        ) {
          setErrorMessage((prev) => ({
            ...prev,
            bipolarText: true,
          }));
          setHelperText((prev) => ({
            ...prev,
            bipolarText:
              "Debe completar los textos de los extremos de la escala bipolar.",
          }));
          return;
        }
      }

      if (limitType === "fijo" && question.typeId === 3) {
        if (question.stars.trim() === "") {
          setErrorMessage({
            ...errorMessage,
            maximunValueOptions: true,
          });
          setHelperText({
            ...helperText,
            maximunValueOptions: "Este valor no puede ir vacío",
          });
          return;
        }

        if (isNaN(question.stars)) {
          setErrorMessage((prev) => ({
            ...prev,
            maximunValueOptions: true,
          }));
          setHelperText((prev) => ({
            ...prev,
            maximunValueOptions: "Debe ingresar un número.",
          }));
          return;
        }

        if (!Number.isInteger(Number(question.stars))) {
          setErrorMessage((prev) => ({
            ...prev,
            maximunValueOptions: true,
          }));
          setHelperText((prev) => ({
            ...prev,
            maximunValueOptions: "Solo se permiten números enteros.",
          }));
          return;
        }

        if (Number(question.stars) <= 0) {
          setErrorMessage((prev) => ({
            ...prev,
            maximunValueOptions: true,
          }));
          setHelperText((prev) => ({
            ...prev,
            maximunValueOptions: "Debe ser un número mayor a 0.",
          }));
          return;
        }

        if (Number(question.stars) >= question.customOptions.length) {
          setErrorMessage({
            ...errorMessage,
            maximunValueOptions: true,
          });
          setHelperText({
            ...helperText,
            maximunValueOptions:
              "No puede colocar un valor mayor ni igual al número de opciones que tiene la pregunta.",
          });
          return;
        }
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
        name: "Se requiere un mínimo de 5 carácteres.",
      });

      return;
    } else if (information.name.length > 400) {
      setErrorMessage({
        ...errorMessage,
        name: true,
      });
      setHelperText({
        ...helperText,
        name: "El número máximo de carácteres de 400.",
      });
      return;
    }

    if (information.description.length > 400) {
      setErrorMessage({
        ...errorMessage,
        name: true,
      });
      setHelperText({
        ...helperText,
        name: "El número máximo de carácteres de 400.",
      });
    }
    if (limitType === "fijo" && type.id === 3) {
      if (information.maximunValueOptions.trim() === "") {
        setErrorMessage({
          ...errorMessage,
          maximunValueOptions: true,
        });
        setHelperText({
          ...helperText,
          maximunValueOptions: "Este valor no puede ir vacío",
        });
        return;
      }

      if (isNaN(information.maximunValueOptions)) {
        setErrorMessage((prev) => ({
          ...prev,
          maximunValueOptions: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          maximunValueOptions: "Debe ingresar un número.",
        }));
        return;
      }

      if (!Number.isInteger(Number(information.maximunValueOptions))) {
        setErrorMessage((prev) => ({
          ...prev,
          maximunValueOptions: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          maximunValueOptions: "Solo se permiten números enteros.",
        }));
        return;
      }

      if (Number(information.maximunValueOptions) <= 0) {
        setErrorMessage((prev) => ({
          ...prev,
          maximunValueOptions: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          maximunValueOptions: "Debe ser un número mayor a 0.",
        }));
        return;
      }

      if (
        Number(information.maximunValueOptions) >=
        information.customOptions.length
      ) {
        setErrorMessage({
          ...errorMessage,
          maximunValueOptions: true,
        });
        setHelperText({
          ...helperText,
          maximunValueOptions:
            "No puede colocar un valor mayor ni igual al número de opciones que tiene la pregunta.",
        });
        return;
      }
    }

    if (
      !information.customOptions.every((elemento) => elemento !== "") &&
      (type.id === 3 || type.id === 8 || type.id === 15 || type.id === 24)
    ) {
      let checkCustomOptions = information.customOptions.map(
        (elemento) => elemento === ""
      );
      setCustomOptionError(checkCustomOptions);
      return;
    }

    if (
      !information.opcionesInputs.every((elemento) => elemento !== "") &&
      type.id === 15
    ) {
      let relationalOptions = information.opcionesInputs.map(
        (elemento) => elemento === ""
      );
      setOptionRelationalError(relationalOptions);
      return;
    }
    // ✅ Validación escala bipolar
    if (type.id === 19) {
      const value = Number(information.barBipolarValue);
      if (isNaN(value)) {
        setErrorMessage((prev) => ({
          ...prev,
          bipolar: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          bipolar: "Debe ingresar un número.",
        }));
        return;
      }

      if (!Number.isInteger(value)) {
        setErrorMessage((prev) => ({
          ...prev,
          bipolar: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          bipolar: "Solo se permiten números enteros.",
        }));
        return;
      }

      // Validación: valor vacío o menor o igual a 0
      if (information.barBipolarValue === "" || value <= 0) {
        setErrorMessage((prev) => ({
          ...prev,
          bipolar: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          bipolar: "El valor debe ser mayor a 0.",
        }));
        return;
      }

      // Validación: valor mayor a 10
      if (value > 10) {
        setErrorMessage((prev) => ({
          ...prev,
          bipolar: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          bipolar: "El valor no puede ser mayor a 10.",
        }));
        return;
      }

      // Validación: extremos vacíos
      if (
        information.textsBipolarBar.leftText.trim() === "" ||
        information.textsBipolarBar.rightText.trim() === ""
      ) {
        setErrorMessage((prev) => ({
          ...prev,
          bipolarText: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          bipolarText:
            "Debe completar los textos de los extremos de la escala bipolar.",
        }));
        return;
      }
    }

    if (type.id === 22) {
      // Validación: extremos vacíos
      if (
        information.textsBipolarBar.leftText.trim() === "" ||
        information.textsBipolarBar.rightText.trim() === ""
      ) {
        setErrorMessage((prev) => ({
          ...prev,
          bipolarText: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          bipolarText:
            "Debe completar los textos de los extremos de la escala bipolar.",
        }));
        return;
      }
    }
    if (type.id != 21) {
      if (categoryId === "" || categoryId === null) {
        setCategoryError("Seleccione una categoría");

        return;
      }
    }

    setErrorMessage({});
    setHelperText({});
    setCustomOptionError([]);
    setOptionRelationalError([]);

    // validate questions
    if (type.id === 1 || type.id === 21 || type.id === 23) {
      handleAddQuestion({
        type: "Texto corto",
        name: information.name,
        description: information.description,
      });
    } else if (type.id === 2 || type.id === 16) {
      handleAddQuestion({
        type: "Escala Likert",
        name: information.name,
        description: information.description,
        options: information.options,
      });
    } else if (type.id === 3) {
      handleAddQuestion({
        type: "Opción múltiple",
        name: information.name,
        description: information.description,
        customOptions: information.customOptions,
        stars: parseInt(information.maximunValueOptions),
      });
    } else if (type.id === 8) {
      handleAddQuestion({
        type: "Opción única",
        name: information.name,
        description: information.description,
        customOptions: information.customOptions,
        conditionalQuestion: conditionalQuestion,
        childQuestionIds: [],
      });
    } else if (type.id === 5) {
      handleAddQuestion({
        type: "Calificaciones",
        name: information.name,
        description: information.description,
        stars: information.stars,
      });
    } else if (type.id === 10) {
      handleAddQuestion({
        type: "E-NPS",
        name: information.name,
        description: information.description,
      });
    } else if (type.id === 14) {
      handleAddQuestion({
        type: "Sentimental",
        name: information.name,
        description: information.description,
        options: information.options,
      });
    } else if (type.id === 15) {
      handleAddQuestion({
        type: "Relacional",
        name: information.name,
        description: information.description,
        customOptions: information.customOptions,
        selectOptions: information.opcionesInputs,
      });
    } else if (type.id === 19) {
      handleAddQuestion({
        type: "Evaluación",
        name: information.name,
        description: information.description,
        stars: information.barBipolarValue,
        textsBipolarBar: information.textsBipolarBar,
      });
    } else if (type.id === 22) {
      handleAddQuestion({
        type: "Escala de Opinión",
        name: information.name,
        description: information.description,
        textsBipolarBar: information.textsBipolarBar,
        secondSelectOptions: Array.from({ length: 9 }, (_, i) =>
          (2 + i).toString()
        ),
      });
    } else if (type.id === 24) {
      handleAddQuestion({
        type: "Suma Constante",
        name: information.name,
        description: information.description,
        customOptions: information.customOptions,
      });
    }

    setInformation({
      name: "",
      description: "",
      options: [],
      customOptions: Array(2).fill(""),
      opcionesInputs: Array(2).fill(""),
      stars: Array(3).fill(""),
      rangeOptions: ["Rango 0-6", "Rango 7-8", "Rango 9-10"],
      barBipolarValue: 0,
      textsBipolarBar: {
        leftText: "",
        rightText: "",
        valueRight: "2",
        valueLeft: "0",
      },
      maximunValueOptions: "",
      secondSelectOptions: Array.from({ length: 9 }, (_, i) =>
        (2 + i).toString()
      ),
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
      questionNumber: questions.length + 1,
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
    enqueueSnackbar("Pregunta eliminada", { variant: "success" });
  };

  /**
   * Return header title.
   *
   * @returns {string}
   */
  const getHeaderTitle = () => {
    if (isTemplate && isMap && !isEdit) {
      return "Crear encuesta de mapa";
    } else if (isTemplate && isMap && isEdit) {
      return "Editar encuesta de mapa";
    } else if (isTemplate) {
      return "Crear plantilla";
    }
    if (isEdit) {
      return "Editar encuesta";
    } else {
      return "Crear encuesta";
    }
  };

  /**
   * Fetch categories.
   *
   * @returns {Promise<void>}
   */
  const fetchCategories = async () => {
    if (!currentCompany) return;
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
    if (!currentCompany) {
      return;
    }
    const { data: survey } = await client.get(
      `ShowQuestion/${surveyId}/${currentCompany.id}`
    );
    let dataCopy = {
      ...data,
    };

    // fill journey map
    if (survey.response) {
      dataCopy = {
        ...dataCopy,
        map: survey.response.map,
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
        typeId: question.typeQuestionId,
        categoryId: question.categoryId,
        type: question.typeQuestion,
        name: question.questionName,
        description: question.description,
        customOptions: question.options.map((option) => option.optionName),
        //options: question.options.map((option) => option.templateOptionsName),
        options: question.options.map((option) => option.optionName),
        questionOptions: question.options,
        stars: question.score,
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
    console.log(template);
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
        selectOptions: question.selectOptions?.map(
          (option) => option.selectOption
        ),
        questionNumber: question.question.numberQuestion,
        childQuestionIds: [],
        ...(question.question.textsBipolarBar && {
          textsBipolarBar: {
            leftText: question.question.textsBipolarBar.leftText,
            rightText: question.question.textsBipolarBar.rightText,
            valueRight: question.question.textsBipolarBar.valueRight,
            valueLeft: question.question.textsBipolarBar.valueLeft,
          },
        }),
        limitType:
          Array.isArray(question.question.score) &&
          question.question.score.length > 0
            ? "fijo"
            : "ilimitado",
        secondSelectOptions: Array.from({ length: 9 }, (_, i) =>
          (2 + i).toString()
        ),
      })
    );
    setQuestions(questionsCopy);
    setTemplateDemographics(
      template.templateDemographics.map((demographic) => demographic.name)
    );
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === "Journey") < 0 &&
      userInfo?.role.findIndex((p) => p === "Administrador") < 0
    ) {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
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
    <Box sx={{ display: "flex" }}>
      <Dialog maxWidth="lg" open={open} onClose={handleCloseModal}>
        <DialogTitle>Agregar pregunta</DialogTitle>
        <DialogContent>
          <Box className={styles.modal}>
            <div className={styles.modalbuttom}>
              <div className={styles.form}>
                <div className={styles.input}>
                  <Autocomplete
                    id="combo-box-demo"
                    style={{ flexBasis: "40%" }}
                    options={questionTypes}
                    value={type}
                    onChange={(e, value) => {
                      handleAutocomplete(value);
                    }}
                    getOptionLabel={(option) => option.typeQuestionName}
                    noOptionsText={"No se encontraron tipos de pregunta"}
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
                  setInformation={setInformation}
                  handleInformation={handleInformation}
                  errorMessage={errorMessage}
                  helperText={helperText}
                  handleinformationoptions={handleinformationoptions}
                  handleInformationRelationalOptions={
                    handleInformationRelationalOptions
                  }
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
                  optionRelationalError={optionRelationalError}
                  questionTypes={questionTypes}
                  handleAutocomplete={handleAutocomplete}
                  limitType={limitType}
                  setLimitType={setLimitType}
                  firstSelect={firstSelect}
                  setFirstSelect={setFirstSelect}
                  secondSelect={secondSelect}
                  setSecondSelect={setSecondSelect}
                  handleFirstSelectChange={handleFirstSelectChange}
                  handleSecondSelectChange={handleSecondSelectChange}
                  startValue={startValue}
                  secondSelectOptions={secondSelectOptions}
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
                    setQuestion={setQuestion}
                    questions={questions}
                    handleInformation={handleQuestion}
                    errorMessage={errorMessage}
                    helperText={helperText}
                    handleInformationOptions={handleeditoption}
                    handleAddOption={handleeditaddoption}
                    handleRemoveOption={handleRemoveEditOption}
                    handleAddStars={handleeditstars}
                    handleDeleteStars={handleeditdeletestars}
                    starMessage={starmsg}
                    questionNumber={Number(target + 1)}
                    handleCategoryIdChange={handleCategoryIdChange}
                    categories={categories}
                    categoryError={categoryError}
                    handleChangeOptions={handleChangeOptions}
                    customOptionError={customOptionError}
                    conditionalQuestion={conditionalQuestion}
                    selections={selections}
                    setSelections={setSelections}
                    setChildQuestionNumber={setChildQuestionNumber}
                    handleInformationRelationalOptions={
                      handleInformationRelationalOptionsEdit
                    }
                    optionRelationalError={optionRelationalError}
                    limitType={limitType}
                    setLimitType={setLimitType}
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
      <div style={{ backgroundColor: "white" }}>
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
                style={{ position: "sticky", bottom: 0 }}
              >
                <div className={styles.impexp}>
                  <Button variant="text" onClick={handleCerrar}>
                    {activeStep === 0 ? "Cerrar" : "atrás"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNextStep}
                    disabled={
                      ((activeStep !== 0 && questions.length === 0) ||
                        loading === true) &&
                      errorDayConcurrency
                    }
                  >
                    {activeStep === 4 || (activeStep === 1 && isTemplate)
                      ? "Finalizar"
                      : "Continuar"}
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
