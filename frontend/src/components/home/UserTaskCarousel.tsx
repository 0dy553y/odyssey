import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import UserTaskCard from './UserTaskCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { EXPLORE_ROUTE } from '../../routing/routes';
import { useHistory } from 'react-router-dom';
import { isBefore, isToday } from 'date-fns';
import { displayDate } from '../../utils/formatting';

import './UserTaskCarousel.scss';

const useStyles = makeStyles(() => ({
  textContainer: {
    height: '100%',
    display: 'grid',
    placeItems: 'center',
  },
  text: {
    color: 'gray',
    marginLeft: 50,
    marginRight: 50,
  },
}));

interface Props {
  userTaskList: UserTaskListData[];
  date: Date;
}

const UserTaskCarousel: React.FC<Props> = ({ userTaskList, date }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  if (userTaskList.length == 0 && isToday(date)) {
    return (
      <div className={classes.textContainer}>
        <Typography align="center" className={classes.text}>
          You have no tasks for today!
          <br />
          {'Why not head to the '}
          <Link onClick={() => history.push(EXPLORE_ROUTE)}> Explore tab</Link>
          {' and start a new challenge?'}
        </Typography>
      </div>
    );
  }

  if (userTaskList.length == 0) {
    return (
      <div className={classes.textContainer}>
        <Typography align="center" className={classes.text}>
          {`You ${
            isBefore(date, new Date()) ? 'had' : 'have'
          } no tasks on ${displayDate(date)}!`}
        </Typography>
      </div>
    );
  }

  return (
    <Swiper
      centeredSlides
      slidesPerView={1.3}
      spaceBetween={20}
      slideToClickedSlide
      className="task-slider"
    >
      {userTaskList.map((userTask: UserTaskListData) => (
        <SwiperSlide key={userTask.id}>
          <UserTaskCard userTask={userTask} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default UserTaskCarousel;
