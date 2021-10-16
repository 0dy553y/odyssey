import React from 'react';
import Slider from 'react-slick';
import DateItem from './DateItem';
import { getDatesInMonth } from '../../utils/date';

import './DateCarousel.scss';

const DateCarousel: React.FC = () => {
  return (
    <Slider arrows={false} centerMode infinite={false} className="date-slider">
      {getDatesInMonth(9, 2021).map((date: Date) => (
        <div key={date.toISOString()}>
          <DateItem date={date} />
        </div>
      ))}
    </Slider>
  );
};

export default DateCarousel;
