import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './MyCarousel.module.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import classNames from 'classnames';

/**
 * 3d Carousel component.
 *
 * @param slides
 * @param onSelected
 * @returns {JSX.Element}
 * @constructor
 */
const MyCarousel = ({ slides, onSelected }) => {
  const [slideInlineStyle, setSlideInlineStyle] = useState({});
  const [theta, setTheta] = useState(0);

  /**
   * Handle slide control click.
   *
   * @param event
   * @param direction
   */
  const handleClick = (event, direction) => {
    event.preventDefault();

    const increment = direction === 'next' ? 1 : -1;
    setTheta(theta + (360 / 15) * increment);
    setSlideInlineStyle({
      transform: `translateZ( -380px ) rotateY(${theta}deg)`,
    })
  };

  return (
    <div className={styles.MyCarousel}>
      <div className={styles.MyCarousel__container} style={slideInlineStyle}>
        {slides.map((slide) => (
          <figure key={slide.id} className={classNames(styles.MyCarousel__slide, slide.isCurrent ? styles.MyCarousel__slideActive : '')} onClick={() => onSelected(slide)} >
            <div className={styles.MyCarousel__icon}>
              {typeof slide.number === 'number' && (
                <span className={styles.MyCarousel__badge}>
                  {slide.number}
                </span>
              )}
              <object data={slide.icon} type="image/svg+xml">icon</object>
            </div>
            <span className={styles.MyCarousel__title}>
            {slide.title}
              {slide.isCurrent ? 'selected' : ''}
          </span>
          </figure>
        ))}
      </div>
      <IconButton color="primary" onClick={(event) => handleClick(event, 'prev')} className={styles.MyCarousel__prev}>
        <ArrowBackIosNewIcon />
      </IconButton >
      <IconButton color="primary" onClick={(event) => handleClick(event, 'next')} className={styles.MyCarousel__next}>
        <ArrowForwardIosIcon />
      </IconButton >
    </div>
  );
};
MyCarousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    number: PropTypes.number,
  })),
  onSelected: PropTypes.func,
};

MyCarousel.defaultProps = {};

export default MyCarousel;
