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
} from '@mui/material';
import { ChevronLeft, MoreVert } from '@mui/icons-material';
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
  TaskData,
} from '../../types/challenges';
import { useHistory } from 'react-router-dom';

interface ChallengeDetailsPageState {
  challenge: ChallengeData;
}

const ChallengeDetailsPage: React.FC = () => {
  const [state, setState] = useReducer(
    (s: ChallengeDetailsPageState, a: Partial<ChallengeDetailsPageState>) => ({
      ...s,
      ...a,
    }),
    {
      // TODO: replace.
      challenge: {
        id: '1',
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
        ],
        color: ChallengeColor.PURPLE,
      },
    }
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const peekDrawerHeight = 200;

  const Puller = () => (
    <Box
      sx={{
        width: 30,
        height: 6,
        backgroundColor: 'grey[300]',
        borderRadius: 3,
        position: 'absolute',
        left: 'calc(50% - 15px)',
      }}
    ></Box>
  );

  const Details = () => (
    <Box>
      <Timeline>
        {state.challenge.tasks.map((t: TaskData, index: number) => (
          <TimelineItem key={t.id}>
            <TimelineSeparator>
              <TimelineDot />
              {index < state.challenge.tasks.length - 1 ? (
                <TimelineConnector />
              ) : (
                // Don't show trailing line on last element
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: state.challenge.color,
        height: '100vh',
      }}
    >
      <AppBar
        position="static"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <IconButton edge="start">
            <ChevronLeft />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
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
        <Box
          sx={{
            position: 'absolute',
            top: -peekDrawerHeight,
            backgroundColor: '#fff',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            overflow: 'auto',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Tabs>
            <Tab label={'Milestones'} />
          </Tabs>
          <Details />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default ChallengeDetailsPage;
