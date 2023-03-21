import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import styles from './MyConfirmation.module.css';

/**
 * My confirmation component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MyConfirmation = ({ open, onClose, title, message, other }) => {
  /**
   * Handle cancel.
   */
  const handleCancel = () => {
    onClose(false);
  };

  /**
   * Handle ok.
   */
  const handleOk = () => {
    onClose(true);
  };

  return (
    <div className={styles.MyConfirmation}>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            width: '80%',
            maxHeight: 435,
          },
      }}
        maxWidth="xs"
        open={open}
        {...other}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            sx={{
              mt: 2,
              textAlign: 'center',
            }}
            variant="body1"
            gutterBottom
          >
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleOk}
            variant="contained"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

MyConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  other: PropTypes.object,
};

MyConfirmation.defaultProps = {};

export default MyConfirmation;
