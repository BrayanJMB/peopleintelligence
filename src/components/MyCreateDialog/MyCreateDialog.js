import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from './MyCreateDialog.module.css';

// form field types
const FIELD_TYPES = {
  TEXT: 'text',
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
const MyCreateDialog = ({ title, fields, open, onClose, onSubmit }) => {
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
    onSubmit(values);
  };

  return (
    <div className={styles.MyCreateDialog}>
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
      MyCreateDialog Component
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
