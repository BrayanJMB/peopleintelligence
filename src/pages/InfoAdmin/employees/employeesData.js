// employees.js

import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import { fetchCityAPI } from "../../../services/getCity.service";
import { getAllCompaniesAPI } from "../../../services/getCompanies.service";
import { fetchContractTypeByCompanyAPI } from "../../../services/getContractType.service";
import { fetchAreaByCompanyAPI } from "../../../services/getDepartments.service";
import { fetchDisabilitiesByCompanyAPI } from "../../../services/getDisabilities.service";
import { fetchDocumentTypeAPI } from "../../../services/getDocumentType.service";
import { fetchEducationLevelByCompanyAPI } from "../../../services/getEducationLevel.service";
import {
  deleteEmployeeAPI,
  fetchEmployeeAPI,
  storeEmployeeAPI,
} from "../../../services/getEmployees.service";
import { fetchEnglishLevelByCompanyAPI } from "../../../services/getEnglishLevel.service";
import { fetchGenderByCompanyAPI } from "../../../services/getGender.service";
import { fetchHiringTypeByCompanyAPI } from "../../../services/getHiringType.service";
import { fetchMaritalStatusByCompanyAPI } from "../../../services/getMaritalStatus.service";
import { getOfficesAPI } from "../../../services/getOffices.service";
import { fetchOrganizationalLevelByCompanyAPI } from "../../../services/getOrganizationalLevel.service";
import { fetchPersonAPI } from "../../../services/getPerson.service";
import { fetchProfessionByCompanyAPI } from "../../../services/getProfession.service";
import { fetchRolCompanyAPI } from "../../../services/getRolCompany.service";
import { fetchSalaryTypeByCompanyAPI } from "../../../services/getSalaryType.service";
import { fetchSexualPreferenceByCompanyAPI } from "../../../services/getSexualPreference.service";
import { fetchWorkingDayByCompanyAPI } from "../../../services/getWorkingDay.service";
import { getSegmentsAPI } from "../../../services/getSegments.service";

export const employeesColumns = [
  {
    id: "name",
    label: "Nombre",
    numeric: false,
  },
  {
    id: "supervisor",
    label: "Supervisor",
    numeric: false,
  },
  {
    id: "date",
    label: "Fecha Admisión",
    numeric: false,
  },
  {
    id: "rol",
    label: "Cargo",
    numeric: false,
  },
  {
    id: "area",
    label: "Área",
    numeric: false,
  },
  {
    id: "options",
    label: "Opciones",
    numeric: false,
  },
];

export const useEmployee = (
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
) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [persons, setPersons] = useState([]);
  const [segments, setSegments] = useState([]);
  //const [genders, setGenders] = useState([]);
  const [cities, setCities] = useState([]);
  const [company, setCompany] = useState([]);
  const [areas, setArea] = useState([]);

  const fetchEmployee = async () => {
    setLoading(true);

    const { data } = await fetchEmployeeAPI(currentCompany.id);
    const { data: area } = await fetchAreaByCompanyAPI(currentCompany.id);
    const areasNames = area.reduce((acc, area) => {
      acc[area.id] = area.NombreArea;
      return acc;
    }, {});

    const { data: person } = await fetchPersonAPI();
    const personNames = person.reduce((acc, person) => {
      acc[person.id] = person.nombres;
      return acc;
    }, {});

    const { data: rols } = await fetchRolCompanyAPI(currentCompany.id);
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
    const { data: companyData } = await getAllCompaniesAPI();
    setCompany(companyData);
  };


  const fetchArea = async (idCompany) => {
    const { data: areaData } = await fetchAreaByCompanyAPI(idCompany);
    setArea(areaData);
  };

  const fetchCity = async () => {
    const { data: cityData } = await fetchCityAPI();
    setCities(cityData);
  };

  const fetchPerson = async () => {
    const { data: personData } = await fetchPersonAPI();
    setPersons(personData);
  };

  const fetchSegment = async () => {
    const { data: segmentsData } = await getSegmentsAPI();
    setSegments(segmentsData);
  };

  const handleCreateEmployee = () => {
    setCurrentCreate({
      type: "employee",
      title: "Crear Empleado",
      fields: [
        {
          person: [
            {
              label: "Tipo Documento",
              name: "documentType",
              type: "select",
              isRequired: true,
              options: DocumentsTypes.map((company) => ({
                value: company.documentTypeId,
                label: company.tipoDocumento,
              })),
            },
            {
              label: "Número Documento",
              name: "documentNumber",
              type: "text",
              isRequired: true,
            },
            {
              label: "Nombres",
              name: "name",
              type: "text",
              isRequired: true,
            },
            {
              label: "Apellidos",
              name: "lastName",
              type: "text",
              isRequired: true,
            },
            {
              label: "Edad",
              name: "age",
              type: "text",
              isRequired: true,
            },
            {
              label: "Número Telefónico",
              name: "phoneNumber",
              type: "text",
              isRequired: true,
            },
            {
              label: "Dirección",
              name: "address",
              type: "text",
              isRequired: true,
            },
            {
              label: "Correo",
              name: "email",
              type: "text",
              isRequired: true,
            },
            {
              label: "Fecha Nacimiento",
              name: "dateBirth",
              type: "date",
              isRequired: true,
            },
            {
              label: "Género",
              name: "gender",
              type: "select",
              isRequired: true,
              options: genders.map((gender) => ({
                value: gender.id,
                label: gender.genero,
              })),
            },
            {
              label: "Ciudad",
              name: "city",
              type: "select",
              isRequired: true,
              options: cities.map((city) => ({
                value: city.id,
                label: city.ciudad,
              })),
            },
          ],
          employee: [
            {
              label: "Fecha Admisión",
              name: "fechaAdmision",
              type: "date",
              isRequired: false,
            },
            {
              label: "Supervisor",
              name: "supervisor",
              type: "text",
              isRequired: false,
            },
            {
              label: "Rol",
              name: "rol",
              type: "select",
              isRequired: false,
              options: companyRols.map((rol) => ({
                value: rol.id,
                label: rol.rol,
              })),
            },
            {
              label: "Área",
              name: "area",
              type: "select",
              isRequired: false,
              options: areas.map((area) => ({
                value: area.id,
                label: area.NombreArea,
              })),
            },
          ],
          segments: [
            {
              label: "Antiguedad Trabajo",
              name: "antiguedadTrabajo",
              type: "text",
              isRequired: false,
            },
            {
              label: "Estado Parental",
              name: "parentalStatus",
              type: "text",
              isRequired: false,
            },
            {
              label: "Resultado Última Evaluación Desempeño",
              name: "resultadoEvaluacion",
              type: "text",
              isRequired: false,
            },
            {
              label: "Número de Hijos",
              name: "childNumber",
              type: "text",
              isRequired: false,
            },
            {
              label: "Nivel Organizacional",
              name: "organizationalLevel",
              type: "select",
              isRequired: false,
              options: organizationalLevels.map((organizationalLevel) => ({
                value: organizationalLevel.id,
                label: organizationalLevel.nivelOrganizacional,
              })),
            },
            {
              label: "Tipo de Contrato",
              name: "contractType",
              type: "select",
              isRequired: false,
              options: contractTypes.map((contractType) => ({
                value: contractType.id,
                label: contractType.tipoContrato,
              })),
            },
            {
              label: "Tipo de Contratacion",
              name: "hiringType",
              type: "select",
              isRequired: false,
              options: hiringTypes.map((hiringType) => ({
                value: hiringType.id,
                label: hiringType.tipoContrato,
              })),
            },
            {
              label: "Discapacidades",
              name: "disabilities",
              type: "select",
              isRequired: false,
              options: disabilities.map((disabilities) => ({
                value: disabilities.id,
                label: disabilities.discapacIdades,
              })),
            },
            {
              label: "Preferencia Sexual",
              name: "sexualPreference",
              type: "select",
              isRequired: false,
              options: sexualPreferences.map((sexualPreference) => ({
                value: sexualPreference.id,
                label: sexualPreference.preferenciaSexual,
              })),
            },
            {
              label: "Oficina",
              name: "campus",
              type: "select",
              isRequired: false,
              options: offices.map((campus) => ({
                value: campus.id,
                label: campus.sede,
              })),
            },
            {
              label: "Nivel de Inglés",
              name: "englishLevel",
              type: "select",
              isRequired: false,
              options: englishLevels.map((englishLevel) => ({
                value: englishLevel.id,
                label: englishLevel.nivelIngles,
              })),
            },
            {
              label: "Nivel Educativo",
              name: "educationLevel",
              type: "select",
              isRequired: false,
              options: educationLevels.map((educationLevel) => ({
                value: educationLevel.id,
                label: educationLevel.nivelEducacion,
              })),
            },
            {
              label: "Profesión",
              name: "profession",
              type: "select",
              isRequired: false,
              options: professions.map((profession) => ({
                value: profession.id,
                label: profession.profesion,
              })),
            },
            {
              label: "Jornada",
              name: "workingDay",
              type: "select",
              isRequired: false,
              options: workingDays.map((workingDay) => ({
                value: workingDay.id,
                label: workingDay.jornada,
              })),
            },
            {
              label: "Tipo Salario",
              name: "salaryType",
              type: "select",
              isRequired: false,
              options: salaryTypes.map((salaryType) => ({
                value: salaryType.id,
                label: salaryType.tipoDeSalario,
              })),
            },
            {
              label: "Estado Civil",
              name: "maritalStatus",
              type: "select",
              isRequired: false,
              options: maritalStatuses.map((maritalStatus) => ({
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

    const { data: segmentsData } = await getSegmentsAPI(person.IdSegmentos || 0) 
    const documentType = DocumentsTypes.find(
      (documentType) => documentType.documentTypeId === person.IdTipoDocumento
    );
    const gender = genders.find((gender) => gender.id === person.IdGenero);
    const city = cities.find((city) => city.id === person.IdCiudad);
    const area = areas.find((area) => area.id === employee.areaId);
    const rol = companyRols.find((rol) => rol.id === employee.rollCompania);

    //Other fields
    const OrganizationalLevel = organizationalLevels.find(
      (organizationalLevel) =>
        organizationalLevel.id === segmentsData.IdNivelOrganizacional || null
    );
    const ContractType = contractTypes.find(
      (contractType) => contractType.id === segmentsData.IdTipodeContrato || null
    );
    const HiringType = hiringTypes.find(
      (hiringType) => hiringType.id === segmentsData.IdTipodeContratacion || null
    );
    const Disabilities = disabilities.find(
      (disabilities) => disabilities.id === segmentsData.IdDisabilities || null
    );
    const SexualPreference = sexualPreferences.find(
      (sexualPreference) =>
        sexualPreference.id === segmentsData.IdSexualPreference || null
    );
    const Campus = offices.find((campus) => campus.id === segmentsData.IdCampus || null);
    const EnglishLevel = englishLevels.find(
      (englishLevel) => englishLevel.id === segmentsData.IdEnglishLevel || null
    );
    const EducationLevel = educationLevels.find(
      (educationLevel) => educationLevel.id === segmentsData.IdEducationLevel || null
    );
    const Profesion = professions.find(
      (profession) => profession.id === segmentsData.IdProfession || null
    );
    const WorkingDay = workingDays.find(
      (workingDay) => workingDay.id === segmentsData.IdJornada || null
    );
    const SalaryType = salaryTypes.find(
      (salaryType) => salaryType.id === segmentsData.IdSalaryType || null
    );
    const MaritalStatus = maritalStatuses.find(
      (maritalStatus) => maritalStatus.id === segmentsData.IdEstadoCivil || null
    );

    if (employee === undefined || person === undefined) {
      return;
    }

    setCurrentEdit({
      type: "employee",
      id: employee.id,
      title: "Editar Empleado",
      fields: [
        {
          person: [
            {
              label: "Tipo Documento",
              name: "documentType",
              type: "select",
              isRequired: true,
              value: (documentType && documentType.documentTypeId) || null,
              options: DocumentsTypes.map((company) => ({
                value: company.documentTypeId,
                label: company.tipoDocumento,
              })),
            },
            {
              label: "Número Documento",
              name: "documentNumber",
              type: "text",
              isRequired: true,
              value: person.numeroDocumento,
            },
            {
              label: "Nombres",
              name: "name",
              type: "text",
              isRequired: true,
              value: person.nombres,
            },
            {
              label: "Apellidos",
              name: "lastName",
              type: "text",
              isRequired: true,
              value: person.apellIdos,
            },
            {
              label: "Edad",
              name: "age",
              type: "text",
              isRequired: true,
              value: person.edad,
            },
            {
              label: "Número Telefónico",
              name: "phoneNumber",
              type: "text",
              isRequired: true,
              value: person.numeroTelefonico,
            },
            {
              label: "Dirección",
              name: "address",
              type: "text",
              isRequired: true,
              value: person.direccion,
            },
            {
              label: "Correo",
              name: "email",
              type: "text",
              isRequired: true,
              value: person.correoElectronico,
            },
            /*
            {
              label: 'Fecha Nacimiento',
              name: 'dateBirth',
              type: 'date',
              value: person.fechaNacimiento,
            },*/
            {
              label: "Género",
              name: "gender",
              type: "select",
              isRequired: true,
              value: (gender && gender.id) || null,
              options: genders.map((gender) => ({
                value: gender.id,
                label: gender.genero,
              })),
            },
            {
              label: "Ciudad",
              name: "city",
              type: "select",
              isRequired: true,
              value: (city && city.id) || null,
              options: cities.map((city) => ({
                value: city.id,
                label: city.ciudad,
              })),
            },
          ],
          employee: [
            /*
            {
              label: 'Fecha Admisión',
              name: 'fechaAdmision',
              type: 'date',
              isRequired: false,
              value: employee.fechaAdmision,
            },*/
            {
              label: "Supervisor",
              name: "supervisor",
              type: "text",
              value: employee.supervisor,
              isRequired: false,
            },
            {
              label: "Rol",
              name: "rol",
              type: "select",
              isRequired: false,
              value: (rol && rol.id) || null,
              options: companyRols.map((rol) => ({
                value: rol.id,
                label: rol.rol,
              })),
            },
            {
              label: "Área",
              name: "area",
              type: "select",
              isRequired: false,
              value: (area && area.id) || null,
              options: areas.map((area) => ({
                value: area.id,
                label: area.NombreArea,
              })),
            },
          ],

          segments: [
            {
              label: "Antiguedad Trabajo",
              name: "antiguedadTrabajo",
              type: "text",
              isRequired: false,
            },
            {
              label: "Estado Parental",
              name: "parentalStatus",
              type: "text",
              isRequired: false,
            },
            {
              label: "Resultado Última Evaluación Desempeño",
              name: "lastResult",
              type: "text",
              isRequired: false,
            },
            {
              label: "Número de Hijos",
              name: "childNumber",
              type: "text",
              isRequired: false,
            },
            {
              label: "Nivel Organizacional",
              name: "organizationalLevel",
              type: "select",
              isRequired: false,
              value: (OrganizationalLevel && OrganizationalLevel.id) || null,
              options: organizationalLevels.map((organizationalLevel) => ({
                value: organizationalLevel.id,
                label: organizationalLevel.nivelOrganizacional,
              })),
            },
            {
              label: "Tipo de Contrato",
              name: "contractType",
              type: "select",
              isRequired: false,
              value: (ContractType && ContractType.id) || null,
              options: contractTypes.map((contractType) => ({
                value: contractType.id,
                label: contractType.tipoContrato,
              })),
            },
            {
              label: "Tipo de Contratacion",
              name: "hiringType",
              type: "select",
              isRequired: false,
              value: (HiringType && HiringType.id) || null,
              options: hiringTypes.map((hiringType) => ({
                value: hiringType.id,
                label: hiringType.tipoContrato,
              })),
            },
            {
              label: "Discapacidades",
              name: "disabilities",
              type: "select",
              isRequired: false,
              value: (Disabilities && Disabilities.id) || null,
              options: disabilities.map((disabilities) => ({
                value: disabilities.id,
                label: disabilities.discapacIdades,
              })),
            },
            {
              label: "Preferencia Sexual",
              name: "sexualPreference",
              type: "select",
              isRequired: false,
              value: (SexualPreference && SexualPreference.id) || null,
              options: sexualPreferences.map((sexualPreference) => ({
                value: sexualPreference.id,
                label: sexualPreference.preferenciaSexual,
              })),
            },
            {
              label: "Oficina",
              name: "campus",
              type: "select",
              isRequired: false,
              value: (Campus && Campus.id) || null,
              options: offices.map((campus) => ({
                value: campus.id,
                label: campus.sede,
              })),
            },
            {
              label: "Nivel de Inglés",
              name: "englishLevel",
              type: "select",
              isRequired: false,
              value: (EnglishLevel && EnglishLevel.id) || null,
              options: englishLevels.map((englishLevel) => ({
                value: englishLevel.id,
                label: englishLevel.nivelIngles,
              })),
            },
            {
              label: "Nivel Educativo",
              name: "educationLevel",
              type: "select",
              isRequired: false,
              value: (EducationLevel && EducationLevel.id) || null,
              options: educationLevels.map((educationLevel) => ({
                value: educationLevel.id,
                label: educationLevel.nivelEducacion,
              })),
            },
            {
              label: "Profesión",
              name: "profession",
              type: "select",
              isRequired: false,
              value: (Profesion && Profesion.id) || null,
              options: professions.map((profession) => ({
                value: profession.id,
                label: profession.profesion,
              })),
            },
            {
              label: "Jornada",
              name: "workingDay",
              type: "select",
              isRequired: false,
              value: (WorkingDay && WorkingDay.id) || null,
              options: workingDays.map((company) => ({
                value: company.id,
                label: company.nombreCompania,
              })),
            },
            {
              label: "Tipo Salario",
              name: "salaryType",
              type: "select",
              isRequired: false,
              value: (SalaryType && SalaryType.id) || null,
              options: salaryTypes.map((salaryType) => ({
                value: salaryType.id,
                label: salaryType.tipoDeSalario,
              })),
            },
            {
              label: "Estado Civil",
              name: "maritalStatus",
              type: "select",
              isRequired: false,
              value: (MaritalStatus && MaritalStatus.id) || null,
              options: maritalStatuses.map((maritalStatus) => ({
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
      enqueueSnackbar("Empleado eliminado con éxito", {
        variant: "success",
      });
      fetchEmployee();
    } catch (e) {
      enqueueSnackbar("Hubo un error al eliminar el Empleado", {
        variant: "success",
      });
    }
  };

  const mapEmployee = (employee) =>
    employee.map((employee) => [
      {
        column: "Nombre",
        value: employee.nombrePersona,
      },
      {
        column: "supervisor",
        value: employee.supervisor,
      },
      {
        column: "date",
        value: employee.FechaAdmision,
      },
      {
        column: "rol",
        value: employee.nombreRol,
      },
      {
        column: "area",
        value: employee.nombreArea,
      },
      {
        column: "options",
        value: "",
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
          IdGenero: formValues.gender,
          IdCiudad: formValues.city,
        },
        employee: {
          FechaAdmision: formValues.fechaAdmision || null,
          supervisor: formValues.supervisor || null,
          IdCompania: currentCompany.id || null,
          rollCompania: formValues.rol || null,
          areaId: formValues.area || null,
        },
        segments: {
          antiguedadEnElTrabajo: formValues.antiguedadTrabajo || null,
          EstadoParental: formValues.parentalStatus || null,
          ResultadoUltimaEvaluacionDesempeno:
            formValues.resultadoEvaluacion || null,
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
        },
      });
      setEmployees(employees);
      fetchEmployee();
      enqueueSnackbar("Empleado creado con éxito", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar("Hubo un error al crear el Empleado", {
        variant: "error",
      });
    }
  };

  return {
    handleCreateEmployee,
    handleEditEmployee,
    mapEmployee,
    employees,
    persons,
    segments,
    cities,
    areas,
    handleDeleteEmployee,
    setEmployees,
    setLoading,
    fetchEmployee,
    handleSubmittedCreateEmployee,
    fetchCity,
    fetchCompanies,
    fetchPerson,
    fetchSegment,
    fetchArea,
  };
};
