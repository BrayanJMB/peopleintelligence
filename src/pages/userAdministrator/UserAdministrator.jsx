import { useCallback, useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import * as uuid from "uuid";

import Building from "../../assets/Building.svg";
import MyCard from "../../components/MyCard/MyCard";
import MyTable from "../../components/MyTable/MyTable";
import NewRoleUserAdministrator from "../../components/NewRolUserAdministrator/NewRoleUserAdministrator";
import Notification from "../../components/Notification";
import Table from "../../components/Table";
import { addItem, storeItems, updateItem } from "../../features/adminSlice";
import IconSidebar from "../../Layout/IconSidebar/IconSidebar";
import Navbar from "../../Layout/Navbar/Navbar";
import { getCompaniesAPI } from "../../services/getCompanies.service";
import { getDepartmentsAPI } from "../../services/getDepartments.service";
import { getEmployeesAPI } from "../../services/getEmployees.service";
import {
  getOfficesAPI,
  postOfficeAPI,
} from "../../services/getOffices.service";
import { postCompanyAPI } from "../../services/postCompany.service";
import axios from "../../utils/axiosInstance";

import stylesJ from "../../pages/JourneySettingsPage/JourneySettingsPage.module.css";
import styles from "../InfoAdmin/InfoAdmin.module.css";
import MyEditDialog2 from "../../components/MyEditDialog2/MyEditDialog2";
import MyCreateDialog2 from "../../components/MyCreateDialog2/MyCreateDialog2";
import { fetchDocumentTypeAPI } from "../../services/getDocumentType.service";
import { useSnackbar } from "notistack";
import { postUserAPI, fetchUserAPI, fetchUserGetRolsAPI, postUserRolsAPI, fetchAllUserRolsAPI } from "../../services/fetchUser.service";

export default function UserAdministrator() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { type } = useParams();
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentCreate, setCurrentCreate] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [DocumentsTypes, setDocumentsTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [missingRolsByUser, setMissingRolsByUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [rolesFieldIndex, setRolesFieldIndex] = useState(null);



  const handleCloseCreateDialog = () => {
    setCurrentCreate(null);
    setOpenCreateDialog(false);
  };


  const fetchDocumentType = async () => {
    const { data } = await fetchDocumentTypeAPI();
    setDocumentsTypes(data);
  };

  const fetchUserByCompany = async () =>{
    const { data } = await  fetchUserAPI(currentCompany.id)
    setUsers(data)
  }

  const fetchAllUser = async () =>{
    const { data } = await fetchAllUserRolsAPI(currentCompany.id)
    setAllUsers(data);
  }

  //User
  const handleCreateUser = async () => {
    setCurrentCreate({
      type: "user",
      title: "Crear Usuario",
      fields: [
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
          label: "Nombre Completo",
          name: "name",
          type: "text",
          isRequired: true,
        },
        {
          label: "Cargo",
          name: "rol",
          type: "text",
          isRequired: true,
        },
        {
          label: "Correo Electrónico",
          name: "email",
          type: "text",
          isRequired: true,
        },
        {
          label: "Celular",
          name: "phoneNumber",
          type: "text",
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  //rol Usuario
  const allUsersColumns = [
    {
      id: "emailUserAdministrator",
      label: "Correo Usuario",
      numeric: true,
    },
    {
      id: "name",
      label: "Rol Usuario",
      numeric: false,
    },
    {
      id: "ActionUsuario",
      label: "Aciones",
      numeric: false,
    },
  ];


  const handleCreateRolUserAdministrator = () => {
    setCurrentCreate({
      type: "userRol",
      title: "Crear Rol Usuario",
      fields: [
        {
          label: "Usuario",
          name: "userRolChange",
          type: "select",
          isRequired: true,
          options: users.map((user) => ({
            value: user.userId,
            label: user.email,
          })),
        },
        {
          label: "Roles",
          name: "userRol",
          type: "select",
          isRequired: true,
          options:  missingRolsByUser.map((user) => ({
            value: user.id,
            label: user.name,
          })),
        }
      ],
    });
    setOpenCreateDialog(true);
  };

  const mapAllUsers = (user) =>
  user.map((user) => [
    {
      column: "name",
      value: user.email,
    },
    {
      column: "name",
      value: user.nameRol,
    },
    {
      column: "options",
      value: "",
      payload: {
        //handleDelete: handleDeleteCompanyRols,
        //handleEdit: handleEditCompanyRols,
        id: user.id,
      },
    },
  ]);


  const handleSubmittedCreateDialog = async (formValues) => {
    console.log(currentCreate.type)
    if (currentCreate.type === "user") {
      try{
       await postUserAPI({
          idCompany: currentCompany.id,
          IdTipoDocumento: formValues.documentType,
          numeroDocumento: formValues.documentNumber,
          NombreCompleto: formValues.name,
          Cargo: formValues.rol,
          correoElectronico: formValues.email,
          phoneNumber: formValues.phoneNumber
        });

        enqueueSnackbar("Usuario creado con éxito", {
          variant: "success",
        });
      } catch (e) {
        console.log(e)
        enqueueSnackbar("Hubo un error al crear el usuario", {
          variant: "error",
        });
      }
    }

    if (currentCreate.type === "userRolChange") {
      console.log(formValues)
      try{

        await postUserRolsAPI(
          [
            {
              userId: formValues.userRolChange,
              roleId: formValues.userRol
            }
          ]
         );
 
         enqueueSnackbar("Usuario creado con éxito", {
           variant: "success",
         });
       } catch (e) {
         console.log(e)
         enqueueSnackbar("Hubo un error al crear el usuario", {
           variant: "error",
         });
       }
    }
    setCurrentCreate(null);
    setOpenCreateDialog(false);
  };

  useEffect(() => {
    setCurrentCreate({
      type: "userRolChange",
      title: "Crear Rol Usuario",
      fields: [
        {
          label: "Usuario",
          name: "userRolChange",
          type: "select",
          isRequired: true,
          options: users.map((user) => ({
            value: user.userId,
            label: user.email,
          })),
        },
        {
          label: "Roles",
          name: "userRol",
          type: "select",
          isRequired: true,
          options:  missingRolsByUser.map((user) => ({
            value: user.id,
            label: user.name,
          })),
        },
      ],
    });
  }, [missingRolsByUser]);

  
  useEffect(() => {
    if (!currentCompany){
      return;
    }
    fetchDocumentType();
    fetchUserByCompany();
    fetchAllUser();
  }, [currentCompany]);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <IconSidebar />
      <div style={{ backgroundColor: "white" }}>
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
                <h1>Administrador de Usuario</h1>
              </div>
            </div>
            <div className={styles.buttom}>
              <div className={stylesJ.JourneySettingsPage}>
                <div className={stylesJ.JourneySettingsPage__content}>
                  <MyCard
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
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
                        onClick={handleCreateRolUserAdministrator}
                      >
                        Crear Rol Usuario
                      </Button>

                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleCreateUser}
                      >
                        Crear Usuario
                      </Button>
                    </Stack>
                    <MyTable
                      title={"Rol Usuarios"}
                      columns={allUsersColumns}
                      rows={mapAllUsers(allUsers)}
                    />
                  </MyCard>
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
                setUserRol={setMissingRolsByUser}
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
          </div>
        </div>
      </div>
    </Box>
  );
}
