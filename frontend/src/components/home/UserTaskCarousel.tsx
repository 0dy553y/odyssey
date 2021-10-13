import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import UserTaskCard from './UserTaskCard';
import Slider from 'react-slick';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  slider: {
    height: '100%',
    width: '100%',
  },
}));

interface Props {
  userTaskList: UserTaskListData[];
}

const UserTaskCarousel: React.FC<Props> = ({ userTaskList }: Props) => {
  const classes = useStyles();

  return (
    <Slider
      arrows={false}
      centerMode
      infinite={false}
      className={classes.slider}
    >
      {userTaskList.map((userTask: UserTaskListData) => (
        <UserTaskCard key={userTask.id} userTask={userTask} />
      ))}
    </Slider>
  );
};

export default UserTaskCarousel;
