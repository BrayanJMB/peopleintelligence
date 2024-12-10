import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { ConfirmDialog } from '../SurveyDetailPage/ConfirmDialog';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: 800,
  maxWidth: '90%',
  maxHeight: '90vh',
  overflow: 'auto',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const RolesList = styled(List)(({ theme }) => ({
  maxHeight: 200,
  overflow: 'auto',
  marginBottom: theme.spacing(2),
}));

export default function ModalRol({
  isModalOpen,
  closeModal,
  rolesByUser,
  handleDeleteCompanyRols,
  handleCreateRolUserAdministrator,
  handleDeleteCompanyUser,
  handleAssignCompanyUser,
  userCompanies,
}) {
  const [openDialogs, setOpenDialogs] = useState({});
  const [multiCompanyRol, setMultiCompanyRol] = useState('');
  const handleOpenDialog = async (id, ...args) => {
    //setDeleteData({ id, rolId, rolName });
    setOpenDialogs((prevDialogs) => ({
      ...prevDialogs,
      [id]: {
        isOpen: true,
        message: args[0],
        consume: args[1],
        needConfirm: args[2],
      },
    }));
  };

  const handleCloseDialog = (id) => {
    setOpenDialogs((prevDialogs) => ({
      ...prevDialogs,
      [id]: {
        ...prevDialogs[id], // Mantén las otras propiedades como `message` o `loading`
        isOpen: false, // Solo actualiza el estado `isOpen` a `false` para cerrar el diálogo
      },
    }));
  };
  const handleConfirmDelete = async (id, rolId) => {
    handleDeleteCompanyRols(id, rolId);
  };

  const handleConfirmDeleteCompany = async (companyId) => {
    handleDeleteCompanyUser(companyId);
  };

  const checkRoles = () => {
    if (rolesByUser.length <= 0) return;
    const roleExistsInRoles = rolesByUser.roles.some(
      (role) => role.name === 'MultiCompania'
    );
    if (roleExistsInRoles) {
      setMultiCompanyRol(true);
    } else {
      setMultiCompanyRol(false);
    }
  };
  const generateSurveyId = () => Math.floor(Math.random() * 3) + 1; // Simula un ID dinámico entre 1 y 3

  useEffect(() => {
    checkRoles();
  }, [rolesByUser]);

  return (
    <>
      <StyledModal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContent elevation={24}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                id="modal-title"
                variant="h6"
                component="h2"
                gutterBottom
              >
                Datos del usuario
              </Typography>
              <Typography
                id="modal-description"
                variant="body2"
                color="text.secondary"
                paragraph
              >
                Aquí puedes eliminar o agregar roles.
              </Typography>
              <RolesList>
                {rolesByUser.roles && rolesByUser.roles.length > 0 ? (
                  rolesByUser.roles.map((rol) => (
                    <React.Fragment key={rol.id}>
                      <ListItem>
                        <ListItemText primary={rol.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                              handleOpenDialog(
                                generateSurveyId(),
                                `Al ejecutar esta acción se eliminará el rol "${rol.name}"`,
                                () => handleConfirmDelete(rol.userId, rol.id),
                                false
                              )
                            }
                          >
                            <DeleteIcon sx={{ color: 'red' }} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="Este usuario no tiene roles" />
                  </ListItem>
                )}
              </RolesList>
              {rolesByUser.rolesNotAssigned &&
                rolesByUser.rolesNotAssigned.length > 0 && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleCreateRolUserAdministrator}
                  >
                    Añadir Rol
                  </Button>
                )}
            </Grid>
            <Grid item xs={6}>
              {multiCompanyRol ? (
                <>
                  <Typography
                    id="modal-title"
                    variant="h6"
                    component="h2"
                    gutterBottom
                  >
                    Asignar Compañias usuario
                  </Typography>
                  <Typography
                    id="modal-description"
                    variant="body2"
                    color="text.secondary"
                    paragraph
                  >
                    Aquí puedes eliminar o agregar eliminar al usuario.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    id="modal-title"
                    variant="h6"
                    component="h2"
                    gutterBottom
                  >
                    Asignar Compañia usuario
                  </Typography>
                </>
              )}
              <RolesList>
                {userCompanies && userCompanies.length > 0 ? (
                  userCompanies.map((rol) => (
                    <React.Fragment key={rol.id}>
                      <ListItem>
                        <ListItemText primary={rol.nombreCompañia} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                              handleOpenDialog(
                                generateSurveyId(),
                                `Al ejecutar esta acción eliminará la compañía "${rol.nombreCompañia}"`,
                                () =>
                                  handleConfirmDeleteCompany(
                                    rol.id
                                  ),
                                false
                              )
                            }
                          >
                            <DeleteIcon sx={{ color: 'red' }} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="Este usuario no tiene compañía" />
                  </ListItem>
                )}
              </RolesList>
              {userCompanies.length <= 0 ||
                (multiCompanyRol && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAssignCompanyUser}
                  >
                    Asignar compañia
                  </Button>
                ))}
            </Grid>
          </Grid>
        </ModalContent>
      </StyledModal>
      {Object.keys(openDialogs).map((idDialog) => (
        <ConfirmDialog
          key={idDialog}
          open={openDialogs[idDialog]?.isOpen} // Verifica si el diálogo para el id está abierto
          onClose={() => handleCloseDialog(idDialog)}
          onConfirm={openDialogs[idDialog]?.consume}
          //idSurvey={surveyId}
          message={openDialogs[idDialog]?.message} // Mensaje personalizado para cada id
          skipConfirmation={openDialogs[idDialog]?.needConfirm}
          dialogPosition={idDialog}
        />
      ))}
    </>
  );
}
