import React, { useEffect, useState, useReducer } from 'react';
import { loadUserTasksForDays } from '../../store/usertasks/operations';
import { batch, useDispatch, useSelector } from 'react-redux';
import UserTaskCarousel from '../../components/home/UserTaskCarousel';
import MapDialog from '../../components/map/MapDialog';
import {
  getDatesWithOverdueTasks,
  getUserTaskListForDay,
} from '../../store/usertasks/selectors';
import { RootState } from '../../store';
import { Badge, Box, Grid, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getUser } from '../../store/auth/selectors';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, NOTIFICATIONS_ROUTE } from '../../routing/routes';
import DateCarousel from '../../components/home/DateCarousel';
import ChallengeCompletedDialog from 'components/challengeCompletedDialog';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import TodayIcon from '@mui/icons-material/TodayRounded';
import { startOfDay } from 'date-fns';
import { UserChallengeMapData } from 'types/userchallenge';
import { getOngoingChallengeMaps } from 'store/userchallenges/selectors';
import LoadingPage from 'pages/loading/LoadingPage';
import { useIsDesktop } from 'utils/windowSize';
import { loadAllOngoingChallengeMaps } from 'store/userchallenges/operations';
import { loadAllFriendRequests } from '../../store/notifications/operations';
import { getFriendRequestList } from '../../store/notifications/selectors';

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
    display: 'flex',
    flexDirection: 'row',
  },
  tasksContainer: {
    height: '100%',
    marginTop: 10,
    marginBottom: 15,
  },
  greetingsContainer: {
    flexGrow: 1,
  },
  controlsContainer: {
    whiteSpace: 'nowrap',
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
  const isDesktop = useIsDesktop();

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
    batch(() => {
      dispatch(loadAllOngoingChallengeMaps());
      dispatch(loadAllFriendRequests());
    });
  }, []);

  useEffect(() => {
    dispatch(loadUserTasksForDays(date, 15));
  }, [date]);

  const userTaskList = Array.from(
    useSelector((state: RootState) => getUserTaskListForDay(state, date))
  ).sort((a, b) => a.id - b.id);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const challengeMaps = useSelector((state: RootState) =>
    getOngoingChallengeMaps(state)
  )!;

  const friendRequests = useSelector(getFriendRequestList);
  const datesWithOverdueTasks = useSelector(getDatesWithOverdueTasks);

  const user = useSelector(getUser);
  if (!user) {
    history.push(LOGIN_ROUTE);
    return <LoadingPage />;
  }

  return (
    <div className={classes.baseContainer}>
      <div className={classes.headerContainer}>
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.headerNonCarouselItem}>
            <div className={classes.greetingsContainer}>
              <Typography variant="h4">Hello,</Typography>
              <Typography variant="h4">
                {user.displayName ?? user.username}
              </Typography>
            </div>
            <div className={classes.controlsContainer}>
              <IconButton
                size="large"
                onClick={() => history.push(NOTIFICATIONS_ROUTE)}
              >
                <Badge color="primary" badgeContent={friendRequests.length}>
                  <NotificationsRoundedIcon
                    color="secondary"
                    fontSize="inherit"
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                onClick={() => setDate(startOfDay(new Date()))}
              >
                <TodayIcon color="secondary" fontSize="inherit" />
              </IconButton>
            </div>
          </Grid>
          <Grid item className={classes.headerCarouselItem}>
            <DateCarousel
              date={date}
              setDate={setDate}
              datesWithOverdueTasks={datesWithOverdueTasks}
            />
          </Grid>
          <Grid item className={classes.headerNonCarouselItem}>
            <Typography variant="h5">Your Tasks</Typography>
          </Grid>
        </Grid>
      </div>
      <Box
        className={classes.tasksContainer}
        sx={{ marginLeft: isDesktop ? 6 : undefined }}
      >
        <UserTaskCarousel
          userTaskList={userTaskList}
          date={date}
          onChallengeCompleted={onChallengeCompleted}
          onTaskCompleted={onTaskCompleted}
          cardsPerView={isDesktop ? 3.3 : 1.3}
          centeredCards={!isDesktop}
        />
      </Box>

      {ChallengeCompletedDialogState.completedChallengeId && (
        <ChallengeCompletedDialog
          isOpen={ChallengeCompletedDialogState.isOpen}
          challengeId={ChallengeCompletedDialogState.completedChallengeId}
          onClose={() => setChallengeCompletedDialogState({ isOpen: false })}
        />
      )}
      {challengeMaps.map((mapData: UserChallengeMapData) => (
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
