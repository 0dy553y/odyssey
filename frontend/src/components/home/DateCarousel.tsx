import React, { useState } from 'react';
import { getNeighbouringDates } from '../../utils/date';
import DateItem from './DateItem';
import { Swiper, SwiperSlide } from 'swiper/react';

import './DateCarousel.scss';

interface Props {
  setDate: (date: Date) => void;
}

const DateCarousel: React.FC<Props> = ({ setDate }: Props) => {
  const dateRange = 8;
  const [dates, setDates] = useState(
    getNeighbouringDates(new Date(), dateRange)
  );

  return (
    <Swiper
      centeredSlides
      initialSlide={dateRange}
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
