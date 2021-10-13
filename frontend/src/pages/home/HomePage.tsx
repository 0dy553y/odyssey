import React, { useEffect } from 'react';
import { loadUserTasksForDay } from '../../store/usertasks/operations';
import { useDispatch, useSelector } from 'react-redux';
import UserTaskCarousel from '../../components/home/UserTaskCarousel';
import { getUserTaskListForDay } from '../../store/usertasks/selectors';
import { RootState } from '../../store';
import { Typography } from '@mui/material';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserTasksForDay(new Date()));
  }, []);
  const userTaskList = useSelector((state: RootState) =>
    getUserTaskListForDay(state, new Date())
  );

  return (
    <>
      <Typography variant="h5">Your Tasks</Typography>
      <UserTaskCarousel userTaskList={userTaskList} />
    </>
  );
};

export default HomePage;
