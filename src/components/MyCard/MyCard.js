import React from 'react';
import PropTypes from 'prop-types';

import styles from './MyCard.module.css';

/**
 * My Card Component.
 *
 * @param children
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
const MyCard = ({ children }) => (
  <div className={styles.MyCard}>
    {children}
  </div>
);

MyCard.propTypes = {
  children: PropTypes.node,
};

MyCard.defaultProps = {
  children: null,
};

export default MyCard;
