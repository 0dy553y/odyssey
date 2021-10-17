import React, { useEffect, useState } from 'react';
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
    marginTop: 40,
  },
  headerCarouselItem: {
    width: '100%',
  },
  headerNonCarouselItem: {
    marginLeft: 30,
    marginRight: 30,
    width: 'auto',
  },
  tasksContainer: {
    height: '100%',
    marginTop: 10,
    marginBottom: 15,
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    dispatch(loadUserTasksForDay(date));
  }, [date]);
  const userTaskList = useSelector((state: RootState) =>
    getUserTaskListForDay(state, date)
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
          <Grid
            item
            container
            direction="column"
            className={classes.headerNonCarouselItem}
          >
            <Grid item>
              <Typography variant="h4">Hello,</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">{user.displayName}</Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.headerCarouselItem}>
            <DateCarousel setDate={setDate} />
          </Grid>
          <Grid item className={classes.headerNonCarouselItem}>
            <Typography variant="h5">Your Tasks</Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tasksContainer}>
        <UserTaskCarousel userTaskList={userTaskList} date={date} />
      </div>
    </div>
  );
};

export default HomePage;
