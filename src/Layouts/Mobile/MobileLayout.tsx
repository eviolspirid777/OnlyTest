import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { AnimatedNumber } from "../../components/AnimatedNumber/AnimatedNumber";
import { useState } from "react";
import { mockPoints } from "../../mock/mockData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./MobileLayout.module.css";

export const MobileLayout = () => {
  const [startYear, setStartYear] = useState(1900);
  const [endYear, setEndYear] = useState(2024);
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div className={styles["mobile-container"]}>
      <h1 className={styles["mobile-container-header"]}>Исторические даты</h1>
      <div className={styles["timeline__years"]}>
        <AnimatedNumber
          value={startYear}
          className={`${styles.timeline__year} ${styles["timeline__year--start"]}`}
        />
        <AnimatedNumber
          value={endYear}
          className={`${styles.timeline__year} ${styles["timeline__year--end"]}`}
        />
      </div>
      <div>
        <h3>{mockPoints[0].label}</h3>
        <hr />
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next-mobile",
            prevEl: ".swiper-button-prev-mobile",
          }}
          slidesPerView={1.5}
          spaceBetween={40}
        >
          {mockPoints[0].events.map((event) => (
            <SwiperSlide>
              <div className={styles.timeline__date}>{event.date}</div>
              <p className={styles.timeline__description}>
                {event.description}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles["navigation-block"]}>
          <span className={styles["navigation-block-title"]}>
            {currentSlide}/{mockPoints[0].events.length}
          </span>
          <div className={styles["navigation-buttons-block"]}>
            <div className="swiper-button-prev-mobile" />
            <div className="swiper-button-next-mobile" />
          </div>
        </div>
      </div>
    </div>
  );
};
