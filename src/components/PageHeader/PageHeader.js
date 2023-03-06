import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageHeader.module.css';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import MyCard from '../MyCard/MyCard';

/**
 * Page header component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const PageHeader = ({ title }) => {
  const navigate = useNavigate()

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
      <div className={styles.PageHeader}>
        {/* back button */}
        <div className={styles.PageHeader__icon}>
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
          className={styles.PageHeader__title}
        >
          {title}
        </Typography>
      </div>
    </MyCard>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

PageHeader.defaultProps = {};

export default PageHeader;
