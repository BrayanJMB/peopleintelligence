import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

import styles from './MyLoader.module.css';


const MyLoader = ({ color }) => (
  <div className={styles.MyLoader}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2em',
      }}
    >
      <CircularProgress sx={{color}} />
    </Box>
  </div>
);

MyLoader.propTypes = {
  color: PropTypes.string,
};

MyLoader.defaultProps = {
  color: 'primary',
};

export default MyLoader;
