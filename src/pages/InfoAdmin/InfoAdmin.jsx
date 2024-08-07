import { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useSnackbar } from 'notistack';

import Building from '../../assets/Building.svg';
import MyCreateDialog2 from '../../components/MyCreateDialog2/MyCreateDialog2';
import MyEditDialog2 from '../../components/MyEditDialog2/MyEditDialog2';
import Notification from '../../components/Notification';
import { fetchCompanies } from '../../features/companies/companiesSlice';
import { fetchActiveCompany, setDrop } from '../../features/employe/employe';
import { fetchCompanyMultiUser } from '../../features/employe/employe';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import {
  deleteCompanyAPI,
  storeCompanyAPI,
  updateCompaniesAPI,
  updateStateCompanyAPI,
} from '../../services/getCompanies.service';
import { getCompaniesByIdAPI } from '../../services/getCompanies.service';
import {
  deleteContractTypeAPI,
  fetchContractTypeByCompanyAPI,
  storeContractTypeAPI,
} from '../../services/getContractType.service';
import { getAllCountryAPI } from '../../services/getCountry.service';
import {
  deleteDisabilitiesAPI,
  fetchDisabilitiesByCompanyAPI,
  storeDisabilitiesAPI,
} from '../../services/getDisabilities.service';
import {
  fetchDocumentTypeAPI,
  storeDocumentTypeAPI,
} from '../../services/getDocumentType.service';
import {
  deleteEducationLevelAPI,
  fetchEducationLevelByCompanyAPI,
  storeEducationLevelAPI,
} from '../../services/getEducationLevel.service';
import { updateEmployeeAPI } from '../../services/getEmployees.service';
import {
  deleteEnglishLevelAPI,
  fetchEnglishLevelByCompanyAPI,
  storeEnglishLevelAPI,
} from '../../services/getEnglishLevel.service';
import {
  deleteGenderAPI,
  fetchGenderByCompanyAPI,
  storeGenderAPI,
} from '../../services/getGender.service';
import {
  deleteHiringTypeAPI,
  fetchHiringTypeByCompanyAPI,
  storeHiringTypeAPI,
} from '../../services/getHiringType.service';
import {
  deleteMaritalStatusAPI,
  fetchMaritalStatusByCompanyAPI,
  storeMaritalStatusAPI,
} from '../../services/getMaritalStatus.service';
import {
  deleteOrganizationalLevelAPI,
  fetchOrganizationalLevelByCompanyAPI,
  storeOrganizationalLevelAPI,
} from '../../services/getOrganizationalLevel.service';
import {
  deleteProfessionAPI,
  fetchProfessionByCompanyAPI,
  storeProfessionAPI,
} from '../../services/getProfession.service';
import {
  deleteRolCompanyAPI,
  fetchRolCompanyAPI,
  storeRolCompanyAPI,
} from '../../services/getRolCompany.service';
import {
  deleteSalaryTypeAPI,
  fetchSalaryTypeByCompanyAPI,
  storeSalaryTypeAPI,
} from '../../services/getSalaryType.service';
import { fetchSectorAPI } from '../../services/getSector.service';
import {
  deleteSexualPreferenceAPI,
  fetchSexualPreferenceByCompanyAPI,
  storeSexualPreferenceAPI,
} from '../../services/getSexualPreference.service';
import { fetchSizeCompanyAPI } from '../../services/getSizeCompany.service';
import {
  deleteWorkingDayAPI,
  fetchWorkingDayByCompanyAPI,
  storeWorkingDayAPI,
} from '../../services/getWorkingDay.service';
import axios from '../../utils/axiosInstance';
import { createForm, handleDelete } from '../../utils/helpers';
import Error from '../Error/Error';

import DataAdministration from './components/DataAdministration';
import {
  departmentsColumns,
  useCreateDepartment,
  useDepartment,
} from './department/departmentData';
import {
  employeesColumns,
  useCreateEmployee,
  useEmployee,
} from './employees/employeesData';
import {
  officesColumns,
  useCreateOffice,
  useOffice,
} from './office/officeData';
import { useContractType } from './OtrosCampos/contractTypeData';
import { useDocumentType } from './OtrosCampos/documentTypeData';

import styles from './InfoAdmin.module.css';

export default function InfoAdmin() {
  const [englishLevels, setNivelIngles] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [disabilities, setDisabilities] = useState([]);
  const [hiringTypes, setHiringTypes] = useState([]);
  const [salaryTypes, setSalaryTypes] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sexualPreferences, setPreferenciaSexual] = useState([]);
  const [organizationalLevels, setOrganizationalLevels] = useState([]);
  const [maritalStatuses, setEstadoCivil] = useState([]);
  const [workingDays, setWorkingDay] = useState([]);
  const [companyRols, setCompanyRols] = useState([]);
  const [companies, setCompany] = useState([]);
  const [sectors, setSector] = useState([]);
  const [sizeCompanies, setSizeCompany] = useState([]);
  const [countries, setCountry] = useState([]);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [switchValues, setSwitchValues] = useState({});
  const [editLogo, setEditLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentCreate, setCurrentCreate] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [domains, setDomains] =  useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { type } = useParams();

  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const currentMultiCompanies = useSelector(
    (state) => state.activeCompanies.companiesMultiUser
  );
  const { enqueueSnackbar } = useSnackbar();

  const {
    DocumentsTypes,
    documentTypeColumns,
    mapDocumentType,
    handleCreateDocumentType,
    fetchDocumentType,
  } = useDocumentType(setCurrentCreate, setOpenCreateDialog);
  const {
    contractTypes,
    contractTypeColumns,
    setContractType,
    mapContractType,
    fetchContractType,
    handleCreateContractType,
  } = useContractType({currentCompany, setCurrentCreate, setOpenCreateDialog});

  const { offices, mapOffice, fetchOffice, handleSubmittedCreateOffice } =
    useOffice(currentCompany);
  const { handleCreateOffice } = useCreateOffice(
    setOpenCreateDialog,
    setCurrentCreate
  );
  const {
    departments,
    mapDepartment,
    fetchDepartments,
    handleSubmittedCreateDepartment,
  } = useDepartment(currentCompany);
  const { handleCreateDepartment } = useCreateDepartment(
    setOpenCreateDialog,
    setCurrentCreate
  );

  const {
    handleCreateEmployee,
    mapEmployee,
    setEmployees,
    setPersons,
    setSegments,
    employees,
    persons,
    fetchEmployee,
    handleSubmittedCreateEmployee,
    fetchCity,
    fetchArea,
    fetchPerson,
  } = useEmployee(
    setOpenCreateDialog,
    setCurrentCreate,
    setOpenEditDialog,
    setCurrentEdit,
    currentCompany,
    contractTypes,
    DocumentsTypes,
    englishLevels,
    educationLevels,
    disabilities,
    hiringTypes,
    salaryTypes,
    professions,
    genders,
    sexualPreferences,
    organizationalLevels,
    maritalStatuses,
    workingDays,
    offices,
    companyRols
  );

  const csvLink = useRef();
  const importcsv = useRef();

  const [values, setValues] = useState({
    isOpen: false,
    messageEmployee: '',
    severity: '',
  });

  const [employecsv, setEmployecsv] = useState('');

  const handleCloseEditDialog = () => {
    setCurrentEdit(null);
    setOpenEditDialog(false);
  };

  /**
   * Handle close create dialog.
   */
  const handleCloseCreateDialog = () => {
    setCurrentCreate(null);
    setFile(null);
    setOpenCreateDialog(false);
  };

  const fetchSizeCompany = async () => {
    const { data: sizeCompanyData } = await fetchSizeCompanyAPI();
    setSizeCompany(sizeCompanyData);
  };

  const fetchSector = async () => {
    const { data: sectorData } = await fetchSectorAPI();
    setSector(sectorData);
  };

  const fetchCountry = async () => {
    const { data: countryData } = await getAllCountryAPI();
    setCountry(countryData);
  };

  const handleSubmittedCreateDialog = async (formValues) => {
    createForm(
      createConfigs,
      currentCreate,
      currentCompany,
      formValues,
      enqueueSnackbar
    );
    if (currentCreate.type === 'company') {
      try {
        let urlLogo = await createLogotipo(formValues);
        await storeCompanyAPI({
          idUser: userInfo.user,
          nombreCompania: formValues.companyName,
          Logotipo: urlLogo,
          IdPais: formValues.country,
          Sede: formValues.sede,
          direccion: formValues.address,
          IdTamanoCompania: formValues.sizeCompany,
          SectorId: formValues.sector,
          dominio: formValues.dominio,
        });
        dispatch(fetchCompanyMultiUser({ idUser: userInfo.user }));
        enqueueSnackbar('Compañía creada con éxito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear la compañía', {
          variant: 'error',
        });
      }
    }
    if (currentCreate.type === 'office') {
      handleSubmittedCreateOffice(formValues);
    }
    if (currentCreate.type === 'department') {
      handleSubmittedCreateDepartment(formValues);
    }

    if (currentCreate.type === 'employee') {
      handleSubmittedCreateEmployee(formValues);
    }

    if (currentCreate.type === 'companyRol') {
      try {
        const { data } = await storeRolCompanyAPI({
          idCompany: currentCompany.id,
          rol: formValues.rol,
        });
        setCompanyRols((prevRoles) => [...prevRoles, data]);
        enqueueSnackbar('Rol creado con éxito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear el rol', {
          variant: 'error',
        });
      }
    }
    setCurrentCreate(null);
    setOpenCreateDialog(false);
  };

  const createLogotipo = async (formValues) => {
    let urlLogo = null;
    if (file) {
      const formData = new FormData();
      formData.append('logoTipo', file);
      try {
        const response = await axios.post(
          `Autenticacion/LogoCompany?BussinesName=${formValues.companyName}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response) {
          urlLogo = response.data.urlLogo;
        } else {
          console.error('Error al subir la imagen:', response.statusText);
        }
      } catch (error) {
      }
    }
    return urlLogo;
  };

  const handleSubmittedEditDialog = async (formValues) => {
    if (currentEdit.type === 'company') {
      try {
        let urlLogo = await createLogotipo(formValues);
        await updateCompaniesAPI({
          id: currentEdit.id,
          nombreCompania: formValues.companyName,
          Logotipo: urlLogo,
          IdPais: formValues.country,
          Sede: formValues.sede,
          direccion: formValues.address,
          IdTamanoCompania: formValues.sizeCompany,
          SectorId: formValues.sector,
          dominio: formValues.dominio,
        });

        dispatch(fetchCompanyMultiUser({ idUser: userInfo.user }));
        dispatch(fetchCompanies({ idUser: userInfo.user }));
        enqueueSnackbar('Compañía actualizada con éxito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear la compañía', {
          variant: 'error',
        });
      }
    }
    if (currentEdit.type === 'employee') {
      // find category
      const employeeToEdit = employees.find(
        (employee) => employee.id === currentEdit.id
      );
      const Person = persons.find(
        (person) => person.id === employeeToEdit.IdPersona
      );
      if (employeeToEdit === undefined || Person === undefined) {
        return;
      }

      const person = {
        id: Person.id,
        numeroDocumento: formValues.documentNumber || null,
        nombres: formValues.name || null,
        apellIdos: formValues.lastName || null,
        edad: formValues.ageEmployee || null,
        numeroTelefonico: formValues.phoneNumber || null,
        direccion: formValues.address || null,
        correoElectronico: formValues.email || null,
        fechaNacimiento: formValues.birthdate || null,
        IdTipoDocumento: formValues.documentType || null,
        IdGenero: formValues.city || null,
        IdCiudad: formValues.gender || null,
      };

      const employee = {
        id: employeeToEdit.id || 0,
        FechaAdmision: formValues.fechaAdmision || null,
        supervisor: formValues.supervisor || null,
        IdCompania: currentCompany.id,
        rollCompania: formValues.rol || null,
        areaId: formValues.area || null,
      };

      const segments = {
        id: Person.IdSegmentos || 0,
        antiguedadEnElTrabajo: formValues.antiguedadTrabajo || null,
        EstadoParental: formValues.parentalStatus || null,
        ResultadoUltimaEvaluacionDesempeno: formValues.lastResult || null,
        NumerodeHijos: formValues.childNumber || null,
        IdNivelOrganizacional: formValues.organizationalLevel || null,
        IdTipodeContrato: formValues.contractType || null,
        IdTipodeContratacion: formValues.hiringType || null,
        IdDisabilities: formValues.disabilities || null,
        IdSexualPreference: formValues.sexualPreference || null,
        IdCampus: formValues.campus || null,
        IdEnglishLevel: formValues.englishLevel || null,
        IdEducationLevel: formValues.educationLevel || null,
        IdProfession: formValues.profession || null,
        IdJornada: formValues.workingDay || null,
        IdSalaryType: formValues.salaryType || null,
        IdEstadoCivil: formValues.maritalStatus || null,
      };

      const employeeData = {
        person,
        employee,
        segments,
      };

      try {
        await updateEmployeeAPI(employeeData);
        fetchEmployee();
        enqueueSnackbar('Empleado actualizado con éxito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al actualizar el Empleado', {
          variant: 'error',
        });
      }
    }
    setCurrentEdit(null);
    setOpenEditDialog(false);
  };

  // Company

  const createCompanyColumns = (condition) => {
    const companyColumns = [
      {
        id: 'name',
        label: 'Nombre compañía',
        numeric: false,
      },
      {
        id: 'country',
        label: 'País',
        numeric: false,
      },
      {
        id: 'sede',
        label: 'Sede',
        numeric: false,
      },
      {
        id: 'sizeCompany',
        label: 'Tamaño Empresa',
        numeric: false,
      },
      {
        id: 'sector',
        label: 'Sector',
        numeric: false,
      },
      {
        id: 'options',
        label: 'Opciones',
        numeric: false,
      },
    ];

    if (condition) {
      companyColumns.push({
        id: 'active',
        label: 'Activar',
        numeric: false,
      });
    }

    return companyColumns;
  };

  const companyColumns = createCompanyColumns(
    userInfo?.role.findIndex((p) => p === 'Administrador') > 0
  );

  const handleEditCompany = (id) => {
    const companyData = companies.find((company) => company.id === id);
    const sizeCompany = sizeCompanies.find(
      (sizeCompany) => sizeCompany.id === companyData.IdTamanoCompania
    );
    const country = countries.find(
      (country) => country.id === companyData.IdPais
    );
    const sector = sectors.find((sector) => sector.id === companyData.SectorId);
    if (companyData === undefined) {
      return;
    }
    setEditLogo(companyData.Logotipo);
    setCurrentEdit({
      type: 'company',
      id: companyData.id,
      title: 'Editar Empresa',
      fields: [
        {
          label: 'Nombre Compañía',
          name: 'companyName',
          type: 'text',
          isRequired: true,
          value: companyData.nombreCompania,
        },
        {
          label: 'País',
          name: 'country',
          type: 'select',
          isRequired: true,
          value: (country && country.id) || null,
          options: countries.map((country) => ({
            value: country.id,
            label: country.value,
          })),
        },
        {
          label: 'Dirección',
          name: 'address',
          type: 'text',
          value: companyData.direccion,
          isRequired: true,
        },
        {
          label: 'Sede',
          name: 'sede',
          type: 'text',
          value: companyData.Sede,
          isRequired: true,
        },
        {
          label: 'Tamaño Empresa',
          name: 'sizeCompany',
          type: 'select',
          isRequired: true,
          value: (sizeCompany && sizeCompany.id) || null,
          options: sizeCompanies.map((sizeCompany) => ({
            value: sizeCompany.id,
            label: sizeCompany.quantityOfEmployees,
          })),
        },
        {
          label: 'Sector',
          name: 'sector',
          type: 'select',
          isRequired: true,
          value: (sector && sector.id) || null,
          options: sectors.map((sector) => ({
            value: sector.id,
            label: sector.Sector,
          })),
        },
        {
          label: 'Dominio',
          name: 'dominio',
          type: 'options',
          isRequired: true,
          options: companyData.Dominio ? 
          companyData.Dominio.split(',').map((item, index) => ({
            id: index + 1,
            value: item,
          })) : 
          [{
            id: 1,
            value: '', 
          }],
        },
      ],
    });
    setOpenEditDialog(true);
  };

  const handleCreateCompany = () => {
    setCurrentCreate({
      type: 'company',
      title: 'Crear Empresa',
      fields: [
        {
          label: 'Nombre Compañía',
          name: 'companyName',
          type: 'text',
          isRequired: true,
        },
        {
          label: 'País',
          name: 'country',
          type: 'select',
          isRequired: true,
          options: countries.map((country) => ({
            value: country.id,
            label: country.value,
          })),
        },
        {
          label: 'Dirección',
          name: 'address',
          type: 'text',
          isRequired: true,
        },
        {
          label: 'Sede',
          name: 'sede',
          type: 'text',
          isRequired: true,
        },
        {
          label: 'Tamaño Empresa',
          name: 'sizeCompany',
          type: 'select',
          isRequired: true,
          options: sizeCompanies.map((sizeCompany) => ({
            value: sizeCompany.id,
            label: sizeCompany.quantityOfEmployees,
          })),
        },
        {
          label: 'Sector',
          name: 'sector',
          type: 'select',
          isRequired: true,
          options: sectors.map((sector) => ({
            value: sector.id,
            label: sector.Sector,
          })),
        },
        {
          label: 'Dominios',
          name: 'dominio',
          type: 'options',
          isRequired: true,
          options: [{ id: 1, value: '', error: false }],
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  const mapCompanies = (companies) =>
    companies.map((company) => {
      const columns = [
        {
          column: 'name',
          value: company.nombreCompania,
        },
        {
          column: 'country',
          value: company.nombrePais,
        },
        {
          column: 'Sede',
          value: company.Sede,
        },
        {
          column: 'sizeCompany',
          value: company.nombreTamañoCompañia,
        },
        {
          column: 'sector',
          value: company.nombreSector,
        },
        {
          column: 'options',
          value: '',
          payload: {
            handleDelete: handleDeleteCompany,
            handleEdit: handleEditCompany,
            id: company.id,
          },
        },
      ];

      if (userInfo?.role.findIndex((p) => p === 'Administrador') > 0) {
        columns.push({
          column: 'active',
          value:
            company.id !== 1 ? (
              <Switch
                checked={
                  switchValues.hasOwnProperty(company.id)
                    ? switchValues[company.id]
                    : company.isActive
                }
                onChange={(event) => handleSwitchChange(company.id, event)}
                color="primary"
                name={`switchValue_${company.id}`}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            ) : null,
        });
      }

      return columns;
    });

  const handleSwitchChange = async (id, event) => {
    const newValue = event.target.checked;
    setSwitchValues({ ...switchValues, [id]: newValue });
    await updateStateCompanyAPI(id, newValue);
    dispatch(fetchActiveCompany({ idUser: userInfo.user }));
    if (!newValue) dispatch(setDrop(null));
  };

  const handleDeleteCompany = async (id) => {
    const company = companies.find((company) => company.id === id);
    if (company === undefined) {
      return;
    }

    try {
      await deleteCompanyAPI(id);
      dispatch(fetchCompanyMultiUser({ idUser: userInfo.user }));
      enqueueSnackbar('Compañía eliminada con exito', {
        variant: 'success',
      });
    } catch (e) {
      enqueueSnackbar('Error eliminar crear la compañía', {
        variant: 'error',
      });
    }
  };

  const fetchCompany = async () => {
    if (!currentCompany) {
      return;
    }

    const { data: sector } = await fetchSectorAPI();

    const sectorNames = sector.reduce((acc, sector) => {
      acc[sector.id] = sector.Sector;
      return acc;
    }, {});

    const { data: country } = await getAllCountryAPI();
    const countryNames = country.reduce((acc, country) => {
      acc[country.id] = country.value;
      return acc;
    }, {});

    const {data: domain} = await getCompaniesByIdAPI(currentCompany.id);
    const { data: sizeCompany } = await fetchSizeCompanyAPI();
    const sizeCompanyNames = sizeCompany.reduce((acc, sizeCompany) => {
      acc[sizeCompany.id] = sizeCompany.quantityOfEmployees;
      return acc;
    }, {});

    if (!currentMultiCompanies) return;
    const company = currentMultiCompanies.map((company) => ({
      ...company,
      nombreSector: sectorNames[company.SectorId],
      nombreTamañoCompañia: sizeCompanyNames[company.IdTamanoCompania],
      nombrePais: countryNames[company.IdPais],
      domain: domains.Dominio,
    }));
    setCompany(company);
  };
  // Fin company

  
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
      enqueueSnackbar('Rol eliminado con exito', {
        variant: 'success',
        autoHideDuration: 3000,
      });
      setCompanyRols((companyRol) =>
        companyRol.filter((companyRol) => companyRol.id !== id)
      );
    } catch (e) {
      enqueueSnackbar('Error eliminar crear Rol', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  const fetchCompanyRol = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchRolCompanyAPI(currentCompany.id);
    setCompanyRols(data);
  };
  //fin Roles Company

  //Other fields
  //Contract Type

  // Document Type

  //Fin Document Type

  //Nivel de ingles
  const englishLevelColumns = [
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
    handleDelete(
      id,
      currentCompany,
      englishLevels,
      setNivelIngles,
      deleteEnglishLevelAPI,
      enqueueSnackbar,
      'Nivel de inglés'
    );
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
  const educationLevelColumns = [
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
    handleDelete(
      id,
      currentCompany,
      educationLevels,
      setEducationLevels,
      deleteEducationLevelAPI,
      enqueueSnackbar,
      'Nivel de educación'
    );
  };

  const fetchEducationLevel = async () => {
    if (!currentCompany) {
      return;
    }
    const { data } = await fetchEducationLevelByCompanyAPI(currentCompany.id);
    setEducationLevels(data);
  };
  //fin de educacion

  //Disabilities
  const disabilitiesColumns = [
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
    handleDelete(
      id,
      currentCompany,
      disabilities,
      setDisabilities,
      deleteDisabilitiesAPI,
      enqueueSnackbar,
      'Discapacidad'
    );
  };

  const fetchDisabilities = async () => {
    if (!currentCompany) {
      return;
    }
    const { data } = await fetchDisabilitiesByCompanyAPI(currentCompany.id);
    setDisabilities(data);
  };
  //fin discapacidades

  //Tipo de cotratacion
  const hiringTypeColumns = [
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
  const mapHiringType = (hiringType) =>
    hiringType.map((hiringType) => [
      {
        column: 'name',
        value: hiringType.tipoContrato, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteHiringType,
          //handleEdit: handleEditHiringType,
          id: hiringType.id,
        },
      },
    ]);
  const handleDeleteHiringType = async (id) => {
    handleDelete(
      id,
      currentCompany,
      hiringTypes,
      setHiringTypes,
      deleteHiringTypeAPI,
      enqueueSnackbar,
      'Tipo de contratación'
    );
  };

  const fetchHiringType = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchHiringTypeByCompanyAPI(currentCompany.id);
    setHiringTypes(data);
  };
  //fin discapacidades HiringType

  //Gender
  const genderColumns = [
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
  const mapGender = (gender) =>
    gender.map((gender) => [
      {
        column: 'name',
        value: gender.genero, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteGender,
          //handleEdit: handleEditGender,
          id: gender.id,
        },
      },
    ]);
  const fetchGender = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchGenderByCompanyAPI(currentCompany.id);
    setGenders(data);
  };
  const handleDeleteGender = async (id) => {
    handleDelete(
      id,
      currentCompany,
      genders,
      setGenders,
      deleteGenderAPI,
      enqueueSnackbar,
      'Género'
    );
  };

  //fin  Gender

  //SalaryType
  const salaryTypeColumns = [
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
  const mapSalaryType = (salaryType) =>
    salaryType.map((salaryType) => [
      {
        column: 'name',
        value: salaryType.tipoDeSalario, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteSalaryType,
          //handleEdit: handleEditSalaryType,
          id: salaryType.id,
        },
      },
    ]);
  const handleDeleteSalaryType = async (id) => {
    handleDelete(
      id,
      currentCompany,
      salaryTypes,
      setSalaryTypes,
      deleteSalaryTypeAPI,
      enqueueSnackbar,
      'Tipo Salario'
    );
  };

  const fetchSalaryType = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchSalaryTypeByCompanyAPI(currentCompany.id);
    setSalaryTypes(data);
  };
  //fin  SalaryType

  //Nivel de profession
  const professionColumns = [
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
  const mapProfession = (profession) =>
    profession.map((profession) => [
      {
        column: 'name',
        value: profession.profesion, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteProfession,
          //handleEdit: handleEditProfession,
          id: profession.id,
        },
      },
    ]);

  const fetchProfessions = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchProfessionByCompanyAPI(currentCompany.id);
    setProfessions(data);
  };
  const handleDeleteProfession = async (id) => {
    handleDelete(
      id,
      currentCompany,
      professions,
      setProfessions,
      deleteProfessionAPI,
      enqueueSnackbar,
      'Profesión'
    );
  };
  // Fin Professions

  //SexualPreference
  const sexualPreferenceColumns = [
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
  const mapSexualPreference = (sexualPreference) =>
    sexualPreference.map((sexualPreference) => [
      {
        column: 'name',
        value: sexualPreference.preferenciaSexual, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteSexualPreference,
          //handleEdit: handleEditSexualPreference,
          id: sexualPreference.id,
        },
      },
    ]);
  const handleDeleteSexualPreference = async (id) => {
    handleDelete(
      id,
      currentCompany,
      sexualPreferences,
      setPreferenciaSexual,
      deleteSexualPreferenceAPI,
      enqueueSnackbar,
      'Preferencia Sexual'
    );
  };

  const fetchSexualPreference = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchSexualPreferenceByCompanyAPI(currentCompany.id);
    setPreferenciaSexual(data);
  };
  //fin  SexualPreference
  //Nivel de organizacion
  const organizationalLevelColumns = [
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

  const mapOrganizationalLevel = (organizationalLevel) =>
    organizationalLevel.map((organizationalLevel) => [
      {
        column: 'name',
        value: organizationalLevel.nivelOrganizacional, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteOrganizationalLevel,
          //handleEdit: handleEditOrganizationalLevel,
          id: organizationalLevel.id,
        },
      },
    ]);
  const handleDeleteOrganizationalLevel = async (id) => {
    handleDelete(
      id,
      currentCompany,
      organizationalLevels,
      setOrganizationalLevels,
      deleteOrganizationalLevelAPI,
      enqueueSnackbar,
      'Nivel organizacional'
    );
  };

  const fetchOrganizationalLevel = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchOrganizationalLevelByCompanyAPI(
      currentCompany.id
    );
    setOrganizationalLevels(data);
  };

  //fin orgaizacion
  //MaritalStatus
  const maritalStatusColumns = [
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
  const mapMaritalStatus = (maritalStatus) =>
    maritalStatus.map((maritalStatus) => [
      {
        column: 'name',
        value: maritalStatus.estadoCivil, //swagger
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleDelete: handleDeleteMaritalStatus,
          //handleEdit: handleEditMaritalStatus,
          id: maritalStatus.id,
        },
      },
    ]);
  const handleDeleteMaritalStatus = async (id) => {
    handleDelete(
      id,
      currentCompany,
      maritalStatuses,
      setEstadoCivil,
      deleteMaritalStatusAPI,
      enqueueSnackbar,
      'EstadoCivil'
    );
  };

  const fetchMaritalStatus = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchMaritalStatusByCompanyAPI(currentCompany.id);
    setEstadoCivil(data);
  };
  //fin  MaritalStatus

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
    handleDelete(
      id,
      currentCompany,
      workingDays,
      setWorkingDay,
      //fetchWorkingDay,
      deleteWorkingDayAPI,
      enqueueSnackbar,
      'Jornada'
    );
  };

  const fetchWorkingDay = async () => {
    if (!currentCompany) {
      return;
    }

    const { data } = await fetchWorkingDayByCompanyAPI(currentCompany.id);
    setWorkingDay(data);
  };
  //fin Working Day
  const createConfigs = [
    {
      type: 'contractType',
      storeAPI: storeContractTypeAPI,
      setNewState: setContractType,
      successMsg: 'Tipo Contrato creado con éxito',
      errorMsg: 'Hubo un error al crear Tipo Contrato',
      formValues: {
        field1: 'tipoContrato',
      },
    },
    {
      type: 'documentType',
      storeAPI: storeDocumentTypeAPI,
      setNewState: fetchDocumentType,
      successMsg: 'Tipo Documento creado con éxito',
      errorMsg: 'Hubo un error al crear Tipo Documento',
      formValues: {
        field1: 'tipoDocumento',
      },
    },
    {
      type: 'englishLevel',
      storeAPI: storeEnglishLevelAPI,
      setNewState: setNivelIngles,
      successMsg: 'Nivel Inglés creado con éxito',
      errorMsg: 'Hubo un error al crear Nivel Inglés',
      formValues: {
        field1: 'nivelIngles',
      },
    },
    {
      type: 'educationLevel',
      storeAPI: storeEducationLevelAPI,
      setNewState: setEducationLevels,
      successMsg: 'Nivel Educación creado con éxito',
      errorMsg: 'Hubo un error al crear Nivel Educación',
      formValues: {
        field1: 'nivelEducacion',
      },
    },
    {
      type: 'disabilities',
      storeAPI: storeDisabilitiesAPI,
      setNewState: setDisabilities,
      successMsg: 'Discapacidad creado con éxito',
      errorMsg: 'Hubo un error al crear Discapacidad',
      formValues: {
        field1: 'discapacIdades',
      },
    },
    {
      type: 'HiringType',
      storeAPI: storeHiringTypeAPI,
      setNewState: setHiringTypes,
      successMsg: 'Tipo Contratación creado con éxito',
      errorMsg: 'Hubo un error al crear Tipo Contratación',
      formValues: {
        field1: 'tipoContrato',
      },
    },
    {
      type: 'gender',
      storeAPI: storeGenderAPI,
      setNewState: setGenders,
      successMsg: 'Género creado con éxito',
      errorMsg: 'Hubo un error al crear Género',
      formValues: {
        field1: 'genero',
      },
    },
    {
      type: 'salaryType',
      storeAPI: storeSalaryTypeAPI,
      setNewState: setSalaryTypes,
      successMsg: 'Tipo salario creado con éxito',
      errorMsg: 'Hubo un error al crear Tipo salario',
      formValues: {
        field1: 'tipoDeSalario',
      },
    },
    {
      type: 'Profesion',
      storeAPI: storeProfessionAPI,
      setNewState: setProfessions,
      successMsg: 'Profesión creado con éxito',
      errorMsg: 'Hubo un error al crear Profesión',
      formValues: {
        field1: 'profesion',
      },
    },
    {
      type: 'preferenciaSexual',
      storeAPI: storeSexualPreferenceAPI,
      setNewState: setPreferenciaSexual,
      successMsg: 'Preferencia Sexual creado con éxito',
      errorMsg: 'Hubo un error al crear Preferencia Sexual',
      formValues: {
        field1: 'preferenciaSexual',
      },
    },
    {
      type: 'estadoCivil',
      storeAPI: storeMaritalStatusAPI,
      setNewState: setEstadoCivil,
      successMsg: 'Estado civil creado con éxito',
      errorMsg: 'Hubo un error al crear Estado civil',
      formValues: {
        field1: 'estadoCivil',
      },
    },
    {
      type: 'OrganizationalLevel',
      storeAPI: storeOrganizationalLevelAPI,
      setNewState: setOrganizationalLevels,
      successMsg: 'Nivel organizacional creada con éxito',
      errorMsg: 'Hubo un error al crear Nivel organizacional',
      formValues: {
        field1: 'nivelOrganizacional',
      },
    },
    {
      type: 'workingDay',
      storeAPI: storeWorkingDayAPI,
      setNewState: setWorkingDay,
      successMsg: 'Jornada creada con éxito',
      errorMsg: 'Hubo un error al crear Jornada',
      formValues: {
        field1: 'jornada',
      },
    },
  ];
  // handle modal
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleDownload = () => {
    axios
      .get('Employee/DownloadCsvEmployee')
      .then((res) => setEmployecsv(res.data));
  };

  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  const handleFile = async (event) => {
    let bodyFormData = new FormData();
    bodyFormData.append('data', event.target.files[0]);

    await fetch(
      `${process.env.REACT_APP_API_URL}Employee/EmployeesCsv/${userInfo.Company}`,
      {
        method: 'POST',
        body: bodyFormData,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setValues({
          ...values,
          message: res.message,
          isOpen: true,
          severity: 'success',
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!currentMultiCompanies) {
      return;
    }
    dispatch(fetchCompanyMultiUser({ idUser: userInfo.user }));
  }, []);

  useEffect(() => {
    if (!currentMultiCompanies) {
      return;
    }
    dispatch(fetchCompanyMultiUser({ idUser: userInfo.user }));
  }, []);

  useEffect(() => {
    if (employecsv) {
      csvLink.current.link.click();
    }
  }, [employecsv]);

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === 'Management') < 0 &&
      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
    ) {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
  }, [type]);

  useEffect(() => {
    const fetchData = async (fetchFunctions) => {
      try {
        setLoading(true);
        await Promise.all(fetchFunctions.map((fn) => fn()));
      } catch (error) {
        console.error('An error occurred while fetching data: ', error);
        // Handle error accordingly
      } finally {
        setLoading(false);
      }
    };

    const commonFetchFunctions = [
      fetchContractType,
      fetchDocumentType,
      fetchEnglishLevel,
      fetchEducationLevel,
      fetchDisabilities,
      fetchHiringType,
      fetchGender,
      fetchSalaryType,
      fetchProfessions,
      fetchSexualPreference,
      fetchMaritalStatus,
      fetchOrganizationalLevel,
      fetchWorkingDay,
    ];

    const typeToFunctionsMap = {
      Empresas: [
        ...(currentMultiCompanies.length > 0 ? [fetchCompany] : []),
        fetchSector,
        fetchSizeCompany,
        fetchCountry,
      ],
      Departamentos: [fetchCompanyRol, fetchDepartments, fetchOffice],
      Empleados: [
        ...commonFetchFunctions,
        fetchCity,
        fetchEmployee,
        fetchCompanyRol,
        fetchDepartments,
        fetchPerson,
        fetchOffice,
        () => fetchArea(currentCompany.id),
      ],
      'Otros campos': commonFetchFunctions,
    };

    if (!currentCompany) {
      return;
    }

    const fetchFunctions = typeToFunctionsMap[type];

    if (fetchFunctions) {
      fetchData(fetchFunctions);
    }
  }, [currentCompany, currentMultiCompanies, type]); // eslint-disable-line react-hooks/exhaustive-deps

  const allowedRoutes = [
    'Otros campos',
    'Empleados',
    'Departamentos',
    'Empresas',
  ];

  const some = [
    {
      nameAdministration: 'Empresas',
      tableInformation: {
        title: 'Empresas',
        buttonCreateName: 'Crear Empresa',
        eventButton: handleCreateCompany,
        columns: companyColumns,
        rows: mapCompanies(companies),
      },
      tabsInformation: [],
    },
    {
      nameAdministration: 'Empleados',
      tableInformation: {
        title: 'Empleados',
        buttonCreateName: 'Crear Empleados',
        eventButton: handleCreateEmployee,
        columns: employeesColumns,
        rows: mapEmployee(employees),
      },
      tabsInformation: [],
    },
    {
      nameAdministration: 'Departamentos',
      tableInformation: {},
      tabsInformation: [
        {
          title: 'Departamentos',
          buttonCreateName: 'Crear Departamento',
          eventButton: handleCreateDepartment,
          columns: departmentsColumns,
          rows: mapDepartment(departments),
          tabLabel: 'Departamento',
        },
        {
          title: 'Oficina',
          buttonCreateName: 'Crear Oficina',
          eventButton: handleCreateOffice,
          columns: officesColumns,
          rows: mapOffice(offices),
          tabLabel: 'Oficina',
        },
        {
          title: 'Rol Compañia',
          buttonCreateName: 'Crear Rol',
          eventButton: handleCreateCompanyRols,
          columns: companyRolsColumns,
          rows: mapCompanyRols(companyRols),
          tabLabel: 'Cargo',
        },
      ],
    },
    {
      nameAdministration: 'Otros campos',
      tableInformation: {},
      needMoveTabs: true,
      tabsInformation: [
        {
          title: 'Tipo Contrato',
          buttonCreateName: 'Crear Tipo Contrato',
          eventButton: handleCreateContractType,
          columns: contractTypeColumns,
          rows: mapContractType(contractTypes),
          tabLabel: 'Tipo Contrato',
        },
        {
          title: 'Tipo Documento',
          buttonCreateName: 'Crear tipo de documento',
          eventButton: handleCreateDocumentType,
          columns: documentTypeColumns,
          rows: mapDocumentType(DocumentsTypes),
          tabLabel: 'Tipo de Documentos',
        },
        {
          title: 'Nivel de inglés',
          buttonCreateName: 'Crear nivel de inglés',
          eventButton: handleCreateEnglishLevel,
          columns: englishLevelColumns,
          rows: mapEnglishLevel(englishLevels),
          tabLabel: 'Nivel de ingles',
        },
        {
          title: 'Nivel de educación',
          buttonCreateName: 'Crear nivel de educación',
          eventButton: handleCreateEducationLevel,
          columns: educationLevelColumns,
          rows: mapEducationLevel(educationLevels),
          tabLabel: 'Nivel de educacion',
        },
        {
          title: 'Discapacidades',
          buttonCreateName: 'Crear Discapacidad',
          eventButton: handleCreateDisabilities,
          columns: disabilitiesColumns,
          rows: mapDisabilities(disabilities),
          tabLabel: 'Discapacidades',
        },
        {
          title: 'Tipo de Contrataciones',
          buttonCreateName: 'Crear Tipo de contratación',
          eventButton: handleCreateHiringType,
          columns: hiringTypeColumns,
          rows: mapHiringType(hiringTypes),
          tabLabel: 'Tipo contratación',
        },
        {
          title: 'Género',
          buttonCreateName: 'Crear Género',
          eventButton: handleCreateGender,
          columns: genderColumns,
          rows: mapGender(genders),
          tabLabel: 'Tipo Género',
        },
        {
          title: 'Tipo Salario',
          buttonCreateName: 'Crear tipo salario',
          eventButton: handleCreateEnglishLevel,
          columns: salaryTypeColumns,
          rows: mapSalaryType(salaryTypes),
          tabLabel: 'Tipo Salarios',
        },
        {
          title: 'Profesión',
          buttonCreateName: 'Crear Profesión',
          eventButton: handleCreateProfession,
          columns: professionColumns,
          rows: mapProfession(professions),
          tabLabel: 'Profesión',
        },
        {
          title: 'Preferencia Sexual',
          buttonCreateName: 'Crear Preferencia Sexual',
          eventButton: handleCreateSexualPreference,
          columns: sexualPreferenceColumns,
          rows: mapSexualPreference(sexualPreferences),
          tabLabel: 'Preferencia Sexual',
        },
        {
          title: 'Estado Civil',
          buttonCreateName: 'Crear Estado Civil',
          eventButton: handleCreateMaritalStatus,
          columns: maritalStatusColumns,
          rows: mapMaritalStatus(maritalStatuses),
          tabLabel: 'Estado Civil',
        },
        {
          title: 'Nivel Organizacional',
          buttonCreateName: 'Crear Nivel Organizacional',
          eventButton: handleCreateOrganizationalLevel,
          columns: organizationalLevelColumns,
          rows: mapOrganizationalLevel(organizationalLevels),
          tabLabel: 'Nivel Organizacional',
        },
        {
          title: 'Jornada',
          buttonCreateName: 'Crear Jornada',
          eventButton: handleCreateWorkingDay,
          columns: workingDayColumns,
          rows: mapWorkingDay(workingDays),
          tabLabel: 'Jornada',
        },
      ],
    },
  ];
  return (
    <>
      <>
        {allowedRoutes.includes(type) ? (
          <Box sx={{ display: 'flex' }}>
            <Navbar />
            <IconSidebar />

            <div style={{ backgroundColor: 'white' }}>
              <CSVLink
                data={employecsv}
                filename={'Employees.csv'}
                style={{ display: 'none' }}
                ref={csvLink}
                target="_blank"
              />
              <Notification
                severity={values.severity}
                message={values.message}
                isOpen={values.isOpen}
                onClose={handleClose}
              />
              <div className={styles.content}>
                <div className={styles.crud}>
                  <div className={styles.top}>
                    <div className={styles.type}>
                      <Box
                        component="img"
                        alt="Your logo."
                        src={Building}
                        className={styles.icontype}
                      />
                      <h1>{type}</h1>
                    </div>
                    <div className={styles.new}>
                      {type === 'Empleados' ? (
                        <div>
                          <Button
                            variant="contained"
                            style={{
                              whiteSpace: 'nowrap',
                              padding: '1rem 1rem',
                              color: 'white',
                            }}
                            color="primary"
                            onClick={handleDownload}
                          >
                            Descargar csv empleados
                          </Button>
                          <Button
                            variant="contained"
                            style={{
                              whiteSpace: 'nowrap',
                              padding: '1rem 1rem',
                              color: 'white',
                              marginLeft: '1rem',
                            }}
                            color="primary"
                            onClick={() => {
                              importcsv.current.click();
                            }}
                          >
                            Subir empleados
                          </Button>
                        </div>
                      ) : null}
                      <input
                        type="file"
                        onChange={handleFile}
                        accept=".csv"
                        name="file"
                        ref={importcsv}
                        hidden
                      />
                    </div>
                  </div>

                  <Box sx={{ display: 'flex' }}>
                    <div style={{ backgroundColor: 'white' }}>
                      <div className={styles.DataTable}>
                        <div className={styles.DataTable2}>
                          <DataAdministration
                            dataAdministration={some}
                            type={type}
                            loading={loading}
                          />
                        </div>
                      </div>
                    </div>
                    {/* create form */}
                    {currentCreate !== null && (
                      <MyCreateDialog2
                        onClose={handleCloseCreateDialog}
                        onSubmit={handleSubmittedCreateDialog}
                        title={currentCreate.title}
                        open={openCreateDialog}
                        fields={currentCreate.fields}
                        type={currentCreate.type}
                        file={file}
                        setFile={setFile}
                        setCurrentCreate={setCurrentCreate}
                        currentCreate={currentCreate}
                      />
                    )}
                    {currentEdit !== null && (
                      <MyEditDialog2
                        onClose={handleCloseEditDialog}
                        onSubmit={handleSubmittedEditDialog}
                        title={currentEdit.title}
                        open={openEditDialog}
                        fields={currentEdit.fields}
                        type={currentEdit.type}
                        file={file}
                        setFile={setFile}
                        logo={editLogo}
                        setLogo={setEditLogo}
                        setCurrentEdit={setCurrentEdit}
                      />
                    )}
                  </Box>
                </div>
              </div>
            </div>
          </Box>
        ) : (
          <Error />
        )}
      </>
    </>
  );
}
