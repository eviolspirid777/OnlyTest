import { Reducer, useReducer, useState } from 'react';
import { AnimatedNumber } from '../../components/AnimatedNumber/AnimatedNumber';
import { CircleSlider } from '../../components/CirlceSlider/CircleSlider';
import type { PointWithRef } from '../../types/Point';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { mockPoints } from '../../mock/mockData';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './DesktopLayout.module.css';

export const DesktopLayout = () => {
  const [points, setPoints] = useState(mockPoints);
  const reducer = (state: PointWithRef, action: number) => {
    return mockPoints[action]
  }
  const [point, setPoint] = useReducer<Reducer<PointWithRef, number>>(reducer, points[0])

  const [currentCategory, setCurrentCategory] = useState(points[2].id);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(points[2].id);

  const handlePrevClick = () => {
    point.id !== 1 && setPoint(point.id - 2);
  };

  const handleNextClick = () => {
    point.id < points.length && setPoint(point.id);
  };

  const changePointStatus = (point: PointWithRef) => {
    if (point.ref.current) {
      gsap.to(point.ref.current, {
        r: 20,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }

  const handleCategorySelect = (id: number) => {
    setCurrentCategory(id);
    setPoint(id - 1)
    changePointStatus(points[id - 1]);
  };

  const handleCategoryHover = (id: number) => {
    setHoveredCategory(id);
    changePointStatus(points[id - 1]);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(points[2].id);
    setCurrentCategory(points[2].id)
  }

  return (
    <div className={styles.timeline}>
      <div className={styles.timeline__header}>
        <h1 className={styles.timeline__title}>Исторические даты</h1>
      </div>
      
      <div className={styles.timeline__content}>
        <div className={styles.timeline__years}>
          <AnimatedNumber 
            value={point.date.minDate} 
            className={`${styles.timeline__year} ${styles['timeline__year--start']}`}
          />
          <AnimatedNumber 
            value={point.date.maxDate}
            className={`${styles.timeline__year} ${styles['timeline__year--end']}`}
          />
        </div>
        <CircleSlider
          points={points}
          currentPoint={currentCategory}
          hoveredPoint={hoveredCategory}
          onPointClick={handleCategorySelect}
          onPointHover={handleCategoryHover}
          onPointLeave={handleCategoryLeave}
          onPointsReorder={(newPoints) => setPoints(newPoints)}
        />
      </div>

      <div className={styles.timeline__controls}>
        <div className={styles.timeline__controls__counter__block}>
          <span className={styles.timeline__controls__counter__current}>
            {point.id}
          </span>
          /
          <span className={styles.timeline__controls__counter__total}>
            {points.length}
          </span>
        </div>
        <div className={styles.timeline__controls__buttons}>
          <button 
            className={`${styles.timeline__button} ${styles['timeline__button--prev']}`}
            style={{
              opacity: point.id === 1 ? 0.5 : 1,
              cursor: point.id === 1 ? 'not-allowed' : 'pointer'
            }}
            onClick={handlePrevClick}
            disabled={point.id === 1}
          />
          <button 
            className={`${styles.timeline__button} ${styles['timeline__button--next']}`}
            style={{
              opacity: point.id === points.length ? 0.5 : 1,
              cursor: point.id === points.length ? 'not-allowed' : 'pointer'
            }}
            onClick={handleNextClick}
            disabled={point.id === points.length}
          />
        </div>
      </div>
      <Swiper
        className={styles.timeline__events}
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        spaceBetween={150}
        slidesPerView={3}
      >
        {point.events.map((event, index) => (
          <SwiperSlide key={index} className={styles.timeline__event}>
            <div className={styles.timeline__date}>{event.date}</div>
            <p className={styles.timeline__description}>{event.description}</p>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </Swiper>
      <div className={styles["vertical__line"]} />
      <div className={styles["horizontal__line"]} />
    </div>
  );
};