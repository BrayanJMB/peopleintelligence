import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import axios from '../../utils/axiosInstance';

const FileUpload = () => {
  const { enqueueSnackbar } = useSnackbar();
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputFileRef = useRef(null);
  const allowedExtensions = ['.xls', '.xlsx'];

  // Abre el diálogo de confirmación
  const handleOpenDialog = () => {
    if (!selectedFile) {
      enqueueSnackbar('Por favor selecciona un archivo antes de confirmar.', {
        variant: 'warning',
        autoHideDuration: 3000,
      });
      return;
    }
    setIsDialogOpen(true);
  };

  // Cierra el diálogo
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Maneja el cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
    if (!allowedExtensions.includes(fileExtension)) {
      enqueueSnackbar(
        'Por favor selecciona un archivo de Excel (.xls o .xlsx).',
        {
          variant: 'warning',
          autoHideDuration: 3000,
        }
      );
      return;
    }

    setSelectedFile(file);
  };

  // Sube el archivo al backend
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        `/Create-user?companyId=${currentCompany.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        enqueueSnackbar('Archivo subido exitosamente.', {
          variant: 'success',
          autoHideDuration: 3000,
        });
      } else {
        enqueueSnackbar('Hubo un error al crear los usuarios.', {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error al subir el archivo.', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    } finally {
      setIsDialogOpen(false);
      handleRemoveFile(); // Elimina el archivo después de subirlo
    }
  };

  // Limpia el archivo seleccionado
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  // Limita el nombre del archivo a 15 caracteres
  const truncateFileName = (fileName) => {
    const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
    const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedName =
      baseName.length > 15 ? baseName.substring(0, 15) + '...' : baseName;
    return truncatedName + fileExtension;
  };

  return (
    <Box>
      {/* Botón para seleccionar archivo */}
      {!selectedFile && (
        <Button
          startIcon={<UploadFileIcon />}
          variant="outlined"
          color="primary"
          onClick={() => inputFileRef.current.click()}
        >
          Importar Usuarios
        </Button>
      )}

      {/* Campo de archivo oculto */}
      <input
        type="file"
        ref={inputFileRef}
        style={{ display: 'none' }}
        accept=".xls,.xlsx"
        onChange={handleFileChange}
      />

      {/* Muestra el archivo seleccionado */}
      {selectedFile && (
        <Box display="flex" alignItems="center" marginTop={2}>
          <Typography variant="body1" marginRight={2}>
            {truncateFileName(selectedFile.name)}
          </Typography>
          <IconButton sx={{ color: 'red' }} onClick={handleRemoveFile}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      {/* Botón para confirmar subida */}
      {selectedFile && (
        <Button
          startIcon={<UploadFileIcon />}
          variant="outlined"
          color="primary"
          onClick={handleOpenDialog}
          style={{ marginTop: '10px' }}
        >
          Confirmar Subida
        </Button>
      )}

      {/* Diálogo de confirmación */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Subida</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas crear los usuarios para la empresa{' '}
            {currentCompany && currentCompany.nombreCompania}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpload} color="secondary" variant="contained">
            Subir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileUpload;
