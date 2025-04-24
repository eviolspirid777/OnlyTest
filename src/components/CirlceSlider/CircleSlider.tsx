import React, { useEffect, useRef } from 'react';
import styles from './CircleSlider.module.css';
import { PointWithRef } from '../../types/Point';
import gsap from 'gsap';

interface CircleSliderProps {
  points: PointWithRef[];
  currentPoint: number;
  hoveredPoint: number | null;
  onPointClick: (id: number) => void;
  onPointHover: (id: number) => void;
  onPointLeave: () => void
}

export const CircleSlider: React.FC<CircleSliderProps> = ({
  points,
  currentPoint,
  hoveredPoint,
  onPointClick,
  onPointHover,
  onPointLeave,
}) => {
  const radius = 265;
  const center = 300;
  const prevPointRef = useRef(hoveredPoint);

  useEffect(() => {
    const timeline = gsap.timeline();
    
    points.forEach(point => {
      if (point.ref.current) {
        const isActive = point.id === hoveredPoint;
        const wasActive = point.id === prevPointRef.current;
        
        // Анимация основной точки
        const mainPoint = point.ref.current.querySelector(`.${styles.point}`);
        if (mainPoint) {
          // Устанавливаем начальный размер
          if (isActive && !wasActive) {
            gsap.set(mainPoint, {
              attr: { r: 3 },
              fill: '#42567A'
            });
          }

          timeline.to(mainPoint, {
            attr: { r: isActive ? 25 : 3 },
            fill: isActive ? '#303E5880' : '#42567A',
            duration: 0.5,
            ease: "power2.inOut"
          }, 0);
        }

        // Анимация белой точки внутри
        const innerPoint = point.ref.current.querySelector(`.${styles.innerPoint}`);
        if (innerPoint) {
          if (isActive && !wasActive) {
            // Для новой активной точки начинаем с нуля
            gsap.set(innerPoint, {
              attr: { r: 3 },
              opacity: 0
            });
          } else if (!isActive && wasActive) {
            // Для деактивируемой точки начинаем с текущего состояния
            gsap.set(innerPoint, {
              attr: { r: 19 },
              opacity: 1
            });
          }

          timeline.to(innerPoint, {
            attr: { r: isActive ? 24 : 3 },
            opacity: isActive ? 1 : 0,
            duration: 0.5,
            ease: "power2.inOut"
          }, 0);
        }

        // Анимация текста
        const texts = point.ref.current.querySelectorAll(`.${styles.categoryText}`);
        texts.forEach(text => {
          gsap.set(text, {
            opacity: wasActive ? 1 : 0
          });

          timeline.to(text, {
            opacity: isActive ? 1 : 0,
            duration: 0.5,
            ease: "power2.inOut"
          }, 0);
        });
      }
    });

    prevPointRef.current = hoveredPoint;
  }, [hoveredPoint, points]);

  const handleRotateContainer = (id: number) => {
    //TODO: Вот здесь продумай логику перевертывания круговой штуки
    const container = document.querySelector(`.${styles.circleSlider}`) as HTMLDivElement;
    
    gsap.to(container, {
      rotateZ: 30 * id
    })
  }

  const getPointCoordinates = (index: number, totalPoints: number) => {
    const angle = (index * 360) / totalPoints;
    const radian = (angle - 90) * (Math.PI / 180) + 11;
    
    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian),
    };
  };

  return (
    <div
      className={styles.circleSlider}
    >
      <svg
        viewBox="0 0 600 600"
        className={styles.circleSlider__svg}
      >
        {/* Основная окружность */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#42567A"
          strokeWidth="1"
          opacity="0.2"
        />
        {points.map((point, index) => {
          const { x, y } = getPointCoordinates(index, points.length);
          const isActive = point.id === currentPoint;

          return (
            <g
              key={point.id} 
              ref={point.ref}
              transform={`translate(${x},${y})`}
              className={styles.pointGroup}
              onMouseEnter={onPointHover.bind(null, point.id)}
              onMouseLeave={onPointLeave}
              onClick={handleRotateContainer.bind(null, point.id)}
            >
              {/* Кликабельная область */}
              <circle
                r="21"
                fill="transparent"
                className={styles.hitArea}
                onClick={onPointClick.bind(null, point.id)}
              />

              {/* Основная точка */}
              <circle
                r="3"
                fill={isActive ? '#303E5880' : "#42567A"}
                className={styles.point}
              />
              
              <circle
                r="3"
                fill='white'
                className={styles.innerPoint}
                opacity="0"
              />
              
              <text
                x="-5"
                y="7"
                fill="#42567A"
                className={styles.categoryText}
                opacity="0"
              >
                {point.id}
              </text>

              {isActive && (
                <text
                  x="25"
                  y="5"
                  fill="#42567A"
                  className={styles.categoryText}
                  opacity="0"
                >
                  {point.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}; 