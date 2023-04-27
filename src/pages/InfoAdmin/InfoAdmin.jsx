import { useCallback, useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { current } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import * as uuid from 'uuid';
//import axios from '../utils/axiosInstance';

import Building from '../../assets/Building.svg';
import MyCard from '../../components/MyCard/MyCard';
import MyCreateDialog2 from '../../components/MyCreateDialog2/MyCreateDialog2';
import MyEditDialog2 from '../../components/MyEditDialog2/MyEditDialog2';
import MyLoader from '../../components/MyLoader/MyLoader';
import MyTable from '../../components/MyTable/MyTable';
import NewCompany from '../../components/NewCompany/NewCompany';
import NewDepartment from '../../components/NewDepartment/NewDepartment';
import NewEmployee from '../../components/NewEmployee/NewEmployee';
import NewOffice from '../../components/NewOffice/NewOffice';
import Notification from '../../components/Notification';
import Table from '../../components/Table';
import { addItem, storeItems, updateItem } from '../../features/adminSlice';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import { getCompaniesAPI, storeCompanyAPI, deleteCompanyAPI, updateStateCompanyAPI } from '../../services/getCompanies.service';
import { updateEmployeeAPI } from '../../services/getEmployees.service';
import { getOfficesAPI, postOfficeAPI } from '../../services/getOffices.service';
import {
  deleteRolCompanyAPI,
  fetchRolCompanyAPI,
  storeRolCompanyAPI,
} from '../../services/getRolCompany.service';
import { postCompanyAPI } from '../../services/postCompany.service';
import { postEmployeeAPI } from '../../services/postEmployee.service';
import axios from '../../utils/axiosInstance';

import { departmentsColumns, useCreateDepartment, useDepartment } from './department/departmentData';
import { employeesColumns, useCreateEmployee, useEmployee } from './employees/employeesData';
import { officesColumns, useCreateOffice, useOffice } from './office/officeData';
import { fetchSizeCompanyAPI } from '../../services/getSizeCompany.service';
import { fetchSectorAPI } from '../../services/getSector.service';
import { getAllCountryAPI } from '../../services/getCountry.service';
import Error from '../Error/Error';
import styles from './InfoAdmin.module.css';
import Switch from '@mui/material/Switch';


const search = (value, inputArray, field, proprety) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === value) {
      return inputArray[i][field];
    }
  }
};

export default function InfoAdmin() {
  const [isAllowed, setIsAllowed] = useState(false);
  const [switchValues, setSwitchValues] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentCreate, setCurrentCreate] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const { offices, mapOffice, fetchOffice, handleSubmittedCreateOffice } = useOffice(currentCompany);
  const { handleCreateOffice } = useCreateOffice(setOpenCreateDialog, setCurrentCreate);
  const { departments, setDepartments, mapDepartment, fetchDepartments, handleSubmittedCreateDepartment } = useDepartment(currentCompany);
  const { handleCreateDepartment } = useCreateDepartment(setOpenCreateDialog, setCurrentCreate);

  const { handleCreateEmployee,
    handleEditEmployee,
    mapEmployee,
    employees,
    persons,
    segments,
    genders,
    cities,
    rols,
    areas,
    organizationalLevel,
    contractType,
    hiringType,
    disabilities,
    sexualPreference,
    campus,
    englishLevel,
    educationLevel,
    profession,
    workingDay,
    salaryType,
    maritalStatus,
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
    fetchWorkingDay,
    fetchRol,
    fetchArea,
    fetchPerson,
  fetchSegment } = useEmployee(setOpenCreateDialog, setCurrentCreate, setOpenEditDialog, setCurrentEdit, currentCompany);

  const [companyRols, setCompanyRols] = useState([]);
  const [companies, setCompany] = useState([]);
  const [sectors, setSector] = useState([]);
  const [sizeCompanies, setSizeCompany] = useState([]);
  const [countries, setCountry] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { type } = useParams();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);



  const [compania, setCompania] = useState({
    nombreCompania: '',
    IdPais: '',
    Sede: '',
    direccion: '',
    IdTamanoCompania: '',
    SectorId: '',
    Logotipo: null,
  });
  const [oficina, setOficina] = useState({
    sede: '',
    IdCompania: '',
  });
  const [department, setDepartement] = useState({
    IdPais: '',
    codigoDepartamento: '',
    departamento: '',
  });

  const [employee, setEmployee] = useState(
    {
      person: {
        numeroDocumento: '',
        nombres: '',
        apellIdos: '',
        edad: '',
        numeroTelefonico: '',
        direccion: '',
        correoElectronico: '',
        fechaNacimiento: '',
        IdTipoDocumento: '',
        IdGenero: '',
        IdCiudad: '',
      },
      employee: {
        FechaAdmision: '',
        supervisor: '',
        IdCompania: '',
        rollCompania: '',
        areaId: '',
      },
      segments: {
        antiguedadEnElTrabajo: '',
        estadoParental: '',
        resultadoUltimaEvaluacionDesempeno: '',
        numerodeHijos: '',
        IdAreaFuncional: '',
        IdNivelOrganizacional: '',
        IdTipodeContrato: '',
        IdTipodeContratacion: '',
        IdDisabilities: '',
        IdSexualPreference: '',
        IdCampus: '',
        IdEnglishLevel: '',
        IdEducationLevel: '',
        IdProfession: '',
        IdGrupoCiolectivo: '',
        IdJornada: '',
        IdSalaryType: '',
        IdEstadoCivil: '',
      },
    }
  );

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const tableData = admin[type];

  // state for ids
  const [data, setData] = useState({
    content: {
      country: [], sizeCompany: [], sector: [], company: [],
      documentType: [], gender: [], AreaFuncional: [], NivelOrganizacional: [],
      TipoContrato: [], TipoContratacion: [], Disabilities: [], SexualPreference: [],
      Campus: [], EnglishLevel: [], EducationLevel: [], GrupoCiolectivo: [], Jornada: [],
      SalaryType: [], EstadoCivil: [],
    },

    ids: {
      country: [], sizeCompany: [], sector: [], company: [],
      documentType: [], gender: [], AreaFuncional: [], NivelOrganizacional: [],
      TipoContrato: [], TipoContratacion: [], Disabilities: [], SexualPreference: [],
      Campus: [], EnglishLevel: [], EducationLevel: [], GrupoCiolectivo: [], Jornada: [],
      SalaryType: [], EstadoCivil: [],
    },
  });
  const csvLink = useRef();
  const importcsv = useRef();

  const [values, setValues] = useState({
    isOpen: false,
    message: '',
    severity: '',
  });

  const [employecsv, setEmployecsv] = useState('');

  const sectorConsume = async () => {
    try {
      await axios.get('Sector/').then((res) => {
        let fetch = [];
        let id = [];
        res.data.forEach((val) => {
          if (!fetch.includes(val.Sector)) {
            fetch.push(val.Sector);
            id.push(val);
          }
        });
        let holder = data;
        holder.content.sector = fetch;
        holder.ids.sector = id;
        setData(holder);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    const { data : sizeCompanyData } = await fetchSizeCompanyAPI();
    setSizeCompany(sizeCompanyData);
  };

  const fetchSector = async () => {
    const { data : sectorData } = await fetchSectorAPI();
    setSector(sectorData);
  };

  
  const fetchCountry = async () => {
    const { data : countryData } = await getAllCountryAPI();
    setCountry(countryData);
  };

  const handleSubmittedCreateDialog = async (formValues) => {
    if (currentCreate.type === 'company') {
      let urlLogo = null;
      try {
        if (file) {
          const formData = new FormData();
          formData.append('logoTipo', file); // Asegúrate de utilizar el nombre correcto para el campo de la imagen
          try {
            const response = await axios.post(`Autenticacion/LogoCompany?BussinesName=${formValues.companyName}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

            if (response) {
               urlLogo = response.data.urlLogo;
            } else {
              console.error('Error al subir la imagen:', response.statusText);
            }
          } catch (error) {}
        }
        await storeCompanyAPI({
          idUser: userInfo.user,
          nombreCompania: formValues.companyName,
          Logotipo: urlLogo,
          IdPais: formValues.country,
          Sede: formValues.sede,
          direccion: formValues.address,
          IdTamanoCompania: formValues.sizeCompany,
          SectorId: formValues.sector,
        });
        //fetchCompanyRol();
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
        await storeRolCompanyAPI({
          idCompany: currentCompany.id,
          rol: formValues.rol,
        });
        fetchCompanyRol();
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


  const handleSubmittedEditDialog = async (formValues) => {
    
    if (currentEdit.type === 'employee') {
      // find category
      const employeeToEdit = employees.find((employee) => employee.id === currentEdit.id);
      const Person = persons.find((person) => person.id === employeeToEdit.IdPersona);
    
    //Other fields
    const OrganizationalLevel = organizationalLevel.find((organizationalLevel) => formValues.organizationalLevel === organizationalLevel.value);
    const ContractType = contractType.find((contractType) => formValues.contractType === contractType.value);
    const HiringType = hiringType.find((hiringType) => formValues.hiringType === hiringType.value);
    const Disabilities = disabilities.find((disabilities) => formValues.disabilities === disabilities.value);
    const SexualPreference = sexualPreference.find((sexualPreference) => formValues.sexualPreference === sexualPreference.value);
    const Campus = campus.find((campus) => formValues.campus === campus.value);
    const EnglishLevel = englishLevel.find((englishLevel) => formValues.englishLevel === englishLevel.value);
    const EducationLevel = educationLevel.find((educationLevel) => formValues.educationLevel === educationLevel.value);
    const Profesion = profession.find((profession) => formValues.profession === profession.value);
    const WorkingDay = workingDay.find((workingDay) => formValues.workingDay === workingDay.value);
    const SalaryType = salaryType.find((salaryType) => formValues.salaryType === salaryType.value);
    const MaritalStatus = maritalStatus.find((maritalStatus) => formValues.maritalStatus === maritalStatus.value);

      if (employeeToEdit === undefined || Person === undefined) {
        return;
      }

      const person = {
        id: Person.id, 
        numeroDocumento: formValues.documentNumber || null,
        nombres: formValues.name || null,
        apellIdos: formValues.lastName || null,
        edad: formValues.age || null,
        numeroTelefonico: formValues.phoneNumber || null,
        direccion: formValues.address || null,
        correoElectronico: formValues.email || null,
        fechaNacimiento: formValues.birthdate || null,
        IdTipoDocumento: formValues.documentType || null,
        IdGenero: formValues.city  || null,
        IdCiudad: formValues.gender || null,
      };

      const employee = {
        id: employeeToEdit.id || 0,
        FechaAdmision:  formValues.fechaAdmision || null,
        supervisor: formValues.supervisor || null,
        IdCompania: currentCompany.id,
        rollCompania: formValues.rol || null,
        areaId: formValues.area || null,
      };
      
      const segments = {
        id: Person.IdSegmentos || 0,
        antiguedadEnElTrabajo: formValues.antiguedadTrabajo || null,
        EstadoParental: formValues.parentalStatus || null,
        ResultadoUltimaEvaluacionDesempeno: formValues.childNumber || null,
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
      console.log(employeeData)

      try {
        await updateEmployeeAPI(employeeData);
        enqueueSnackbar(
          'Empleado actualizado con éxito',
          {
            variant: 'success',
          },
        );
      } catch (e) {
        enqueueSnackbar(
          'Hubo un error al actualizar el Empleado',
          {
            variant: 'error',
          },
        );
      }

    }
    setCurrentEdit(null);
    setOpenEditDialog(false);
  };

  const sizeCompanyConsume = async () => {
    try {
      await axios.get('TamanoCompania/').then((res) => {
        let fetch = [];
        let id = [];
        res.data.forEach((val) => {
          if (!fetch.includes(val.nameSizeOfCompany)) {
            fetch.push(val.quantityOfEmployees);
            id.push(val);
          }
        });
        let holder = data;
        holder.content.sizeCompany = fetch;
        holder.ids.sizeCompany = id;
        setData(holder);
      });
    } catch (error) {

    }
  };

  const countryConsume = async () => {
    try {
      await axios.get('paises/').then((res) => {
        let fetch = [];
        let id = [];
        res.data.forEach((val) => {
          if (!fetch.includes(val.pais)) {
            fetch.push(val.pais);
            id.push(val);
          }
        });
        let holder = data;
        holder.content.country = fetch;
        holder.ids.country = id;
        setData(holder);
      });
    } catch (error) {

    }
  };

  const companyConsume = async () => {
    try {
      await axios.get('companias/').then((res) => {

        let fetch = [];

        let id = [];
        res.data.forEach((val) => {
          if (!fetch.includes(val.nombreCompania)) {
            fetch.push(val.nombreCompania);
            id.push(val);
          }
        });
        let holder = data;
        holder.content.company = fetch;
        holder.ids.company = id;
        setData(holder);
      });
    } catch (error) {
    }
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
      companyColumns.push(
        {
          id: 'active',
          label: 'Activar',
          numeric: false,
        }
      );
    }
  
    return companyColumns;
  };

  const companyColumns = createCompanyColumns(userInfo?.role.findIndex((p) => p === 'Administrador') > 0);

  const handleEditCompany = (id) =>{
      const companyData = companies.find((company) => company.id === id);
      const sizeCompany = sizeCompanies.find((sizeCompany) => sizeCompany.id === companyData.IdTamanoCompania);
      const country = countries.find((country) => country.id === companyData.IdPais);
      const sector = sectors.find((sector) => sector.id === companyData.SectorId);
      if (companyData === undefined ) {
        return;
      }
  
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
            value: country && country.id || null,
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
            value:companyData.Sede,
            isRequired: true,
          }, 
          {
            label: 'Tamaño Empresa',
            name: 'sizeCompany',
            type: 'select',
            isRequired: true,
            value: sizeCompany && sizeCompany.id || null,
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
            value: sector && sector.id || null,
            options: sectors.map((sector) => ({
              value: sector.id,
              label: sector.Sector,
            })),
          }
        ],
      });
      setOpenEditDialog(true);
  }

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
        }
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
        value: (
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
          ) : null
        )
      });
    }

    return columns;
  });

  const handleSwitchChange = async(id, event) => {
    const newValue = event.target.checked;
    setSwitchValues({ ...switchValues, [id]: newValue });
    await updateStateCompanyAPI(id, newValue);
  };

  const handleDeleteCompany = async (id) => {
    const company = companies.find((company) => company.id === id);
    if (company === undefined) {
      return;
    }

    try {
      await deleteCompanyAPI(id);
      enqueueSnackbar('Compañía eliminada con exito', {
        variant: 'success',
      });
      //fetchCompanyRol();
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

    const { data } = await getCompaniesAPI(userInfo.user);
    const { data: sector}   = await fetchSectorAPI();
 
    const sectorNames = sector.reduce((acc, sector) => {
      acc[sector.id] = sector.Sector;
      return acc;
    }, {});


    const { data: country } = await getAllCountryAPI(); 
    const countryNames = country.reduce((acc, country) => {
      acc[country.id] = country.value;
      return acc;
    }, {});


    const { data: sizeCompany } = await fetchSizeCompanyAPI();
    const sizeCompanyNames = sizeCompany.reduce((acc, sizeCompany) => {
      acc[sizeCompany.id] = sizeCompany.quantityOfEmployees;
      return acc;
    }, {});


    const company = data.map((company) => ({
      ...company,
      nombreSector: sectorNames[company.SectorId],
      nombreTamañoCompañia: sizeCompanyNames[company.IdTamanoCompania],
      nombrePais: countryNames[company.IdPais],
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
        });
        fetchCompanyRol();
      } catch (e) {
        enqueueSnackbar('Error eliminar crear Rol', {
          variant: 'error',
        });
      }

    };
  
    const fetchCompanyRol = async () => {
      if (!currentCompany) {
        return;
      }
      setLoading(true);
      const { data } = await  fetchRolCompanyAPI(currentCompany.id);
      setCompanyRols(data);
      setLoading(false);
    };
    //fin Roles Company


  /*
    const documentTypeConsume = async () => {
      try {
        await axios.get('tipo-documentos/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.tipoDocumento)) {
              fetch.push(val.tipoDocumento);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.documentType = fetch;
          holder.ids.documentType = id;
          setData(holder);
  
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const genderConsume = async () => {
      try {
        await axios.get('generos/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.genero)) {
              fetch.push(val.genero);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.gender = fetch;
          holder.ids.gender = id;
          setData(holder);
  
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const cityConsume = async () => {
      try {
        await axios.get('ciudades/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.genero)) {
              fetch.push(val.genero);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.gender = fetch;
          holder.ids.gender = id;
          setData(holder);
  
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const areaConsume = async () => {
      try {
        await axios.get('Area/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.NombreArea)) {
              fetch.push(val.NombreArea);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.AreaFuncional = fetch;
          holder.ids.AreaFuncional = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
  
    const organizationalLevelConsume = async () => {
      try {
        await axios.get('OrganizationalLevel/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.nivelOrganizacional)) {
              fetch.push(val.nivelOrganizacional);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.NivelOrganizacional = fetch;
          holder.ids.NivelOrganizacional = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const contractTypeConsume = async () => {
      try {
        await axios.get('ContractType/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.tipoContrato)) {
              fetch.push(val.tipoContrato);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.TipoContrato = fetch;
          holder.ids.TipoContrato = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const hiringTypeConsume = async () => {
      try {
        await axios.get('HiringType/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.tipoContrato)) {
              fetch.push(val.tipoContrato);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.TipoContratacion = fetch;
          holder.ids.TipoContratacion = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const sexualPreferenceConsume = async () => {
      try {
        await axios.get('PreferenciSexual/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.preferenciaSexual)) {
              fetch.push(val.preferenciaSexual);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.SexualPreference = fetch;
          holder.ids.SexualPreference = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const campusConsume = async () => {
      try {
        await axios.get('Campus/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.sede)) {
              fetch.push(val.sede);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.Campus = fetch;
          holder.ids.Campus = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const englishLevelConsume = async () => {
      try {
        await axios.get('EnglishLevel/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.nivelIngles)) {
              fetch.push(val.nivelIngles);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.EnglishLevel = fetch;
          holder.ids.EnglishLevel = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const JornadaConsume = async () => {
      try {
        await axios.get('EducationLevel/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.nivelEducativo)) {
              fetch.push(val.nivelEducativo);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.EducationLevel = fetch;
          holder.ids.EducationLevel = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const EstadoCivilConsume = async () => {
      try {
        await axios.get('MaritalStatus/').then((res) => {
          let fetch = [];
          let id = [];;
          res.data.forEach((val) => {
            if (!fetch.includes(val.estadoCivil)) {
              fetch.push(val.estadoCivil);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.EstadoCivil = fetch;
          holder.ids.EstadoCivil = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const GrupoCiolectivoConsume = async () => {
      try {
        await axios.get('EducationLevel/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.nivelEducativo)) {
              fetch.push(val.nivelEducativo);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.EducationLevel = fetch;
          holder.ids.EducationLevel = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const SalaryTypeConsume = async () => {
      try {
        await axios.get('TipoSalario/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.tipoDeSalario)) {
              fetch.push(val.tipoDeSalario);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.SalaryType = fetch;
          holder.ids.SalaryType = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const educationLevelConsume = async () => {
      try {
        await axios.get('EducationLevel/').then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.nivelEducativo)) {
              fetch.push(val.nivelEducativo);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.EducationLevel = fetch;
          holder.ids.EducationLevel = id;
          setData(holder);
        });
      } catch (error) {
        console.log(error);
      }
    };
    */
  // handle modal
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setEdit(false);
  };

  // handle autocomplete change

  const handleAutoCompleteCompany = useCallback(
    (name, value) => {
      setCompania({ ...compania, [name]: value });
    },
    [compania]
  );

  const handleAutoCompleteOficina = useCallback(
    (name, value) => {
      setOficina({ ...oficina, [name]: value });
    },
    [oficina]
  );

  const handleAutoCompleteDepartment = useCallback(
    (name, value) => {
      setDepartement({ ...department, [name]: value });
    },
    [department]
  );

  const handleAutoCompleteEmployee = useCallback((name, value) => {
    const fieldNames = name.split('.'); // Separamos el nombre del campo en base al punto (.)

    setEmployee((prevState) => ({
      ...prevState,
      [fieldNames[0]]: {
        ...prevState[fieldNames[0]],
        [fieldNames[1]]: value,
      },
    }));
  }, []);

  const handlephoto = (event) => {
    if (event.target.files[0].size < 500000) {
      setCompania({ ...compania, Logotipo: event.target.files[0] });
    } else {
      setValues({
        ...values,
        message:
          'El tamaño de la imagen para el logotipo no puede ser mayor a 500kB',
        isOpen: true,
        severity: 'error',
      });
    }
  };

  // handle data (new or edit)

  const handleCompany = async () => {
    if (edit) {
      dispatch(updateItem({ data: compania, type: type, id: compania._id }));
    } else {
      const id = uuid.v4();
      let holder = compania;
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));
      let idpais = search(compania.IdPais, data.ids.country, 'id', 'pais');
      let sectorid = search(compania.SectorId, data.ids.sector, 'id', 'Sector');
      let sizeid = search(
        compania.IdTamanoCompania,
        data.ids.sizeCompany,
        'id',
        'quantityOfEmployees'
      );
      let logoTipo = null;

      if (compania.Logotipo !== null) {
        let bodyFormData = new FormData();
        bodyFormData.append('logoTipo', compania.Logotipo);

        await fetch(
          `https://peopleintelligenceapi.azurewebsites.net/api/Autenticacion/LogoCompany?BussinesName=${compania.nombreCompania}`,
          {
            method: 'POST',
            body: bodyFormData,
          }
        )
          .then((response) => response.json())
          .then((res) => {
            logoTipo = res.urlLogo;
          })
          .catch((err) => console.log(err));
      }
      postCompanyAPI(
        oficina,
        idpais,
        sectorid,
        sizeid,
        userInfo.user,
        logoTipo
      );
    }

    setCompania({
      nombreCompania: '',
      IdPais: '',
      Sede: '',
      direccion: '',
      IdTamanoCompania: '',
      SectorId: '',
      Logotipo: null,
    });
    handleCloseModal();
  };

  const handleOficina = () => {
    if (edit) {
      dispatch(updateItem({ data: oficina, type: type, id: oficina._id }));
    } else {
      const id = '';
      let holder = oficina;
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));

      postOfficeAPI(
        oficina,
        userInfo.Company
      );
    }
    setOficina({
      sede: '',
      IdCompania: '',
    });
    handleCloseModal();
  };

  const handleDepartment = () => {
    if (edit) {
      dispatch(
        updateItem({ data: department, type: type, id: department._id })
      );
    } else {
      const id = uuid.v4();
      let holder = department;
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));
    }
    setDepartement({
      IdPais: '',
      codigoDepartamento: '',
      departamento: '',
    });
    handleCloseModal();
  };


  const handleEmployee = async () => {
    if (edit) {
      dispatch(updateItem({ data: employee, type: type, id: employee._id }));
    } else {
      const id = uuid.v4();
      let holder = JSON.parse(JSON.stringify(employee));
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));

      let idTipoDocumento = search(employee.person.IdTipoDocumento, data.ids.documentType, 'documentTypeId', 'tipoDocumento');
      let IdGenero = search(employee.person.IdGenero, data.ids.gender, 'id', 'genero');
      let IdCompany = search(employee.employee.IdCompania, data.ids.company, 'id', 'nombreCompania');


      let updatedPerson = {
        ...holder.person,
        IdTipoDocumento: idTipoDocumento,
        IdGenero: IdGenero,
        IdCiudad: '1',
      };

      let updatedEmployee = {
        ...holder.employee,
        IdCompania: IdCompany,
      };

      holder = { ...holder, person: updatedPerson, employee: updatedEmployee };

      /*
      postEmployeeAPI(
        oficina,
        idpais,
        sectorid,
        sizeid,
        userInfo.user,
      );*/
    }


    setEmployee({
      person: {
        numeroDocumento: '',
        nombres: '',
        apellIdos: '',
        edad: '',
        numeroTelefonico: '',
        direccion: '',
        correoElectronico: '',
        fechaNacimiento: '',
        IdTipoDocumento: '',
        IdGenero: '',
        IdCiudad: '',
      },
      employee: {
        FechaAdmision: '',
        supervisor: '',
        IdCompania: '',
        rollCompania: '',
        areaId: '',
      },
      segments: {
        antiguedadEnElTrabajo: '',
        estadoParental: '',
        resultadoUltimaEvaluacionDesempeno: '',
        numerodeHijos: '',
        IdAreaFuncional: '',
        IdNivelOrganizacional: '',
        IdTipodeContrato: '',
        IdTipodeContratacion: '',
        IdDisabilities: '',
        IdSexualPreference: '',
        IdCampus: '',
        IdEnglishLevel: '',
        IdEducationLevel: '',
        IdProfession: '',
        IdGrupoCiolectivo: '',
        IdJornada: '',
        IdSalaryType: '',
        IdEstadoCivil: '',
      },
    });
    handleCloseModal();
  };


  // handle change input

  const handleChangeCompania = useCallback(
    (event) => {
      setCompania({ ...compania, [event.target.name]: event.target.value });
    },
    [compania]
  );
  const handleChangeOficina = useCallback(
    (event) => {
      setOficina({ ...oficina, [event.target.name]: event.target.value });
    },
    [oficina]
  );
  const handleChangeDepartment = useCallback(
    (event) => {
      setDepartement({
        ...department,
        [event.target.name]: event.target.value,
      });
    },
    [department]
  );
  /*
const handleChangeEmployee = useCallback(
  (event) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  },
  [employee]
);*/

  const handleChangeEmployee = useCallback((event) => {
    const { name, value } = event.target;
    const fieldNames = name.split('.'); // Separamos el nombre del campo en base al punto (.)

    setEmployee((prevState) => ({
      ...prevState,
      [fieldNames[0]]: {
        ...prevState[fieldNames[0]],
        [fieldNames[1]]: value,
      },
    }));
  }, []);

  const handleDownload = () => {
    axios
      .get('Employee/DownloadCsvEmployee')
      .then((res) => setEmployecsv(res.data));
  };

  // show modal

  const renderModal = () => {
    switch (type) {
      case 'Empresas':
        return (
          <NewCompany
            info={compania}
            ids={data.ids}
            content={data.content}
            handleAutocomplete={handleAutoCompleteCompany}
            handleChangeCompania={handleChangeCompania}
            handleCloseModal={handleCloseModal}
            handleCompany={handleCompany}
            handlePhoto={handlephoto}
          />
        );
      case 'Oficinas':
        return (
          <NewOffice
            info={oficina}
            content={data.content}
            handleAutocomplete={handleAutoCompleteOficina}
            handleChangeOficina={handleChangeOficina}
            handleCloseModal={handleCloseModal}
            handleOffice={handleOficina}
          />
        );

      case 'Departamentos':
        return (
          <NewDepartment
            info={department}
            content={data.content}
            handleAutocomplete={handleAutoCompleteDepartment}
            handleChangeDepartment={handleChangeDepartment}
            handleCloseModal={handleCloseModal}
            handleDepartment={handleDepartment}
          />
        );
      default:
        return null;
    }
  };

  //edit item
  const handleEditItem = (row) => {
    switch (type) {
      case 'Empresas':
        setCompania({
          ...row,
        });
        break;
      case 'Oficinas':
        setOficina({ ...row });
        break;
      case 'Empleados':
        setEmployee({ ...row });
        break;
      case 'Departamentos':
        setDepartement({ ...row });
        break;
      default:
        break;
    }
    setEdit(true);
  };

  // get data

  const getTableData = () => {
    switch (type) {
      /*
      case 'Empresas':
        countryConsume();
        sizeCompanyConsume();
        sectorConsume();
        getCompaniesAPI(userInfo.user)
          .then((res) => {
            let data = [];
            res.data.forEach((val) => {
              let id = uuid.v4();
              if (!data.includes(val)) {
                let holder = val;
                holder._id = id;
                data.push(val);
              }
            });
            dispatch(storeItems({ data, type: type }));
          })
          .catch((e) => console.log(e));
        break;
      case 'Empleados':
        countryConsume();
        sizeCompanyConsume();
        sectorConsume();
        documentTypeConsume();
        genderConsume();
        companyConsume();
        areaConsume();
        organizationalLevelConsume();
        contractTypeConsume();
        hiringTypeConsume();
        sexualPreferenceConsume();
        campusConsume();
        englishLevelConsume();
        educationLevelConsume();
        SalaryTypeConsume();
        GrupoCiolectivoConsume();
        EstadoCivilConsume();
        JornadaConsume();
        getEmployeesAPI(userInfo.Company)
          .then((res) => {
            let data = [];
            res.data.forEach((val) => {
              let id = uuid.v4();
              if (!data.includes(val)) {
                let holder = val;
                holder._id = id;
                data.push(val);
              }
            });
            dispatch(storeItems({ data, type: type }));
          })
          .catch((e) => console.log(e));
        break;*/
      case 'Oficinas':
        companyConsume();
        getOfficesAPI()
          .then((res) => {
            let data = [];
            res.data.forEach((val) => {
              let id = uuid.v4();
              if (!data.includes(val)) {
                let holder = val;
                holder._id = id;
                data.push(val);
              }
            });
            dispatch(storeItems({ data, type: type }));
          })
          .catch((e) => console.log(e));
        break;

        case 'Otros campos':
          dispatch(storeItems({ data, type: type }));
            return null;
          break;
      default:
    }
  };

  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  const handleFile = async (event) => {
    let bodyFormData = new FormData();
    bodyFormData.append('data', event.target.files[0]);

    await fetch(
      `https://peopleintelligenceapi.azurewebsites.net/api/Employee/EmployeesCsv/${userInfo.Company}`,
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
        if (!currentCompany) {
      return;
    }
    fetchGender(currentCompany.id);
    fetchSector();
    fetchSizeCompany();
    fetchCountry();
    getTableData();
    fetchCompany();

    /*
    fetchOffice();
    fetchEmployee();

    fetchGender();
    fetchDocumentsTypes();
    fetchCompanies();
    fetchMaritalStatus();
    fetchSalaryType();
    fetchProfessions();
    fetchEducationLevel();
    fetchEnglishLevel();
    fetchCampus();
    fetchSexualPreference();
    fetchDisabilities();
    fetchHiringType();
    fetchContractType();
    fetchOrganizationalLevel();
    fetchPerson();
    */
  }, [type]);

  useEffect(() => {
    if (!currentCompany) {
      return;
    }
    fetchCompany();
    fetchPerson();
    //fetchSegment();
    fetchDepartments();
    fetchOffice();
    fetchCompanyRol();
    fetchEmployee();
    fetchDocumentsTypes();
    fetchCity();
    fetchSector();
    fetchSizeCompany();
    fetchCountry();
    fetchGender(currentCompany.id);
    fetchMaritalStatus(currentCompany.id);
    fetchSalaryType(currentCompany.id);
    fetchProfessions(currentCompany.id);
    fetchEducationLevel(currentCompany.id);
    fetchEnglishLevel(currentCompany.id);
    fetchCampus(currentCompany.id);
    fetchSexualPreference(currentCompany.id);
    fetchDisabilities(currentCompany.id);
    fetchHiringType(currentCompany.id);
    fetchContractType(currentCompany.id);
    fetchOrganizationalLevel(currentCompany.id);
    fetchWorkingDay(currentCompany.id);
    fetchRol(currentCompany.id);
    fetchArea(currentCompany.id);
  }, [currentCompany]); // eslint-disable-line react-hooks/exhaustive-deps


  const allowedRoutes = [
    'Otros campos',
    'Empleados',
    'Departamentos',
    'Empresas'
  ]

  useEffect(() => {
    setIsAllowed(allowedRoutes.includes(type));
  }, [type, allowedRoutes]);

  

  return (
    <>
    {isAllowed  ? (
    <Box sx={{ display: 'flex' }}>
      
      <Navbar />
      <IconSidebar />
      <Modal
      
        open={open || edit}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <div className={styles.modaltop}>
            <h2>
              {open ? 'Nueva' : 'Editar'} {type}
            </h2>
            <div>
              <IconButton onClick={handleCloseModal}>
                <ClearIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            </div>
          </div>
          <div className={styles.modalbuttom}>{renderModal()}</div>
        </Box>
      </Modal>
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
                {type !== 'Otros campos' && type !== 'Empleados' && type !== 'Departamentos' && type !== 'Empresas' && (
                  <Button
                    variant="contained"
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '1rem 1rem',
                      color: 'white',
                      marginLeft: '1rem',
                    }}
                    color="primary"
                    onClick={handleOpenModal}
                  >
                    {type}
                  </Button>
                )}
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
            {type !== 'Oficinas' && type !== 'Departamentos' && type !== 'Empleados' && type !== 'Empresas'? (
              <div className={styles.buttom}>
                <Table
                  tableData={tableData}
                  type={type}
                  ids={data.ids}
                  content={data.content}
                  handleEditItem={handleEditItem}
                />
              </div>
            ) : (

              <Box sx={{ display: 'flex' }} >
                <div style={{ backgroundColor: 'white' }}>
                  <div className={styles.DataTable}>
                    <div className={styles.DataTable2}>
                      {loading === true && (
                        <MyLoader />
                      )}
                      {loading === false && type === 'Empresas' && (
                        <MyCard sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <Box sx={{ width: '100%' }}>
                            <Box
                              sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                              }}>

                              {/* Companies */}
                              <div
                                id='settings-tabpanel-0'
                              >
                                <Box
                                  sx={{
                                    p: 3,
                                  }}
                                >
                                  <Stack
                                    spacing={2}
                                    direction='row-reverse'
                                    sx={{
                                      mb: 2,
                                    }}
                                  >
                                    <Button
                                      variant='outlined'
                                      startIcon={<AddIcon />}
                                      onClick={handleCreateCompany}
                                    >
                                      Crear Empresa
                                    </Button>
                                  </Stack>
                                  <MyTable
                                    title={'Empresas'}
                                    columns={companyColumns}
                                    rows={mapCompanies(companies)}
                                  />
                                </Box>
                              </div>
                            </Box>
                          </Box>
                        </MyCard>
                      )}
                      {loading === false && type === 'Oficinas' && (
                        <MyCard sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <Box sx={{ width: '100%' }}>
                            <Box
                              sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                              }}>

                              {/* categories */}
                              <div
                                id='settings-tabpanel-0'
                              >
                                <Box
                                  sx={{
                                    p: 3,
                                  }}
                                >
                                  <Stack
                                    spacing={2}
                                    direction='row-reverse'
                                    sx={{
                                      mb: 2,
                                    }}
                                  >
                                    <Button
                                      variant='outlined'
                                      startIcon={<AddIcon />}
                                      onClick={handleCreateOffice}
                                    >
                                      Crear Oficinas
                                    </Button>
                                  </Stack>
                                  <MyTable
                                    title={'Tipo Contrato'}
                                    columns={officesColumns}
                                    rows={mapOffice(offices)}
                                  />
                                </Box>
                              </div>
                            </Box>
                          </Box>
                        </MyCard>
                      )}
                      {loading === false && type === 'Departamentos' && (
                        <MyCard >
                          <Box sx={{ width: '100%' }}>
                            <Box
                              sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                              }}>
                              <Tabs sx={{ width: '90%', justifyContent: 'center' }}

                                value={currentTab}
                                onChange={(event, newValue) => handleTabChange(event, newValue)}

                              >
                                <Tab
                                  label='Departamento'
                                  id='settings-tab-3'
                                />
                                <Tab
                                  label='Oficina'
                                  id='settings-tab-0'
                                />
                                <Tab
                                  label='Cargo'
                                  id='settings-tab-2'
                                />

                              </Tabs>

                              {/* departments */}
                              <div
                                hidden={currentTab !== 0}
                                id='settings-tabpanel-0'
                              >
                                {currentTab === 0 && (
                                  <Box
                                    sx={{
                                      p: 3,
                                    }}
                                  >
                                    <Stack
                                      spacing={2}
                                      direction='row-reverse'
                                      sx={{
                                        mb: 2,
                                      }}
                                    >
                                      <Button
                                        variant='outlined'
                                        startIcon={<AddIcon />}
                                        onClick={handleCreateDepartment}
                                      >
                                        Crear Departamento
                                      </Button>
                                    </Stack>
                                    <MyTable
                                      title={'Departamentos'}
                                      columns={departmentsColumns}
                                      rows={mapDepartment(departments)}
                                    />
                                  </Box>
                                )}
                              </div>

                              {/* offices */}
                              <div
                                hidden={currentTab !== 1}
                                id='settings-tabpanel-0'
                              >
                                {currentTab === 1 && (
                                  <Box
                                    sx={{
                                      p: 3,
                                    }}
                                  >
                                    <Stack
                                      spacing={2}
                                      direction='row-reverse'
                                      sx={{
                                        mb: 2,
                                      }}
                                    >
                                      <Button
                                        variant='outlined'
                                        startIcon={<AddIcon />}
                                        onClick={handleCreateOffice}
                                      >
                                        Crear Oficina
                                      </Button>
                                    </Stack>
                                    <MyTable
                                      title={'Oficina'}
                                      columns={officesColumns}
                                      rows={mapOffice(offices)}
                                    />
                                  </Box>
                                )}
                              </div>

                              {/* rol company */}
                              <div
                                hidden={currentTab !== 2}
                                id='settings-tabpanel-0'
                              >
                                {currentTab === 2 && (
                                  <Box
                                    sx={{
                                      p: 3,
                                    }}
                                  >
                                    <Stack
                                      spacing={2}
                                      direction='row-reverse'
                                      sx={{
                                        mb: 2,
                                      }}
                                    >
                                      <Button
                                        variant='outlined'
                                        startIcon={<AddIcon />}
                                        onClick={handleCreateCompanyRols}
                                      >
                                        Crear Rol
                                      </Button>
                                    </Stack>
                                    <MyTable
                                      title={'Rol Compañia'}
                                      columns={companyRolsColumns}
                                      rows={mapCompanyRols(companyRols)}
                                    />
                                  </Box>
                                )}
                              </div>
                            </Box>
                          </Box>
                        </MyCard>
                      )}
                      {loading === false && type === 'Empleados' && (
                        <MyCard >
                          <Box sx={{ width: '100%' }}>
                            <Box
                              sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                              }}>

                              {/* departments */}
                              <div
                                id='settings-tabpanel-0'
                              >
                                <Box
                                  sx={{
                                    p: 3,
                                  }}
                                >
                                  <Stack
                                    spacing={2}
                                    direction='row-reverse'
                                    sx={{
                                      mb: 2,
                                    }}
                                  >
                                    <Button
                                      variant='outlined'
                                      startIcon={<AddIcon />}
                                      onClick={handleCreateEmployee}
                                    >
                                      Crear Empleado
                                    </Button>
                                  </Stack>
                                  <MyTable
                                    title={'Empleados'}
                                    columns={employeesColumns}
                                    rows={mapEmployee(employees)}
                                  />
                                </Box>
                              </div>
                            </Box>
                          </Box>
                        </MyCard>
                      )}
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
                  />
                )}
              </Box>
            )}
          </div>
        </div>
      </div>
    </Box>
    ): <Error/>}
    </>
  );
}
