import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import UserTaskCard from './UserTaskCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { EXPLORE_ROUTE } from '../../routing/routes';
import { useHistory } from 'react-router-dom';

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
}

const UserTaskCarousel: React.FC<Props> = ({ userTaskList }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  if (userTaskList.length == 0) {
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
