import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { AnimatedNumber } from "../../components/AnimatedNumber/AnimatedNumber";
import { Reducer, useReducer } from "react";
import { mockPoints } from "../../mock/mockData";
import { PointWithRef } from "../../types/Point";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./MobileLayout.module.scss";

const reducer = (state: PointWithRef, action: number) => {
  return mockPoints[action];
};

export const MobileLayout = () => {
  const [point, setPoint] = useReducer<Reducer<PointWithRef, number>>(
    reducer,
    mockPoints[0]
  );

  const handleNextDate = () => {
    point.id < mockPoints.length && setPoint(point.id);
  };

  const handlePreviousDate = () => {
    point.id !== 1 && setPoint(point.id - 2);
  };

  return (
    <div className={styles["mobile-container"]}>
      <h1 className={styles["mobile-container-header"]}>Исторические даты</h1>
      <div className={styles["timeline__years"]}>
        <AnimatedNumber
          value={point.date.minDate}
          className={`${styles.timeline__year} ${styles["timeline__year--start"]}`}
        />
        <AnimatedNumber
          value={point.date.maxDate}
          className={`${styles.timeline__year} ${styles["timeline__year--end"]}`}
        />
      </div>
      <div>
        <h3>{point.label}</h3>
        <hr />
      </div>
      <div className={styles["swiper-block"]}>
        <Swiper
          observer
          observeParents
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1.5}
          spaceBetween={40}
        >
          {point.events.map((event, id) => (
            <SwiperSlide key={id}>
              <div className={styles.timeline__date}>{event.date}</div>
              <p className={styles.timeline__description}>
                {event.description}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles["navigation-block"]}>
          <span className={styles["navigation-block-title"]}>
            {point.id.toString().padStart(2, "0")}/
            {mockPoints[0].events.length.toString().padStart(2, "0")}
          </span>
          <div className={styles["navigation-buttons-block"]}>
            <div
              className="swiper-button-prev-mobile"
              onClick={handlePreviousDate}
            />
            <div
              className="swiper-button-next-mobile"
              onClick={handleNextDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
