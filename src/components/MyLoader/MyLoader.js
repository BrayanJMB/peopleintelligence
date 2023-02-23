import React from 'react';
import PropTypes from 'prop-types';
import styles from './MyLoader.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const MyLoader = ({ color }) => (
  <div className={styles.MyLoader}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2em',
      }}
    >
      <CircularProgress color={color} />
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
