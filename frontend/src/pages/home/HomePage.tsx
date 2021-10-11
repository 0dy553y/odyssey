import React, { useEffect } from 'react';
import { loadUserTasksForDay } from '../../store/usertasks/operations';
import { useDispatch } from 'react-redux';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserTasksForDay(new Date()));
  }, []);

  return <div>home</div>;
};

export default HomePage;
