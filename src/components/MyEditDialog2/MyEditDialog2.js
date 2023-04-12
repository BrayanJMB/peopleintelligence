import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

import styles from './MyEditDialog.module.css';

// form field types
const FIELD_TYPES = {
  TEXT: 'text',
};

/**
 * My edit dialog component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MyEditDialog = ({ title, fields, open, onClose, onSubmit }) => {
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
    <div className={styles.MyEditDialog}>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
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
                    value={values[field.name] || field.value}
                    variant="outlined"
                  />
                )}
              </FormControl>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
          >
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

MyEditDialog.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

MyEditDialog.defaultProps = {};

export default MyEditDialog;
