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

import { removeItem } from '../features/adminSlice';
import { removeItemBi } from '../features/powerBiSlice';
import { deleteDashboardAPI } from '../services/deleteDashboard.service';
import { deleteReportAPI } from '../services/deleteReport.service';
import {
  deleteCollectiveWorkGrouptoWhichitBelongsAPI,
  fetchCollectiveWorkGrouptoWhichitBelongsAPI,
  storeCollectiveWorkGrouptoWhichitBelongsAPI,
  updateCollectiveWorkGrouptoWhichitBelongsAPI,
} from '../services/getCollectiveWorkGrouptoWhichitBelongs.service';
import {
  deleteContractTypeAPI,
  fetchContractTypeByCompanyAPI,
  storeContractTypeAPI,
  updateContractTypeAPI,
} from '../services/getContractType.service';
import {
  deleteDisabilitiesAPI,
  fetchDisabilitiesByCompanyAPI,
  storeDisabilitiesAPI,
  updateDisabilitiesAPI,
} from '../services/getDisabilities.service';
import {
  deleteDocumentTypeAPI,
  fetchDocumentTypeAPI,
  storeDocumentTypeAPI,
  updateDocumentTypeAPI,
} from '../services/getDocumentType.service';
import {
  deleteEducationLevelAPI,
  fetchEducationLevelByCompanyAPI,
  storeEducationLevelAPI,
  updateEducationLevelAPI,
} from '../services/getEducationLevel.service';
import {
  deleteEnglishLevelAPI,
  fetchEnglishLevelByCompanyAPI,
  storeEnglishLevelAPI,
  updateEnglishLevelAPI,
} from '../services/getEnglishLevel.service';
import {
  deleteGenderAPI,
  fetchGenderByCompanyAPI,
  storeGenderAPI,
  updateGenderAPI,
} from '../services/getGender.service';
import {
  deleteHiringTypeAPI,
  fetchHiringTypeByCompanyAPI,
  storeHiringTypeAPI,
  updateHiringTypeAPI,
} from '../services/getHiringType.service';
import {
  deleteMaritalStatusAPI,
  fetchMaritalStatusByCompanyAPI,
  storeMaritalStatusAPI,
  updateMaritalStatusAPI,
} from '../services/getMaritalStatus.service';
import {
  deleteOrganizationalLevelAPI,
  fetchOrganizationalLevelByCompanyAPI,
  storeOrganizationalLevelAPI,
  updateOrganizationalLevelAPI,
} from '../services/getOrganizationalLevel.service';
import {
  deleteProfessionAPI,
  fetchProfessionByCompanyAPI,
  storeProfessionAPI,
  updateProfessionAPI,
} from '../services/getProfession.service';
import {
  deleteRolCompanyAPI,
  fetchRolCompanyAPI,
  storeRolCompanyAPI,
} from '../services/getRolCompany.service';
import {
  deleteSalaryTypeAPI,
  fetchSalaryTypeByCompanyAPI,
  storeSalaryTypeAPI,
  updateSalaryTypeAPI,
} from '../services/getSalaryType.service';
import {
  deleteSexualPreferenceAPI,
  fetchSexualPreferenceByCompanyAPI,
  storeSexualPreferenceAPI,
  updateSexualPreferenceAPI,
} from '../services/getSexualPreference.service';
import axios from '../utils/axiosInstance';

import MyCard from './MyCard/MyCard';
import MyCreateDialog from './MyCreateDialog/MyCreateDialog';
import MyEditDialog from './MyEditDialog/MyEditDialog';
import MyLoader from './MyLoader/MyLoader';
import MyPageHeader from './MyPageHeader/MyPageHeader';
import MyTable from './MyTable/MyTable';

//import styles from '../pages/JourneySettingsPage/JourneySettingsPage.module.css';
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
  const [categories, setCategories] = useState([]);
  const [DocumentsTypes, setDocumentos] = useState([]);
  const [EnglishLevels, setNivelIngles] = useState([]);
  const [EducationLevels, setEducationLevels] = useState([]);
  const [disabilities, setDiscapacidades] = useState([]);
  const [HiringTypes, setTipoContratacion] = useState([]);
  const [SalaryTypes, setSalario] = useState([]);
  const [Professions, setProfessions] = useState([]);
  const [companyRols, setCompanyRols] = useState([]);
  const [Genders, setGenero] = useState([]);
  const [collectiveWorkGrouptoWhichitBelongss, setGrupoTrabajo] = useState([]);
  const [sexualPreferences, setPreferenciaSexual] = useState([]);
  const [OrganizationalLevels, setOrganizationalLevels] = useState([]);
  const [maritalStatuses, setEstadoCivil] = useState([]);
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
  const handleDeleteDocumentType = async (id) => {
    const DocumentType = DocumentsTypes.find(
      (DocumentType) => DocumentType.id === id
    );

    if (DocumentType === undefined) {
      return;
    }

    try {
      await deleteDocumentTypeAPI(id, currentCompany.id);
    } catch (e) {}
    enqueueSnackbar('Tipo de documento eliminado con éxito', {
      variant: 'success',
    });
  };
  
  const handleEditDocumentType = (id) => {
    // find category
    const DocumentType = DocumentsTypes.find(
      (DocumentType) => DocumentType.id === id
    );

    if (DocumentType === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'documentType',
      id: DocumentType.id,
      title: 'Editar tipo de documento',
      fields: [
        {
          label: 'Tipo documento',
          name: 'documentType',
          type: 'text',
          value: DocumentType.tipoDocumento,
        },
      ],
    });
    setOpenEditDialog(true);
  };

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
    const EnglishLevel = EnglishLevels.find(
      (EnglishLevel) => EnglishLevel.id === id
    );

    if (EnglishLevel === undefined) {
      return;
    }

    try {
      await deleteEnglishLevelAPI(id, currentCompany.id);
      enqueueSnackbar('Nivel de inglés eliminado con exito', {
        variant: 'success',
      });
      fetchEnglishLevel();
    } catch (e) {
      enqueueSnackbar('Hubo un error al elimiar el nivel de inglés', {
        variant: 'error',
      });
    }

  };
  const handleEditEnglishLevel = (id) => {
    // find category
    const EnglishLevel = EnglishLevels.find(
      (EnglishLevel) => EnglishLevel.id === id
    );

    if (EnglishLevel === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'englishLevel',
      id: EnglishLevel.id,
      title: 'Editar nivel de inglés',
      fields: [
        {
          label: 'Nivel de inglés',
          name: 'name',
          type: 'text',
          value: EnglishLevel.nivelIngles,
        },
      ],
    });
    setOpenEditDialog(true);
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
  // camel Case ---> JS holaMundo, comoEstasYoMuyBien
  // Clases --> PascalCase HolaMundo, CómoEstasYoMuyBien

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
    const EducationLevel = EducationLevels.find(
      (EducationLevel) => EducationLevel.id === id
    );

    if (EducationLevel === undefined) {
      return;
    }

    try {
      await deleteEducationLevelAPI(id, currentCompany.id);
      enqueueSnackbar('Nivel de educacion eliminado con exito', {
        variant: 'success',
      });
      fetchEducationLevel();
    } catch (e) {
      enqueueSnackbar('Error al eliminar Nivel de educación', {
        variant: 'error',
      });
    }

  };

  const handleEditEducationLevel = (id) => {
    // find category
    const EducationLevel = EducationLevels.find(
      (EducationLevel) => EducationLevel.id === id
    );

    if (EducationLevel === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'nivelEducacion',
      id: EducationLevel.id,
      title: 'Editar nivel de educacion',
      fields: [
        {
          label: 'Nivel de educación',
          name: 'name',
          type: 'text',
          value: EducationLevel.nivelEducacion,
        },
      ],
    });
    setOpenEditDialog(true);
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
          name: 'disabilities',
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
    const Disabilities = disabilities.find(
      (Disabilities) => Disabilities.id === id
    );

    if (Disabilities === undefined) {
      return;
    }

    try {
      await deleteDisabilitiesAPI(id, currentCompany.id);
      enqueueSnackbar('Discapacidad eliminado con exito', {
        variant: 'success',
      });
      fetchDisabilities();
    } catch (e) {
      enqueueSnackbar('Hubo un error al eliminar la Discapacidad', {
        variant: 'error',
      });
    }

  };
  const handleEditDisabilities = (id) => {
    // find category
    const Disabilities = disabilities.find(
      (Disabilities) => Disabilities.id === id
    );

    if (Disabilities === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'disabilities',
      id: Disabilities.id,
      title: 'Editar discapacidad',
      fields: [
        {
          label: 'Discapacidad',
          name: 'name',
          type: 'text',
          value: Disabilities.discapacIdades,
        },
      ],
    });
    setOpenEditDialog(true);
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
    const HiringType = HiringTypes.find((HiringType) => HiringType.id === id);

    if (HiringType === undefined) {
      return;
    }

    try {
      await deleteHiringTypeAPI(id, currentCompany.id);
      enqueueSnackbar('Tipo de contratación eliminado con exito', {
        variant: 'success',
      });
      fetchHiringType();
    } catch (e) {
      enqueueSnackbar('Hubo un error al eliminar el Tipo de contratación', {
        variant: 'error',
      });
    }

  };
  const handleEditHiringType = (id) => {
    // find tipo de contartacion
    const HiringType = HiringTypes.find((HiringType) => HiringType.id === id);

    if (HiringType === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'HiringType',
      id: HiringType.id,
      title: 'Editar tipo de contratación',
      fields: [
        {
          label: 'Tipo contratación',
          name: 'name',
          type: 'text',
          value: HiringTypes.tipoContrato,
        },
      ],
    });
    setOpenEditDialog(true);
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
          name: 'gender',
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
    const Gender = Genders.find((Gender) => Gender.id === id);

    if (Gender === undefined) {
      return;
    }

    try {
      await deleteGenderAPI(id, currentCompany.id);
      enqueueSnackbar('Género eliminado con exito', {
        variant: 'success',
      });
      fetchGender();
    } catch (e) {
      enqueueSnackbar('Error al eliminar el Género', {
        variant: 'success',
      });
    }

  };

  const handleEditGender = (id) => {
    // find category
    const Gender = Genders.find((Gender) => Gender.id === id);

    if (Gender === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'gender',
      id: Gender.id,
      title: 'Editar tipo de género',
      fields: [
        {
          label: 'Tipo género',
          name: 'name',
          type: 'text',
          value: Genders.tipoGenero,
        },
      ],
    });
    setOpenEditDialog(true);
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
          name: 'salaryType',
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
    const SalaryType = SalaryTypes.find((SalaryType) => SalaryType.id === id);

    if (SalaryType === undefined) {
      return;
    }

    try {
      await deleteSalaryTypeAPI(id, currentCompany.id);
      enqueueSnackbar('Tipo salario eliminado con exito', {
        variant: 'success',
      });
      fetchSalaryType();
    } catch (e) {
      enqueueSnackbar('Hubo un error al eliminar el Tipo salario', {
        variant: 'error',
      });
    }

  };
  const handleEditSalaryType = (id) => {
    // find category
    const SalaryType = SalaryTypes.find((SalaryType) => SalaryType.id === id);

    if (SalaryType === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'salaryType',
      id: SalaryType.id,
      title: 'Editar tipo de contratación',
      fields: [
        {
          label: 'Tipo contratación',
          name: 'name',
          type: 'text',
          value: SalaryTypes.tipoSalario,
        },
      ],
    });
    setOpenEditDialog(true);
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

  //CollectiveWorkGrouptoWhichitBelongs
  const CollectiveWorkGrouptoWhichitBelongsColumns = [
    {
      id: 'name',
      label: 'Grupo de Trabajo Colectivo al que Pertenece',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];
  const handleCreateCollectiveWorkGrouptoWhichitBelongs = () => {
    setCurrentCreate({
      type: 'CollectiveWorkGrouptoWhichitBelongs',
      title: 'Crear tipo de grupo colectivo',
      fields: [
        {
          label: 'Grupo de Trabajo Colectivo al que Pertenece',
          name: 'grupoColectivoDeTrabajo',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };
  const mapCollectiveWorkGrouptoWhichitBelongs = (
    CollectiveWorkGrouptoWhichitBelongs
  ) =>
    CollectiveWorkGrouptoWhichitBelongs.map(
      (CollectiveWorkGrouptoWhichitBelongs) => [
        {
          column: 'name',
          value: CollectiveWorkGrouptoWhichitBelongs.grupoColectivoDeTrabajo, //swagger
        },
        {
          column: 'options',
          value: '',
          payload: {
            handleDelete: handleDeleteCollectiveWorkGrouptoWhichitBelongs,
            //handleEdit: handleEditCollectiveWorkGrouptoWhichitBelongs,
            id: CollectiveWorkGrouptoWhichitBelongs.id,
          },
        },
      ]
    );
  const handleDeleteCollectiveWorkGrouptoWhichitBelongs = async (id) => {
    const CollectiveWorkGrouptoWhichitBelongs =
      collectiveWorkGrouptoWhichitBelongss.find(
        (CollectiveWorkGrouptoWhichitBelongs) =>
          CollectiveWorkGrouptoWhichitBelongs.id === id
      );

    if (CollectiveWorkGrouptoWhichitBelongs === undefined) {
      return;
    }

    try {
      await deleteCollectiveWorkGrouptoWhichitBelongsAPI(id, currentCompany.id);
    } catch (e) {}
    enqueueSnackbar(
      'Grupo de Trabajo Colectivo al que Pertenece eliminado con exito',
      {
        variant: 'success',
      }
    );
  };
  const handleEditCollectiveWorkGrouptoWhichitBelongs = (id) => {
    // find category
    const CollectiveWorkGrouptoWhichitBelongs =
      collectiveWorkGrouptoWhichitBelongss.find(
        (CollectiveWorkGrouptoWhichitBelongs) =>
          CollectiveWorkGrouptoWhichitBelongs.id === id
      );

    if (CollectiveWorkGrouptoWhichitBelongs === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'CollectiveWorkGrouptoWhichitBelongs',
      id: CollectiveWorkGrouptoWhichitBelongs.id,
      title: 'Editar tipo de contratacion',
      fields: [
        {
          label: 'Tipo contratacion',
          name: 'name',
          type: 'text',
          value: collectiveWorkGrouptoWhichitBelongss.grupoColectivoDeTrabajo,
        },
      ],
    });
    setOpenEditDialog(true);
  };

  const fetchCollectiveWorkGrouptoWhichitBelongs = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);

    const { data } = await fetchCollectiveWorkGrouptoWhichitBelongsAPI(
      currentCompany.id
    );
    setGrupoTrabajo(data);
    setLoading(false);
  };
  //fin  CollectiveWorkGrouptoWhichitBelongs
  //SexualPreference
  const SexualPreferenceColumns = [
    {
      id: 'name',
      label: 'Preferncias sexuales',
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
    const SexualPreference = sexualPreferences.find(
      (SexualPreference) => SexualPreference.id === id
    );

    if (SexualPreference === undefined) {
      return;
    }

    try {
      await deleteSexualPreferenceAPI(id, currentCompany.id);
      enqueueSnackbar('Preferencia sexual eliminado con exito', {
        variant: 'success',
      });
      fetchSexualPreference();
    } catch (e) {
      enqueueSnackbar('Hubo un error al eliminar Preferencia sexual', {
        variant: 'error',
      });
    }

  };
  const handleEditSexualPreference = (id) => {
    // find category
    const SexualPreference = sexualPreferences.find(
      (SexualPreference) => SexualPreference.id === id
    );

    if (SexualPreference === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'preferenciaSexual',
      id: SexualPreference.id,
      title: 'Editar Preferencia sexual',
      fields: [
        {
          label: 'Preferencia sexual',
          name: 'name',
          type: 'text',
          value: SexualPreference.preferenciaSexual,
        },
      ],
    });
    setOpenEditDialog(true);
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
    const OrganizationalLevel = OrganizationalLevels.find(
      (OrganizationalLevel) => OrganizationalLevel.id === id
    );

    if (OrganizationalLevel === undefined) {
      return;
    }

    try {
      await deleteOrganizationalLevelAPI(id, currentCompany.id);
      enqueueSnackbar('Nivel de organizacion eliminado con exito', {
        variant: 'success',
      });
      fetchOrganizationalLevel();
    } catch (e) {
      enqueueSnackbar('Hubo un error al eliminar Nivel de organizacion', {
        variant: 'error',
      }); 
    }

  };
  const handleEditOrganizationalLevel = (id) => {
    // find category
    const OrganizationalLevel = OrganizationalLevels.find(
      (OrganizationalLevel) => OrganizationalLevel.id === id
    );

    if (OrganizationalLevel === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'OrganizationalLevel',
      id: OrganizationalLevel.id,
      title: 'Editar nivel de organizacion',
      fields: [
        {
          label: 'Nivel de organizacion',
          name: 'name',
          type: 'text',
          value: OrganizationalLevel.nivelOrganizacional,
        },
      ],
    });
    setOpenEditDialog(true);
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
      label: 'Preferncias sexuales',
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
    const MaritalStatus = maritalStatuses.find(
      (MaritalStatus) => MaritalStatus.id === id
    );

    if (MaritalStatus === undefined) {
      return;
    }

    try {
      await deleteMaritalStatusAPI(id, currentCompany.id);
      enqueueSnackbar('Estado civil eliminado con exito', {
        variant: 'success',
      });
      fetchMaritalStatus();
    } catch (e) {
      enqueueSnackbar('Hubo un error al eliminar estado civil', {
        variant: 'error',
      });
    }

  };
  const handleEditMaritalStatus = (id) => {
    // find category
    const MaritalStatus = maritalStatuses.find(
      (MaritalStatus) => MaritalStatus.id === id
    );

    if (MaritalStatus === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'estados-civiles',
      id: MaritalStatus.id,
      title: 'Editar Estado civil',
      fields: [
        {
          label: 'Estado civil',
          name: 'name',
          type: 'text',
          value: MaritalStatus.estadoCivil,
        },
      ],
    });
    setOpenEditDialog(true);
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
    const Profession = Professions.find((Profession) => Profession.id === id);

    if (Profession === undefined) {
      return;
    }

    try {
      await deleteProfessionAPI(id, currentCompany.id);
      enqueueSnackbar('Profesión eliminado con exito', {
        variant: 'success',
      });
      fetchProfession();
    } catch (e) {
      enqueueSnackbar('Hubo un error al eliminar la profesión eliminado', {
        variant: 'error',
      });
    }

  };

  const handleEditProfession = (id) => {
    // find category
    const Profession = Professions.find((Profession) => Profession.id === id);

    if (Profession === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'Profesion',
      id: Profession.id,
      title: 'Editar profesión',
      fields: [
        {
          label: 'Nivel de profesión',
          name: 'name',
          type: 'text',
          value: Profession.profesion,
        },
      ],
    });
    setOpenEditDialog(true);
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

  //Roles Company
  const companyRolsColumns = [
    {
      id: 'name',
      label: 'Rol',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];

  const handleCreateCompanyRols = () => {
    setCurrentCreate({
      type: 'companyRol',
      title: 'Crear Rol',
      fields: [
        {
          label: 'Rol',
          name: 'rol',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  const mapCompanyRols = (companyRol) =>
    companyRol.map((companyRol) => [
      {
        column: 'name',
        value: companyRol.rol,
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteCompanyRols,
          //handleEdit: handleEditCompanyRols,
          id: companyRol.id,
        },
      },
    ]);
  const handleDeleteCompanyRols = async (id) => {
    const companyRol = companyRols.find((companyRol) => companyRol.id === id);

    if (companyRol === undefined) {
      return;
    }

    try {
      await deleteRolCompanyAPI(id, currentCompany.id);
    } catch (e) {}
    enqueueSnackbar('Nivel de educacion eliminado con exito', {
      variant: 'success',
    });
  };

  const handleEditCompanyRols = (id) => {
    // find category
    const Profession = Professions.find((Profession) => Profession.id === id);

    if (Profession === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'companyRol',
      id: Profession.id,
      title: 'Editar nivel de educacion',
      fields: [
        {
          label: 'Nivel de profesion',
          name: 'name',
          type: 'text',
          value: Profession.profesion,
        },
      ],
    });
    setOpenEditDialog(true);
  };

  const fetchCompanyRol = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);
    const { data } = await fetchProfessionByCompanyAPI(currentCompany.id);
    setCompanyRols(data);
    setLoading(false);
  };
  //fin Roles Company
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
    const contractType = contractTypes.find(
      (contractType) => contractType.id === id
    );

    if (contractType === undefined) {
      return;
    }

    try {
      await deleteContractTypeAPI(id, currentCompany.id);
      enqueueSnackbar('Tipo contrato eliminado con éxito', {
        variant: 'success',
      });
      fetchContractType();
    } catch (e) {
      enqueueSnackbar('Hubo un error al eliminar Tipo contrato', {
        variant: 'success',
      });
    }

  };

  /**
   * Handle edit category.
   *
   * @param id
   */
  const handleEditContractType = (id) => {
    // find category
    const contractType = contractTypes.find(
      (contractType) => contractType.id === id
    );

    if (contractType === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'contractType',
      id: contractType.id,
      title: 'Editar tipo contrato',
      fields: [
        {
          label: 'Tipo Contrato',
          name: 'name',
          type: 'text',
          value: contractType.tipoContrato,
        },
      ],
    });
    setOpenEditDialog(true);
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
  const handleSubmittedEditDialog = async (formValues) => {
    if (currentEdit.type === 'contractType') {
      console.log(formValues);
      const contractType = contractTypes.find(
        (contractType) => contractType.id === currentEdit.id
      );

      if (contractType === undefined) {
        return;
      }

      contractType.documentType = formValues.documentType || contractType.documentType;

      try {
        await updateContractTypeAPI(contractType);
        enqueueSnackbar('Tipo de contrato actualizado con éxito', {
          variant: 'success',
        });
      } catch (e) {
        console.log(e);
        enqueueSnackbar('Hubo un error al actulizar el tipo de contrato', {
          variant: 'error',
        });
      }
    }
    if (currentEdit.type === 'documentType') {
      // find category
      const DocumentType = DocumentsTypes.find(
        (DocumentType) => DocumentType.id === currentEdit.id
      );

      if (DocumentType === undefined) {
        return;
      }

      DocumentType.tipoDocumento =
        formValues.name || DocumentType.tipoDocumento;

      try {
        await updateDocumentTypeAPI(DocumentType);
      } catch (e) {}
      enqueueSnackbar('Documento actualizada con éxito', {
        variant: 'success',
      });
    }
    if (currentEdit.type === 'englishLevel') {
      // find educacion
      const EnglishLevel = EnglishLevels.find(
        (EnglishLevel) => EnglishLevel.id === currentEdit.id
      );

      if (EnglishLevel === undefined) {
        return;
      }

      EnglishLevel.nivelIngles = formValues.name || EnglishLevel.nivelIngles;

      try {
        await updateEnglishLevelAPI(EnglishLevel);
      } catch (e) {}
      enqueueSnackbar('Nivel de ingles actualizado con exito', {
        variant: 'success',
      });
    }
    if (currentEdit.type === 'nivelEducacion') {
      // find educacion
      const EducationLevel = EducationLevels.find(
        (EducationLevel) => EducationLevel.id === currentEdit.id
      );

      if (EducationLevel === undefined) {
        return;
      }

      EducationLevel.nivelEducacion =
        formValues.name || EducationLevel.nivelEducacion;

      try {
        await updateEducationLevelAPI(EducationLevel);
      } catch (e) {}
      enqueueSnackbar('nivel de educacion actualizado con exito', {
        variant: 'success',
      });
    }
    if (currentEdit.type === 'disabilities') {
      // find category
      const Disabilities = disabilities.find(
        (Disabilities) => Disabilities.id === currentEdit.id
      );

      if (Disabilities === undefined) {
        return;
      }

      Disabilities.discapacIdades =
        formValues.name || Disabilities.discapacIdades;

      try {
        await updateDisabilitiesAPI(Disabilities);
      } catch (e) {}
      enqueueSnackbar('Discapacidad actualizada con exito', {
        variant: 'success',
      });
    }
    if (currentEdit.type === 'HiringType') {
      // find category
      const HiringType = HiringTypes.find(
        (HiringType) => HiringType.id === currentEdit.id
      );

      if (HiringType === undefined) {
        return;
      }

      HiringType.tipoContrato = formValues.name || HiringType.tipoContrato;

      try {
        await updateHiringTypeAPI(HiringType);
        enqueueSnackbar('Tipo de contratación actualizada con exito', {
          variant: 'success',
        });
        fetchHiringType();
      } catch (e) {
        enqueueSnackbar('Hubo un error al eliminar el Tipo de contratación', {
          variant: 'error',
        });
      }
    }

    if (currentEdit.type === 'gender') {
      // find category
      const Gender = Genders.find((Gender) => Gender.id === currentEdit.id);

      if (Gender === undefined) {
        return;
      }

      Gender.genero = formValues.name || Gender.genero;

      try {
        await updateGenderAPI(Gender);
      } catch (e) {}
      enqueueSnackbar('Género actualizado con exito', {
        variant: 'success',
      });
    }

    if (currentEdit.type === 'salaryType') {
      // find category
      const SalaryType = SalaryTypes.find(
        (SalaryType) => SalaryType.id === currentEdit.id
      );

      if (SalaryType === undefined) {
        return;
      }

      SalaryType.tipoDeSalario = formValues.name || SalaryType.tipoDeSalario;

      try {
        await updateSalaryTypeAPI(SalaryType);
      } catch (e) {}
      enqueueSnackbar('Tipo salario actualizado con exito', {
        variant: 'success',
      });
    }
    if (currentEdit.type === 'Profesion') {
      // find category
      const Profession = Professions.find(
        (Profession) => Profession.id === currentEdit.id
      );

      if (Profession === undefined) {
        return;
      }

      Profession.profesion = formValues.name || Profession.profesion;

      try {
        await updateProfessionAPI(Profession);
      } catch (e) {}
      enqueueSnackbar('nivel de educacion actualizado con exito', {
        variant: 'success',
      });
    }
    if (currentEdit.type === 'CollectiveWorkGrouptoWhichitBelongs') {
      // find category
      const CollectiveWorkGrouptoWhichitBelongs =
        collectiveWorkGrouptoWhichitBelongss.find(
          (CollectiveWorkGrouptoWhichitBelongs) =>
            CollectiveWorkGrouptoWhichitBelongs.id === currentEdit.id
        );

      if (CollectiveWorkGrouptoWhichitBelongs === undefined) {
        return;
      }

      CollectiveWorkGrouptoWhichitBelongs.grupoColectivoDeTrabajo =
        formValues.name ||
        CollectiveWorkGrouptoWhichitBelongs.grupoColectivoDeTrabajo;

      try {
        await updateCollectiveWorkGrouptoWhichitBelongsAPI(
          CollectiveWorkGrouptoWhichitBelongs
        );
      } catch (e) {}
      enqueueSnackbar(
        'Grupo de Trabajo Colectivo al que Pertenece actualizado con exito',
        {
          variant: 'success',
        }
      );
    }
    if (currentEdit.type === 'preferenciaSexual') {
      // find category
      const SexualPreference = sexualPreferences.find(
        (SexualPreference) => SexualPreference.id === currentEdit.id
      );

      if (SexualPreference === undefined) {
        return;
      }

      SexualPreference.preferenciaSexual =
        formValues.name || SexualPreference.nameCatogory;
      try {
        await updateSexualPreferenceAPI(SexualPreference);
      } catch (e) {}
      enqueueSnackbar('Preferencia sexual con exito', {
        variant: 'success',
      });
    }
    if (currentEdit.type === 'OrganizationalLevel') {
      // find organizacion
      const OrganizationalLevel = OrganizationalLevels.find(
        (OrganizationalLevel) => OrganizationalLevel.id === currentEdit.id
      );

      if (OrganizationalLevel === undefined) {
        return;
      }

      OrganizationalLevel.nivelOrganizacional =
        formValues.name || OrganizationalLevel.nivelOrganizacional;

      try {
        await updateOrganizationalLevelAPI(OrganizationalLevel);
      } catch (e) {}
      enqueueSnackbar('nivel de organizacion actualizado con exito', {
        variant: 'success',
      });
    }
    if (currentEdit.type === 'estados-civiles') {
      // find category
      const MaritalStatus = maritalStatuses.find(
        (MaritalStatus) => MaritalStatus.id === currentEdit.id
      );

      if (MaritalStatus === undefined) {
        return;
      }

      MaritalStatus.estadoCivil = formValues.name || MaritalStatus.nameCatogory;
      try {
        await updateMaritalStatusAPI(MaritalStatus);
      } catch (e) {}
      enqueueSnackbar('Estado civil con exito', {
        variant: 'success',
      });
    }

    if (currentEdit.type === 'companyRol') {
      // find category
      const MaritalStatus = maritalStatuses.find(
        (MaritalStatus) => MaritalStatus.id === currentEdit.id
      );

      if (MaritalStatus === undefined) {
        return;
      }

      MaritalStatus.estadoCivil = formValues.name || MaritalStatus.nameCatogory;
      try {
        await updateMaritalStatusAPI(MaritalStatus);
      } catch (e) {}
      enqueueSnackbar('Estado civil con exito', {
        variant: 'success',
      });
    }

    setCurrentEdit(null);
    setOpenEditDialog(false);
  };

  /**
   * Handle submitted create dialog.
   *
   * @param formValues
   * @returns {Promise<void>}
   */
  const handleSubmittedCreateDialog = async (formValues) => {
    if (currentCreate.type === 'contractType') {
      try {
        await storeContractTypeAPI({
          idCompany: currentCompany.id,
          tipoContrato: formValues.tipoContrato,
        });
        fetchContractType();
        enqueueSnackbar('Tipo Contrato creado con éxito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear el Tipo Contrato', {
          variant: 'error',
        });
      }

    }
    if (currentCreate.type === 'documentType') {
      try {
        await storeDocumentTypeAPI({
          idCompany: currentCompany.id,
          tipoDocumento: formValues.tipoDocumento,
        });
        enqueueSnackbar('Tipo de documento creado con éxito', {
          variant: 'success',
        });
        fetchDocumentType();
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear Tipo de documento', {
          variant: 'error',
        });
      }

    }
    if (currentCreate.type === 'englishLevel') {
      try {
        await storeEnglishLevelAPI({
          idCompany: currentCompany.id,
          nivelIngles: formValues.nivelIngles,
        });
        fetchEnglishLevel();
        enqueueSnackbar('Nivel de ingles creado con exito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear Nivel de ingles', {
          variant: 'error',
        });
      }

    }
    if (currentCreate.type === 'educationLevel') {
      try {
        await storeEducationLevelAPI({
          idCompany: currentCompany.id,
          nivelEducacion: formValues.nivelEducacion,
        });
        fetchEducationLevel();
        enqueueSnackbar('Nivel de educacion creado con exito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear Nivel de educacion', {
          variant: 'success',
        });
      }

    }
    if (currentCreate.type === 'disabilities') {
      try {
        await storeDisabilitiesAPI({
          idCompany: currentCompany.id,
          discapacIdades: formValues.disabilities,
        });
        fetchDisabilities();
        enqueueSnackbar('Discapacidad creada con exito', {
          variant: 'success',
        });
      } catch (e) {
        console.log(e);
        enqueueSnackbar('Hubo un error al crear Discapacidad', {
          variant: 'error',
        });
      }

    }
    if (currentCreate.type === 'HiringType') {
      try {
        await storeHiringTypeAPI({
          idCompany: currentCompany.id,
          tipoContrato: formValues.tipoContrato,
        });
        fetchHiringType();
        enqueueSnackbar('Tipo contratación creado con exito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear Tipo de contratación ', {
          variant: 'error',
        });
      }
    }
    if (currentCreate.type === 'gender') {
      try {
        await storeGenderAPI({
          idCompany: currentCompany.id,
          genero: formValues.gender,
        });
        fetchGender();
        enqueueSnackbar('Género creado con exito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear Género', {
          variant: 'error',
        });
      }

    }
    if (currentCreate.type === 'salaryType') {
      try {
        await storeSalaryTypeAPI({
          idCompany: currentCompany.id,
          tipoDeSalario: formValues.salaryType,
        });
        enqueueSnackbar('Tipo salario creado con exito', {
          variant: 'success',
        });
        fetchSalaryType();
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear Tipo salario', {
          variant: 'error',
        });
      }

    }

    if (currentCreate.type === 'Profesion') {
      try {
        await storeProfessionAPI({
          idCompany: currentCompany.id,
          profesion: formValues.profesion,
        });
        enqueueSnackbar('Profesion creada con exito', {
          variant: 'success',
        });
        fetchProfession();
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear profesion', {
          variant: 'error',
        });
      }

    }
    if (currentCreate.type === 'CollectiveWorkGrouptoWhichitBelongs') {
      try {
        await storeCollectiveWorkGrouptoWhichitBelongsAPI({
          idCompany: currentCompany.id,
          grupoColectivoDeTrabajo: formValues.grupoColectivoDeTrabajo,
        });
        fetchCollectiveWorkGrouptoWhichitBelongs();
        enqueueSnackbar(
          'Grupo de Trabajo Colectivo al que Pertenece creado con exito',
          {
            variant: 'success',
          }
        );
      } catch (e) {
        enqueueSnackbar(
          'Hubo un error al crear Grupo de Trabajo Colectivo al que Pertenece',
          {
            variant: 'error',
          }
        );
      }

    }
    if (currentCreate.type === 'preferenciaSexual') {
      try {
        await storeSexualPreferenceAPI({
          idCompany: currentCompany.id,
          preferenciaSexual: formValues.preferenciaSexual,
        });
        enqueueSnackbar('Preferencia sexual creado con exito', {
          variant: 'success',
        });
        fetchSexualPreference();
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear Preferencia sexual', {
          variant: 'error',
        });
      }

    }
    if (currentCreate.type === 'estadoCivil') {
      try {
        await storeMaritalStatusAPI({
          idCompany: currentCompany.id,
          estadoCivil: formValues.estadoCivil,
        });
        fetchMaritalStatus();
        enqueueSnackbar('Estado civil creado con exito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear Estado civil', {
          variant: 'error',
        });
      }

    }
    if (currentCreate.type === 'OrganizationalLevel') {
      try {
        await storeOrganizationalLevelAPI({
          idCompany: currentCompany.id,
          nivelOrganizacional: formValues.nivelOrganizacional,
        });
        fetchOrganizationalLevel();
        enqueueSnackbar('Nivel organizacional creada con exito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear Nivel organizacional', {
          variant: 'error',
        });
      }

    }

    if (currentCreate.type === 'companyRol') {
      try {
        await storeRolCompanyAPI({
          idCompany: currentCompany.id,
          rol: formValues.rol,
        });
        enqueueSnackbar('Rol creado con éxito', {
          variant: 'success',
        });
      } catch (e) {
        console.log(e);
        enqueueSnackbar('Hubo un error al crear el Rol', {
          variant: 'error',
        });
      }
    }
    setCurrentCreate(null);
    setOpenCreateDialog(false);
  };

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
   * Fetch fields.
   *
   * @returns {Promise<void>}
   */
  const fetchRolCompany = async () => {
    console.log(currentCompany);
    if (!currentCompany) {
      return;
    }

    // fetch journeys by map and company
    const { data } = await fetchRolCompanyAPI(currentCompany.id);
    setCompanyRols(data);
  };

  // component did mount
  useEffect(() => {
  
    fetchEducationLevel();
    fetchDisabilities();
      /*
    fetchHiringType();
    fetchGender();
    fetchSalaryType();
    fetchProfession();
    fetchCollectiveWorkGrouptoWhichitBelongs();
    fetchSexualPreference();
    fetchOrganizationalLevel();
    fetchMaritalStatus();
    fetchCompanyRol();
    fetchRolCompany();*/
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    fetchCollectiveWorkGrouptoWhichitBelongs();
    fetchSexualPreference();
    fetchOrganizationalLevel();
    fetchMaritalStatus();
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

  const employee = [
    {
      field: 'sede',
      flex: 1,
      headerName: 'Nombre',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'corroe',
      flex: 1,
      headerName: 'Correo electrónico',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fecha',
      flex: 1,
      headerName: 'Fecha de admisión',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'cargo',
      flex: 1,
      headerName: 'Cargo',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'area',
      flex: 1,
      headerName: 'Área',
      headerAlign: 'center',
      align: 'center',
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
          <IconButton onClick={() => handleDeleteItem(params.row._id)}>
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

  const department = [
    {
      field: 'codigoDepartamento',
      flex: 1,
      headerName: 'Department Code',
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
      field: 'departamento',
      flex: 1,
      headerName: 'departamento',
      headerAlign: 'center',
      align: 'center',
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
          <IconButton onClick={() => handleDeleteItem(params.row._id)}>
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
      case 'Oficinas':
        return office;
      case 'Otros campos':
        return office;
      case 'Empleados':
        return employee;
      case 'dashboard':
        return dashboard;
      case 'report':
        return report;
      case 'Departamentos':
        return department;
      default:
        return null;
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
    //"Colecito,",
    'Preferencia sexual',
    'Estado civil',
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
                          {/* categories 
                          <Tab
                            label="Grupo de Trabajo Colectivo al que Pertenece"
                            id="settings-tab-9"
                          />*/}
                          <Tab
                            label="Preferencia sexual"
                            id="settings-tab-9"
                          />
                          <Tab label="Estado civil" id="settings-tab-10" />
                          <Tab
                            label="Nivel Organizacional"
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
                      {/* Grupo de Trabajo Colectivo al que Pertenece
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
                                onClick={
                                  handleCreateCollectiveWorkGrouptoWhichitBelongs
                                }
                              >
                                Crear Grupo de Trabajo Colectivo al que
                                Pertenece
                              </Button>
                            </Stack>
                            <MyTable
                              title={
                                "Grupo de Trabajo Colectivo al que Pertenece"
                              }
                              columns={
                                CollectiveWorkGrouptoWhichitBelongsColumns
                              }
                              rows={mapCollectiveWorkGrouptoWhichitBelongs(
                                collectiveWorkGrouptoWhichitBelongss
                              )}
                            />
                          </Box>
                        )}
                      </div>*/}
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
                      {/* Prferencia sexual*/}
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
                                Nivel Organizacional
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
                    </Box>
                  </Box>
                </MyCard>
              )}
            </div>
          </div>
        </div>

        {/* edit form */}
        {currentEdit !== null && (
          <MyEditDialog
            onClose={handleCloseEditDialog}
            onSubmit={handleSubmittedEditDialog}
            title={currentEdit.title}
            open={openEditDialog}
            fields={currentEdit.fields}
          />
        )}

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
