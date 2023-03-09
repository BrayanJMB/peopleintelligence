import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './MyEditDialog.module.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// field types
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => onSubmit(values)}
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
