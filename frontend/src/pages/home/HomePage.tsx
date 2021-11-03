import React, { useEffect, useState, useReducer } from 'react';
import { loadUserTasksForDay } from '../../store/usertasks/operations';
import { useDispatch, useSelector } from 'react-redux';
import UserTaskCarousel from '../../components/home/UserTaskCarousel';
import MapDialog from '../../components/map/MapDialog';
import { getUserTaskListForDay } from '../../store/usertasks/selectors';
import { RootState } from '../../store';
import { Grid, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getUser } from '../../store/auth/selectors';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, NOTIFICATIONS_ROUTE } from '../../routing/routes';
import DateCarousel from '../../components/home/DateCarousel';
import ChallengeCompletedDialog from 'components/challengeCompletedDialog';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import TodayIcon from '@mui/icons-material/TodayRounded';
import { startOfDay } from 'date-fns';
import { ChallengeMapData } from 'types/challenges';
import { getChallengeMaps } from 'store/challenges/selectors';
import LoadingPage from 'pages/loading/LoadingPage';

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

interface ChallengeCompletedDialogState {
  isOpen: boolean;
  completedChallengeId?: number;
}

interface TaskCompletedDialogState {
  openChallengeName?: string;
}

const HomePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [date, setDate] = useState(startOfDay(new Date()));
  const [ChallengeCompletedDialogState, setChallengeCompletedDialogState] =
    useReducer(
      (
        state: ChallengeCompletedDialogState,
        newState: Partial<ChallengeCompletedDialogState>
      ) => ({
        ...state,
        ...newState,
      }),
      { isOpen: false, completedChallengeId: undefined }
    );

  const onChallengeCompleted = (completedChallengeId: number) => {
    setChallengeCompletedDialogState({
      isOpen: true,
      completedChallengeId: completedChallengeId,
    });
  };
  const [taskCompletedDialogState, setTaskCompletedDialogState] = useReducer(
    (
      state: TaskCompletedDialogState,
      newState: Partial<TaskCompletedDialogState>
    ) => ({
      ...state,
      ...newState,
    }),
    { openChallengeName: undefined }
  );

  const onTaskCompleted = (openChallengeName: string) => {
    setTaskCompletedDialogState({
      openChallengeName: openChallengeName,
    });
  };

  useEffect(() => {
    dispatch(loadUserTasksForDay(date));
  }, [date]);

  const userTaskList = Array.from(
    useSelector((state: RootState) => getUserTaskListForDay(state, date))
  ).sort((a, b) => a.id - b.id);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const challengeMaps = useSelector((state: RootState) =>
    getChallengeMaps(state)
  )!;

  const user = useSelector(getUser);
  if (!user) {
    history.push(LOGIN_ROUTE);
    return <LoadingPage />;
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
            <Grid item container xs={6} sm={9}>
              <Grid item>
                <Typography variant="h4">Hello,</Typography>
                <Typography variant="h4">
                  {user.displayName ?? user.username}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.controlsContainer}>
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
          onTaskCompleted={onTaskCompleted}
        />
      </div>

      {ChallengeCompletedDialogState.completedChallengeId && (
        <ChallengeCompletedDialog
          isOpen={ChallengeCompletedDialogState.isOpen}
          challengeId={ChallengeCompletedDialogState.completedChallengeId}
          onClose={() => setChallengeCompletedDialogState({ isOpen: false })}
        />
      )}
      {challengeMaps.map((mapData: ChallengeMapData) => (
        <MapDialog
          key={mapData.challengeId}
          isOpen={
            taskCompletedDialogState.openChallengeName === mapData.challengeName
          }
          close={() => setTaskCompletedDialogState({ openChallengeName: '' })}
          mapData={mapData}
        />
      ))}
    </div>
  );
};

export default HomePage;
