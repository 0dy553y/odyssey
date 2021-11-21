import React, { useEffect, useState } from 'react';
import {
  contains,
  getDateFromNowString,
  getDayString,
  getMonthString,
  getNeighbouringDates,
} from '../../utils/date';
import DateItem from './DateItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Mousewheel, Keyboard } from 'swiper';
import SwiperClass from 'swiper/types/swiper-class';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { makeStyles } from '@mui/styles';
import ReturnToTodayButton from './ReturnToTodayButton';
import { startOfDay } from 'date-fns';
import { useDispatch } from 'react-redux';
import { addSnackbar } from '../../store/snackbars/actions';

import './DateCarousel.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  dateDisplay: {
    flexGrow: 1,
  },
}));

interface Props {
  date: Date;
  setDate: (date: Date) => void;
  datesWithOverdueTasks: Date[];
}

const DateCarousel: React.FC<Props> = ({
  date,
  setDate,
  datesWithOverdueTasks,
}: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const dateRange = 50;
  const previousIndex = dateRange;
  const [selectedDate, setSelectedDate] = useState(date);
  const [dates, setDates] = useState(
    getNeighbouringDates(selectedDate, dateRange)
  );

  useEffect(() => {
    const diff = dayjs(date).diff(selectedDate, 'day');
    if (diff == 0) {
      return;
    }
    if (diff > 0) {
      shiftDatesRight(diff);
    } else {
      shiftDatesLeft(-diff);
    }
    setSelectedDate(date);
  }, [date]);

  const shiftDatesLeft = (by: number) => {
    if (by <= 0) {
      return;
    } else if (by > dateRange) {
      shiftDatesLeft(by - dateRange);
      by = dateRange;
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
    } else if (by > dateRange) {
      shiftDatesRight(by - dateRange);
      by = dateRange;
    }
    const newDates = dates.slice(by);
    for (let i = 0; i < by; i++) {
      const newDate = new Date(newDates[newDates.length - 1]);
      newDate.setDate(newDate.getDate() + 1);
      newDates.push(newDate);
    }
    setDates(newDates);
  };

  const currentDate: Date = startOfDay(new Date());
  const setDateToCurrentDate = () => {
    setDate(currentDate);
    dispatch(
      addSnackbar({
        message: 'Set date to today!',
        variant: 'success',
      })
    );
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
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Box>
        <Typography variant="h5">{getMonthString(selectedDate)}</Typography>
      </Box>
      <Swiper
        centeredSlides
        initialSlide={previousIndex}
        breakpoints={{
          180: {
            slidesPerView: 5,
          },
          320: {
            slidesPerView: 7,
          },
          700: {
            slidesPerView: 'auto',
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
          <SwiperSlide key={date.toISOString()}>
            <DateItem
              date={date}
              shouldShowDot={contains(datesWithOverdueTasks, date)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={classes.container}>
        <ReturnToTodayButton
          direction="left"
          onClick={setDateToCurrentDate}
          isVisible={selectedDate > currentDate}
        />
        <Stack alignItems="center" className={classes.dateDisplay}>
          <Typography variant="h6">{getDayString(selectedDate)}</Typography>
          <Typography>{getDateFromNowString(selectedDate)}</Typography>
        </Stack>
        <ReturnToTodayButton
          direction="right"
          onClick={setDateToCurrentDate}
          isVisible={selectedDate < currentDate}
        />
      </div>
    </Stack>
  );
};

export default DateCarousel;
