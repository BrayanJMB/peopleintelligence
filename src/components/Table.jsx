import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { createForm, handleDelete } from '../utils/helpers';
import { removeItem } from '../features/adminSlice';
import { removeItemBi } from '../features/powerBiSlice';
import { deleteDashboardAPI } from '../services/deleteDashboard.service';
import { deleteReportAPI } from '../services/deleteReport.service';
import {
  deleteContractTypeAPI,
  fetchContractTypeByCompanyAPI,
  storeContractTypeAPI,
} from '../services/getContractType.service';
import {
  deleteDisabilitiesAPI,
  fetchDisabilitiesByCompanyAPI,
  storeDisabilitiesAPI,
} from '../services/getDisabilities.service';
import {
  fetchDocumentTypeAPI,
  storeDocumentTypeAPI,
} from '../services/getDocumentType.service';
import {
  deleteEducationLevelAPI,
  fetchEducationLevelByCompanyAPI,
  storeEducationLevelAPI,
} from '../services/getEducationLevel.service';
import {
  deleteEnglishLevelAPI,
  fetchEnglishLevelByCompanyAPI,
  storeEnglishLevelAPI,
} from '../services/getEnglishLevel.service';
import {
  deleteGenderAPI,
  fetchGenderByCompanyAPI,
  storeGenderAPI,
} from '../services/getGender.service';
import {
  deleteHiringTypeAPI,
  fetchHiringTypeByCompanyAPI,
  storeHiringTypeAPI,
} from '../services/getHiringType.service';
import {
  deleteMaritalStatusAPI,
  fetchMaritalStatusByCompanyAPI,
  storeMaritalStatusAPI,
} from '../services/getMaritalStatus.service';
import {
  deleteOrganizationalLevelAPI,
  fetchOrganizationalLevelByCompanyAPI,
  storeOrganizationalLevelAPI,
} from '../services/getOrganizationalLevel.service';
import {
  deleteProfessionAPI,
  fetchProfessionByCompanyAPI,
  storeProfessionAPI,
} from '../services/getProfession.service';

import {
  deleteSalaryTypeAPI,
  fetchSalaryTypeByCompanyAPI,
  storeSalaryTypeAPI,
} from '../services/getSalaryType.service';
import {
  deleteSexualPreferenceAPI,
  fetchSexualPreferenceByCompanyAPI,
  storeSexualPreferenceAPI,
} from '../services/getSexualPreference.service';

import {
  deleteWorkingDayAPI,
  fetchWorkingDayByCompanyAPI,
  storeWorkingDayAPI,
} from '../services/getWorkingDay.service';
import axios from '../utils/axiosInstance';

import MyCard from './MyCard/MyCard';
import MyCreateDialog from './MyCreateDialog/MyCreateDialog';
import MyEditDialog from './MyEditDialog/MyEditDialog';
import MyLoader from './MyLoader/MyLoader';
import MyPageHeader from './MyPageHeader/MyPageHeader';
import MyTable from './MyTable/MyTable';
import styles from '../components/Estilos Table/StyleaForOtherCamps.module.css';

function search(id, inputArray, field, proprety) {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === id) {
      return inputArray[i][field];
    };
  }
}

export default function Table(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [contractTypes, setContractType] = useState([]);
  const [DocumentsTypes, setDocumentos] = useState([]);
  const [EnglishLevels, setNivelIngles] = useState([]);
  const [EducationLevels, setEducationLevels] = useState([]);
  const [disabilities, setDiscapacidades] = useState([]);
  const [HiringTypes, setTipoContratacion] = useState([]);
  const [SalaryTypes, setSalario] = useState([]);
  const [Professions, setProfessions] = useState([]);
  const [Genders, setGenero] = useState([]);
  const [sexualPreferences, setPreferenciaSexual] = useState([]);
  const [OrganizationalLevels, setOrganizationalLevels] = useState([]);
  const [maritalStatuses, setEstadoCivil] = useState([]);
  const [workingDays, setWorkingDay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentCreate, setCurrentCreate] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [pageSize, setpageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  //Tipo de documento
  const documentTypeColumns = [
    {
      id: 'name',
      label: 'Tipo Documento',
      numeric: false,
    },
    /*
    {
      id: "options",
      label: "Opciones",
      numeric: false,
    },*/
  ];
  const handleCreateDocumentType = () => {
    setCurrentCreate({
      type: 'documentType',
      title: 'Crear tipo documento',
      fields: [
        {
          label: 'Tipo documento',
          name: 'tipoDocumento',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapDocumentType = (documentType) =>
    documentType.map((documentType) => [
      {
        column: 'name',
        value: documentType.tipoDocumento,
      },
      {
        column: 'options',
        value: '',
        payload: {
          //handleDelete: handleDeleteDocumentType,
          //handleEdit: handleEditDocumentType,
          id: documentType.id,
        },
      },
    ]);

  const 
  fetchDocumentType = async () => {
    setLoading(true);

    const { data } = await fetchDocumentTypeAPI();
    setDocumentos(data);
    setLoading(false);
  };
  //Nivel de ingles
  const EnglishLevelColumns = [
    {
      id: 'name',
      label: 'Nivel de inglés',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];
  const handleCreateEnglishLevel = () => {
    setCurrentCreate({
      type: 'englishLevel',
      title: 'Crear nivel de ingles',
      fields: [
        {
          label: 'Nivel de inglés',
          name: 'nivelIngles',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapEnglishLevel = (EnglishLevel) =>
    EnglishLevel.map((EnglishLevel) => [
      {
        column: 'name',
        value: EnglishLevel.nivelIngles, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteEnglishLevel,
          //handleEdit: handleEditEnglishLevel,
          id: EnglishLevel.id,
        },
      },
    ]);

  const handleDeleteEnglishLevel = async (id) => {
    handleDelete(id, currentCompany, EnglishLevels, fetchEnglishLevel, deleteEnglishLevelAPI, enqueueSnackbar, 'Nivel de inglés');
  };


  const fetchEnglishLevel = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchEnglishLevelByCompanyAPI(currentCompany.id);
    setNivelIngles(data);
  };

  //fin ingles

  //Nivel de educacion
  const EducationLevelColumns = [
    {
      id: 'name',
      label: 'Nivel de educación',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];

  const handleCreateEducationLevel = () => {
    setCurrentCreate({
      type: 'educationLevel',
      title: 'Crear nivel de educación',
      fields: [
        {
          label: 'Nivel de educación',
          name: 'nivelEducacion',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapEducationLevel = (EducationLevel) =>
    EducationLevel.map((EducationLevel) => [
      {
        column: 'name',
        value: EducationLevel.nivelEducacion, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteEducationLevel,
          //handleEdit: handleEditEducationLevel,
          id: EducationLevel.id,
        },
      },
    ]);

  const handleDeleteEducationLevel = async (id) => {
    handleDelete(id, currentCompany, EducationLevels, fetchEducationLevel, deleteEducationLevelAPI, enqueueSnackbar, 'Nivel de educación');
  };



  const fetchEducationLevel = async () => {
    if (!currentCompany) {
      return;
    }
    const { data } = await fetchEducationLevelByCompanyAPI(currentCompany.id);
    setEducationLevels(data);
    setLoading(false);
  };
  //fin de educacion

  //Disabilities
  const DisabilitiesColumns = [
    {
      id: 'name',
      label: 'Discapacidades',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];
  const handleCreateDisabilities = () => {
    setCurrentCreate({
      type: 'disabilities',
      title: 'Crear discapacidad',
      fields: [
        {
          label: 'Discapacidad',
          name: 'discapacIdades',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapDisabilities = (Disabilities) =>
    Disabilities.map((Disabilities) => [
      {
        column: 'name',
        value: Disabilities.discapacIdades, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteDisabilities,
          //handleEdit: handleEditDisabilities,
          id: Disabilities.id,
        },
      },
    ]);
  const handleDeleteDisabilities = async (id) => {
    handleDelete(id, currentCompany, disabilities, fetchDisabilities, deleteDisabilitiesAPI, enqueueSnackbar, 'Discapacidad');
  };


  const fetchDisabilities = async () => {
    if (!currentCompany) {
      return;
    }
    const { data } = await fetchDisabilitiesByCompanyAPI(currentCompany.id);
    setDiscapacidades(data);
    setLoading(false);
  };
  //fin discapacidades

  //Tipo de cotratacion
  const HiringTypeColumns = [
    {
      id: 'name',
      label: 'Tipo de contratación',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];
  const handleCreateHiringType = () => {
    setCurrentCreate({
      type: 'HiringType',
      title: 'Crear tipo de contratación',
      fields: [
        {
          label: 'Tipo de contratación',
          name: 'tipoContrato',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapHiringType = (HiringType) =>
    HiringType.map((HiringType) => [
      {
        column: 'name',
        value: HiringType.tipoContrato, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteHiringType,
          //handleEdit: handleEditHiringType,
          id: HiringType.id,
        },
      },
    ]);
  const handleDeleteHiringType = async (id) => {
    handleDelete(id, currentCompany, HiringTypes, fetchHiringType, deleteHiringTypeAPI, enqueueSnackbar, 'Tipo de contratación');
  };

  const fetchHiringType = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchHiringTypeByCompanyAPI(currentCompany.id);
    setTipoContratacion(data);
    setLoading(false);
  };
  //fin discapacidades HiringType

  //Gender
  const GenderColumns = [
    {
      id: 'name',
      label: 'Género',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];
  const handleCreateGender = () => {
    setCurrentCreate({
      type: 'gender',
      title: 'Crear género',
      fields: [
        {
          label: 'Género',
          name: 'genero',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapGender = (Gender) =>
    Gender.map((Gender) => [
      {
        column: 'name',
        value: Gender.genero, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteGender,
          //handleEdit: handleEditGender,
          id: Gender.id,
        },
      },
    ]);
  const handleDeleteGender = async (id) => {
    handleDelete(id, currentCompany, Genders, fetchGender, deleteGenderAPI, enqueueSnackbar, 'Género');
  };


  const fetchGender = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);
    const { data } = await fetchGenderByCompanyAPI(currentCompany.id);
    setGenero(data);
    setLoading(false);
  };
  //fin  Gender

  //SalaryType
  const SalaryTypeColumns = [
    {
      id: 'name',
      label: 'Tipo salario',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];
  const handleCreateSalaryType = () => {
    setCurrentCreate({
      type: 'salaryType',
      title: 'Crear tipo de salario',
      fields: [
        {
          label: 'Tipo salario',
          name: 'tipoDeSalario',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapSalaryType = (SalaryType) =>
    SalaryType.map((SalaryType) => [
      {
        column: 'name',
        value: SalaryType.tipoDeSalario, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteSalaryType,
          //handleEdit: handleEditSalaryType,
          id: SalaryType.id,
        },
      },
    ]);
  const handleDeleteSalaryType = async (id) => {
    handleDelete(id, currentCompany, SalaryTypes, fetchSalaryType, deleteSalaryTypeAPI, enqueueSnackbar, 'Tipo Salario');
  };


  const fetchSalaryType = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);
    const { data } = await fetchSalaryTypeByCompanyAPI(currentCompany.id);
    setSalario(data);
    setLoading(false);
  };
  //fin  SalaryType


  //SexualPreference
  const SexualPreferenceColumns = [
    {
      id: 'name',
      label: 'Preferencias sexuales',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];
  const handleCreateSexualPreference = () => {
    setCurrentCreate({
      type: 'preferenciaSexual',
      title: 'Crear preferencia Sexual',
      fields: [
        {
          label: 'Preferencia Sexual',
          name: 'preferenciaSexual',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapSexualPreference = (SexualPreference) =>
    SexualPreference.map((SexualPreference) => [
      {
        column: 'name',
        value: SexualPreference.preferenciaSexual, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteSexualPreference,
          //handleEdit: handleEditSexualPreference,
          id: SexualPreference.id,
        },
      },
    ]);
  const handleDeleteSexualPreference = async (id) => {
    handleDelete(id, currentCompany, sexualPreferences, fetchSexualPreference, deleteSexualPreferenceAPI, enqueueSnackbar, 'Preferencia Sexual');
  };

  const fetchSexualPreference = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);

    const { data } = await fetchSexualPreferenceByCompanyAPI(currentCompany.id);
    setPreferenciaSexual(data);
    setLoading(false);
  };
  //fin  SexualPreference
  //Nivel de organizacion
  const OrganizationalLevelColumns = [
    {
      id: 'name',
      label: 'Nivel Organizacional',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];

  const handleCreateOrganizationalLevel = () => {
    setCurrentCreate({
      type: 'OrganizationalLevel',
      title: 'Crear nivel organizacional',
      fields: [
        {
          label: 'Nivel organizacional',
          name: 'nivelOrganizacional',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  const mapOrganizationalLevel = (OrganizationalLevel) =>
    OrganizationalLevel.map((OrganizationalLevel) => [
      {
        column: 'name',
        value: OrganizationalLevel.nivelOrganizacional, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteOrganizationalLevel,
          //handleEdit: handleEditOrganizationalLevel,
          id: OrganizationalLevel.id,
        },
      },
    ]);
  const handleDeleteOrganizationalLevel = async (id) => {
    handleDelete(id, currentCompany, OrganizationalLevels, fetchOrganizationalLevel, deleteOrganizationalLevelAPI, enqueueSnackbar, 'Nivel organizacional');
  };


  const fetchOrganizationalLevel = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);

    const { data } = await fetchOrganizationalLevelByCompanyAPI(currentCompany.id);
    setOrganizationalLevels(data);
    setLoading(false);
  };

  //fin orgaizacion
  //MaritalStatus
  const MaritalStatusColumns = [
    {
      id: 'name',
      label: 'Estado Civil',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];
  const handleCreateMaritalStatus = () => {
    setCurrentCreate({
      type: 'estadoCivil',
      title: 'Crear estado civil',
      fields: [
        {
          label: 'Estado Civil',
          name: 'estadoCivil',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapMaritalStatus = (MaritalStatus) =>
    MaritalStatus.map((MaritalStatus) => [
      {
        column: 'name',
        value: MaritalStatus.estadoCivil, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteMaritalStatus,
          //handleEdit: handleEditMaritalStatus,
          id: MaritalStatus.id,
        },
      },
    ]);
  const handleDeleteMaritalStatus = async (id) => {
    handleDelete(id, currentCompany, maritalStatuses, fetchMaritalStatus, deleteMaritalStatusAPI, enqueueSnackbar, 'EstadoCivil');
  };


  const fetchMaritalStatus = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);

    const { data } = await fetchMaritalStatusByCompanyAPI(currentCompany.id);
    setEstadoCivil(data);
    setLoading(false);
  };
  //fin  MaritalStatus

  //Nivel de profession
  const ProfessionColumns = [
    {
      id: 'name',
      label: 'Profesión',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];

  const handleCreateProfession = () => {
    setCurrentCreate({
      type: 'Profesion',
      title: 'Crear Profesión',
      fields: [
        {
          label: 'Profesión',
          name: 'profesion',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapProfession = (Profession) =>
    Profession.map((Profession) => [
      {
        column: 'name',
        value: Profession.profesion, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteProfession,
          //handleEdit: handleEditProfession,
          id: Profession.id,
        },
      },
    ]);
  const handleDeleteProfession = async (id) => {
    handleDelete(id, currentCompany, Professions, fetchProfession, deleteProfessionAPI, enqueueSnackbar, 'Profesión');
  };

  const fetchProfession = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);

    const { data } = await fetchProfessionByCompanyAPI(currentCompany.id);
    setProfessions(data);
    setLoading(false);
  };
  //fin Profesiones
  /**
   * Handle tab change.
   *
   * @param event
   * @param newValue
   */

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const handleLeftButtonClick = () => {
    const newTab = currentTab === 0 ? tabLabels.length - 1 : currentTab - 1;
    setCurrentTab(newTab);
  };

  const handleRightButtonClick = () => {
    const newTab = currentTab === tabLabels.length - 1 ? 0 : currentTab + 1;
    setCurrentTab(newTab);
  };

  /**
   * Handle create category.
   */
  const handleCreateCategory = () => {
    setCurrentCreate({
      type: 'contractType',
      title: 'Crear tipo contrato',
      fields: [
        {
          label: 'Tipo Contrato',
          name: 'tipoContrato',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  // category columns
  /**
   * Map categories response to use in table.
   *
   * @param categories
   * @returns {*}
   */
  const mapContractType = (contractType) =>
    contractType.map((contractType) => [
      {
        column: 'name',
        value: contractType.tipoContrato,
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteContractType,
          //handleEdit: handleEditContractType,
          id: contractType.id,
        },
      },
    ]);
    
  /**
   * Handle delete category.
   *
   * @param id
   */
  const handleDeleteContractType = async (id) => {
    handleDelete(id, currentCompany, contractTypes, fetchContractType, deleteContractTypeAPI, enqueueSnackbar, 'Tipo Contrato');
  };

    //Working Day
    const workingDayColumns = [
      {
        id: 'name',
        label: 'Jornada',
        numeric: false,
      },
      {
        id: 'options',
        label: 'Opciones',
        numeric: false,
      },
    ];
  
    const handleCreateWorkingDay = () => {
      setCurrentCreate({
        type: 'workingDay',
        title: 'Crear Jornada',
        fields: [
          {
            label: 'Jornada',
            name: 'jornada',
            type: 'text',
            isRequired: true,
          },
        ],
      });
      setOpenCreateDialog(true);
    };
    const mapWorkingDay = (workingDay) =>
        workingDay.map((workingDay) => [
        {
          column: 'name',
          value: workingDay.jornada, //swagger
        },
        {
          column: 'options',
          value: '',
          payload: {
            handleDelete: handleDeleteWorkingDay,
            //handleEdit: handleEditProfession,
            id: workingDay.id,
          },
        },
      ]);
    const handleDeleteWorkingDay = async (id) => {
      handleDelete(id, currentCompany, workingDays, fetchWorkingDay, deleteWorkingDayAPI, enqueueSnackbar, 'Jornada');
    };
  
    const fetchWorkingDay = async () => {
      if (!currentCompany) {
        return;
      }
      setLoading(true);
  
      const { data } = await fetchWorkingDayByCompanyAPI(currentCompany.id);
      setWorkingDay(data);
      setLoading(false);
    };
    //fin Working Day

    /**
   * Fetch categories.
   *
   * @returns {Promise<void>}
   */
    const fetchContractType = async () => {
      if (!currentCompany) {
        return;
      }
  
      const { data } = await fetchContractTypeByCompanyAPI(currentCompany.id);
      setContractType(data);
    };

  /**
   * Handle close edit dialog.
   */
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  /**
   * Handle close create dialog.
   */
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  /**
   * Handle submitted edit dialog.
   *
   * @param formValues
   * @returns {Promise<void>}
   */
    /**
   * Handle submitted create dialog.
   *
   * @param formValues
   * @returns {Promise<void>}
   */
    const createConfigs = [
      {
        type: 'contractType',
        storeAPI: storeContractTypeAPI,
        fetchAPI: fetchContractType,
        successMsg: 'Tipo Contrato creado con éxito',
        errorMsg: 'Hubo un error al crear Tipo Contrato',
        formValues: {
          field1: 'tipoContrato',
        },
      },
      {
        type: 'documentType',
        storeAPI: storeDocumentTypeAPI,
        fetchAPI: fetchDocumentType,
        successMsg: 'Tipo Documento creado con éxito',
        errorMsg: 'Hubo un error al crear Tipo Documento',
        formValues: {
          field1: 'tipoDocumento',
        },
      },
      {
        type: 'englishLevel',
        storeAPI: storeEnglishLevelAPI,
        fetchAPI: fetchEnglishLevel,
        successMsg: 'Nivel Inglés creado con éxito',
        errorMsg: 'Hubo un error al crear Nivel Inglés',
        formValues: {
          field1: 'nivelIngles',
        },
      },
      {
        type: 'educationLevel',
        storeAPI: storeEducationLevelAPI,
        fetchAPI: fetchEducationLevel,
        successMsg: 'Nivel Educación creado con éxito',
        errorMsg: 'Hubo un error al crear Nivel Educación',
        formValues: {
          field1: 'nivelEducacion',
        },
      },
      {
        type: 'disabilities',
        storeAPI: storeDisabilitiesAPI,
        fetchAPI: fetchDisabilities,
        successMsg: 'Discapacidad creado con éxito',
        errorMsg: 'Hubo un error al crear Discapacidad',
        formValues: {
          field1: 'discapacIdades',
        },
      },
      {
        type: 'HiringType',
        storeAPI: storeHiringTypeAPI,
        fetchAPI: fetchHiringType,
        successMsg: 'Tipo Contratación creado con éxito',
        errorMsg: 'Hubo un error al crear Tipo Contratación',
        formValues: {
          field1: 'tipoContrato',
        },
      },
      {
        type: 'gender',
        storeAPI: storeGenderAPI,
        fetchAPI: fetchGender,
        successMsg: 'Género creado con éxito',
        errorMsg: 'Hubo un error al crear Género',
        formValues: {
          field1: 'genero',
        },
      },
      {
        type: 'salaryType',
        storeAPI: storeSalaryTypeAPI,
        fetchAPI: fetchSalaryType,
        successMsg: 'Tipo salario creado con éxito',
        errorMsg: 'Hubo un error al crear Tipo salario',
        formValues: {
          field1: 'tipoDeSalario',
        },
      },
      {
        type: 'Profesion',
        storeAPI: storeProfessionAPI,
        fetchAPI: fetchProfession,
        successMsg: 'Profesión creado con éxito',
        errorMsg: 'Hubo un error al crear Profesión',
        formValues: {
          field1: 'profesion',
        },
      },
      {
        type: 'preferenciaSexual',
        storeAPI: storeSexualPreferenceAPI,
        fetchAPI: fetchSexualPreference,
        successMsg: 'Preferencia Sexual creado con éxito',
        errorMsg: 'Hubo un error al crear Preferencia Sexual',
        formValues: {
          field1: 'preferenciaSexual',
        },
      },
      {
        type: 'estadoCivil',
        storeAPI: storeMaritalStatusAPI,
        fetchAPI: fetchMaritalStatus,
        successMsg: 'Estado civil creado con éxito',
        errorMsg: 'Hubo un error al crear Estado civil',
        formValues: {
          field1: 'estadoCivil',
        },
      },
      {
        type: 'OrganizationalLevel',
        storeAPI: storeOrganizationalLevelAPI,
        fetchAPI: fetchOrganizationalLevel,
        successMsg: 'Nivel organizacional creada con éxito',
        errorMsg: 'Hubo un error al crear Nivel organizacional',
        formValues: {
          field1: 'nivelOrganizacional',
        },
      },
      {
        type: 'workingDay',
        storeAPI: storeWorkingDayAPI,
        fetchAPI: fetchWorkingDay,
        successMsg: 'Jornada creada con éxito',
        errorMsg: 'Hubo un error al crear Jornada',
        formValues: {
          field1: 'jornada',
        },
      }
    ];
    

  /**
   * Handle submitted create dialog.
   *
   * @param formValues
   * @returns {Promise<void>}
   */
  const handleSubmittedCreateDialog = async (formValues) => {
    createForm(createConfigs, currentCreate, currentCompany, formValues, enqueueSnackbar);
    setCurrentCreate(null);
    setOpenCreateDialog(false);
  };


  useEffect(() => {
    fetchContractType();
    fetchDocumentType();
    fetchEnglishLevel();
    fetchEducationLevel();
    fetchDisabilities();
    fetchHiringType();
    fetchGender();
    fetchSalaryType();
    fetchProfession();
    fetchSexualPreference();
    fetchOrganizationalLevel();
    fetchMaritalStatus();
    fetchWorkingDay();
    /*
    fetchCompanyRol();
    fetchRolCompany();*/
  }, [currentCompany]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteItem = async (id, trueid) => {
    dispatch(removeItem({ id: id, type: props.type }));
    await axios.delete('companias/' + trueid);
  };

  const handleDeleteItemOffice = async (id, trueid) => {
    dispatch(removeItem({ id: id, type: props.type }));
    await axios.delete('Campus/' + trueid);
  };
  const handleRedirect = (id) => {
    navigate('/powerbi/' + id);
  };
  const handleDeleteItemBi = (_id, id) => {
    dispatch(removeItemBi({ id: _id, type: props.type }));
    switch (props.type) {
      case 'dashboard':
        deleteDashboardAPI(id);
        break;
      case 'report':
        deleteReportAPI(id);
        break;

      default:
        break;
    }
  };

  const company = [
    {
      field: 'nombreCompania',
      flex: 1,
      headerName: 'Nombre Empresa',
      headerAlign: 'center',
      align: 'center',
      editable: 'true',
    },
    {
      field: 'IdPais',
      flex: 1,
      headerName: 'Pais',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        isNaN(params.row.IdPais)
          ? params.row.IdPais
          : search(params.row.IdPais, props.ids.country, 'pais', 'id'),
    },
    {
      field: 'Sede',
      flex: 1,
      headerName: 'Sede',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'direccion',
      flex: 1,
      headerName: 'Dirección',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'IdTamanoCompania',
      flex: 2,
      headerName: 'Tamaño Empresa',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        isNaN(params.row.IdTamanoCompania)
          ? params.row.IdTamanoCompania
          : search(
              params.row.IdTamanoCompania,
              props.ids.sizeCompany,
              'quantityOfEmployees',
              'id'
            ),
    },
    {
      field: 'SectorId',
      flex: 2.5,
      headerName: 'Sector',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        isNaN(params.row.SectorId)
          ? params.row.SectorId
          : search(params.row.SectorId, props.ids.sector, 'Sector', 'id'),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() => handleDeleteItem(params.row._id, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const office = [
    {
      field: 'sede',
      flex: 1,
      headerName: 'Sede',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'IdCompania',
      flex: 1,
      headerName: 'Compania',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        isNaN(params.row.IdCompania)
          ? params.row.IdCompania
          : search(params.row.IdCompania, props.ids.company, 'nombreCompania'),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() =>
              handleDeleteItemOffice(params.row._id, params.row.id)
            }
          >
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];


  const dashboard = [
    {
      field: 'companyId',
      flex: 1,
      headerName: 'Nombre compañia',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return isNaN(params.row.companyId)
          ? params.row.companyId
          : search(
              params.row.companyId,
              props.ids.company,
              'nombreCompania',
              'id'
            );
      },
    },
    {
      field: 'reportName',
      flex: 1,
      headerName: 'Titulo Dashbord',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isActive',
      flex: 1,
      headerName: 'Estado',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Switch
            checked={params.row.isActive}
            onChange={(event) => props.handleSwitch(event, params.row)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 150,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() => handleDeleteItemBi(params.row._id, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>,
          <IconButton onClick={() => handleRedirect(params.row.id)}>
            <VisibilityIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const report = [
    {
      field: 'name',
      flex: 1,
      headerName: 'Nombre Reporte',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'descripcion',
      flex: 1,
      headerName: 'Descripción',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() => handleDeleteItemBi(params.row._id, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const contractTypeColumns = [
    {
      id: 'name',
      label: 'Tipo Contrato',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];

  const renderColumn = () => {
    switch (props.type) {
      case 'Empresas':
        return company;
      case 'dashboard':
        return dashboard;
      case 'report':
        return report;
    }
  };

  const tabLabels = [
    'Tipo Contrato',
    'Tipos de documentos',
    'Nivel de ingles',
    'Nivel de educacion',
    'Discapacidades',
    'Tipo de contrataciones',
    'Tipo generos',
    'Tipo salarios',
    'Profesion',
    'Nivel Organizacional',
    'Preferencia sexual',
    'Estado civil',
    'Jornada'
  ];

  const columns = useMemo(() => renderColumn(), [props.type]);

  useEffect(() => {
    setRows(props.tableData);
  }, [props.tableData]);

  if (props.type != 'Otros campos') {
    return (
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
      />
    );
  } else {
    return (
      <Box sx={{ display: 'flex' }}>
        <div style={{ backgroundColor: 'white' }}>
          <div className={styles.StyleOtherCamps}>
            <div className={styles.StyleOthercamps__content}>
              {loading === true && <MyLoader />}

              {loading === false && (
                <MyCard
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'between' }}>
                        <IconButton onClick={handleLeftButtonClick}>
                          <ArrowLeftIcon />
                        </IconButton>
                        <Tabs
                          sx={{ width: '90%', justifyContent: 'center' }}
                          value={currentTab}
                          onChange={(event, newValue) =>
                            handleTabChange(event, newValue)
                          }
                        >
                          <Tab label="Tipo Contrato" id="settings-tab-0" />
                          <Tab
                            label="Tipos de documento"
                            id="settings-tab-1"
                          />
                          <Tab label="Nivel de inglés" id="settings-tab-2" />
                          <Tab label="Nivel de educación" id="settings-tab-3" />
                          <Tab label="Discapacidades" id="settings-tab-4" />
                          <Tab
                            label="Tipo de contratación"
                            id="settings-tab-5"
                          />
                          <Tab label="Género" id="settings-tab-6" />

                          <Tab label="Tipo salario" id="settings-tab-7" />
                          <Tab label="Profesión" id="settings-tab-8" />
                          <Tab
                            label="Preferencia sexual"
                            id="settings-tab-9"
                          />
                          <Tab label="Estado civil" id="settings-tab-10" />
                          <Tab
                            label="Nivel Organizacional"
                            id="settings-tab-11"
                          />
                          <Tab
                            label="Jornada"
                            id="settings-tab-11"
                          />
                        </Tabs>
                        <IconButton onClick={handleRightButtonClick}>
                          <ArrowRightIcon />
                        </IconButton>
                      </Box>

                      {/* categories */}
                      <div hidden={currentTab !== 0} id="settings-tabpanel-0">
                        {currentTab === 0 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateCategory}
                              >
                                Crear Tipo Contrato
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Tipo Contrato'}
                              columns={contractTypeColumns}
                              rows={mapContractType(contractTypes)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Documento*/}
                      <div hidden={currentTab !== 1} id="settings-tabpanel-1">
                        {currentTab === 1 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateDocumentType}
                              >
                                Crear tipo de documento
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Tipo Documento'}
                              columns={documentTypeColumns}
                              rows={mapDocumentType(DocumentsTypes)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Nivel de ingles*/}
                      <div hidden={currentTab !== 2} id="settings-tabpanel-0">
                        {currentTab === 2 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateEnglishLevel}
                              >
                                Crear nivel de inglés
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Nivel de inglés'}
                              columns={EnglishLevelColumns}
                              rows={mapEnglishLevel(EnglishLevels)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Nivel de educacion*/}
                      <div hidden={currentTab !== 3} id="settings-tabpanel-0">
                        {currentTab === 3 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateEducationLevel}
                              >
                                Crear nivel de educación
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Nivel de educación'}
                              columns={EducationLevelColumns}
                              rows={mapEducationLevel(EducationLevels)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Discapacidades*/}
                      <div hidden={currentTab !== 4} id="settings-tabpanel-0">
                        {currentTab === 4 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateDisabilities}
                              >
                                Crear discapacidad
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Discapacidades'}
                              columns={DisabilitiesColumns}
                              rows={mapDisabilities(disabilities)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Tipo de contratacion*/}
                      <div hidden={currentTab !== 5} id="settings-tabpanel-0">
                        {currentTab === 5 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateHiringType}
                              >
                                Crear tipo de contratación
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Tipo de contratación'}
                              columns={HiringTypeColumns}
                              rows={mapHiringType(HiringTypes)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Genero*/}
                      <div hidden={currentTab !== 6} id="settings-tabpanel-0">
                        {currentTab === 6 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateGender}
                              >
                                Crear género
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Género'}
                              columns={GenderColumns}
                              rows={mapGender(Genders)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Tipo salario*/}
                      <div hidden={currentTab !== 7} id="settings-tabpanel-0">
                        {currentTab === 7 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateSalaryType}
                              >
                                Crear Tipo salario
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Tipo salario'}
                              columns={SalaryTypeColumns}
                              rows={mapSalaryType(SalaryTypes)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Nivel de profesion*/}
                      <div hidden={currentTab !== 8} id="settings-tabpanel-0">
                        {currentTab === 8 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateProfession}
                              >
                                Crear profesión
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Profesión'}
                              columns={ProfessionColumns}
                              rows={mapProfession(Professions)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Prferencia sexual*/}
                      <div hidden={currentTab !== 9} id="settings-tabpanel-0">
                        {currentTab === 9 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateSexualPreference}
                              >
                                Crear Preferencia sexual
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Preferencia sexual'}
                              columns={SexualPreferenceColumns}
                              rows={mapSexualPreference(sexualPreferences)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Marital Status*/}
                      <div hidden={currentTab !== 10} id="settings-tabpanel-0">
                        {currentTab === 10 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateMaritalStatus}
                              >
                                Crear Estado civil
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Estado civil'}
                              columns={MaritalStatusColumns}
                              rows={mapMaritalStatus(maritalStatuses)}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Nivel de Organizacion*/}
                      <div hidden={currentTab !== 11} id="settings-tabpanel-0">
                        {currentTab === 11 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateOrganizationalLevel}
                              >
                                Crear Nivel Organizacional
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Nivel Organizacional'}
                              columns={OrganizationalLevelColumns}
                              rows={mapOrganizationalLevel(
                                OrganizationalLevels
                              )}
                            />
                          </Box>
                        )}
                      </div>
                      {/* Jornada */}
                      <div hidden={currentTab !== 12} id="settings-tabpanel-0">
                        {currentTab === 12 && (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            <Stack
                              spacing={2}
                              direction="row-reverse"
                              sx={{
                                mb: 2,
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleCreateWorkingDay}
                              >
                                Crear Jornada
                              </Button>
                            </Stack>
                            <MyTable
                              title={'Jornada'}
                              columns={workingDayColumns}
                              rows={mapWorkingDay(
                                workingDays
                              )}
                            />
                          </Box>
                        )}
                      </div>
                    </Box>
                  </Box>
                </MyCard>
              )}
            </div>
          </div>
        </div>

        {/* edit form 
        {currentEdit !== null && (
          <MyEditDialog
            onClose={handleCloseEditDialog}
            onSubmit={handleSubmittedEditDialog}
            title={currentEdit.title}
            open={openEditDialog}
            fields={currentEdit.fields}
          />
        )}*/}

        {/* create form */}
        {currentCreate !== null && (
          <MyCreateDialog
            onClose={handleCloseCreateDialog}
            onSubmit={handleSubmittedCreateDialog}
            title={currentCreate.title}
            open={openCreateDialog}
            fields={currentCreate.fields}
          />
        )}
      </Box>
    );
  }
}
