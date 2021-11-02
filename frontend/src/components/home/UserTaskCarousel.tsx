import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import UserTaskCard from './UserTaskCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Mousewheel, Keyboard } from 'swiper';
import { Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { EXPLORE_ROUTE } from '../../routing/routes';
import { useHistory } from 'react-router-dom';
import { isBefore, isToday } from 'date-fns';
import { displayDate } from '../../utils/formatting';
import astronaut from 'assets/gifs/obebebe.gif';

import './UserTaskCarousel.scss';

const useStyles = makeStyles(() => ({
  textContainer: {
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    gap: 0,
    gridTemplateRows: '1fr auto 1fr',
  },
  text: {
    color: 'gray',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 100,
  },
  handCursorLink: {
    cursor: 'pointer',
  },
  astronaut: {
    maxHeight: '5em',
  },
}));

interface Props {
  userTaskList: UserTaskListData[];
  date: Date;
  onChallengeCompleted: (completedChallengeName: string) => void;
  onTaskCompleted: (openChallengeName: string) => void;
}

const UserTaskCarousel: React.FC<Props> = ({
  userTaskList,
  date,
  onChallengeCompleted,
  onTaskCompleted,
}: Props) => {
  const classes = useStyles();
  const history = useHistory();

  if (userTaskList.length == 0 && isToday(date)) {
    return (
      <div className={classes.textContainer}>
        <img className={classes.astronaut} src={astronaut} />
        <Typography align="center" className={classes.text}>
          You have no tasks for today!
          <br />
          {'Why not head to the '}
          <Link
            className={classes.handCursorLink}
            onClick={() => history.push(EXPLORE_ROUTE)}
          >
            {' '}
            Explore tab
          </Link>
          {' and start a new challenge?'}
        </Typography>
      </div>
    );
  }

  if (userTaskList.length == 0) {
    return (
      <div className={classes.textContainer}>
        <img className={classes.astronaut} src={astronaut} />
        <Typography align="center" className={classes.text}>
          {`You ${
            isBefore(date, new Date()) ? 'had' : 'have'
          } no tasks on ${displayDate(date)}!`}
        </Typography>
      </div>
    );
  }

  SwiperCore.use([Navigation, Mousewheel, Keyboard]);

  return (
    <Swiper
      centeredSlides
      slidesPerView={1.3}
      spaceBetween={20}
      slideToClickedSlide
      keyboard={{ enabled: true }}
      mousewheel={true}
      className="task-slider"
    >
      {userTaskList.map((userTask: UserTaskListData) => (
        <SwiperSlide key={userTask.id}>
          <UserTaskCard
            userTask={userTask}
            onChallengeCompleted={onChallengeCompleted}
            onTaskCompleted={onTaskCompleted}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default UserTaskCarousel;
