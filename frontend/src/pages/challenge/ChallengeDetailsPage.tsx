import React, { useReducer, useState } from 'react';
import {
  AppBar,
  Box,
  Checkbox,
  Typography,
  SwipeableDrawer,
  Tabs,
  Tab,
  IconButton,
  Toolbar,
  Paper,
} from '@mui/material';
import {
  ChevronLeft,
  MoreVert,
  CheckCircle,
  RadioButtonUnchecked,
  Circle,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  ChallengeData,
  ChallengeColor,
  ChallengeStatus,
  UserChallenge,
  TaskData,
} from '../../types/challenges';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

interface ChallengeDetailsPageState {
  challenge: ChallengeData;
  attempt: UserChallenge | null;
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

  const handleCheckTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      console.log('checked');
    }
  };

  const Bar = () => (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <IconButton edge="start">
          <ChevronLeft />
        </IconButton>
        <Box className={classes.spacer} />
        <IconButton>
          <MoreVert />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  const Milestones = () => (
    <Box>
      <Timeline>
        {state.challenge.tasks.map((t: TaskData, index: number) => (
          <TimelineItem key={t.id}>
            <TimelineSeparator>
              <TimelineDot>
                {state.attempt === null ||
                t.id > state.attempt.last_completed_task_id + 1 ? (
                  // Unenrolled, or tasks in the future.
                  <Circle />
                ) : t.id === state.attempt.last_completed_task_id + 1 ? (
                  // Earliest uncompleted task.
                  <Checkbox
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle />}
                    onChange={handleCheckTask}
                  />
                ) : (
                  // Have completed.
                  <CheckCircle />
                )}
              </TimelineDot>
              {index < state.challenge.tasks.length - 1 ? (
                <TimelineConnector />
              ) : (
                // Don't show trailing line on last element.
                <div />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Typography>
                Day {t.dayNumber}: {t.title}
              </Typography>
              <Typography>{t.description} </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
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
            <Milestones />
          </Box>
        </SwipeableDrawer>
      </Box>
    </Paper>
  );
};

export default ChallengeDetailsPage;
