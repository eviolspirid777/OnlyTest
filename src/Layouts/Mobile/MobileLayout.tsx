import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { AnimatedNumber } from "../../components/AnimatedNumber/AnimatedNumber";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./MobileLayout.module.css";
import { mockPoints } from "../../mock/mockData";

export const MobileLayout = () => {
  const [startYear, setStartYear] = useState(1900);
  const [endYear, setEndYear] = useState(2024);

  return (
    <div>
      <h1>Исторические даты</h1>
      <div>
        <AnimatedNumber
          value={startYear}
          className={`${styles.timeline__year} ${styles["timeline__year--start"]}`}
        />
        <AnimatedNumber
          value={endYear}
          className={`${styles.timeline__year} ${styles["timeline__year--end"]}`}
        />
      </div>
      <hr />
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {mockPoints[0].events.map((event) => (
          <SwiperSlide>
            <div>
              <p>{event.date}</p>
              <p>{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </Swiper>
    </div>
  );
};
