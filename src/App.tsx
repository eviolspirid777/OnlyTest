import { useState } from 'react';
import { AnimatedNumber } from './components/AnimatedNumber/AnimatedNumber';
import { CircleSlider } from './components/CirlceSlider/CircleSlider';
import type { PointWithRef } from './types/Point';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './App.module.css';

import { mockPoints } from './mock/mockData';

export const App = () => {
  //TODO: Можно упростить и сделать так, чтобы просто хранилась выбранная запись, а не все стейты по отдельности
  const [currentStep, setCurrentStep] = useState(mockPoints[0].id);
  const [startYear, setStartYear] = useState(mockPoints[currentStep - 1].date.minDate);
  const [endYear, setEndYear] = useState(mockPoints[currentStep - 1].date.maxDate);
  const [currentCategory, setCurrentCategory] = useState(1);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const handlePrevClick = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setStartYear(prev => prev - 10);
      setEndYear(prev => prev - 10);
    }
  };

  const handleNextClick = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
      setStartYear(prev => prev + 10);
      setEndYear(prev => prev + 10);
    }
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
    changePointStatus(mockPoints[id - 1]);
  };

  const handleCategoryHover = (id: number) => {
    setHoveredCategory(id);
    changePointStatus(mockPoints[id - 1]);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  }

  return (
    <div className={styles.timeline}>
      <div className={styles.timeline__header}>
        <h1 className={styles.timeline__title}>Исторические даты</h1>
      </div>
      
      <div className={styles.timeline__content}>
        <div className={styles.timeline__years}>
          <AnimatedNumber 
            value={startYear} 
            className={`${styles.timeline__year} ${styles['timeline__year--start']}`}
          />
          <AnimatedNumber 
            value={endYear}
            className={`${styles.timeline__year} ${styles['timeline__year--end']}`}
          />
        </div>
        <CircleSlider
          points={mockPoints}
          currentPoint={currentCategory}
          hoveredPoint={hoveredCategory}
          onPointClick={handleCategorySelect}
          onPointHover={handleCategoryHover}
          onPointLeave={handleCategoryLeave}
        />
      </div>

      <div className={styles.timeline__controls}>
        <div className={styles.timeline__controls__counter__block}>
          <span className={styles.timeline__controls__counter__current}>
            {currentStep}
          </span>
          /
          <span className={styles.timeline__controls__counter__total}>
            {mockPoints.length}
          </span>
        </div>
        <div className={styles.timeline__controls__buttons}>
          <button 
            className={`${styles.timeline__button} ${styles['timeline__button--prev']}`}
            style={{
              opacity: currentStep === 1 ? 0.5 : 1,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
            }}
            onClick={handlePrevClick}
            disabled={currentStep === 1}
          />
          <button 
            className={`${styles.timeline__button} ${styles['timeline__button--next']}`}
            style={{
              opacity: currentStep === mockPoints.length ? 0.5 : 1,
              cursor: currentStep === mockPoints.length ? 'not-allowed' : 'pointer'
            }}
            onClick={handleNextClick}
            disabled={currentStep === mockPoints.length}
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
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {mockPoints[currentStep - 1].events.map((event, index) => (
          <SwiperSlide key={index} className={styles.timeline__event}>
            <div className={styles.timeline__date}>{event.date}</div>
            <p className={styles.timeline__description}>{event.description}</p>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </Swiper>
    </div>
  );
};