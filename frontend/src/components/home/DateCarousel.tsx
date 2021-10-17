import React from 'react';
import { getDatesInMonth } from '../../utils/date';
import DateItem from './DateItem';
import { Swiper, SwiperSlide } from 'swiper/react';

import './DateCarousel.scss';

const DateCarousel: React.FC = () => {
  return (
    <Swiper centeredSlides slidesPerView={7} className="date-slider">
      {getDatesInMonth(9, 2021).map((date: Date) => (
        <SwiperSlide key={date.toISOString()}>
          <DateItem date={date} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DateCarousel;
