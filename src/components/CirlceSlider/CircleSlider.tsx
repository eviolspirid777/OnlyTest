import { useEffect, useRef, useState } from "react";
import styles from "./CircleSlider.module.css";
import { PointWithRef } from "../../types/Point";
import gsap from "gsap";
import type { FC } from "react";

type CircleSliderProps = {
  points: PointWithRef[];
  currentPoint: number | null;
  hoveredPoint: number | null;
  onPointClick: (id: number | null) => void;
  onPointHover: (id: number | null) => void;
  onPointLeave: () => void;
  onPointsReorder?: (newPoints: PointWithRef[]) => void;
};

export const CircleSlider: FC<CircleSliderProps> = ({
  points,
  currentPoint,
  hoveredPoint,
  onPointClick,
  onPointHover,
  onPointLeave,
  onPointsReorder,
}) => {
  const radius = 265;
  const center = 300;
  const prevPointRef = useRef(hoveredPoint);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timeline = gsap.timeline();

    points.forEach((point) => {
      if (point.ref.current) {
        const isActive = !isAnimating && point.id === hoveredPoint;
        const wasActive = point.id === prevPointRef.current;

        const mainPoint = point.ref.current.querySelector(`.${styles.point}`);
        if (mainPoint) {
          if (isActive && !wasActive) {
            gsap.set(mainPoint, {
              attr: { r: 3 },
              fill: "#42567A",
            });
          }

          timeline.to(
            mainPoint,
            {
              attr: { r: isActive ? 25 : 3 },
              fill: isActive ? "#303E5880" : "#42567A",
              duration: 0.5,
              ease: "power2.inOut",
            },
            0
          );
        }

        const innerPoint = point.ref.current.querySelector(
          `.${styles.innerPoint}`
        );
        if (innerPoint) {
          if (isActive && !wasActive) {
            gsap.set(innerPoint, {
              attr: { r: 3 },
              opacity: 0,
            });
          } else if (!isActive && wasActive) {
            gsap.set(innerPoint, {
              attr: { r: 19 },
              opacity: 1,
            });
          }

          timeline.to(
            innerPoint,
            {
              attr: { r: isActive ? 24 : 3 },
              opacity: isActive ? 1 : 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0
          );
        }

        const texts = point.ref.current.querySelectorAll(
          `.${styles.categoryText}`
        );
        texts.forEach((text) => {
          gsap.set(text, {
            opacity: wasActive ? 1 : 0,
          });

          timeline.to(
            text,
            {
              opacity: isActive ? 1 : 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0
          );
        });
      }
    });

    prevPointRef.current = hoveredPoint;
  }, [hoveredPoint, points, isAnimating]);

  const calculateNewPoints = (
    array: PointWithRef[],
    startId: number,
    destinyId: number
  ): { steps: number; newArray: PointWithRef[] } => {
    const startPos = array.findIndex((point) => point.id === startId);
    const destinyPos = array.findIndex((point) => point.id === destinyId);

    if (startPos === -1 || destinyPos === -1)
      return { steps: 0, newArray: array };

    let steps = (destinyPos - startPos + array.length) % array.length;

    const newArray = [...array];
    const [moved] = newArray.splice(startPos, 1);
    newArray.splice(destinyPos, 0, moved);

    return { steps, newArray };
  };

  const handleRotateContainer = (id: number) => {
    const targetPointId = points[2].id;

    const { steps, newArray } = calculateNewPoints(points, id, targetPointId);

    const anglePerStep = 360 / points.length;
    const rotationAngle = steps * anglePerStep;

    const container = document.querySelector(
      `.${styles.circleSlider}`
    ) as HTMLDivElement;

    gsap.to(container, {
      rotateZ: rotationAngle,
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        setIsAnimating(true);
        onPointHover(null);
        onPointClick(null);
      },
      onComplete: () => {
        if (onPointsReorder) {
          onPointsReorder(newArray);
          onPointHover(id);
          onPointClick(id);
          setIsAnimating(false);
          gsap.set(container, {
            rotateZ: 0,
            duration: 0,
          });
        }
      },
    });
  };

  const getPointCoordinates = (index: number, totalPoints: number) => {
    const angle = (index * 360) / totalPoints;
    const radian = (angle - 90) * (Math.PI / 180) + 11;

    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian),
    };
  };

  return (
    <div className={styles.circleSlider}>
      <svg viewBox="0 0 600 600" className={styles.circleSlider__svg}>
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
          const isActive = !isAnimating && point.id === currentPoint;

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
              <circle r="21" fill="transparent" className={styles.hitArea} />

              <circle
                r="3"
                fill={isActive ? "#303E5880" : "#42567A"}
                className={styles.point}
              />

              <circle
                r="3"
                fill="white"
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
                  x="35"
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
