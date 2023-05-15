import React, { useEffect,useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

import defaultImage from '../../assets/default.png';

import styles from './MyCreateDialog.module.css';

// form field types
const FIELD_TYPES = {
  TEXT: 'text',
  ICON: 'icon',
};

/**
 * My create dialog component.
 *
 * @param title
 * @param fields
 * @param open
 * @param onClose
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
const MyCreateDialog = ({ title, fields, open, onClose, onSubmit, file, setFile, type }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [image, setImage] = useState('');
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [values, setValues] = useState({});

  /**
   * Handle input change.
   *
   * @param event
   */
  const handleInputChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * Handle form submit.
   *
   * @param event
   */
  const handleFormSubmit = (event) => {
    event.preventDefault(); 
    if (!file && type === 'journeyMap'){
      setSnackbarMessage('Debe colocar una imagen para el mapa');
      setOpenSnackbar(true);
      return;
    }
    onSubmit(values);
  };

    //Logic for image
    const fileInputRef = useRef();

    const hiddenFileInput = {
      display: 'none',
    };
  
    const handleClick = () => {
      fileInputRef.current.click();
    };
  
    const handlePhoto = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension === 'svg') {
          if (e.target.files[0].size < 500000) {
            setFile(e.target.files[0]); // Guarda el objeto File en lugar de la URL
            setShowDeleteIcon(true);
          } else {
            setSnackbarMessage('El tamaño de la imagen no puede ser mayor a 500kB.');
            setOpenSnackbar(true);
            //alert('El tamaño de la imagen no puede ser mayor a 500kB');
          }
        }else {
          setSnackbarMessage('Solo se permiten archivos con formato .svg');
          setOpenSnackbar(true);
          //alert('Solo se permiten archivos con formato .svg');
        }
      } 
    };
  
    const handleDeleteImage = () => {
      setFile(null);
      setShowDeleteIcon(false);
    };
  
    useEffect(() => {
      if (file) {
        setImage(file);
      } else {
        setImage(defaultImage); // Ruta a la imagen por defecto
      }
    }, [file]);
  

  return (
    <div className={styles.MyCreateDialog}>
      <Snackbar
          open={openSnackbar}
          autoHideDuration={30000} 
          onClose={() => setOpenSnackbar(false)} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="warning">
            {snackbarMessage}
          </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <form
          onSubmit={handleFormSubmit}
        >
          <DialogContent>
            <Box
              sx={{
                marginTop: 1,
              }}
            >
              {/* form fields */}
              {fields.map((field) => (
                <FormControl
                  key={field.name}
                  sx={{
                    marginBottom: 2,
                    width: '100%',
                  }}
                >
                  {field.type === FIELD_TYPES.TEXT && (
                    <TextField
                      fullWidth
                      id={field.name}
                      label={field.label}
                      name={field.name}
                      onChange={handleInputChange}
                      type="text"
                      value={values[field.name] || ''}
                      variant="outlined"
                      required={field.isRequired}
                    />
                  )}

                  {field.type === FIELD_TYPES.ICON && (
                    <div className={styles.containerImage}>
                    <img
                     src={file ? URL.createObjectURL(file) : image} // Muestra la URL del objeto File
                     alt="profile"
                     className={styles.photo}
                     onClick={handleClick}
                   />
                     
                     <input
                       ref={fileInputRef}
                       style={hiddenFileInput}
                       type="file"
                       onChange={handlePhoto}
                       accept="image/*"
                       name="profile_image"
                     />
                     {showDeleteIcon && (
                       <Button 
                         variant="text"
                         onClick={handleDeleteImage}
                         >
                         Eliminar logotipo
                       </Button>
                     )}
                     </div>           
                  )}
                </FormControl>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onClose}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
            >
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

MyCreateDialog.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
  })).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

MyCreateDialog.defaultProps = {};

export default MyCreateDialog;
