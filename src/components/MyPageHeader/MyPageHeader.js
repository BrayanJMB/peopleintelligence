import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import MyCard from '../MyCard/MyCard';

import styles from './MyPageHeader.module.css';

/**
 * Page header component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MyPageHeader = ({ title, Icon }) => {
  const navigate = useNavigate();

  /**
   * Handle click back page.
   *
   * @param event
   */
  const handleClickBackPage = (event) => {
    event.preventDefault();

    navigate(-1);
  };

  return (
    <MyCard>
      <div className={styles.MyPageHeader}>
        {/* back button */}
        <div className={styles.MyPageHeader__backIcon}>
          <IconButton
            onClick={handleClickBackPage}
            aria-label="Atrás"
          >
            <ArrowBackIcon />
          </IconButton>
        </div>

        {/* title */}
        <Typography
          variant="h4"
          className={styles.MyPageHeader__title}
        >
          <span
            className={styles.MyPageHeader__icon}
          >
            {Icon}
          </span>

          {title}
        </Typography>
      </div>
    </MyCard>
  );
};

MyPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.element,
};

MyPageHeader.defaultProps = {};

export default MyPageHeader;
