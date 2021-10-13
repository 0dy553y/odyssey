import React, { useReducer, useState } from 'react';
import {
  AppBar,
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
import {
  ChallengeData,
  ChallengeColor,
  ChallengeStatus,
  UserChallengeData,
} from '../../types/challenges';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChallengeMilestones from './ChallengeMilestones';

interface ChallengeDetailsPageState {
  challenge: ChallengeData;
  attempt: UserChallengeData | null;
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
    width: 30,
    height: 6,
    backgroundColor: 'grey[300]',
    borderRadius: 3,
    position: 'absolute',
    left: 'calc(50% - 15px)',
  },
}));

const ChallengeDetailsPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useReducer(
    (s: ChallengeDetailsPageState, a: Partial<ChallengeDetailsPageState>) => ({
      ...s,
      ...a,
    }),
    {
      // TODO: replace.
      challenge: {
        id: 1,
        name: 'Couch to 5k',
        description:
          'Couch to 5K is a running plan for absolute beginners. It was developed by a new runner, Josh Clark, who wanted to help his 50-something mum get off the couch and start running, too.',
        schedule: '3 times a week, alternate days',
        duration: 10,
        tasks: [
          {
            id: 1,
            title: 'Getting started',
            description: 'Run 5k',
            dayNumber: 1,
          },
          {
            id: 2,
            title: 'Warming up',
            description: 'Walk 10m',
            dayNumber: 2,
          },
          {
            id: 3,
            title: 'Cooling down',
            description: 'Dance for 10min',
            dayNumber: 3,
          },
        ],
        color: ChallengeColor.PURPLE,
      },
      attempt: {
        id: 1,
        user_id: 1,
        challenge_id: 1,
        status: ChallengeStatus.ONGOING,
        enrolled_at: dayjs(),
        reason_for_enrollment: '',
        last_completed_task_id: 1,
      },
    }
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const peekDrawerHeight = 200;

  const Bar = () => (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <IconButton
          edge="start"
          onClick={() => {
            history.goBack();
          }}
        >
          <ChevronLeft />
        </IconButton>
        <Box className={classes.spacer} />
        <IconButton>
          <MoreVert />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  const Status = () =>
    state.attempt === null ? (
      <Typography>🔥 ONGOING</Typography>
    ) : (
      <Typography>👻 UNENROLLED</Typography>
    );

  return (
    <Paper
      className={classes.paper}
      sx={{ backgroundColor: state.challenge.color }}
    >
      <Box>
        <Bar />
        <Status />
        <Typography component="h1">{state.challenge.name}</Typography>
        <Typography>{state.challenge.description}</Typography>
        <Typography>Recommended schedule</Typography>
        <Typography>{state.challenge.schedule}</Typography>
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
            overflow: 'visible',
          }}
        >
          <Box className={classes.peekDrawer} sx={{ top: -peekDrawerHeight }}>
            <Box className={classes.puller} />;
            <Tabs>
              <Tab label={'Milestones'} />
            </Tabs>
            <ChallengeMilestones
              tasks={state.challenge.tasks}
              attempt={state.attempt}
            />
          </Box>
        </SwipeableDrawer>
      </Box>
    </Paper>
  );
};

export default ChallengeDetailsPage;
