import React from 'react';
import { getDatesInMonth } from '../../utils/date';
import DateItem from './DateItem';
import { Swiper, SwiperSlide } from 'swiper/react';

import './DateCarousel.scss';

interface Props {
  setDate: (date: Date) => void;
}

const DateCarousel: React.FC<Props> = ({ setDate }: Props) => {
  const dates = getDatesInMonth(9, 2021);

  return (
    <Swiper
      centeredSlides
      slidesPerView={7}
      watchSlidesProgress
      className="date-slider"
      onRealIndexChange={(swiper) => setDate(dates[swiper.activeIndex])}
    >
      {dates.map((date: Date) => (
        <SwiperSlide key={date.toISOString()}>
          <DateItem date={date} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DateCarousel;
