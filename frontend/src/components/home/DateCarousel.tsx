import React from 'react';
import Slider from 'react-slick';
import { makeStyles } from '@mui/styles';
import DateItem from './DateItem';
import { getDatesInMonth } from '../../utils/date';

const useStyles = makeStyles(() => ({
  slider: {
    height: '100%',
    width: '100%',
  },
}));

const DateCarousel: React.FC = () => {
  const classes = useStyles();

  return (
    <Slider
      arrows={false}
      centerMode
      infinite={false}
      className={classes.slider}
    >
      {getDatesInMonth(9, 2021).map((date: Date) => (
        <div key={date.toISOString()}>
          <DateItem date={date} />
        </div>
      ))}
    </Slider>
  );
};

export default DateCarousel;
