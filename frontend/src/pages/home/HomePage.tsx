import React, { useEffect, useState, useReducer } from 'react';
import { loadUserTasksForDay } from '../../store/usertasks/operations';
import { useDispatch, useSelector } from 'react-redux';
import UserTaskCarousel from '../../components/home/UserTaskCarousel';
import { getUserTaskListForDay } from '../../store/usertasks/selectors';
import { RootState } from '../../store';
import { Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getUser } from '../../store/auth/selectors';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, NOTIFICATIONS_ROUTE } from '../../routing/routes';
import DateCarousel from '../../components/home/DateCarousel';
import ChallengeCompletedModal from 'components/challengeCompletedModal';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import TodayIcon from '@mui/icons-material/Today';
import { startOfDay } from 'date-fns';

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
  controlsContainer: {
    textAlign: 'right',
  },
}));

interface ChallengeCompletedModalState {
  isOpen: boolean;
  completedChallengeName?: string;
}

const HomePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [date, setDate] = useState(startOfDay(new Date()));
  const [challengeCompletedModalState, setChallengeCompletedModalState] =
    useReducer(
      (
        state: ChallengeCompletedModalState,
        newState: Partial<ChallengeCompletedModalState>
      ) => ({
        ...state,
        ...newState,
      }),
      { isOpen: false, completedChallengeName: undefined }
    );

  const onChallengeCompleted = (completedChallengeName: string) => {
    setChallengeCompletedModalState({
      isOpen: true,
      completedChallengeName: completedChallengeName,
    });
  };

  useEffect(() => {
    dispatch(loadUserTasksForDay(date));
  }, [date]);
  const userTaskList = Array.from(
    useSelector((state: RootState) => getUserTaskListForDay(state, date))
  ).sort((a, b) => a.id - b.id);

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
            direction="row"
            className={classes.headerNonCarouselItem}
          >
            <Grid item container direction="column" xs={6} sm={9}>
              <Grid item>
                <Typography variant="h4">Hello,</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {user.displayName ?? user.username}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              direction="row"
              xs={6}
              sm={3}
              className={classes.controlsContainer}
            >
              <IconButton
                size="large"
                onClick={() => history.push(NOTIFICATIONS_ROUTE)}
              >
                <NotificationsOutlinedIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                size="large"
                onClick={() => setDate(startOfDay(new Date()))}
              >
                <TodayIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item className={classes.headerCarouselItem}>
            <DateCarousel date={date} setDate={setDate} />
          </Grid>
          <Grid item className={classes.headerNonCarouselItem}>
            <Typography variant="h5">Your Tasks</Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tasksContainer}>
        <UserTaskCarousel
          userTaskList={userTaskList}
          date={date}
          onChallengeCompleted={onChallengeCompleted}
        />
      </div>

      {challengeCompletedModalState.completedChallengeName && (
        <ChallengeCompletedModal
          isOpen={challengeCompletedModalState.isOpen}
          challengeName={challengeCompletedModalState.completedChallengeName}
          onClose={() => setChallengeCompletedModalState({ isOpen: false })}
        />
      )}
    </div>
  );
};

export default HomePage;
