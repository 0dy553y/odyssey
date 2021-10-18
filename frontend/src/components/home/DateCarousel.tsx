import React, { useState } from 'react';
import {
  getDateFromNowString,
  getDayString,
  getMonthString,
  getNeighbouringDates,
} from '../../utils/date';
import DateItem from './DateItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Mousewheel, Keyboard } from 'swiper';
import SwiperClass from 'swiper/types/swiper-class';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import './DateCarousel.scss';

const useStyles = makeStyles(() => ({
  monthText: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  dayText: {
    textAlign: 'center',
    paddingBottom: 0,
  },
}));

interface Props {
  setDate: (date: Date) => void;
}

const DateCarousel: React.FC<Props> = ({ setDate }: Props) => {
  const dateRange = 50;
  const previousIndex = dateRange;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState(
    getNeighbouringDates(selectedDate, dateRange)
  );
  const classes = useStyles();

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

  const handleActiveIndexChange = (swiper: SwiperClass) => {
    setSelectedDate(dates[swiper.activeIndex]);
  };

  const handleTransitionEnd = (swiper: SwiperClass) => {
    setDate(selectedDate);
    const difference = swiper.activeIndex - previousIndex;
    if (previousIndex > swiper.activeIndex) {
      shiftDatesLeft(-difference);
    } else if (previousIndex < swiper.activeIndex) {
      shiftDatesRight(difference);
    }
    swiper.slideTo(dateRange, 0, false);
  };

  SwiperCore.use([Navigation, Mousewheel, Keyboard]);

  return (
    <>
      <div className={classes.monthText}>
        <Typography variant="h5">{getMonthString(selectedDate)}</Typography>
      </div>
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
        slideToClickedSlide
        keyboard={{ enabled: true }}
        mousewheel={true}
        className="date-slider"
        onActiveIndexChange={handleActiveIndexChange}
        onTransitionEnd={handleTransitionEnd}
      >
        {dates.map((date: Date) => (
          <SwiperSlide key={date.toISOString()} className="hand-cursor">
            <DateItem date={date} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={classes.dayText}>
        <Typography variant="h6">{getDayString(selectedDate)}</Typography>
        <Typography>{getDateFromNowString(selectedDate)}</Typography>
      </div>
    </>
  );
};

export default DateCarousel;
