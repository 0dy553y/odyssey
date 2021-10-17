import React, { useState } from 'react';
import { getNeighbouringDates } from '../../utils/date';
import DateItem from './DateItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import './DateCarousel.scss';

interface Props {
  setDate: (date: Date) => void;
}

const DateCarousel: React.FC<Props> = ({ setDate }: Props) => {
  const dateRange = 50;
  const previousIndex = dateRange;
  const [dates, setDates] = useState(
    getNeighbouringDates(new Date(), dateRange)
  );

  const shiftDatesLeft = (by: number) => {
    if (by <= 0) {
      return;
    }
    const newDates = dates.slice(0, -by);
    for (let i = 0; i < by; i++) {
      const newDate = new Date(newDates[0]);
      newDate.setDate(newDate.getDate() - 1);
      newDates.unshift(newDate);
    }
    setDates(newDates);
  };

  const shiftDatesRight = (by: number) => {
    if (by <= 0) {
      return;
    }
    const newDates = dates.slice(by);
    for (let i = 0; i < by; i++) {
      const newDate = new Date(newDates[newDates.length - 1]);
      newDate.setDate(newDate.getDate() + 1);
      newDates.push(newDate);
    }
    setDates(newDates);
  };

  const handleTransitionEnd = (swiper: SwiperClass) => {
    setDate(dates[swiper.activeIndex]);
    const difference = swiper.activeIndex - previousIndex;
    if (previousIndex > swiper.activeIndex) {
      shiftDatesLeft(-difference);
    } else if (previousIndex < swiper.activeIndex) {
      shiftDatesRight(difference);
    }
    swiper.slideTo(dateRange, 0, false);
  };

  return (
    <>
      <Swiper
        centeredSlides
        initialSlide={previousIndex}
        slidesPerView={3}
        breakpoints={{
          '180': {
            slidesPerView: 5,
          },
          '320': {
            slidesPerView: 7,
          },
        }}
        watchSlidesProgress
        className="date-slider"
        onTransitionEnd={handleTransitionEnd}
      >
        {dates.map((date: Date) => (
          <SwiperSlide key={date.toISOString()}>
            <DateItem date={date} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default DateCarousel;
