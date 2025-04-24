import { createRef, useState } from 'react';
import styles from './App.module.css';
import { AnimatedNumber } from './components/AnimatedNumber/AnimatedNumber';
import { CircleSlider } from './components/CirlceSlider/CircleSlider';
import { PointWithRef } from './types/Point';
import gsap from 'gsap';


const points: PointWithRef[] = [
  { id: 1, label: "Кино", category: "Кино", ref: createRef<SVGGElement>() },
  { id: 2, label: "Литература", category: "Литература", ref: createRef<SVGGElement>() },
  { id: 3, label: "Театр", category: "Театр", ref: createRef<SVGGElement>() },
  { id: 4, label: "Музыка", category: "Музыка", ref: createRef<SVGGElement>() },
  { id: 5, label: "Наука", category: "Наука", ref: createRef<SVGGElement>() },
  { id: 6, label: "Искусство", category: "Искусство", ref: createRef<SVGGElement>() }
];

const timeEvents = [
  {
    date: "1987",
    description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
  },
  {
    date: "1988",
    description: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"
  },
  {
    date: "1991",
    description: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi"
  }
];

export const App = () => {
  const [startYear, setStartYear] = useState(1987);
  const [endYear, setEndYear] = useState(1991);
  const [currentStep, setCurrentStep] = useState(1);
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
    changePointStatus(points[id - 1]);
  };

  const handleCategoryHover = (id: number) => {
    setHoveredCategory(id);
    changePointStatus(points[id - 1]);
  };

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
          points={points}
          currentPoint={currentCategory}
          hoveredPoint={hoveredCategory}
          onPointClick={handleCategorySelect}
          onPointHover={handleCategoryHover}
        />
      </div>

      <div className={styles.timeline__controls}>
        <div className={styles.timeline__controls__counter__block}>
          <span className={styles.timeline__controls__counter__current}>
            {currentStep}
          </span>
          /
          <span className={styles.timeline__controls__counter__total}>
            6
          </span>
        </div>
        <div className={styles.timeline__controls__buttons}>
          <button 
            className={`${styles.timeline__button} ${styles['timeline__button--prev']}`}
            onClick={handlePrevClick}
            disabled={currentStep === 1}
          />
          <button 
            className={`${styles.timeline__button} ${styles['timeline__button--next']}`}
            onClick={handleNextClick}
            disabled={currentStep === 6}
          />
        </div>
      </div>

      <div className={styles.timeline__events}>
        {timeEvents.map((event, index) => (
          <div key={index} className={styles.timeline__event}>
            <div className={styles.timeline__date}>{event.date}</div>
            <p className={styles.timeline__description}>{event.description}</p>
          </div>
        ))}
        <div className={styles.timeline__event__button} onClick={handleNextClick} />
      </div>
    </div>
  );
};