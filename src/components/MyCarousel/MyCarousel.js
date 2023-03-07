import React, { useEffect, useState } from 'react';
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
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Handle slide control click.
   *
   * @param event
   * @param direction
   */
  const handleClick = (event, direction) => {
    event.preventDefault();

    if (direction === 'next') {
      setCurrentSlide(currentSlide - 1);

      return;
    }

    setCurrentSlide(currentSlide + 1);
  };

  /**
   * Handle slide selection.
   *
   * @param index
   * @param slide
   */
  const handleSelect = (index, slide) => {
    setCurrentSlide(index * -1);
    onSelected(slide);
  }

  /**
   * Update slide position.
   */
  const updateSlidePosition = () => {
    const theta = (360 / 15) * currentSlide;

    setSlideInlineStyle({
      transform: `translateZ( -380px ) rotateY(${theta}deg)`,
    })
  };

  // listen for changes in the current slide
  useEffect(() => {
    updateSlidePosition();
  }, [currentSlide]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.MyCarousel}>
      <div
        className={styles.MyCarousel__container}
        style={slideInlineStyle}
      >
        {slides.map((slide, index) => (
          <figure
            key={slide.id}
            className={classNames(styles.MyCarousel__slide, slide.isCurrent ? styles.MyCarousel__slideActive : '')}
            onClick={() => handleSelect(index, slide)}
          >
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
          </span>
          </figure>
        ))}
      </div>
      <IconButton
        color="primary"
        onClick={(event) => handleClick(event, 'prev')}
        className={styles.MyCarousel__prev}
      >
        <ArrowBackIosNewIcon />
      </IconButton >
      <IconButton
        color="primary"
        onClick={(event) => handleClick(event, 'next')}
        className={styles.MyCarousel__next}
      >
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
