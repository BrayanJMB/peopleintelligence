// deparments.js

import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import {
  deleteAreaAPI,
  fetchAreaByCompanyAPI,
  storeAreaAPI,
} from "../../../services/getDepartments.service";

export const departmentsColumns = [
  {
    id: "area",
    label: "Área",
    numeric: false,
  },
  {
    id: "descripcion",
    label: "Descripción",
    numeric: false,
  },
  {
    id: "options",
    label: "Opciones",
    numeric: false,
  },
];

export const useCreateDepartment = (setOpenCreateDialog, setCurrentCreate) => {
  const handleCreateDepartment = () => {
    setCurrentCreate({
      type: "department",
      title: "Crear Departamento",
      fields: [
        {
          label: "Área",
          name: "area",
          type: "text",
          isRequired: true,
        },
        {
          label: "Descripción",
          name: "descripcion",
          type: "text",
          isRequired: false,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  return {
    handleCreateDepartment,
  };
};

export const useDepartment = (currentCompany) => {
  const fetchDepartments = async () => {
    if (!currentCompany) {
      return;
    }
    // fetch journeys by map and company
    const { data } = await fetchAreaByCompanyAPI(currentCompany.id);
    setDepartments(data);
  };

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteDepartment = async (id) => {
    const department = departments.find((department) => department.id === id);

    if (department === undefined) {
      return;
    }

    try {
      await deleteAreaAPI(id);
      setDepartments((department) =>
        department.filter((department) => department.id !== id)
      );
      enqueueSnackbar("Departamento eliminado con éxito", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (e) {
      enqueueSnackbar("Hubo un error al eliminar el Departamento", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleEditDepartment = (id) => {
    const department = departments.find((department) => department.id === id);

    if (department === undefined) {
      return;
    }

    setCurrentEdit({
      type: "deparment",
      id: department.id,
      title: "Editar tipo de documento",
      fields: [
        {
          label: "Oficina",
          name: "name",
          type: "text",
          value: department.oficina,
        },
      ],
    });
    setOpenEditDialog(true);
  };

  const mapDepartment = (department) =>
    department.map((department) => [
      {
        column: "area",
        value: department.NombreArea,
      },
      {
        column: "descripcion",
        value: department.descripcion,
      },
      {
        column: "options",
        value: "",
        payload: {
          handleDelete: handleDeleteDepartment,
          //handleEdit: handleEditDepartment,
          id: department.id,
        },
      },
    ]);

  const handleSubmittedCreateDepartment = async (formValues) => {
    try {
      await storeAreaAPI({
        idCompany: currentCompany.id,
        NombreArea: formValues.area,
        descripcion: formValues.descripcion,
      });
      const { data } = await fetchAreaByCompanyAPI(currentCompany.id);
      enqueueSnackbar("Departamento creado con éxito", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setDepartments(data);
    } catch (e) {
      enqueueSnackbar("Hubo error al crear el Departamento", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return {
    departments,
    currentEdit,
    openEditDialog,
    handleDeleteDepartment,
    handleEditDepartment,
    mapDepartment,
    setDepartments,
    setLoading,
    setCurrentEdit,
    setOpenEditDialog,
    handleSubmittedCreateDepartment,
    fetchDepartments,
  };
};
