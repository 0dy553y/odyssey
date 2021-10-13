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
  sliderItem: {
    height: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
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
        <div key={userTask.id} className={classes.sliderItem}>
          <UserTaskCard userTask={userTask} />
        </div>
      ))}
    </Slider>
  );
};

export default UserTaskCarousel;
