import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  Box,
  Typography,
  SwipeableDrawer,
  Tabs,
  Tab,
  IconButton,
  Toolbar,
  Paper,
} from '@mui/material';
import { ChevronLeft, MoreVert } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { ChallengeData } from '../../types/challenges';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';

import ChallengeMilestones from './ChallengeMilestones';
import { loadChallenge } from 'store/challenges/operations';
import { loadAllTasks } from 'store/tasks/operations';
import { loadUserTasksForChallenge } from 'store/usertasks/operations';
import { getChallenge } from 'store/challenges/selectors';
import { getTaskList } from 'store/tasks/selectors';
import { getUserTaskListForChallenge } from 'store/usertasks/selectors';

export interface ChallengeDetailsPageProps {
  challenge: ChallengeData;
}

const useStyles = makeStyles(() => ({
  paper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100vh',
  },
  appbar: {
    background: 'transparent',
    boxShadow: 'none',
  },
  spacer: {
    flexGrow: 1,
  },
  drawer: {
    overflow: 'visible',
  },
  peekDrawer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    visibility: 'visible',
    overflow: 'auto',
    right: 0,
    left: 0,
  },
  puller: {
    width: 90,
    height: 6,
    backgroundColor: 'black',
    borderRadius: 3,
    position: 'absolute',
    left: 'calc(50% - 45px)',
    top: '-10px',
  },
}));

const ChallengeDetailsPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChallenge(Number(challengeId)));
    dispatch(loadAllTasks(Number(challengeId)));
    dispatch(loadUserTasksForChallenge(Number(challengeId)));
  }, []);

  const { challengeId } = useParams<{ challengeId: string }>();

  const challenge =
    useSelector((state: RootState) =>
      getChallenge(state, Number(challengeId))
    ) ?? {};

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tasks = useSelector((state: RootState) =>
    getTaskList(state, Number(challengeId))
  )!;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userTasks = useSelector((state: RootState) =>
    getUserTaskListForChallenge(state, Number(challengeId))
  )!;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const peekDrawerHeight = 200;

  const Bar = () => (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <div
          onClick={() => {
            history.goBack();
          }}
        >
          <IconButton edge="start">
            <ChevronLeft />
          </IconButton>
        </div>
        <Box className={classes.spacer} />
        <IconButton>
          <MoreVert />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  const Status = () =>
    userTasks !== null ? (
      <Typography>🔥 ONGOING</Typography>
    ) : (
      <Typography>👻 UNENROLLED</Typography>
    );

  return (
    <Paper className={classes.paper} sx={{ backgroundColor: challenge.color }}>
      <Bar />
      <Box sx={{ marginLeft: '28px' }}>
        <Status />
        <Typography variant="h1">{challenge.name}</Typography>
        <Typography>{challenge.duration}</Typography>
        <Typography>{challenge.description}</Typography>
        <Typography>Recommended schedule</Typography>
        <Typography>{challenge.schedule}</Typography>
        <Button> Join Challenge!</Button>

        <SwipeableDrawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          onOpen={() => {
            setIsDrawerOpen(true);
          }}
          swipeAreaWidth={peekDrawerHeight}
          disableSwipeToOpen={false}
          keepMounted
          sx={{
            height: `calc(80% - ${peekDrawerHeight}px)`,
            overflow: 'scroll',
          }}
        >
          <Box className={classes.peekDrawer} sx={{ top: -peekDrawerHeight }}>
            <Box className={classes.puller} />;
            <Tabs value={selectedTab}>
              <Tab label={'Milestones'} />
            </Tabs>
            <ChallengeMilestones tasks={tasks} userTasks={userTasks} />
          </Box>
        </SwipeableDrawer>
      </Box>
    </Paper>
  );
};

export default ChallengeDetailsPage;
