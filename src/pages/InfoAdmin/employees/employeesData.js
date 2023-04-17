// employees.js

import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import { fetchCityAPI } from '../../../services/getCity.service';
import { getAllCompaniesAPI } from '../../../services/getCompanies.service';
import { fetchContractTypeAPI } from '../../../services/getContractType.service';
import { fecthAreaAPI } from '../../../services/getDepartments.service';
import { fetchDisabilitiesAPI } from '../../../services/getDisabilities.service';
import { fetchDocumentTypeAPI, getCompaniesByIdAPI } from '../../../services/getDocumentType.service';
import { fetchEducationLevelAPI } from '../../../services/getEducationLevel.service';
import { deleteEmployeeAPI,fetchEmployeeAPI, getEmployeesAPI, storeEmployeeAPI } from '../../../services/getEmployees.service';
import { fetchEnglishLevelAPI } from '../../../services/getEnglishLevel.service';
import { fetchGenderAPI } from '../../../services/getGender.service';
import { fetchHiringTypeAPI } from '../../../services/getHiringType.service';
import { fetchMaritalStatusAPI } from '../../../services/getMaritalStatus.service';
import { getOfficesAPI } from '../../../services/getOffices.service';
import { fetchOrganizationalLevelAPI } from '../../../services/getOrganizationalLevel.service';
import { fetchPersonAPI } from '../../../services/getPerson.service';
import { fetchProfessionAPI } from '../../../services/getProfession.service';
import { fetchRolCompanyAPI } from '../../../services/getRolCompany.service';
import { fetchSalaryTypeAPI } from '../../../services/getSalaryType.service';
import { fetchSexualPreferenceAPI } from '../../../services/getSexualPreference.service';


const getAllRols = async () => {
  const { data } = await fetchRolCompanyAPI(1);
  return data;
};

const getAllPersons = async () => {
  const { data } = await fetchPersonAPI();
  return data;
};

const getAllAreas = async () => {
  const { data } = await fecthAreaAPI();
  return data;
};
const getAllCampus = async () => {
  const { data } = await getOfficesAPI();
  return data;
};

const getAllSexualPreferences = async () => {
  const { data } = await fetchSexualPreferenceAPI();
  return data;
};

const getAllDisabilities = async () => {
  const { data } = await fetchDisabilitiesAPI();
  return data;
};

const getAllHiringTypes = async () => {
  const { data } = await fetchHiringTypeAPI();
  return data;
};

const getAllContractTypes = async () => {
  const { data } = await fetchContractTypeAPI();
  return data;
};

const getAllOrganizationalLevels = async () => {
  const { data } = await fetchOrganizationalLevelAPI();
  return data;
};
const getAllEducationLevel = async () => {
  const { data } = await fetchEducationLevelAPI();
  return data;
};

const getAllEnglishLevel = async () => {
  const { data } = await fetchEnglishLevelAPI();
  return data;
};

const getAllProfession = async () => {
  const { data } = await fetchProfessionAPI();
  return data;
};

const getAllSalaryTypes = async () => {
  const { data } = await fetchSalaryTypeAPI();
  return data;
};
const getAllMaritalStatus = async () => {
  const { data } = await fetchMaritalStatusAPI();
  return data;
};

const getAllCompanies = async () => {
  const { data } = await getAllCompaniesAPI();
  return data;
};

const getAllDocumentsTypes = async () => {
  const { data } = await fetchDocumentTypeAPI();
  return data;
};

const getAllGenders = async () => {
  const { data } = await fetchGenderAPI();
  return data;
};


const getAllCities = async () => {
  const { data } = await fetchCityAPI();
  return data;
};
/*
const getInformationEmployees = async (setEmployees) => {
    const { data } = await getEmployeesAPI();
    const companies = await getAllCompanies();
    const companyNames = companies.reduce((acc, company) => {
        acc[company.id] = company.nombreCompania;
        return acc;
    }, {});

    const employees = data.map((employee) => ({
        ...employee,
        nombreCompania: companyNames[employee.IdCompania],
    }));
    setEmployees(employees);
};*/

export const employeesColumns = [
  {
    id: 'name',
    label: 'Nombre',
    numeric: false,
  },
  {
    id: 'supervisor',
    label: 'Supervisor',
    numeric: false,
  },
  {
    id: 'date',
    label: 'Fecha Admisión',
    numeric: false,
  },
  {
    id: 'rol',
    label: 'Cargo',
    numeric: false,
  },
  {
    id: 'area',
    label: 'Área',
    numeric: false,
  },
  {
    id: 'options',
    label: 'Opciones',
    numeric: false,
  },
];

export const useEmployee = (setOpenCreateDialog, setCurrentCreate, setOpenEditDialog, setCurrentEdit) => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [persons, setPersons] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [documentTypes, setDocumentTypes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [cities, setCities] = useState([]);
  const [company, setCompany] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [salaryType, setSalaryType] = useState([]);
  const [profession, setProfession] = useState([]);
  const [educationLevel, setEducationLevel] = useState([]);
  const [englishLevel, setEnglishLevel] = useState([]);
  const [campus, setCampus] = useState([]);
  const [sexualPreference, setSexualPreference] = useState([]);
  const [disabilities, setDisabilities] = useState([]);
  const [hiringType, setHiringType] = useState([]);
  const [contractType, setContractType] = useState([]);
  const [organizationalLevel, setOrganizationalLevel] = useState([]);


  const fetchEmployee = async () => {
    setLoading(true);

    const { data } = await fetchEmployeeAPI();
    const areas = await getAllAreas();
    const areasNames = areas.reduce((acc, area) => {
      acc[area.id] = area.NombreArea;
      return acc;
    }, {});


    const persons = await getAllPersons();
    const personNames = persons.reduce((acc, person) => {
      acc[person.id] = person.nombres;
      return acc;
    }, {});

    const rols = await getAllRols();
    const rolNames = rols.reduce((acc, rol) => {
      acc[rol.id] = rol.rol;
      return acc;
    }, {});


    const employee = data.map((employee) => ({
      ...employee,
      nombreArea: areasNames[employee.areaId],
      nombrePersona: personNames[employee.IdPersona],
      nombreRol: rolNames[employee.rollCompania],
    }));

    setEmployees(employee);
    setLoading(false);
  };


  const fetchCompanies = async () => {
    const companyData = await getAllCompanies();
    setCompany(companyData);
  };

  const fetchSexualPreference = async () => {
    const sexualPreferenceData = await getAllSexualPreferences();
    setSexualPreference(sexualPreferenceData);
  };

  const fetchDisabilities = async () => {
    const disabilitiesData = await getAllDisabilities();
    setDisabilities(disabilitiesData);
  };


  const fetchHiringType = async () => {
    const hiringTypeData = await getAllHiringTypes();
    setHiringType(hiringTypeData);
  };

  const fetchContractType = async () => {
    const contractTypeData = await getAllContractTypes();
    setContractType(contractTypeData);
  };

  const fetchOrganizationalLevel = async () => {
    const organizationalLevelData = await getAllOrganizationalLevels();
    setOrganizationalLevel(organizationalLevelData);
  };

  const fetchCampus = async () => {
    const campusData = await getAllCampus();
    setCampus(campusData);
  };

  const fetchEducationLevel = async () => {
    const educationLevelData = await getAllEducationLevel();
    setEducationLevel(educationLevelData);
  };


  const fetchEnglishLevel = async () => {
    const englishLevelData = await getAllEnglishLevel();
    setEnglishLevel(englishLevelData);
  };


  const fetchProfessions = async () => {
    const professionData = await getAllProfession();
    setProfession(professionData);
  };

  const fetchSalaryType = async () => {
    const salaryTypeData = await getAllSalaryTypes();
    setSalaryType(salaryTypeData);
  };

  const fetchMaritalStatus = async () => {
    const maritalStatusData = await getAllMaritalStatus();
    setMaritalStatus(maritalStatusData);
  };

  const fetchDocumentsTypes = async () => {
    const documentTypeData = await getAllDocumentsTypes();
    setDocumentTypes(documentTypeData);
  };
  const fetchGender = async () => {
    const genderData = await getAllGenders();
    setGenders(genderData);
  };

  const fetchCity = async () => {
    const cityData = await getAllCities();
    setCities(cityData);
  };

  const fetchPerson = async () => {
    const personData = await getAllPersons();
    setPersons(personData);
  };


  const handleCreateEmployee = () => {

    setCurrentCreate({
      type: 'employee',
      title: 'Crear Empleado',
      fields: [
        {
          'person': [
            {
              label: 'Tipo Documento',
              name: 'documentType',
              type: 'select',
              isRequired: true,
              options: documentTypes.map((company) => ({
                value: company.documentTypeId,
                label: company.tipoDocumento,
              })),
            },
            {
              label: 'Número Documento',
              name: 'documentNumber',
              type: 'text',
              isRequired: true,
            },
            {
              label: 'Nombres',
              name: 'name',
              type: 'text',
              isRequired: true,
            },
            {
              label: 'Apellidos',
              name: 'lastName',
              type: 'text',
              isRequired: true,
            },
            {
              label: 'Edad',
              name: 'age',
              type: 'text',
              isRequired: true,
            },
            {
              label: 'Número Telefónico',
              name: 'phoneNumber',
              type: 'text',
              isRequired: true,
            },
            {
              label: 'Dirección',
              name: 'address',
              type: 'text',
              isRequired: true,
            },
            {
              label: 'Correo',
              name: 'email',
              type: 'text',
              isRequired: true,
            },
            {
              label: 'Fecha Nacimiento',
              name: 'dateBirth',
              type: 'date',
              isRequired: true,
            },
            {
              label: 'Género',
              name: 'gender',
              type: 'select',
              isRequired: true,
              options: genders.map((gender) => ({
                value: gender.id,
                label: gender.genero,
              })),
            },
            {
              label: 'Ciudad',
              name: 'city',
              type: 'text',
              type: 'select',
              isRequired: true,
              options: cities.map((city) => ({
                value: city.id,
                label: city.ciudad,
              })),
            },

          ],
          'employee': [
            {
              label: 'Fecha Admisión',
              name: 'fechaAdmision',
              type: 'date',
              isRequired: false,
            },
            {
              label: 'Supervisor',
              name: 'supervisor',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Compañía',
              name: 'compañia',
              type: 'select',
              isRequired: false,
              options: company.map((company) => ({
                value: company.id,
                label: company.nombreCompania,
              })),
            },
            {
              label: 'Rol',
              name: 'rol',
              type: 'text',
              isRequired: false,
            },
          ],
          'segments': [
            {
              label: 'Antiguedad Trabajo',
              name: 'antiguedadTrabajo',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Estado Parental',
              name: 'parentalStatus',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Resultado Última Evaluación Desempeño',
              name: 'resultadoEvaluacion',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Número de Hijos',
              name: 'childNumber',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Área Funcional',
              name: 'compañia',
              type: 'select',
              isRequired: false,
              options: company.map((company) => ({
                value: company.id,
                label: company.nombreCompania,
              })),
            },
            {
              label: 'Nivel Organizacional',
              name: 'organizationalLevel',
              type: 'select',
              isRequired: false,
              options: organizationalLevel.map((organizationalLevel) => ({
                value: organizationalLevel.id,
                label: organizationalLevel.nivelOrganizacional,
              })),
            },
            {
              label: 'Tipo de Contrato',
              name: 'contractType',
              type: 'select',
              isRequired: false,
              options: contractType.map((contractType) => ({
                value: contractType.id,
                label: contractType.tipoContrato,
              })),
            },
            {
              label: 'Tipo de Contratacion',
              name: 'hiringType',
              type: 'select',
              isRequired: false,
              options: hiringType.map((hiringType) => ({
                value: hiringType.id,
                label: hiringType.tipoContrato,
              })),
            },
            {
              label: 'Discapacidades',
              name: 'disabilities',
              type: 'select',
              isRequired: false,
              options: disabilities.map((disabilities) => ({
                value: disabilities.id,
                label: disabilities.nombreCompania,
              })),
            },
            {
              label: 'Preferencia Sexual',
              name: 'sexualPreference',
              type: 'select',
              isRequired: false,
              options: sexualPreference.map((sexualPreference) => ({
                value: sexualPreference.id,
                label: sexualPreference.preferenciaSexual,
              })),
            },
            {
              label: 'Oficina',
              name: 'campus',
              type: 'select',
              isRequired: false,
              options: campus.map((campus) => ({
                value: campus.id,
                label: campus.sede,
              })),
            },
            {
              label: 'Nivel de Inglés',
              name: 'englishLevel',
              type: 'select',
              isRequired: false,
              options: englishLevel.map((englishLevel) => ({
                value: englishLevel.id,
                label: englishLevel.nivelIngles,
              })),
            },
            {
              label: 'Nivel Educativo',
              name: 'educationLevel',
              type: 'select',
              isRequired: false,
              options: educationLevel.map((educationLevel) => ({
                value: educationLevel.id,
                label: educationLevel.nivelEducacion,
              })),
            },
            {
              label: 'Profesión',
              name: 'profession',
              type: 'select',
              isRequired: false,
              options: profession.map((profession) => ({
                value: profession.id,
                label: profession.profesion,
              })),
            },
            {
              label: 'Grupo Colectivo',
              name: 'collectiveGroup',
              type: 'select',
              isRequired: false,
              options: company.map((company) => ({
                value: company.id,
                label: company.nombreCompania,
              })),
            },
            {
              label: 'Jornada',
              name: 'workingDay',
              type: 'select',
              isRequired: false,
              options: company.map((company) => ({
                value: company.id,
                label: company.nombreCompania,
              })),
            },
            {
              label: 'Tipo Salario',
              name: 'salaryType',
              type: 'select',
              isRequired: false,
              options: salaryType.map((salaryType) => ({
                value: salaryType.id,
                label: salaryType.tipoDeSalario,
              })),
            },
            {
              label: 'Estado Civil',
              name: 'maritalStatus',
              type: 'select',
              isRequired: false,
              options: maritalStatus.map((maritalStatus) => ({
                value: maritalStatus.id,
                label: maritalStatus.estadoCivil,
              })),
            },
          ],
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  const handleEditEmployee = async (id) => {
    const employee = employees.find((employee) => employee.id === id);
    const person = persons.find((person) => person.id === employee.IdPersona);
    //const gender = genders.find((gender) => gender.id === person.IdGenero);
    if (employee === undefined || person === undefined) {
      return;
    }

    setCurrentEdit({
      type: 'employee',
      id: employee.id,
      title: 'Editar Empleado',
      fields: [
        {
          'person': [
            {
              label: 'Tipo Documento',
              name: 'documentType',
              type: 'select',
              options: documentTypes.map((company) => ({
                value: company.documentTypeId,
                label: company.tipoDocumento,
              })),
            },
            {
              label: 'Número Documento',
              name: 'documentNumber',
              type: 'text',
              value: person.numeroDocumento,
            },
            {
              label: 'Nombres',
              name: 'name',
              type: 'text',
              value: person.nombres,
            },
            {
              label: 'Apellidos',
              name: 'lastName',
              type: 'text',
              value: person.apellIdos,
            },
            {
              label: 'Edad',
              name: 'age',
              type: 'text',
              value: person.edad,
            },
            {
              label: 'Número Telefónico',
              name: 'phoneNumber',
              type: 'text',
              value: person.numeroTelefonico,
            },
            {
              label: 'Dirección',
              name: 'address',
              type: 'text',
              value: person.direccion,
            },
            {
              label: 'Correo',
              name: 'email',
              type: 'text',
              value: person.correoElectronico,
            },
            {
              label: 'Fecha Nacimiento',
              name: 'dateBirth',
              type: 'date',
              value: person.fechaNacimiento,
            },
            {
              label: 'Género',
              name: 'gender',
              type: 'select',
              options: genders.map((gender) => ({
                value: gender.id,
                label: gender.genero,
              })),
            },
            {
              label: 'Ciudad',
              name: 'city',
              type: 'text',
              type: 'select',
              options: cities.map((city) => ({
                value: city.id,
                label: city.ciudad,
              })),
            },

          ],
          'employee': [
            {
              label: 'Fecha Admisión',
              name: 'fechaAdmision',
              type: 'date',
              value: employee.fechaAdmision,
            },
            {
              label: 'Supervisor',
              name: 'supervisor',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Compañía',
              name: 'compañia',
              type: 'select',
              isRequired: false,
              options: company.map((company) => ({
                value: company.id,
                label: company.nombreCompania,
              })),
            },
            {
              label: 'Rol',
              name: 'rol',
              type: 'text',
              isRequired: false,
            },
          ],
          'segments': [
            {
              label: 'Antiguedad Trabajo',
              name: 'antiguedadTrabajo',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Estado Parental',
              name: 'parentalStatus',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Resultado Última Evaluación Desempeño',
              name: 'resultadoEvaluacion',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Número de Hijos',
              name: 'childNumber',
              type: 'text',
              isRequired: false,
            },
            {
              label: 'Área Funcional',
              name: 'compañia',
              type: 'select',
              isRequired: false,
              options: company.map((company) => ({
                value: company.id,
                label: company.nombreCompania,
              })),
            },
            {
              label: 'Nivel Organizacional',
              name: 'organizationalLevel',
              type: 'select',
              isRequired: false,
              options: organizationalLevel.map((organizationalLevel) => ({
                value: organizationalLevel.id,
                label: organizationalLevel.nivelOrganizacional,
              })),
            },
            {
              label: 'Tipo de Contrato',
              name: 'contractType',
              type: 'select',
              isRequired: false,
              options: contractType.map((contractType) => ({
                value: contractType.id,
                label: contractType.tipoContrato,
              })),
            },
            {
              label: 'Tipo de Contratacion',
              name: 'hiringType',
              type: 'select',
              isRequired: false,
              options: hiringType.map((hiringType) => ({
                value: hiringType.id,
                label: hiringType.tipoContrato,
              })),
            },
            {
              label: 'Discapacidades',
              name: 'disabilities',
              type: 'select',
              isRequired: false,
              options: disabilities.map((disabilities) => ({
                value: disabilities.id,
                label: disabilities.nombreCompania,
              })),
            },
            {
              label: 'Preferencia Sexual',
              name: 'sexualPreference',
              type: 'select',
              isRequired: false,
              options: sexualPreference.map((sexualPreference) => ({
                value: sexualPreference.id,
                label: sexualPreference.preferenciaSexual,
              })),
            },
            {
              label: 'Oficina',
              name: 'campus',
              type: 'select',
              isRequired: false,
              options: campus.map((campus) => ({
                value: campus.id,
                label: campus.sede,
              })),
            },
            {
              label: 'Nivel de Inglés',
              name: 'englishLevel',
              type: 'select',
              isRequired: false,
              options: englishLevel.map((englishLevel) => ({
                value: englishLevel.id,
                label: englishLevel.nivelIngles,
              })),
            },
            {
              label: 'Nivel Educativo',
              name: 'educationLevel',
              type: 'select',
              isRequired: false,
              options: educationLevel.map((educationLevel) => ({
                value: educationLevel.id,
                label: educationLevel.nivelEducacion,
              })),
            },
            {
              label: 'Profesión',
              name: 'profession',
              type: 'select',
              isRequired: false,
              options: profession.map((profession) => ({
                value: profession.id,
                label: profession.profesion,
              })),
            },
            {
              label: 'Grupo Colectivo',
              name: 'collectiveGroup',
              type: 'select',
              isRequired: false,
              options: company.map((company) => ({
                value: company.id,
                label: company.nombreCompania,
              })),
            },
            {
              label: 'Jornada',
              name: 'workingDay',
              type: 'select',
              isRequired: false,
              options: company.map((company) => ({
                value: company.id,
                label: company.nombreCompania,
              })),
            },
            {
              label: 'Tipo Salario',
              name: 'salaryType',
              type: 'select',
              isRequired: false,
              options: salaryType.map((salaryType) => ({
                value: salaryType.id,
                label: salaryType.tipoDeSalario,
              })),
            },
            {
              label: 'Estado Civil',
              name: 'maritalStatus',
              type: 'select',
              isRequired: false,
              options: maritalStatus.map((maritalStatus) => ({
                value: maritalStatus.id,
                label: maritalStatus.estadoCivil,
              })),
            },
          ],
        },
      ],
    });
    setOpenEditDialog(true);
  };

  const handleDeleteEmployee = async (id) => {
    const employee = employees.find((employee) => employee.id === id);

    if (employee === undefined) {
      return;
    }

    try {
      await deleteEmployeeAPI(id);
      //getInformationOffices(setOffices);
    } catch (e) { }
    enqueueSnackbar(
      'Empleado eliminado con éxito',
      {
        variant: 'success',
      },
    );


  };


  const mapEmployee = (employee) => employee.map((employee) => [
    {
      column: 'Nombre',
      value: employee.nombrePersona,
    },
    {
      column: 'supervisor',
      value: employee.supervisor,
    },
    {
      column: 'date',
      value: employee.FechaAdmision,
    },
    {
      column: 'rol',
      value: employee.nombreRol,
    },
    {
      column: 'area',
      value: employee.nombreArea,
    },
    {
      column: 'options',
      value: '',
      payload: {
        handleDelete: handleDeleteEmployee,
        handleEdit: handleEditEmployee,
        id: employee.id,
      },
    },
  ]);

  const handleSubmittedCreateEmployee = async (formValues) => {
    try {
      await storeEmployeeAPI({
        person: {
          numeroDocumento: formValues.documentNumber,
          nombres: formValues.name,
          apellIdos: formValues.lastName,
          edad: formValues.age,
          numeroTelefonico: formValues.phoneNumber,
          direccion: formValues.address,
          correoElectronico: formValues.email,
          fechaNacimiento: formValues.dateBirth,
          IdTipoDocumento: formValues.documentType,
          IdGenero: 1,
          IdCiudad: 1,
        },
        employee: {
          FechaAdmision: formValues.fechaAdmision || null,
          supervisor: formValues.supervisor || null,
          IdCompania: 1,
          rollCompania: formValues.rol || null,
        },
      });
      setEmployees(employees);
    } catch (e) { }
    enqueueSnackbar(
      'Empleado creado con éxito',
      {
        variant: 'success',
      },
    );
  };

  return {
    handleCreateEmployee,
    handleEditEmployee,
    mapEmployee,
    employees,
    handleDeleteEmployee,
    setEmployees,
    setLoading,
    fetchEmployee,
    handleSubmittedCreateEmployee,
    fetchCity,
    fetchGender,
    fetchDocumentsTypes,
    fetchCompanies,
    fetchMaritalStatus,
    fetchSalaryType,
    fetchProfessions,
    fetchEducationLevel,
    fetchEnglishLevel,
    fetchCampus,
    fetchSexualPreference,
    fetchDisabilities,
    fetchHiringType,
    fetchContractType,
    fetchOrganizationalLevel,
    fetchPerson,
  };
};

