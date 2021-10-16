import React, { useEffect } from 'react';
import { loadUserTasksForDay } from '../../store/usertasks/operations';
import { useDispatch, useSelector } from 'react-redux';
import UserTaskCarousel from '../../components/home/UserTaskCarousel';
import { getUserTaskListForDay } from '../../store/usertasks/selectors';
import { RootState } from '../../store';
import { Grid, Skeleton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getUser } from '../../store/auth/selectors';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../routing/routes';
import DateCarousel from '../../components/home/DateCarousel';

const useStyles = makeStyles(() => ({
  baseContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  headerContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
  },
  headerItem: {
    width: '100%',
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadUserTasksForDay(new Date()));
  }, []);
  const userTaskList = useSelector((state: RootState) =>
    getUserTaskListForDay(state, new Date())
  );

  const user = useSelector(getUser);
  if (!user) {
    history.push(LOGIN_ROUTE);
    return <Skeleton />;
  }

  return (
    <div className={classes.baseContainer}>
      <div className={classes.headerContainer}>
        <Grid container direction="column" spacing={2}>
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="h4">Hello,</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">{user.displayName}</Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.headerItem}>
            <DateCarousel />
          </Grid>
          <Grid item>
            <Typography variant="h5">Your Tasks</Typography>
          </Grid>
        </Grid>
      </div>
      <UserTaskCarousel userTaskList={userTaskList} />
    </div>
  );
};

export default HomePage;
