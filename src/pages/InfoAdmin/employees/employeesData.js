// employees.js

import { useEffect,useState } from 'react';
import { useSnackbar } from 'notistack';

import { fetchDocumentTypeAPI , getCompaniesByIdAPI } from '../../../services/getDocumentType.service';
import { getEmployeesAPI, storeEmployeeAPI, deleteEmployeeAPI  } from '../../../services/getEmployees.service';
import { fetchGenderAPI } from '../../../services/getGender.service';
import { fetchCityAPI } from '../../../services/getCity.service';

const getAllDocumentsTypes = async () => {
    const { data } = await fetchDocumentTypeAPI();
    return data;
};

const getAllGenders = async () => {
  const { data } = await fetchGenderAPI ();
  return data;
};


const getAllCities = async () => {
  const { data } = await fetchCityAPI ();
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
    id: 'email',
    label: 'Correo Electrónico',
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

export const useCreateEmployee = (setOpenCreateDialog, setCurrentCreate) => {
    const [documentTypes, setDocumentTypes] = useState([]);
    const [genders, setGenders] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
      const fetchDocumentsTypes = async () => {
        const documentTypeData = await getAllDocumentsTypes();
        setDocumentTypes(documentTypeData);
      };
      const fetchGender = async () => {
        const  genderData  = await getAllGenders();
        setGenders(genderData);
      };

      const fetchCity = async () => {
        const  genderData  = await getAllCities();
        setCities(genderData);
      };

      fetchCity();
      fetchGender();
      fetchDocumentsTypes();
    }, []);
    const handleCreateEmployee = () => {

    setCurrentCreate({
      type: 'employee',
      title: 'Crear Oficina',
      fields: [
        {
          'person':[
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
              name: 'phoneNumer',
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
              type: 'text',
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
          'employee':[
            {
              label: 'Supervisor',
              name: 'supervisor',
              type: 'text',
              isRequired: true,
            },
            {
            label: 'Número Documento',
            name: 'compañia',
            type: 'text',
            isRequired: true,
            },
          ],
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  return {
    handleCreateEmployee,
  };
};

export const useEmployee = () => {
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [currentEdit, setCurrentEdit] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteEmployee = async (id) => {
    const employee = employees.find((employee) => employee.id === id);

    if (employee === undefined) {
        return;
    }



    };

    const handleEditEmployee = (id) => {
    const employee = employees.find((employee) => employee.id === id);

    if (employee === undefined) {
        return;
    }

    setCurrentEdit({
        type: 'employee',
        id: employee.id,
        title: 'Editar tipo de documento',
        fields: [
        {
            label: 'Oficina',
            name: 'name',
            type: 'text',
            value: employee.oficina,
        },
        ],
    });
    setOpenEditDialog(true);
    };

    const mapEmployee = (employee) => employee.map((employee) => [
    {
        column: 'name',
        value: employee.sede,
    },
    {
        column: 'company',
        value: employee.nombreCompania,
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

    const fetchEmployee = async () => {

    };


    const handleSubmittedCreateEmployee = async (formValues) => {
         try {
            await storeEmployeeAPI({
              person:{
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
              }           
            });       
            setEmployees(employees);
        } catch (e) {}
        enqueueSnackbar(
            'Empleado creado con éxito',
            {
            variant: 'success',
            },
        );
    };

  return {
    employees,
    currentEdit,
    openEditDialog,
    handleDeleteEmployee,
    handleEditEmployee,
    mapEmployee,
    setEmployees,
    setLoading,
    setCurrentEdit,
    setOpenEditDialog,
    fetchEmployee,
    handleSubmittedCreateEmployee,
  };
};
