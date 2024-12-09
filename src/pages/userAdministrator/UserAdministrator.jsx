import {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { Box,Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import MyCard from '../../components/MyCard/MyCard';
import MyCreateDialog2 from '../../components/MyCreateDialog2/MyCreateDialog2';
import MyPageHeader from '../../components/MyPageHeader/MyPageHeader';
import MyTable from '../../components/MyTable/MyTable';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import {
  deleteUserRolsAPI,
  fetchAllUserRolsAPI,
  fetchRolesByUserAPI,
  fetchUserAPI,
  fetchUserGetRolsAPI,
  postUserAPI,
  postUserRolsAPI,
} from '../../services/fetchUser.service';
import { fetchDocumentTypeAPI } from '../../services/getDocumentType.service';

import { allUsersColumns } from './columsForUserTable/userColumns';
import ModalRol from './ModalRol';

import styles from './UserAdministrator.module.css';
export default function UserAdministrator() {
  const { enqueueSnackbar } = useSnackbar();
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [currentCreate, setCurrentCreate] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [DocumentsTypes, setDocumentsTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [missingRolsByUser, setMissingRolsByUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [rolesByUser, setRolesByUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRolId, setSelectedRolId] = useState(null); // Estado para almacenar el rol seleccionado
  const handleCloseCreateDialog = () => {
    setCurrentCreate(null);
    setOpenCreateDialog(false);
  };

  const fetchDocumentType = async () => {
    const { data } = await fetchDocumentTypeAPI();
    setDocumentsTypes(data);
  };

  const fetchUserByCompany = async () => {
    const { data } = await fetchUserAPI(currentCompany.id);
    setUsers(data);
  };

  const fetchAllUser = async () => {
    const { data } = await fetchAllUserRolsAPI(currentCompany.id);
    setAllUsers(data);
  };

  const fetchRoleByUser = async (id, rolId) => {
    const { data } = await fetchRolesByUserAPI(id, rolId);
    setRolesByUser(data);
  };

  //User
  const handleCreateUser = async () => {
    setCurrentCreate({
      type: 'user',
      title: 'Crear Usuario',
      fields: [
        {
          label: 'Tipo Documento',
          name: 'documentType',
          type: 'select',
          isRequired: true,
          options: DocumentsTypes.map((company) => ({
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
          label: 'Nombre Completo',
          name: 'name',
          type: 'text',
          isRequired: true,
        },
        {
          label: 'Cargo',
          name: 'rol',
          type: 'text',
          isRequired: true,
        },
        {
          label: 'Correo Electrónico',
          name: 'email',
          type: 'text',
          isRequired: true,
        },
        {
          label: 'Celular',
          name: 'phoneNumber',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    setOpenCreateDialog(true);
  };



  const handleCreateRolUserAdministrator = async () => {
    const response = await fetchUserGetRolsAPI(selectedRolId);     
    setCurrentCreate({
      type: 'userRol',
      title: 'Crear Rol Usuario',
      fields: [
        {
          label: 'Usuario',
          name: 'userRolChange',
          type: 'select',
          isRequired: true,
          options: users.map((user) => ({
            value: user.userId,
            label: user.email,
          })),
          defaultValue: users.find((user) => user.userId === selectedRolId)
            ? {
                value: selectedRolId,
                label: users.find((user) => user.userId === selectedRolId)
                  .email,
              }
            : null, // Si no encuentra el usuario, el valor será null
        },
        {
          label: 'Roles',
          name: 'userRol',
          type: 'select',
          isRequired: true,
          options: response.data.map((user) => ({
            value: user.id,
            label: user.name,
          })),
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  const mapAllUsers = (users) => {
    // Agrupar por `userId` para combinar los roles
    const groupedUsers = users.reduce((acc, user) => {
      if (!acc[user.userId]) {
        acc[user.userId] = {
          email: user.email,
          roles: new Set(), // Usamos un Set para evitar roles duplicados
          userId: user.userId,
          rolId: user.rolId,
        };
      }
      acc[user.userId].roles.add(user.nameRol); // Agregar el rol al Set
      return acc;
    }, {});

    // Mapear los usuarios agrupados al formato deseado
    return Object.values(groupedUsers).map((group) => [
      {
        column: 'name',
        value: group.email,
      },
      {
        column: 'roles',
        value: Array.from(group.roles).join(', '), // Convertir roles en cadena separada por comas
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleEdit: handleEditCompanyRols,
          id: group.userId,
          rolId: group.rolId,
        },
      },
    ]);
  };

  const handleEditCompanyRols = async (id) => {
    setIsModalOpen(true);
    fetchRoleByUser(id, currentCompany.id);
    setSelectedRolId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handleDeleteCompanyRols = async (id, rolId) => {
    try {
      await deleteUserRolsAPI(id, rolId);
      await fetchAllUser();
      fetchRoleByUser(id, currentCompany.id);
      enqueueSnackbar('Rol eliminado con éxito', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } catch (Exception) {
      enqueueSnackbar('Hubo un error al eliminar el rol', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  const handleSubmittedCreateDialog = async (formValues) => {
    if (currentCreate.type === 'user') {
      try {
        await postUserAPI({
          idCompany: currentCompany.id,
          IdTipoDocumento: formValues.documentType,
          numeroDocumento: formValues.documentNumber,
          NombreCompleto: formValues.name,
          Cargo: formValues.rol,
          correoElectronico: formValues.email,
          phoneNumber: formValues.phoneNumber,
        });

        enqueueSnackbar('Usuario creado con éxito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al crear el usuario', {
          variant: 'error',
        });
      }
    }

    if (currentCreate.type === 'userRol') {
      try {
        await postUserRolsAPI({
          userId: formValues.userRolChange,
          roleId: formValues.userRol,
        });
        await fetchAllUser();
        fetchRoleByUser(formValues.userRolChange, currentCompany.id);
        enqueueSnackbar('Rol agregado con éxito', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar('Hubo un error al agregar el rol', {
          variant: 'error',
        });
      }
    }
    setCurrentCreate(null);
    setOpenCreateDialog(false);
  };

  useEffect(() => {
    if (!currentCompany) {
      return;
    }
    fetchDocumentType();
    fetchUserByCompany();
    fetchAllUser();
  }, [currentCompany]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <IconSidebar />
      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.UserAdministratorPage}>
          <div className={styles.UserAdministratorPage__content}>
            <MyPageHeader title="Administrar usuarios" needBack={false} />
            <div className={styles.buttom}>
              <div>
                <div>
                  <MyCard
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
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
                        onClick={handleCreateUser}
                      >
                        Crear Usuario
                      </Button>
                    </Stack>
                    <MyTable
                      title={'Rol Usuarios'}
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
            <ModalRol
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              rolesByUser={rolesByUser}
              handleDeleteCompanyRols={handleDeleteCompanyRols}
              handleCreateRolUserAdministrator={
                handleCreateRolUserAdministrator
              }
            />
          </div>
        </div>
      </div>
    </Box>
  );
}
