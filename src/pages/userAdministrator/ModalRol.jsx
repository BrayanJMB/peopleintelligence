import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Paper,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: 800,
  maxWidth: "90%",
  maxHeight: "90vh",
  overflow: "auto",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const RolesList = styled(List)(({ theme }) => ({
  maxHeight: 200,
  overflow: "auto",
  marginBottom: theme.spacing(2),
}));

export default function ModalRol({
  isModalOpen,
  closeModal,
  rolesByUser,
  handleDeleteCompanyRols,
  handleCreateRolUserAdministrator,
  
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteData, setDeleteData] = useState({ id: null, rolId: null, rolName: null });

  const handleOpenDialog = (id, rolId, rolName) => {
    setDeleteData({ id, rolId, rolName });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleConfirmDelete = async () => {
    setOpenDialog(false);
    const { id, rolId } = deleteData;
    handleDeleteCompanyRols(id, rolId)
  }
  return (
    <>
      <StyledModal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContent elevation={24}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
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
                            handleOpenDialog(rol.userId, rol.id, rol.name)
                        }
                      >
                        <DeleteIcon sx={{ color: "red" }} />
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateRolUserAdministrator}
          >
            Añadir Rol
          </Button>
        </ModalContent>
      </StyledModal>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este rol "{deleteData.rolName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
