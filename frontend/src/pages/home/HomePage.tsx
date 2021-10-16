import React, { useEffect } from 'react';
import { loadUserTasksForDay } from '../../store/usertasks/operations';
import { useDispatch, useSelector } from 'react-redux';
import UserTaskCarousel from '../../components/home/UserTaskCarousel';
import { getUserTaskListForDay } from '../../store/usertasks/selectors';
import { RootState } from '../../store';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserTasksForDay(new Date()));
  }, []);
  const userTaskList = useSelector((state: RootState) =>
    getUserTaskListForDay(state, new Date())
  );

  return (
    <div className={classes.container}>
      <Typography variant="h5">Your Tasks</Typography>
      <UserTaskCarousel userTaskList={userTaskList} />
    </div>
  );
};

export default HomePage;
